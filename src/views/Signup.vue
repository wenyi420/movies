<script setup>
import loginBG from "@/assets/image/loginBanner.jpg";
import vInput from "@/components/Form/v-input.vue";
import GoogleBtn from "@/components/Button/GoogleButton.vue";
import FBBtn from "@/components/Button/FBButton.vue";
import LineBtn from "@/components/Button/LineButton.vue";
import BaseLoginBtn from "@/components/Button/BaseLoginButton.vue";

import { showSuccessAlert } from "@/utils.js";

import { reactive, ref, watch, onBeforeMount, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user.js";
import { apiCreateAccont } from "@/apis/googleSheet.js";

import { routerUtils } from "@/common/routerUtils.js";
const { toLogin } = routerUtils();

const store = useUserStore();
const { users, count } = storeToRefs(store);
// users.value.forEach((u) => {
//   let obj = {
//     account: u.account,
//     pwd: u.password,
//   };
//   console.log("user obj ", obj);
// });

const account = ref(null);
const password = ref(null);

const rememberMe = ref(false);
/**
 * rules:
 */

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
      singup();
    })
    .catch(() => {
      alert("請填寫正確值");
    });
}

async function singup() {
  let data = {
    account: account.value?.innerModel,
    password: password.value?.innerModel,
    role: "member",
    postType: "signup",
  };

  let resp = await apiCreateAccont(data);
  if (resp) {
    await showSuccessAlert({ title: resp.data.account + "，" + resp.msg });
    toLogin();
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
      <h1>註冊帳戶</h1>
      <form>
        <vInput :rules="accountRules" label="電子郵件" ref="account"></vInput>
        <vInput
          :rules="passwordRules"
          label="密碼"
          ref="password"
          type="password"
        ></vInput>

        <div class="login-btn-wrapper">
          <BaseLoginBtn type="main" @click="checkValue">註冊</BaseLoginBtn>
          <div class="login">
            已經是會員？<a class="loginLink" @click="toLogin">立即登入</a>。
          </div>
        </div>
        <div class="connentLogin-wrapper">
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

  &::before {
    content: "";
    display: block;
    height: 91px;
  }
  .login-content {
    min-height: 780px;
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
  .login {
    font-size: 16px;
    margin-top: 40px;
    margin-bottom: 12px;
    color: var(--footer-text-color);
    .loginLink {
      color: var(--color-text);
      &:hover {
        text-decoration: underline;
      }
    }
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
