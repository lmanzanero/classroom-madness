<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  let name: any;
  let message: any;
  let users: any[] = [];

  onMount(() => {
    document.cookie = "user_id=" + data.roomId;
  });

  function startGame() {
    console.log(users);
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
<div class="start-form">
  <input type="text" bind:value={data.roomId} />
  <input type="text" bind:value={name} />
  <a href="/room/{data.roomId}?username={name}" class="btn">Join Room</a>
</div>

<a href="/">Go back to home</a>
