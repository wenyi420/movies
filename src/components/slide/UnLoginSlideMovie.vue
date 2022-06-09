<script setup>
import { ref, nextTick } from "vue";
import { onMounted } from "@vue/runtime-core";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { apiGetPopularMovie, apiGetNexflix } from "@/apis/movie.js";
import { useRouter } from "vue-router";
import noImg from "@/assets/image/noImg.svg";
import movieImg from "@/assets/image/MovieSlideImgBox.png";

import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user.js";

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

Promise.all([m1, m2]).then(async (values) => {
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

  // 待 dom 更新後才 setLazyLoad 避免查無 dom el 導致 setLazy 無效
  await nextTick();
  INITswiper();
  setLazyLoad();
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

onMounted(() => {});

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

function setLazyLoad() {
  const imgs = document.querySelectorAll("a.movie-item");
  const observer = new IntersectionObserver((nodes) => {
    nodes.forEach((v) => {
      // 進入可視區域才加載
      if (v.isIntersecting) {
        v.target.style.backgroundImage =
          "url(https://image.tmdb.org/t/p/w300" + v.target.dataset.src + ")";

        // 避免 skeleton 動畫還沒運作而直接關閉，導致畫面閃爍
        setTimeout(() => {
          v.target.classList.add("active");
        }, 800);
        observer.unobserve(v.target); // 停止監聽已加載圖片
      }
    });
  });
  imgs.forEach((v) => observer.observe(v));
}
</script>

<template>
  <div class="slide-content">
    <div class="swiper" ref="swiperEl">
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide" :key="index" v-for="(movie, index) in movies">
          <a
            class="movie-item"
            :data-src="movie.url"
            @click="goToMovie(movie.id)"
          >
            <!-- 當進入  Intersection Observer API 後，透過 js 添加此 style 
              :style="{
              'background-image':
                'url(https://image.tmdb.org/t/p/w300' + movie.url + ')',
              }" 
            -->
            <img v-if="movie.url" :src="movieImg" alt="" />
            <img :src="noImg" v-else />
            <span class="title">{{ movie.title }}</span>
          </a>
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
      .movie-item {
        display: block;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;

        @media screen and (max-width: 480px) {
          overflow: hidden;
          border-radius: 5px;
        }

        // 負責呈現 skeleton
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          width: 100%;
          height: 100%;

          background: #eee;
        }

        // 負責呈現 skeleton
        &::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          width: 100%;
          height: 100%;

          background: linear-gradient(
            90deg,
            rgba(190, 190, 190, 0.2) 25%,
            rgba(129, 129, 129, 0.24) 37%,
            rgba(190, 190, 190, 0.2) 63%
          );
          background-size: 400% 100%;
          animation: ant-skeleton-loading 1.4s ease infinite;
        }
      }

      .movie-item.active {
        &::before {
          display: none;
        }
        &::after {
          display: none;
        }
      }

      img {
        position: relative;
        z-index: -1; // 呈現 movie-item 背景圖用
        width: 100%;
        height: auto;
        visibility: hidden; // 避免顯示圖片文字
      }
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

@keyframes ant-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 50%;
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
