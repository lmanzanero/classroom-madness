<script>
  import "../global.css";
</script>

<div class="container">
  <slot />
</div>

<style>
  .container {
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
  }
</style>
