<script setup>
import SlideMovie from "./SlideMovie.vue";

const props = defineProps(["type"]);

const movieTypeList = [
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
  <div class="movie-slide-list">
    <h2 class="cate">{{ target.title }}</h2>
    <!-- todo 傳入該 type 所需參數 -->
    <SlideMovie :tag="target.tag"></SlideMovie>
  </div>
</template>

<style lang="scss" scoped>
.movie-slide-list {
  padding: 0 3%;
  margin-top: 40px;
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
</style>
