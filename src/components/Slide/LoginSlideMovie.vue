<script setup>
import { ref, nextTick } from "vue";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { apiGetPopularMovie, apiGetNexflix } from "@/apis/movie.js";
import MovieItem from "@/components/MovieItem.vue";

const movies = ref([]);
const props = defineProps(["tag"]);
const isNetflix = props.tag === "213" ? true : false;

getMovies();

let swiper;
const swiperEl = ref(null);
const slideNext = ref(null);
const slidePrev = ref(null);

function INITswiper() {
  swiper = new Swiper(swiperEl.value, {
    spaceBetween: 14, // 間距
    observer: true, // 確保資料取得後 swiper 能偵測並 init
    observeParents: true,
    speed: 1000,
    loop: true,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 7,
      },

      // when window width is >= 640px
      768: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 14,
      },
      1024: {
        slidesPerGroup: 4,
        slidesPerView: 4,
        spaceBetween: 14,
      },
      1440: {
        slidesPerGroup: 6,
        slidesPerView: 6,
        spaceBetween: 14,
      },
    },
    navigation: {
      nextEl: slideNext.value,
      prevEl: slidePrev.value,
    },
  });
}

function getMovies() {
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
        //   url: d.poster_path,
        url: d.backdrop_path, // 改長寬的圖
        title: isNetflix ? d.name : d.title,
        score: d.vote_average,
        movie: d,
        isNetflix,
      };
    });

    await nextTick();
    INITswiper();
  });
}
</script>

<template>
  <div class="slide-content">
    <div class="swiper" ref="swiperEl">
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide" :key="index" v-for="(movie, index) in movies">
          <MovieItem :movie="movie" />
        </div>
      </div>
    </div>
    <!-- 切換鍵 -->
    <div class="slide-button-prev" ref="slidePrev">
      <left-outlined class="slide-button-icon" />
      <div class="slide-button-gradient"></div>
    </div>
    <div class="slide-button-next" ref="slideNext">
      <right-outlined class="slide-button-icon" />
      <div class="slide-button-gradient"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slide-content {
  position: relative;
  margin: 16px 0%;

  @media screen and (max-width: 480px) {
    margin-top: 0px;
  }
}
.swiper {
  width: 100%;
  padding: 0 60px;
  overflow: unset;

  @media screen and (max-width: 768px) {
    padding: 0 4%;
  }

  .swiper-wrapper {
    .swiper-slide {
      position: relative;
      border-radius: 5px;
      overflow: hidden;
      transition: ease 0.3s;
    }
  }

  @media screen and (max-width: 480px) {
    .swiper-wrapper {
      .swiper-slide {
        border-radius: 5px;
      }
    }
  }
}

.slide-button-prev,
.slide-button-next {
  display: none;
  height: 100%;
  position: absolute;
  top: 0px;
  z-index: 99;
  font-weight: bold;
  color: var(--v-main-color);
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  width: 60px;
  background: rgb(0 0 0 / 60%);
  @media screen and (max-width: 768px) {
    width: 4%;
  }
}
.slide-button-prev {
  left: 0;
}
.slide-button-next {
  right: 0;
}

.slide-button-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 40px;
  @media screen and (max-width: 768px) {
    font-size: 4vw;
  }
}

.slide-content:hover {
  .slide-button-prev,
  .slide-button-next {
    display: block;
  }
}

@media screen and (max-width: 1024px) {
  .slide-button-prev,
  .slide-button-next,
  .slide-button-next .slide-button-gradient {
    display: none;
  }
}
</style>
