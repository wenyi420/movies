<script setup>
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
  <div class="btn line-btn" @click="lineLogin">
    <img class="btn-icon" :src="lineIcon" />
    使用 Line 帳號登入
  </div>
</template>

<style lang="scss" scoped>
.connentLogin-wrapper {
  .line-btn {
    background: #00be00;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.btn-icon {
  margin-right: 12px;
  display: inline-block;
  width: 20px;
  fill: var(--v-white);
}
</style>
