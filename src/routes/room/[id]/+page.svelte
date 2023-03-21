<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { AppBar } from "@skeletonlabs/skeleton";

  import { io } from "socket.io-client";

  const socket = io("http://localhost:3000");

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
</script>

<AppBar
  ><strong>Room</strong>: {data.pageId} <strong>User</strong>: {data.username}
  <strong>Game status:</strong>
  {gameStart}</AppBar
>
