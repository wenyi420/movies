<script setup>
import UnLoginSlideMovie from "./UnLoginSlideMovie.vue";
import LoginSlideMovie from "./LoginSlideMovie.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();
const { isLogined } = storeToRefs(store);

const props = defineProps(["type"]);
const movieTypeList = [
  {
    type: "Netflix",
    title: "Netflix 影集",
    tag: "213",
  },
  {
    type: "popular",
    title: "熱門選擇", // i18n
  },
  {
    type: "plot",
    title: "劇情電影",
    tag: "18",
  },
  {
    type: "animation",
    title: "親子動畫",
    tag: "16",
  },
  {
    type: "violence",
    title: "暴力電影",
    tag: "80",
  },
  {
    type: "thriller",
    title: "驚悚電影",
    tag: "53",
  },
  {
    type: "comedy",
    title: "喜劇電影",
    tag: "35",
  },
  {
    type: "fear",
    title: "恐怖電影",
    tag: "27",
  },
  {
    type: "romantic",
    title: "浪漫愛情電影",
    tag: "10749",
  },
];

const target = movieTypeList.find((item) => item.type === props.type);
</script>
<template>
  <div class="movie-slide-list" :class="{ isLogined: isLogined }">
    <h2 class="cate">{{ target.title }}</h2>
    <!-- todo 傳入該 type 所需參數 -->
    <LoginSlideMovie :tag="target.tag" v-if="isLogined" />
    <UnLoginSlideMovie :tag="target.tag" v-else />
  </div>
</template>

<style lang="scss" scoped>
.movie-slide-list {
  max-width: 100%;
  overflow-x: hidden;
  padding: 0 3%;
  margin: 3vw 0;
  @media screen and (max-width: 768px) {
    margin: 1vw 0;
  }
  &.isLogined {
    padding: 0;
    .cate {
      padding-left: 60px;
      font-size: 1.4vw;
      font-weight: bold;
    }
    @media screen and (max-width: 768px) {
      .cate {
        padding-left: 4%;
      }
    }
    @media screen and (max-width: 480px) {
      .cate {
        font-size: 16px;
        margin-bottom: 0 !important;
      }
    }
  }
  .cate {
    font-size: 20px;
    line-height: 27px;
    font-weight: 500;
    color: #fff;
  }
  @media screen and (max-width: 480px) {
    margin-top: 0px;
    .cate {
      font-size: 16px;
    }
  }
}

.light .netflix .cate {
  color: var(--v-white) !important;
}
</style>
