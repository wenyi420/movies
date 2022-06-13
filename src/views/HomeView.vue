<script setup>
import { onMounted, onUpdated, ref } from "vue";

import movieCategory from "@/components/slide/movieCategory.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user.js";
import { useMovieModalStore } from "@/stores/movieModal.js";
import { i18n } from "@/i18n/config.js";

import { apiGetNexflix, apiGetPopularMovie } from "@/apis/movie.js";
import { reactive } from "@vue/reactivity";

// import popupModal from "@/components/popupModal.vue";
import MovieModal from "@/components/movieModal.vue";

const store = useUserStore();
const { isLogined } = storeToRefs(store);

const movieModalStore = useMovieModalStore();
const { isShow } = storeToRefs(movieModalStore);

const router = useRouter();

function goToLogin() {
  router.push("/login");
}

const movieData = reactive({});

/**
 * backdrop_path: "/hJgjxqGBvLAQOpsGJFpPVS7YyUn.jpg"
first_air_date: "2022-03-02"
genre_ids: [18]
id: 156135
name: "Ritmo salvaje"
origin_country: ['CO']
original_language: "es"
original_name: "Ritmo salvaje"
overview: ""
popularity: 113.342
poster_path: "/fNgjy8rDEprVWqeGfzgQ5E0yyIv.jpg"
vote_average: 7.7
vote_count: 16
 */
apiGetNexflix(3).then((res) => {
  console.log("netflix data: ,", res);
  let data = res.data.results;
  if (data && data.length) {
    let index = getRandom(15);
    Object.assign(movieData, data[index]);
  }
});

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

const getFirstSentence = (info) => {
  if (info) {
    let searchText;
    if (i18n.global.locale === "zh-TW") {
      searchText = "。";
    }
    if (i18n.global.locale === "en") {
      searchText = ".";
    }
    return info.split(searchText)[0] + searchText;
  }
  return "";
};

const modal = ref(null);
function showModal() {
  console.log("movieData.genres", movieData.genre_ids);
  getSimilarMovies(movieData.genre_ids);
}

const similarMovies = ref([]);
const getSimilarMovies = (genres) => {
  if (genres && genres.length) {
    let tag = genres[0]._id;

    apiGetPopularMovie(1, tag).then((values) => {
      let data = values.data.results;

      similarMovies.value = data.filter((m) => m.id !== movieData.id);
      // modal.value?.showModalHandler();

      movieData.similarMovies = similarMovies.value;

      movieModalStore.resetMovieData(movieData);
      isShow.value = true;
      // modal.value?.setMovieData(movieData);
    });
  }
};
</script>

<template>
  <main :class="{ isLogined: isLogined, unLogined: !isLogined }">
    <section v-if="isLogined" class="banner-movie-wrapper">
      <div class="img-wrapper">
        <div
          class="img-bg"
          :style="{
            'background-image':
              'url(' +
              'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/' +
              movieData.backdrop_path +
              ')',
          }"
        ></div>
      </div>
      <div class="banner-info-wrapper">
        <div class="movie-title">
          {{ movieData.name }}
        </div>
        <div class="movie-desc">
          {{ getFirstSentence(movieData.overview) }}
        </div>
        <div class="movie-btns-wrapper">
          <div class="movie-btn play">
            <div>
              <span class="movie-btn-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="Hawkins-Icon Hawkins-Icon-Standard"
                >
                  <path
                    d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span class="movie-btn-text">播放</span>
            </div>
          </div>
          <div class="movie-btn info" @click="showModal">
            <div>
              <span class="movie-btn-icon"
                ><svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="Hawkins-Icon Hawkins-Icon-Standard"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                    fill="currentColor"
                  ></path></svg
              ></span>
              <span class="movie-btn-text">詳細資訊</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-else class="category-section">
      <div class="container">
        <h1 class="category-title">{{ $t("str_common_movie") }}</h1>
        <div class="category-desc">{{ $t("str_home_category_desc") }}</div>
      </div>
    </section>

    <!-- 待做成一個 section 組件 包裝 slide -->
    <movieCategory
      type="Netflix"
      :style="{ marginTop: isLogined ? '-150px' : '' }"
    ></movieCategory>
    <movieCategory type="popular"></movieCategory>
    <movieCategory type="plot"></movieCategory>
    <!-- <movieCategory type="romantic"></movieCategory>
    <movieCategory type="violence"></movieCategory>
    <movieCategory type="fear"></movieCategory>
    <movieCategory type="animation"></movieCategory>
    <div class="introl with-gradient-blur">
      <div class="introl-content">
        <h2>{{ $t("str_home_introl_content") }}</h2>
        <p>
          Movies 擁有豐富的影片內容庫，包括長片、紀錄片、節目、動畫、獲獎肯定的
          Movies 原創作品與更多內容。隨時隨地，盡情觀賞。
        </p>
        <a-button type="primary" class="large" @click="goToLogin">{{
          $t("str_common_join")
        }}</a-button>
      </div>
    </div> -->
  </main>

  <div id="triggerModal" ref="triggerModal">
    <h3>這是 hover 後出現</h3>
  </div>

  <!-- <popupModal ref="modal">

  </popupModal> -->
  <MovieModal ref="modal" />
</template>

<style lang="scss" scoped>
#triggerModal {
  position: absolute;
  z-index: 10;
  transform: translate(-50%, -50%);
}

main {
  height: 100%;
  &.unLogined {
    padding-top: 56px;
  }
}

.isLogined {
  .banner-movie-wrapper {
    .img-wrapper {
      width: 100%;
      height: 100vh;
      .img-bg {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
    }
    .banner-info-wrapper {
      position: absolute;
      left: 3%;
      bottom: 25%;
      width: 40%;
      .movie-title {
        font-size: 3vw;
        text-shadow: 1px 1px 8px rgb(0 0 0 / 80%);
        letter-spacing: 10px;
      }
      .movie-desc {
        font-size: 1.2vw;
        text-shadow: 1px 1px 8px rgb(0 0 0 / 80%);
        margin-bottom: 18px;
      }

      .movie-btns-wrapper {
        .movie-btn {
          display: inline-block;
          padding: 10.5px 31.5px;
          border-radius: 5px;
          margin-right: 12px;
          cursor: pointer;

          &.play {
            background: #fff;
            color: #000;

            &:hover {
              background: rgba(255, 255, 255, 0.75);
            }
          }
          &.info {
            background: rgba(109, 109, 110, 0.8);
            color: #fff;
            &:hover {
              background: rgba(109, 109, 110, 0.6);
            }
          }

          > div {
            display: flex;
            align-items: center;
          }
          .movie-btn-icon {
            display: flex;
            align-items: center;
            margin-right: 15px;

            svg {
              width: 34px;
              height: 34px;
            }
          }
          .movie-btn-text {
            font-size: 23px;
            font-weight: bold;
          }
        }
      }
    }
  }
}

.category-section {
  padding: 0 3%;
  margin-bottom: 20px;
}

.movie-slide-list:nth-child(6) {
  filter: blur(5px);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
}
.movie-slide-list:nth-child(7) {
  filter: blur(10px);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
}
.introl {
  background: var(--color-background);
  text-align: center;
  font-size: 1.5em;
  position: relative;
  padding: 1em;

  h2 {
    font-weight: 700;
    font-size: 1.3em;
  }
  @media screen and (min-width: 700px) {
    h2 {
      font-size: 1.5em;
    }
  }
  .introl-content {
    max-width: 730px;
    margin: 0 auto;
  }
}
.introl.with-gradient-blur {
  margin-top: -13rem;
  padding-bottom: 50px;
}
.with-gradient-blur::before {
  content: " ";
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 0)),
    to(var(--color-background))
  );
  height: 15em;
  pointer-events: none;
}

@media screen and (min-width: 600px) {
  .category-section .container {
    max-width: 598px;
  }
}

.category-title {
  color: var(--color-text);
  font-size: 2.75rem;
  font-weight: 900;
  line-height: 1.2;
  word-wrap: break-word;
  margin-top: 4vw;
}

@media screen and (min-width: 1440px) {
  .category-title {
    font-size: 3.25rem;
  }
}
.category-desc {
  color: var(--color-text);
  font-size: 19px;
  margin-top: 0.1vw;
  width: 100%;
  line-height: 1.3;
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
}

@media screen and (max-width: 480px) {
  .introl-content .ant-btn-primary.large {
    min-width: auto;
    width: 100%;
  }
}
</style>
