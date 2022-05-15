<script setup>
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { apiGetPopularMovie } from "@/apis/movie.js";
import { useRouter } from "vue-router";
import noImg from "@/assets/image/noImg.svg";

const router = useRouter();
const movies = ref([]);
const props = defineProps(["tag"]);

let m1, m2;
if (!props.tag) {
  m1 = apiGetPopularMovie(1);
  m2 = apiGetPopularMovie(2);
} else {
  m1 = apiGetPopularMovie(1, props.tag);
  m2 = apiGetPopularMovie(2, props.tag);
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
      title: d.title,
    };
  });
  getMoviesList();
});

const MAX_LIST_LENGTH = 7; // 最多 7 * 6 = 42 個電影
const PRE_VIEW = 6;
const listNum = ref(1); // 如為 0 則隱藏 prev，並以六的倍數取商數 抓到最後一頁，當 listNum = 最後一頁時隱藏 Next
const Page = ref(0);

const currentSlideTranslate = ref(0);
// 將 query 到的 movie 整理 最多 7 個
function getMoviesList() {
  let total = MAX_LIST_LENGTH * PRE_VIEW;
  if (movies.value.length > total) {
    movies.value = movies.value.slice(0, total);
    Page.value = 7;
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
  const pre_slideWidth = -312;
  const lastWidth = -70; // 顯示最後一個不被裁切到

  let translateDistance = 0;

  translateDistance +=
    listNum.value !== Page.value
      ? pre_slideWidth * PRE_VIEW
      : pre_slideWidth * PRE_VIEW + lastWidth;

  currentSlideTranslate.value += translateDistance;

  swiper.setTransition(1000); //设定过渡的时间

  swiper.setTranslate(currentSlideTranslate.value);
}
function prevSlideHandler() {
  listNum.value--;
  const pre_slideWidth = +312;
  const lastWidth = +70; // 顯示最後一個不被裁切到

  let translateDistance = 0;

  translateDistance +=
    listNum.value !== Page.value - 1
      ? pre_slideWidth * PRE_VIEW
      : pre_slideWidth * PRE_VIEW + lastWidth;

  currentSlideTranslate.value += translateDistance;

  swiper.setTransition(1000); //设定过渡的时间

  swiper.setTranslate(currentSlideTranslate.value);
}

onMounted(() => {
  swiper = new Swiper(swiperEl.value, {
    slidesPerView: 6, // 顯示數量
    spaceBetween: 0, // 間距
  });

  console.log("swiper", swiper);
});

function goToMovie(id) {
  router.push({ path: `/movie/${id}` });
}
</script>

<template>
  <div class="slide-content">
    <div class="swiper" ref="swiperEl">
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide" :key="index" v-for="(movie, index) in movies">
          <a @click="goToMovie(movie.id)">
            <img
              :src="'https://image.tmdb.org/t/p/w300' + movie.url"
              alt=""
              v-if="movie.url"
            />
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
}
.swiper {
  width: 100%;
  height: 380px;

  .swiper-slide {
    position: relative;
    margin-right: 14px;
    max-width: 298px;

    a {
      display: inline-block;
    }
    img {
      width: 299px;
      height: 350px;
      object-fit: fill;
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
  }
}

.slide-button-prev,
.slide-button-next {
  height: 100%;
  position: absolute;
  top: -20px;
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
    #181818 30%,
    rgba(24, 24, 24, 0) 100%
  );
}
.slide-button-next .slide-button-gradient {
  left: 25px;
  background-image: linear-gradient(
    to left,
    #181818 30%,
    rgba(24, 24, 24, 0) 100%
  );
}
</style>
