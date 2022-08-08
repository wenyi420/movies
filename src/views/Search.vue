<script setup>
import { ref, watch } from "vue";
import { useSearchStore } from "@/stores/search.js";
import { storeToRefs } from "pinia";
import { apiSearchMovie } from "@/apis/movie.js";
import MovieModal from "@/components/Global/Modal/MovieModal.vue";
import MovieItem from "@/components/MovieItem.vue";

const searchStore = useSearchStore();
const { searchText } = storeToRefs(searchStore);

const movieList = ref([]);
const moviesEl = ref(null);
const notFind = ref(false);

watch(searchText, (v) => {
  if (v) {
    apiSearchMovie(v).then((res) => {
      console.log("search res", res);
      let movies = res.data.results;
      INITMyMovies(movies);
    });
  }
});

function INITMyMovies(movies = []) {
  if (!movies.length) {
    notFind.value = true;
    return (movieList.value = movies);
  }

  movieList.value = movies.map((d) => {
    return {
      id: d.id,
      //   url: d.poster_path,
      url: d.backdrop_path, // 改長寬的圖
      title: d.title ? d.title : d.name,
      score: d.vote_average,
      movie: d,
      isNetflix: false,
    };
  });

  notFind.value = false;
}
</script>

<template>
  <div class="myMovies-wrapper">
    <div class="myMovies-wrapper-title"></div>

    <div v-if="searchText">
      <div class="movies-content" ref="moviesEl" v-if="!notFind">
        <!-- Slides -->
        <div
          class="movies-list"
          :key="index"
          v-for="(movie, index) in movieList"
          :data-movie-index="index"
        >
          <MovieItem :movie="movie" />
        </div>
      </div>
      <div v-else style="width: 100%">
        <h3 style="font-size: 24px">
          找不到符合「{{ searchText }}」的搜尋結果。
        </h3>
      </div>
    </div>

    <MovieModal ref="modal" />
  </div>
</template>

<style lang="scss" scoped>
.myMovies-wrapper {
  min-height: 100vh;
  width: 100%;
  padding: 0 3%;
  @media screen and (max-width: 768px) {
    padding: 0 4%;
  }
}
.myMovies-wrapper-title {
  padding-top: 70px;
  padding-bottom: 70px;
  h3 {
    font-size: 2rem;
    @media screen and (max-width: 800px) {
      font-size: 1.8rem;
    }
  }
}
.movies-content {
  display: grid;
  grid-template-columns: 16.66665% 16.66665% 16.66665% 16.66665% 16.66665% 16.66665%;
  margin: -5px;

  @media screen and (max-width: 1400px) {
    grid-template-columns: 20% 20% 20% 20% 20%;
  }

  @media screen and (max-width: 1100px) {
    grid-template-columns: 25% 25% 25% 25%;
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: 33.33333% 33.33333% 33.33333%;
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 50% 50%;
  }

  .movies-list {
    margin: 5px;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    transition: ease 0.3s;
    margin-bottom: 45px;

    @media screen and (max-width: 500px) {
      margin-bottom: 35px;
    }
  }
}

@media screen and (max-width: 480px) {
  .movies-content {
    .movies-list {
      border-radius: 5px;
    }
  }
}
</style>
