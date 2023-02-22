<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  const { uniqueId } = data;
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
<div class="container">
  <h1>Welcome to Classroom Madness!</h1>
  <div class="start-form">
    <input type="text" value={uniqueId.toUpperCase()} />
    <a href="/room/{uniqueId.toUpperCase()}" class="btn">Create Room</a>
  </div>
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

  h1 {
    font-size: 3em;
    line-height: 2em;
    letter-spacing: 3px;
  }

  .start-form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .btn {
    width: 220px;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    margin: 0 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  }

  .btn:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  .btn:active {
    color: #000;
    font-weight: bolder;
  }

  .btn:active:after {
    background: transparent;
  }

  .btn:hover:before {
    opacity: 1;
  }

  .btn:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  @keyframes glowing {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }

  .start-form input {
    margin: 15px 0;
    padding: 15px 10px;
    width: 100%;
    height: 50px;
    outline: none;
    border: 1px solid #bbb;
    border-radius: 10px;
    display: inline-block;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -ms-transition: 0.2s ease all;
    -o-transition: 0.2s ease all;
    transition: 0.2s ease all;
  }

  .start-form input[type="text"]:focus,
  .start-form input[type="password"]:focus {
    border-color: cornflowerblue;
  }
</style>
