<script setup>
import { defineProps, toRef } from "vue";
import LoginedHeader from "@/components/Global/Header/LoginedHeader.vue";
import UnLoginedHeader from "@/components/Global/Header/UnLoginedHeader.vue";

const props = defineProps(["isLogined"]);
const isLogined = toRef(props, "isLogined");
</script>

<template>
  <LoginedHeader v-if="isLogined" />
  <UnLoginedHeader v-else />
</template>
