<script lang="ts">
  import { json } from "@sveltejs/kit";
  import type { PageData } from "./$types";

  export let data: PageData;
  console.log({ data });
</script>

<h1>This is room page!</h1>
<a href="/">Go back to home</a>
<div>
  {#await data then value}
    <!-- promise was fulfilled -->
    {JSON.stringify(value)}
  {/await}
</div>
