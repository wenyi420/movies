<script setup>
import { reactive, ref, watch, defineProps } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
/* add icons to the library */
library.add(faEye, faEyeSlash);

const props = defineProps(["rules", "label", "type"]);
const rules = props.rules;
const inputType = props.type ? ref(props.type) : ref("text");
const isShowPassword = ref(false);

function togglePassword() {
  if (isShowPassword.value) {
    isShowPassword.value = false;
    inputType.value = "password";
  } else {
    isShowPassword.value = true;
    inputType.value = "text";
  }
}

const input = ref(null);

/**
 * rules: [
 *  {
        required: true,
        message: "",
    },
    {
        email: true,
        rule: null, // 自訂規則
        message: "",
    },
 * ]
 */

// 待優化代碼
const rulesHanlder = function (v) {
  if (rules) {
    let required = rules.find((r) => r.required);
    if (required) {
      if (v) {
        hasError.value = false;
        errorMsg.value = "";
      } else {
        hasError.value = true;
        errorMsg.value = required.message ? required.message : "請填寫必填項目";
      }
    }

    let email = rules.find((r) => r.email);
    if (email) {
      if (v) {
        let emailRegxp = /[\w-]+@([\w-]+\.)+[\w-]+/;
        if (emailRegxp.test(v) != true) {
          hasError.value = true;
          errorMsg.value = email.message ? email.message : "信箱格式錯誤";
        } else {
          hasError.value = false;
          errorMsg.value = "";
        }
      }
    }
  }
};

const hasValue = ref(false);
const hasError = ref(false);
const innerModel = ref("");
const errorMsg = ref("");
watch(innerModel, (v) => {
  if (v) {
    hasValue.value = true;
    rulesHanlder(v);
  } else {
    hasValue.value = false;
    rulesHanlder(v);
  }
});

const validate = () => {
  return new Promise((resolve, reject) => {
    rulesHanlder(innerModel.value);
    hasError.value ? reject() : resolve();
  });
};

const focusInput = () => {
  input.value.focus();
};

defineExpose({
  validate,
  innerModel,
});
</script>

<template>
  <div class="v-form-item" :class="{ hasError: hasError }">
    <div class="v-form-item-input">
      <input
        :type="inputType"
        :class="{ active: hasValue }"
        v-model="innerModel"
        @blur="validate"
        ref="input"
      />
      <label for="acount" @click="focusInput">{{ props.label }}</label>
      <span
        class="password-icon"
        v-if="type === 'password'"
        @click="togglePassword"
      >
        <span v-show="isShowPassword"> <font-awesome-icon icon="eye" /></span>
        <span v-show="!isShowPassword"
          ><font-awesome-icon icon="eye-slash"
        /></span>
      </span>
    </div>
    <div class="v-form-item-error">
      <span>{{ errorMsg }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-form-item {
  margin-bottom: 15px;

  .v-form-item-input {
    position: relative;

    label {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 20px;
      font-size: 16px;
      color: var(--v-input-label);
      transition: font 0.1s ease, top 0.1s ease, transform 0.1s ease;
    }
    input {
      border-radius: 4px;
      border: 0;
      color: var(--color-text);
      height: 50px;
      line-height: 50px;
      padding: 16px 20px 0;
      background: var(--v-input-bg);
      outline: none;
      display: inline-block;
      width: 100%;
      border: 1px solid var(--v-input-border-color);
      font-size: 16px;
      &:focus {
        background: var(--v-input-bg--focus);
      }
      &.active + label,
      &:focus + label {
        top: 7px;
        font-size: 11px;
        transform: translateY(0px);
      }
    }

    .password-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      padding: 5px;
      cursor: pointer;
    }
  }
  .v-form-item-error {
    margin-top: 5px;
    span {
      color: var(--v-input-error);
    }
  }
  &.hasError {
    .v-form-item-input {
      &::after {
        content: "";
        position: absolute;
        bottom: 0px;
        display: block;
        width: 100%;
        height: 6px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border-bottom: 2px solid var(--v-input-error);
      }
    }
  }
}
</style>
