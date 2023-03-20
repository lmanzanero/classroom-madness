<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { io } from "socket.io-client";

  const socket = io("http://localhost:3000");

  export let data: PageData;
  let name: any;
  let message: any;
  let users: any[] = [];
  let textfield = "";

  onMount(() => {
    document.cookie = "user_id=" + data.roomId;
    socket.on("message", (message) => {
      console.log({ message });
    });

    socket.on("name", (name) => {
      console.log({ name });
    });
  });

  function startGame() {
    console.log(users);
  }

  function sendMessage() {
    const message = textfield.trim();
    if (!message) return;

    textfield = "";
    socket.emit("message", message);
  }
</script>

<h1>Room Created with ID: {data.roomId}</h1>
<div id="user_list" />
<div class="players">
  <p>Player One</p>
</div>

<button on:click={startGame}>Start this Game</button>

<p>Invite friends to join this room!</p>
<p>{JSON.stringify(users)} {JSON.stringify(message)}</p>
<div class="flex flex-row">
  <input class="input" type="text" bind:value={data.roomId} />
  <input class="input" type="text" bind:value={name} />
  <a href="/room/{data.roomId}?username={name}" class="btn variant-filled"
    >Join Room</a
  >
</div>

<form
  action="#"
  on:submit|preventDefault={sendMessage}
  class="px-6 py-4 border-t border-zinc-800 bg-zinc-700 text-white shrink-0 flex items-center"
>
  <input
    type="text"
    bind:value={textfield}
    placeholder="Type something..."
    class="input"
  />
  <button type="submit" class="btn variant-filled">Send</button>
</form>

<a href="/">Go back to home</a>
