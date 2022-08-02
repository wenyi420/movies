<script setup>
import BaseLoginButton from "@/components/Button/BaseLoginButton.vue";
import { apiCreateAccountByFB } from "@/apis/googleSheet.js";
import { showSuccessAlert } from "@/utils.js";
import { routerUtils } from "@/common/routerUtils.js";
const { toHome } = routerUtils();

async function connectFB() {
  let resp = await apiCreateAccountByFB();
  if (resp) {
    await showSuccessAlert({ title: resp.data.account + "，" + resp.msg });
    toHome();
  }
}
</script>
<template>
  <BaseLoginButton :use-icon="true" class="FB-btn" @click="connectFB">
    <template #icon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
        />
      </svg>
    </template>
    使用 Facebook 帳號登入
  </BaseLoginButton>
</template>

<style lang="scss" scoped>
.FB-btn {
  background: #4267b2;

  .btn-icon svg {
    color: #fff;
  }
}
</style>
