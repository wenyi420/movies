<script setup>
// import { ref } from "vue";
import { useRouter } from "vue-router";
import switchAppearance from "@/components/switch-appearance.vue";
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
      <span class="mb-logo" @click="toHomePage">M</span>
    </div>
    <div class="right">
      <a-space>
        <span class="switch-styleMode">
          <switchAppearance />
        </span>
        <span class="header-text">
          {{ $t("str_header_component_unlimitedHours") }}
        </span>
        <a-button type="primary" @click="goToLogin">{{
          $t("str_common_join")
        }}</a-button>
        <a-button class="transparent" @click="goToLogin">{{
          $t("str_common_login")
        }}</a-button>
      </a-space>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Akshar&display=swap");

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
  background-color: var(--header-bg);
  border-bottom: 1px solid var(--v-border-color);
  color: var(--color-text);
  .right {
    font-size: 13px;
  }
  .left {
    .logo,
    .mb-logo {
      letter-spacing: 3px;
      font-family: "Akshar", sans-serif;
      line-height: 1;
      color: var(--color-main);
      font-size: 32px;
      font-weight: bold;
      cursor: pointer;
    }
    .mb-logo {
      display: none;
    }
  }
  // .ant-switch-checked {
  //   background-color: var(--color-background) !important;
  //   border: 1px solid rgb(84 84 84 / 65%) !important;
  // }
}

body.b-transition header {
  transition: color 0.5s, background-color 0.5s;
}

@media screen and (max-width: 1024px) {
  header {
    background-color: rgba(0, 0, 0, 0.75);
  }
  .light header {
    background-color: rgba(255, 255, 255, 0.8);
  }
}

@media screen and (max-width: 580px) {
  header {
    justify-content: flex-end;

    .left {
      position: absolute;
      left: 3%;
      .logo {
        display: none;
      }
      .mb-logo {
        letter-spacing: 1px;
        display: block;
        font-size: 45px;
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .header-text {
    display: none;
  }
}
</style>
