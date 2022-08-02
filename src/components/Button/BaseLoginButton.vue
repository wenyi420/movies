<script setup>
import { defineEmits, defineProps } from "vue";
import BaseBtn from "@/components/Button/BaseButton.vue";

const porps = defineProps({
  useIcon: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

function buttonClick() {
  emit("click");
}
</script>

<template>
  <BaseBtn class="login-btn" :class="{ useIcon }" @click="buttonClick">
    <div class="btn-icon" v-if="useIcon">
      <slot name="icon"></slot>
    </div>
    <span class="btn-text"><slot></slot></span>
  </BaseBtn>
</template>

<style lang="scss" scoped>
.login-btn {
  width: 100%;
  border-radius: 5px;
  font-size: 16px;
  padding: 16px 25px;
  text-align: left;
  line-height: 1;
  color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  .btn-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 20px;
    fill: #fff;
  }
  .btn-text {
    display: inline-block;
    width: 100%;
    text-align: center;
    letter-spacing: 1px;
    font-weight: bold;
  }
}

.login-btn.useIcon {
  padding: 14px 25px;
  .btn-text {
    text-align: left;
  }
}
</style>
