<script setup>
import loginBG from "@/assets/image/loginBanner.jpg";
import vInput from "@/components/form/v-input.vue";
import GoogleBtn from "@/components/Button/GoogleButton.vue";
import FBBtn from "@/components/Button/FBButton.vue";
import LineBtn from "@/components/Button/LineButton.vue";
import { showSuccessAlert } from "@/utils.js";

import { reactive, ref, watch, onBeforeMount, onMounted, computed } from "vue";
import { apiLoginAccont } from "@/apis/googleSheet.js";

import { routerUtils } from "@/common/routerUtils.js";
const { toHome, toSignup } = routerUtils();

const account = ref(null);
const password = ref(null);

const rememberMe = ref(false);
const accountRules = reactive([
  {
    required: true,
    message: "請填寫必填項目，測試信箱：test@mail.tw",
  },
  {
    email: true,
    rule: null, // 自訂規則
    message: "信箱驗證失敗，測試信箱:test@mail.tw",
  },
]);

const passwordRules = reactive([
  {
    required: true,
    message: "請填寫必填項目，測試密碼：123",
  },
]);

function checkValue() {
  let vlidate_1 = account.value?.validate();
  let vlidate_2 = password.value?.validate();

  Promise.all([vlidate_1, vlidate_2])
    .then(() => {
      login();
    })
    .catch(() => {
      alert("驗證失敗");
    });
}

async function testLogin() {
  let data = {
    account: "test@gmail.com",
    password: "123",
    role: "member",
  };
  let resp = await apiLoginAccont(data);
  if (resp) {
    await showSuccessAlert({ title: resp.data.account + "，" + resp.msg });
    toHome();
  }
}

async function login() {
  let data = {
    account: account.value?.innerModel,
    password: password.value?.innerModel,
    role: "member",
  };

  let resp = await apiLoginAccont(data);
  if (resp) {
    await showSuccessAlert({ title: resp.data.account + "，" + resp.msg });
    toHome();
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div
      class="login-wrapper-bg"
      :style="{ 'background-image': 'url(' + loginBG + ')' }"
    ></div>
  </div>
  <div class="login-body">
    <div class="login-content">
      <h1>登入</h1>
      <form>
        <vInput :rules="accountRules" label="電子郵件" ref="account"></vInput>
        <vInput
          :rules="passwordRules"
          label="密碼"
          ref="password"
          type="password"
        ></vInput>

        <div class="login-btn-wrapper">
          <div class="btn login-btn" @click="checkValue">登入</div>
          <div class="other">
            <a-checkbox v-model:checked="rememberMe">記住我</a-checkbox>
            <a href="javascript:;">需要協助?</a>
          </div>
          <div class="signup">
            尚未加入 Netflix？<a class="signupLink" @click="toSignup"
              >馬上註冊</a
            >。
          </div>
        </div>

        <div class="connentLogin-wrapper">
          <div class="btn testLogin-btn" @click="testLogin">測試帳戶登入</div>
          <FBBtn />
          <GoogleBtn />
          <LineBtn />
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.login-wrapper {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: block;

  .login-wrapper-bg {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;

    @media screen and (max-width: 640px) {
      display: none;
    }
  }
}

.login-body {
  position: relative;
  margin: 0 auto;
  background-color: transparent;
  max-width: 450px;
  z-index: 10;
  min-height: calc(100vh - 228px);

  .btn {
    font-size: 16px;
    font-weight: 700;
    margin: 24px 0 12px;
    padding: 16px;
    width: 100%;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    line-height: 1;
    cursor: pointer;
  }
  &::before {
    content: "";
    display: block;
    height: 91px;
  }
  .login-content {
    min-height: 660px;
    padding: 60px 68px 40px;
    margin-bottom: 90px;
    background: rgba(0, 0, 0, 0.75);

    h1 {
      color: var(--v-white);
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 25px !important;
    }
  }
}

.light .login-body .login-content {
  background: rgba(255, 255, 255, 0.75);
}

.login-btn-wrapper {
  .login-btn {
    background: var(--color-main);
  }
  .other {
    display: flex;
    justify-content: space-between;

    a {
      color: var(--footer-text-color);

      &:hover {
        text-decoration: underline;
      }
    }

    .ant-checkbox-wrapper {
      color: var(--color-text);
      padding-left: 2px;
    }
    .ant-checkbox-inner {
      background-color: #737373;
      border: none;
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #737373;
      border-color: #737373;
    }
    .ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox-checked::after {
      border-color: #737373;
    }
  }
  .signup {
    font-size: 16px;
    margin-top: 40px;
    color: var(--footer-text-color);
    .signupLink {
      color: var(--color-text);
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.connentLogin-wrapper {
  .testLogin-btn {
    background: #868686;
  }
}

@media screen and (max-width: 640px) {
  .login-body {
    width: 90%;
    margin: 0 auto;
    max-width: 100%;

    .login-content {
      padding: 0;
      min-height: auto;
    }
  }
  .login-wrapper img {
    display: none;
  }
}
</style>
