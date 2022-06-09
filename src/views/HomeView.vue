<script setup>
import { onMounted, onUpdated, ref } from "vue";
import movieCategory from "@/components/slide/movieCategory.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user.js";

import { apiGetNexflix } from "@/apis/movie.js";
import { reactive } from "@vue/reactivity";

const store = useUserStore();
const { isLogined } = storeToRefs(store);

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
</script>

<template>
  <main :class="{ isLogined: isLogined, unLogined: !isLogined }">
    <section v-if="isLogined">
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

.isLogined .img-wrapper {
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
