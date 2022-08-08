<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "@/stores/user.js";
import { storeToRefs } from "pinia";
import { apiGetMovieDetail, apiGetNexflixDetail } from "@/apis/movie.js";
import noImg from "@/assets/image/noImg.jpg";
import movieImg from "@/assets/image/LoginedMovieSlideImgBox.png";
import MovieModal from "@/components/Global/Modal/MovieModal.vue";
import MovieItem from "@/components/MovieItem.vue";
import SkeletonItem from "@/components/SkeletonItem.vue";

const store = useUserStore();
const { userData, myMovies } = storeToRefs(store);

const movieList = ref([]);
const moviesEl = ref(null);
const isINITed = ref(false);

// watch 負責處理直接在此頁 render 而非從其他頁過來時使用
watch(userData, (v) => {
  if (v && !isINITed.value) {
    console.log("v", v);
    INITMyMovies(v.movies);
  }
});

watch(myMovies, (v) => {
  if (v && isINITed.value) {
    INITMyMovies(v);
  }
});

if (userData.value.movies) {
  INITMyMovies(userData.value.movies);
} else {
  const closeLoadingTime = 10000;
  setTimeout(() => {
    isINITed.value = true;
  }, closeLoadingTime);
}

function INITMyMovies(movies = "") {
  if (!movies) return (isINITed.value = true);

  movies = JSON.parse(movies);
  if (!movies.length) {
    movieList.value = [];
    isINITed.value = true;
    return;
  }

  console.log("movies", movies);
  let promiseArr = [];
  movies.forEach((id) => {
    let p;
    let isNetflix = id.toString().includes("n");
    if (isNetflix) {
      id = id.replace("n", "");
      p = apiGetNexflixDetail(id);
    } else {
      p = apiGetMovieDetail(id);
    }
    promiseArr.push(p);
  });

  Promise.all(promiseArr)
    .then((values) => {
      let result = [];
      values.forEach((v) => {
        result.push(v.data);
      });

      movieList.value = result.map((d) => {
        let id = d.id;
        let isNetflix = movies.find((_id) => _id.toString().includes(id))
          ? true
          : false;

        return {
          id: d.id,
          //   url: d.poster_path,
          url: d.backdrop_path, // 改長寬的圖
          title: d.title ? d.title : d.name,
          score: d.vote_average,
          movie: d,
          isNetflix,
        };
      });
      isINITed.value = true;
    })
    .catch(() => {
      isINITed.value = true;
    });
}
</script>

<template>
  <div class="myMovies-wrapper">
    <div class="myMovies-wrapper-title">
      <h3>我的片單</h3>
    </div>
    <div v-if="isINITed">
      <div class="movies-content" ref="moviesEl" v-if="movieList.length">
        <div class="movies-list" :key="movie.id" v-for="movie in movieList">
          <MovieItem :movie="movie" />
        </div>
      </div>
      <div v-else style="width: 100%">
        <h3 style="font-size: 24px">尚未添加電影到我的片單</h3>
      </div>
    </div>
    <div v-else>
      <div class="movies-content INITing">
        <div class="movies-list">
          <SkeletonItem :content-url="movieImg" :keep-loading="true" />
        </div>
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
  }
  @media screen and (max-width: 800px) {
    padding-bottom: 25px;
    h3 {
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
