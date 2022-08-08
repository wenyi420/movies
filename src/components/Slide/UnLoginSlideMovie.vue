<script setup>
import { ref } from "vue";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { apiGetPopularMovie, apiGetNexflix } from "@/apis/movie.js";
import { useRouter } from "vue-router";
import movieImg from "@/assets/image/MovieSlideImgBox.png";
import SkeletonItem from "@/components/SkeletonItem.vue";

const router = useRouter();
const movies = ref([]);
const props = defineProps(["tag"]);
const isNetflix = props.tag === "213" ? true : false;

let m1, m2;
if (!props.tag) {
  m1 = apiGetPopularMovie(1);
  m2 = apiGetPopularMovie(2);
} else {
  // Netflix
  if (isNetflix) {
    m1 = apiGetNexflix(1);
    m2 = apiGetNexflix(2);
  } else {
    m1 = apiGetPopularMovie(1, props.tag);
    m2 = apiGetPopularMovie(2, props.tag);
  }
}

Promise.all([m1, m2]).then((values) => {
  let result = [];
  values.forEach((v) => {
    result = result.concat(v.data.results);
  });

  movies.value = result.map((d) => {
    return {
      id: d.id,
      url: d.poster_path,
      title: isNetflix ? d.name : d.title,
    };
  });
  getMoviesList();
  INITswiper();
});

const MAX_LIST_LENGTH = 7; // 最多 7 * PRE_VIEW 個電影
const PRE_VIEW = 7;
const listNum = ref(1); // 如為 0 則隱藏 prev，並以六的倍數取商數 抓到最後一頁，當 listNum = 最後一頁時隱藏 Next
const Page = ref(0);

const currentSlideTranslate = ref(0);
// 將 query 到的 movie 整理 最多 7 個
function getMoviesList() {
  let total = MAX_LIST_LENGTH * PRE_VIEW;
  if (movies.value.length > total) {
    movies.value = movies.value.slice(0, total);
    Page.value = MAX_LIST_LENGTH;
  } else {
    let p = Math.floor(movies.value.length / PRE_VIEW);
    movies.value = movies.value.slice(0, p * PRE_VIEW);
    Page.value = p;
  }
}

let swiper;
const swiperEl = ref(null);

function nextSlideHandler() {
  listNum.value++;
  const pre_slideWidth = -258; // 圖 + margin-left
  const lastWidth = +14; // margin-left

  let translateDistance = 0;

  translateDistance +=
    listNum.value !== Page.value
      ? pre_slideWidth * PRE_VIEW
      : pre_slideWidth * PRE_VIEW + lastWidth;

  currentSlideTranslate.value += translateDistance;

  swiper.setTransition(1000); // 輪播切換過度時間

  swiper.setTranslate(currentSlideTranslate.value);
}
function prevSlideHandler() {
  listNum.value--;
  const pre_slideWidth = +258; // 圖 + margin-left
  const lastWidth = -14; // margin-left

  let translateDistance = 0;

  translateDistance +=
    listNum.value !== Page.value - 1
      ? pre_slideWidth * PRE_VIEW
      : pre_slideWidth * PRE_VIEW + lastWidth;

  currentSlideTranslate.value += translateDistance;

  swiper.setTransition(1000); // 輪播切換過度時間

  swiper.setTranslate(currentSlideTranslate.value);
}

function INITswiper() {
  swiper = new Swiper(swiperEl.value, {
    spaceBetween: 14, // 間距
    observer: true, // 確保資料取得後 swiper 能偵測並 init
    observeParents: true,

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 4,
        spaceBetween: 7,
      },

      // when window width is >= 640px
      768: {
        slidesPerView: 5,
        spaceBetween: 14,
      },
      1024: {
        slidesPerView: 7,
        spaceBetween: 14,
      },
    },
  });
}

function goToMovie(id) {
  if (isNetflix) {
    // sessionStorage.setItem("isNetflix", true);
    return router.push({ path: `/movie/netflix/${id}` });
  }
  return router.push({ path: `/movie/${id}` });
}
</script>

<template>
  <div class="slide-content">
    <div class="swiper" ref="swiperEl">
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide" :key="index" v-for="(movie, index) in movies">
          <div class="movie-item" @click="goToMovie(movie.id)">
            <SkeletonItem :content-url="movieImg" :img-url="movie.url" />
            <span class="title">{{ movie.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 切換鍵 -->
    <div
      class="slide-button-prev"
      @click="prevSlideHandler"
      v-show="listNum !== 1"
    >
      <left-outlined class="slide-button-icon" />
      <div class="slide-button-gradient"></div>
    </div>
    <div
      class="slide-button-next"
      @click="nextSlideHandler"
      v-show="listNum !== Page"
    >
      <right-outlined class="slide-button-icon" />
      <div class="slide-button-gradient"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slide-content {
  position: relative;
  margin: 16px 0;

  @media screen and (max-width: 480px) {
    margin-right: -15%;
    margin-top: 0px;
  }
}
.swiper {
  width: 100%;

  .swiper-wrapper {
    padding-bottom: 30px;

    .swiper-slide {
      position: relative;
    }
    .title {
      color: var(--color-text);
      display: block;
      text-align: center;
      margin-top: 2px;
      font-size: 16px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;

      @media screen and (max-width: 480px) {
        font-size: 14px;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .swiper-wrapper {
      padding-bottom: 48px;
      .swiper-slide {
        border-radius: 5px;
      }
    }
  }
}

.slide-button-prev,
.slide-button-next {
  height: 100%;
  position: absolute;
  top: 0px;
  z-index: 99;
  font-weight: bold;
  color: var(--v-main-color);
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
}
.slide-button-prev {
  left: 0;

  .slide-button-icon {
    left: -20px;
  }
}
.slide-button-next {
  right: 0;

  .slide-button-icon {
    right: -20px;
  }
}

.slide-button-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.slide-button-gradient {
  width: 100px;
  height: 100%;
  position: relative;
  z-index: -1;
}
.slide-button-prev .slide-button-gradient {
  right: 25px;
  background-image: linear-gradient(
    to right,
    var(--color-background) 30%,
    rgba(24, 24, 24, 0) 100%
  );
}
.slide-button-next .slide-button-gradient {
  left: 25px;
  background-image: linear-gradient(
    to left,
    var(--color-background) 30%,
    rgba(24, 24, 24, 0) 100%
  );
}

@media screen and (max-width: 1024px) {
  .slide-button-prev,
  .slide-button-next,
  .slide-button-next .slide-button-gradient {
    display: none;
  }
}
</style>
