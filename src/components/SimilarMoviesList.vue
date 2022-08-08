<script setup>
import { defineProps } from "vue";
import SimilarMovieItem from "@/components/SimilarMovieItem.vue";
const props = defineProps({
  movies: Array,
});
</script>

<template>
  <div class="similarMovies-list" v-if="movies && movies.length">
    <SimilarMovieItem :movie="m" v-for="m in movies" :key="m.id" />
  </div>
</template>

<style lang="scss" scoped>
.similarMovies-list {
  display: grid;
  grid-template-columns: 33.33333% 33.33333% 33.33333%;
  margin: -10px;
}

@media screen and (max-width: 1024px) {
  .similarMovies-list {
    grid-template-columns: 50% 50%;
  }
}
</style>
