<script setup>
import { defineProps, defineEmits } from "vue";

const porps = defineProps({
  type: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["click"]);

function buttonClick() {
  emit("click");
}
</script>

<template>
  <button
    class="v-btn"
    :class="[type ? 'v-button--' + type : '']"
    @click.prevent="buttonClick"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.v-btn {
  border: none;
  font: inherit;
  outline: inherit;
  display: inline-block;
  padding: 4px 15px;
  font-size: 14px;
  line-height: 1.5715;
  position: relative;
  font-weight: 400;
  border-radius: 2px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;

  &.v-button--default {
    color: var(--color-text);
    border: 1px solid #d9d9d9;
    background: transparent;

    &:hover {
      color: var(--hover-color-main);
      border-color: var(--hover-color-main);
      background: var(--v-white);
    }
  }

  &.v-button--main {
    background: var(--color-main);
    color: var(--v-white);

    &:hover {
      color: var(--v-white);
      border-color: var(--hover-color-main);
      background: var(--hover-color-main);
    }
  }
}
</style>
