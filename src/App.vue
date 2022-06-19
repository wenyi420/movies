<script setup>
import { computed, onMounted, ref } from "vue";
import { RouterView, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user.js";
import { apiUpdateAccount } from "@/apis/googleSheet.js";

import SignupHeader from "@/components/Global/Header/SignupHeader.vue";
import MHeader from "@/components/Global/Header/index.vue";
import MFooter from "@/components/Global/Footer/index.vue";
import "@/assets/base.css";

checkLoginState();

const route = useRoute();

const isLoginPage = computed(() => {
  if (route.path?.includes("login") || route.path?.includes("signup")) {
    return true;
  }
  return false;
});

const store = useUserStore();
const { isLogined } = storeToRefs(store);

onMounted(() => {
  document.body.classList.add("b-transition");
});

// 檢查登入
function checkLoginState() {
  let token = localStorage.getItem("token");
  let _id = localStorage.getItem("_id");
  if (token && _id) {
    let data = {
      token,
      _id,
    };
    apiUpdateAccount(data);
  }
}
</script>

<template>
  <div class="wrapper with-fixed-header" :class="{ loginPage: isLoginPage }">
    <SignupHeader v-if="isLoginPage" />
    <MHeader v-else :isLogined="isLogined" />
    <RouterView :key="$route.fullPath"></RouterView>
    <MFooter :isLogined="isLogined" />
  </div>
</template>

<style lang="scss" scoped>
.loginPage {
  padding-top: 0px;
  position: relative;
}
.loginPage::after {
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

.light .loginPage::after {
  background: rgb(255 255 255 / 60%);
}

@media screen and (max-width: 640px) {
  .loginPage::after {
    background: #000;
  }
}
</style>
