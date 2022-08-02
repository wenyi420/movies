<script setup>
import { ref, onMounted } from "vue";
import goolgeImg from "@/assets/image/Google__G__Logo.webp";
import BaseLoginButton from "@/components/Button/BaseLoginButton.vue";
import { apiCreateAccountByGoogle } from "@/apis/googleSheet.js";
import { showSuccessAlert } from "@/utils.js";
import { routerUtils } from "@/common/routerUtils.js";

const { toHome } = routerUtils();

let auth2;
function startApp() {
  window.gapi.load("auth2", function () {
    auth2 = window.gapi.auth2.init({
      client_id:
        "310637964798-6rp9g0laj5sa4lkmejdn9pqe1o0svp2k.apps.googleusercontent.com",
      cookiepolicy: "single_host_origin",
    });
    attachSignin(document.getElementById("googleSigninBtn"));
  });
}

function attachSignin(element) {
  console.log(element.id);
  auth2.attachClickHandler(
    element,
    {},
    function (googleUser) {
      let profile = googleUser.getBasicProfile();
      let data = {
        account: profile.getName(),
        password: profile.getEmail(),
        role: "google",
      };
      createAccountByGoogle(data);
    },
    function (error) {
      alert(JSON.stringify(error, undefined, 2));
    }
  );
}

async function createAccountByGoogle(data) {
  let resp = await apiCreateAccountByGoogle(data);
  if (resp) {
    await showSuccessAlert({ title: resp.data.account + "，" + resp.msg });
    toHome();
  }
}

onMounted(() => {
  startApp();
});
</script>

<template>
  <BaseLoginButton :use-icon="true" class="google-btn" id="googleSigninBtn">
    <template #icon>
      <img class="btn-icon" alt="Google login" :src="goolgeImg" />
    </template>
    使用 Google 帳號登入
  </BaseLoginButton>
</template>

<style lang="scss" scoped>
.google-btn {
  background: #fff;
  border-color: var(--v-gray-light-6);

  ::v-deep(.btn-text) {
    color: #000;
  }
  .btn-icon svg {
    color: #fff;
  }
}
</style>
