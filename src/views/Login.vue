<script setup>
import loginBG from "@/assets/image/loginBanner.jpg";
import vInput from "@/components/form/v-input.vue";
import { reactive, ref, watch, onBeforeMount } from "vue";

function connectFB() {
  FB.login(
    function (response) {
      // handle the response
      if (response.status === "connected") {
        console.log("fb connect 成功: ", response);
        // Logged into your webpage and Facebook.
      } else {
        console.log("fb error: ", response);
        // The person is not logged into your webpage or we are unable to tell.
      }
    },
    { scope: "public_profile,email" }
  );
}
const rememberMe = ref(false);
/**
 * rules:
 */

const accountRules = reactive([
  {
    required: true,
    message: "",
  },
  {
    email: true,
    rule: null, // 自訂規則
    message: "",
  },
]);

const passwordRules = reactive([
  {
    required: true,
    message: "",
  },
]);
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
        <vInput :rules="accountRules" label="電子郵件或電話號碼"></vInput>
        <vInput :rules="passwordRules" label="密碼"></vInput>

        <div class="login-btn-wrapper">
          <div class="btn login-btn">登入</div>
          <div class="other">
            <a-checkbox v-model:checked="rememberMe">記住我</a-checkbox>
            <a href="javascript:;">需要協助?</a>
          </div>
        </div>

        <div class="connentLogin-wrapper">
          <div class="btn" @click="connectFB">使用 Facebook 帳號登入</div>
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
      color: var(--color-text);

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
}
.connentLogin-wrapper .btn {
  background: #4267b2;
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
