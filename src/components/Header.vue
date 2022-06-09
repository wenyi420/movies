<script setup>
import { defineProps } from "vue";
import LoginedHeader from "@/components/LoginedHeader.vue";
import UnLoginedHeader from "@/components/UnLoginedHeader.vue";

const props = defineProps(["isLogined"]);
const isLogined = props.isLogined;
</script>

<template>
  <LoginedHeader v-if="isLogined" />
  <UnLoginedHeader v-else />
</template>
