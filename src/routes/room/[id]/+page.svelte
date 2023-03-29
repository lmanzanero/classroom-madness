<script lang="ts">
  import type { PageData } from "./$types";
  import { onDestroy, onMount } from "svelte";
  import { AppBar } from "@skeletonlabs/skeleton";
  import Phaser from "phaser";
  import { Toast, toastStore } from "@skeletonlabs/skeleton";
  import type { ToastSettings } from "@skeletonlabs/skeleton";
  import { Modal, modalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
  import { Drawer, drawerStore } from "@skeletonlabs/skeleton";
  import type { DrawerSettings } from "@skeletonlabs/skeleton";
  import { io } from "socket.io-client";
  import Question from "../../../components/Question.svelte";

  const socket = io(`${process.env.SERVER_URL}`);

  export let data: PageData;
  let gameStart = false;

  onMount(() => {
    document.cookie = "user_id=" + data.roomId;

    socket.emit("joinRoom", { room: data.pageId, username: data.username });

    socket.on("gameStatus", (status) => {
      gameStart = status;
    });

    socket.on("message", (message) => {
      console.log({ message });
    });

    socket.on("name", (name) => {
      console.log({ name });
    });
  });

  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 300 },
        debug: false,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  let stars: Phaser.Physics.Arcade.Group;
  let bombs: Phaser.Physics.Arcade.Group;
  let platforms;
  let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  let score = 0;
  let previousScore = 0;
  let gameOver = false;
  let scoreText: Phaser.GameObjects.Text;
  const game = new Phaser.Game(config);
  /**
   * @this {Phaser.Scene}
   */

  function preload() {
    this.load.image("sky", "/assets/sky.png");
    this.load.image("ground", "/assets/platform.png");
    this.load.image("star", "/assets/star.png");
    this.load.image("bomb", "/assets/bomb.png");
    this.load.spritesheet("dude", "/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  function create() {
    //  A simple background for our game
    this.add.image(400, 300, "sky");

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");

    // The player and its settings
    player = this.physics.add.sprite(100, 450, "dude");

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
  }

  function update() {
    if (gameOver) {
      return;
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }

  const t: ToastSettings = {
    message: "Game started for everyone",
  };

  function pauseGame() {
    game.scene.pause("default");
  }

  function resumeGame() {
    game.scene.resume("default");
  }

  function restartGame() {
    game.scene.start("default");
    gameOver = false;
  }
  function collectStar(player, star) {
    star.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText("Score: " + score);

    if (stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      let x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      let bomb = bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }

  function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    gameOver = true;
  }

  $: {
    if (gameStart) {
      gameOver = false;
      toastStore.trigger(t);
    } else {
      gameOver = true;
    }
  }

  const modalComponentRegistry: Record<string, ModalComponent> = {
    // Custom Modal 1
    modalComponentOne: {
      // Pass a reference to your custom component
      ref: Question,
      // Add the component properties as key/value pairs
      props: { background: "bg-red-500" },
      // Provide a template literal for the default component slot
      slot: "<p>Skeleton</p>",
    },
  };

  const prompt: ModalSettings = {
    type: "component",
    // Data
    title: "Type the answer",
    body: "I like to eat pizza.",
    component: "modalComponentOne",
    response: (r: string) => {
      resumeGame();
    },
  };

  const drawerSettings: DrawerSettings = {
    id: "example-1",
    // Provide your property overrides:
    bgDrawer: "bg-purple-900 text-white",
    bgBackdrop:
      "bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50",
    width: "w-[280px] md:w-[480px]",
    padding: "p-2",
    rounded: "rounded-xl",
    position: "right",
  };

  function openDrawer() {
    drawerStore.open(drawerSettings);
  }
  $: {
    if (score > 0) {
      socket.emit("scoreChange", {
        room: data.pageId,
        user: data.username,
        score: score,
      });
    }

    if (score > previousScore + 40) {
      previousScore = score;
      pauseGame();
      modalStore.trigger(prompt);
    }
  }

  onDestroy(() => {
    //ensures new canvas elements is added on refresh
    game.destroy(true);
  });
</script>

<AppBar
  ><strong>Room</strong>: {data.pageId} <strong>User</strong>: {data.username}
  <strong>Game status:</strong>
  {gameStart}</AppBar
>
<button on:click={pauseGame} class="btn variant-filled-success">Pause</button>
<button on:click={resumeGame} class="btn variant-filled-success">Resume</button>
<button on:click={restartGame} class="btn variant-filled-success"
  >Restart</button
>
<button on:click={openDrawer} class="btn variant-filled-success"
  >Open Drawer</button
>
<Toast />
<Modal regionBackdrop="staticModal fixed" components={modalComponentRegistry} />
<Drawer>
  <div class="p-3 w-full text-center">
    <h3>Upgrade</h3>
    <!-- Things the user can upgrade and increase health -->
  </div>
</Drawer>

<style>
  canvas {
    border: 1px solid red !important;
    margin: auto !important;
  }
</style>
