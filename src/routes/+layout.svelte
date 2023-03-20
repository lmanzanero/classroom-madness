<script>
  // Your selected Skeleton theme:
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";

  // This contains the bulk of Skeletons required styles:
  import "@skeletonlabs/skeleton/styles/all.css";

  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import "../app.postcss";
</script>

<div class="container">
  <slot />
</div>

<style>
  /* .container {
    width: 100vw;
    height: 100vh;
    background: rgb(236, 238, 174);
    background: radial-gradient(
      circle,
      rgba(236, 238, 174, 1) 0%,
      rgba(148, 233, 177, 1) 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgb(35, 60, 60);
  } */
</style>
