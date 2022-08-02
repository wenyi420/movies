<script setup>
import BaseLoginButton from "@/components/Button/BaseLoginButton.vue";
import { apiCreateAccountByLine } from "@/apis/googleSheet.js";
import { showSuccessAlert, showErrorAlert } from "@/utils.js";
import { routerUtils } from "@/common/routerUtils.js";
import lineIcon from "@/assets/image/line-icon.png";

const { toHome } = routerUtils();
let windowOpen = null;

async function lineLoginHandler(event) {
  if (event.origin !== location.origin) return;

  let { code, error } = event.data;
  if (error) {
    windowOpen.close();
    removeMessageEvent();
    return showErrorAlert({ title: error });
  }

  let data = {
    code, // post to GoogleSheet 取得 token
    role: "line",
  };

  windowOpen.close();
  removeMessageEvent();

  // 於 GoogleSheet 後端處理 line token 後返回, 避免 client_secret 在前端處理
  let resp = await apiCreateAccountByLine(data);
  if (resp) {
    await showSuccessAlert({ title: resp.data.account + "，" + resp.msg });
    toHome();
  }
}

function lineLogin() {
  const state = createRandomID();
  const nonce = createRandomID();
  const redirect_uri = "https://wenyi420.github.io/movies/lineLoginRedirect";
  const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1657326674&redirect_uri=${redirect_uri}&state=${state}&scope=profile%20openid&nonce=${nonce}`;

  windowOpen = window.open(url, "_blank", "width=600px,height=600px");
  window.addEventListener("message", lineLoginHandler);
}

function removeMessageEvent() {
  window.removeEventListener("message", lineLoginHandler);
}

function createRandomID() {
  const RANDOMID_LENGTH = 6;
  const randomTxt = "123456789abcdefghijklmnpq";

  let result = "";
  for (let i = 0; i < RANDOMID_LENGTH; i++) {
    let txtIndex = getRandom(randomTxt.length);
    result += randomTxt[txtIndex];
  }

  function getRandom(x) {
    return Math.floor(Math.random() * x);
  }

  return result;
}
</script>
<template>
  <BaseLoginButton :use-icon="true" class="line-btn" @click="lineLogin">
    <template #icon>
      <img :src="lineIcon" />
    </template>
    使用 Line 帳號登入
  </BaseLoginButton>
</template>

<style lang="scss" scoped>
.line-btn {
  background: #00be00;
}

img {
  transform: scale(1.4);
}
</style>
