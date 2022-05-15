<script setup>
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import MHeader from "@/components/Header.vue";
import MFooter from "@/components/Footer.vue";
import LoginHeader from "@/components/LoginHeader.vue";
import "@/assets/base.css";

const route = useRoute();

const isLoginPage = computed(() => {
  if (route.path?.includes("login")) {
    return true;
  }
  return false;
});
</script>

<template>
  <div class="wrapper with-fixed-header" :class="{ loginPage: isLoginPage }">
    <LoginHeader v-if="isLoginPage" />
    <MHeader v-else />
    <RouterView :key="$route.fullPath"></RouterView>
    <MFooter />
  </div>
</template>

<style lang="scss" scoped>
.with-fixed-header {
  padding-top: 56px;
  &.loginPage {
    padding-top: 0px;
    position: relative;
  }
  &.loginPage::after {
    content: "";
    display: block;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background: rgb(0 0 0 / 60%);
    z-index: 0;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
