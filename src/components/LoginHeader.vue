<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function toHomePage() {
  router.push("/");
}
</script>

<template>
  <header class="login-header">
    <div class="left">
      <span class="logo" @click="toHomePage">MOVIES</span>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Akshar&display=swap");

.login-header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 100;

  @media screen and (max-width: 1024px) {
    padding: 20px 5%;
  }
}

header {
  padding: 20px 3%;
  color: var(--color-text);

  .left {
    .logo {
      letter-spacing: 3px;
      font-family: "Akshar", sans-serif;
      line-height: 1;
      color: var(--color-main);
      font-size: 50px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
