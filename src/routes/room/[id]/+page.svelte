<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";

  export let data: PageData;
  let gameStart = false;

  onMount(() => {});
</script>

<h1>Hello room: {data.pageId} with: {data.username}</h1>
<p>{gameStart}</p>
