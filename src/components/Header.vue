<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function toHomePage() {
  router.push("/");
}

function goToLogin() {
  router.push("/login");
}
</script>

<template>
  <header>
    <div class="left">
      <span class="logo" @click="toHomePage">MOVIES</span>
    </div>
    <div class="right">
      <a-space>
        {{ $t("str_header_component_unlimitedHours") }}
        <a-button type="primary">{{ $t("str_common_join") }}</a-button>
        <a-button class="transparent" @click="goToLogin">{{
          $t("str_common_login")
        }}</a-button>
      </a-space>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 3%;
  background: var(--v-black);
  color: var(--color-text);

  .right {
    font-size: 13px;
  }
  .left {
    .logo {
      line-height: 1;
      color: var(--color-main);
      font-size: 32px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
