<script lang="ts">
  import { onMount } from "svelte";
  import { PUBLIC_API_KEY } from "$env/static/public";
  import type { PageData } from "./$types";
  import { io } from "socket.io-client";
  import { Avatar } from "@skeletonlabs/skeleton";
  import QrCode from "svelte-qrcode";

  const socket = io(PUBLIC_API_KEY);

  export let data: PageData;
  let name: any;
  let roomMessage: any = "";
  let roomUsers: any[] = [];
  let textfield = "";

  onMount(() => {
    document.cookie = "user_id=" + data.roomId;

    socket.emit("joinRoom", { room: data.roomId });

    socket.on("roomMessage", (message) => {
      roomMessage = message;
    });

    socket.on("roomUsers", ({ room, users }) => {
      roomUsers = users;
    });

    socket.on("scoreUpdates", ({ updatedScores }) => {
      roomUsers = updatedScores;
    });
  });

  function startGame() {
    socket.emit("startGame", { room: data.roomId });
  }

  function endGame() {
    socket.emit("endGame", { room: data.roomId });
  }

  function sendMessage() {
    const message = textfield.trim();
    if (!message) return;

    textfield = "";
    socket.emit("message", message);
  }
</script>

<div
  class="flex flex-col justify-center items-center text-center w-screen h-screen"
>
  <h1>Room ID: {data.roomId}</h1>
  <div id="user_list" />
  <div class="players" />

  <div class="flex flex-row gap-3">
    {#each roomUsers as user}
      <!-- content here -->
      <Avatar
        initials={user.username}
        border="border-4 border-surface-300-600-token hover:!border-primary-500"
        cursor="cursor-pointer"
      />
    {/each}
  </div>

  <p>{JSON.stringify(roomUsers)}</p>
  <p>Data Logs: {roomMessage}</p>

  <h4>Invite friends to join this room!</h4>
  <div class="flex flex-row gap-3 m-4">
    <!-- <input class="input" type="text" bind:value={data.roomId} />
    <input
      class="input"
      type="text"
      placeholder="Enter your name"
      bind:value={name}
      required
    />
    <a
      target="_blank"
      rel="noreferrer"
      href="/room/{data.roomId}?username={name}"
      class="btn variant-filled">Join Room</a
    > -->
    <QrCode value="{PUBLIC_API_KEY}/room/{data.roomId}?username={name}" />
  </div>
  <div class="btn-group variant-filled-success">
    <button on:click={startGame}>Start</button>
    <button>Pause</button>
    <button on:click={endGame}>End</button>
  </div>

  <a href="/">Go back to home</a>
</div>
