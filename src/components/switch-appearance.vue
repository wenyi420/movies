<script setup>
import { ref, watch, onBeforeMount, onMounted } from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
/* add icons to the library */
library.add(faPhone, faMoon, faSun);

const mode = ref(false);

watch(mode, (newValue) => {
  if (newValue) {
    localStorage.setItem("appearanceMode", "light");
  } else {
    localStorage.setItem("appearanceMode", "dark");
  }
  setModeClassToBody();
});

// todo 檢查 localstrorage
onBeforeMount(() => {
  const appearanceMode = localStorage.getItem("appearanceMode");
  if (appearanceMode) {
    if (appearanceMode === "light") {
      mode.value = true;
    } else {
      mode.value = false;
    }
  }
  setModeClassToBody();
});

function setModeClassToBody() {
  if (mode.value) {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    return;
  }
  document.body.classList.add("dark");
  document.body.classList.remove("light");
}
</script>

<template>
  <a-switch v-model:checked="mode">
    <template #checkedChildren><font-awesome-icon icon="sun" /></template>
    <template #unCheckedChildren><font-awesome-icon icon="moon" /></template>
  </a-switch>
</template>

<style lang="scss" scoped>
.ant-switch {
  border: 1px solid var(--color-border) !important;
}
.light .ant-switch {
  background-color: #eee;
}

.light .ant-switch-inner .fa-sun {
  color: var(--color-text-2) !important;
}
.dark .ant-switch {
  background-color: var(--color-background) !important;
}
</style>
