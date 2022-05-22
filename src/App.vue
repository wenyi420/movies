<script setup>
import { computed, onMounted } from "vue";
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

onMounted(() => {
  document.body.classList.add("b-transition");
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
    height: 100%;
    background: rgb(0 0 0 / 60%);
    z-index: 0;
    position: absolute;
    left: 0;
    top: 0;
  }
}

.light .with-fixed-header.loginPage::after {
  background: rgb(255 255 255 / 60%);
}

@media screen and (max-width: 640px) {
  .with-fixed-header.loginPage::after {
    background: #000;
  }
}
</style>
