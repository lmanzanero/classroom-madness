<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  const { uniqueId } = data;
  let joinRoomId = "";
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>Classroom Madness - Real time phonics, spelling, reading game</title>
  <meta
    name="title"
    content="Classroom Madness - Real time phonics, spelling, reading game"
  />
  <meta
    name="description"
    content="A fun voice interactive game to practice phonics, spelling, and reading. Turn on your audio and start improving your English proficiency!"
  />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://metatags.io/" />
  <meta
    property="og:title"
    content="Classroom Madness - Real time phonics, spelling, reading game"
  />
  <meta
    property="og:description"
    content="A fun voice interactive game to practice phonics, spelling, and reading. Turn on your audio and start improving your English proficiency!"
  />
  <meta
    property="og:image"
    content="https://classroom-madness.cyclic.app/classroom-madness.png"
  />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://metatags.io/" />
  <meta
    property="twitter:title"
    content="Classroom Madness - Real time phonics, spelling, reading game"
  />
  <meta
    property="twitter:description"
    content="A fun voice interactive game to practice phonics, spelling, and reading. Turn on your audio and start improving your English proficiency!"
  />
  <meta
    property="twitter:image"
    content="https://classroom-madness.cyclic.app/classroom-madness.png"
  />
</svelte:head>
<div
  class="flex flex-col justify-center items-center text-center w-screen h-screen"
>
  <div class="flex flex-row gap-3 m-5">
    <h1>
      <span
        class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
        >Classroom</span
      >
    </h1>
    <h1>
      <span
        class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
        >Madness</span
      >
    </h1>
  </div>
  <h1>
    <div class="flex gap-3 m-3">
      <input
        type="text"
        class="input w-64"
        placeholder="code"
        value={uniqueId.toUpperCase()}
      />
      <a
        href="/room?roomId={uniqueId.toUpperCase()}"
        class="btn variant-filled-surface">Create Room</a
      >
    </div>

    <div class="flex gap-3 m-3">
      <input
        class="input w-64"
        type="text"
        placeholder="Enter you name"
        bind:value={joinRoomId}
        required
      />
      <a
        target="_blank"
        rel="noreferrer"
        href="/room/{uniqueId.toUpperCase()}"
        class="btn variant-filled-surface">Join Room</a
      >
    </div>
  </h1>
</div>
