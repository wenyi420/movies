<script setup>
import {
  ref,
  nextTick,
  onBeforeUpdate,
  onUpdated,
  onUnmounted,
  getCurrentInstance,
} from "vue";
import { onMounted } from "@vue/runtime-core";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { apiGetPopularMovie, apiGetNexflix } from "@/apis/movie.js";
import { useRouter } from "vue-router";
import noImg from "@/assets/image/noImg.svg";
import movieImg from "@/assets/image/LoginedMovieSlideImgBox.png";

import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user.js";

import renderComponent from "@/renderComponent";

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
      //   url: d.poster_path,
      url: d.backdrop_path, // 改長寬的圖
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
const PRE_VIEW = 8;
const Page = ref(0);

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
        slidesPerGroup: 4,
        slidesPerView: 4,
        spaceBetween: 7,
      },

      // when window width is >= 640px
      768: {
        slidesPerGroup: 5,
        slidesPerView: 5,
        spaceBetween: 14,
      },
      1024: {
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

let itemRefs = [];

const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el);
  }
};

const { appContext } = getCurrentInstance();
let counter = 1;
let destroyComp = null;

onUnmounted(() => destroyComp?.());

let hoverTimer = null;

function mouseoverHandler(e) {
  console.log("e", e);
  hoverTimer = setTimeout(() => {
    const parent = e.target.parentElement;
    if (parent?.dataset?.swiperSlideIndex) {
      let index = parent.dataset.swiperSlideIndex;
      let movie = movies.value[index];
      const { x, y, width, height } = getCoords(e.target, "center");
      console.log(
        "slidePrev.value.getBoundingClientRect()?.width",
        slidePrev.value.getBoundingClientRect()?.width
      );
      const bodyWidth = document.body.getBoundingClientRect()?.width;
      //   triggerModal.style.position = "absolute";
      //   triggerModal.style.left = `${x}px`;
      //   triggerModal.style.top = `${y}px`;
      createMovieModal({
        x,
        y,
        width,
        height,
        movie,
        // 處理 slide 前後 sacle 時往左放大與往右放大
        isFirstItem: x - width < 0 ? true : false,
        isLastItem: x + width > bodyWidth ? true : false,
      });
    }
  }, 500);
}
function mouseLeaveHandler() {
  clearTimeout(hoverTimer);
}

const createMovieModal = async (data) => {
  destroyComp?.();
  counter++;
  console.log("createMovieModal data", data);
  destroyComp = renderComponent({
    el: "#triggerModal",
    component: (await import("@/components/movieModal.vue")).default,
    props: {
      key: data.movie.id,
      title: data.movie.title,
      left: data.x,
      top: data.y,
      width: data.width,
      height: data.height,
      imgurl: data.movie.url,
      imgbox: movieImg,
      isFirstItem: data.isFirstItem,
      isLastItem: data.isLastItem,
    },
    appContext,
  });
};

let body = document.body;
function checkIsHovered(e) {
  // if(e.target.contain)
  let el = e.target;
  let target = document.querySelector("#triggerModal");
  if (el !== target && !target.contains(e.target)) {
    let modalwrapper = target.querySelector(".movieModal-wrapper");
    if (modalwrapper) {
      modalwrapper.classList.remove("active");
      setTimeout(() => {
        destroyComp?.();
      }, 295);
    }
  }
}
body.addEventListener("mouseover", checkIsHovered);

const getCoords = (element, position) => {
  const { top, left, width, height } = element.getBoundingClientRect();
  let point;
  switch (position) {
    case "top left":
      point = {
        x: left + window.pageXOffset,
        y: top + window.pageYOffset,
      };
      break;
    case "top center":
      point = {
        x: left + width / 2 + window.pageXOffset,
        y: top + window.pageYOffset,
      };
      break;
    case "top right":
      point = {
        x: left + width + window.pageXOffset,
        y: top + window.pageYOffset,
      };
      break;
    case "center left":
      point = {
        x: left + window.pageXOffset,
        y: top + height / 2 + window.pageYOffset,
      };
      break;
    case "center":
      point = {
        x: left + width / 2 + window.pageXOffset,
        y: top + height / 2 + window.pageYOffset,
      };
      break;
    case "center right":
      point = {
        x: left + width + window.pageXOffset,
        y: top + height / 2 + window.pageYOffset,
      };
      break;
    case "bottom left":
      point = {
        x: left + window.pageXOffset,
        y: top + height + window.pageYOffset,
      };
      break;
    case "bottom center":
      point = {
        x: left + width / 2 + window.pageXOffset,
        y: top + height + window.pageYOffset,
      };
      break;
    case "bottom right":
      point = {
        x: left + width + window.pageXOffset,
        y: top + height + window.pageYOffset,
      };
      break;
  }

  point.width = width;
  point.height = height;
  console.log("point", point);
  return point;
};

onUpdated(() => {
  console.log(itemRefs);

  itemRefs.forEach((item) => {
    item.addEventListener("mouseover", mouseoverHandler);
    item.addEventListener("mouseleave", mouseLeaveHandler);
  });
});
</script>

<template>
  <div class="slide-content">
    <div class="swiper" ref="swiperEl">
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div
          class="swiper-slide"
          :key="index"
          v-for="(movie, index) in movies"
          :ref="setItemRef"
        >
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
            <!-- <span class="title">{{ movie.title }}</span> -->
          </a>
          <!-- <div class="info">
            <h3>電影資訊</h3>
            <p>93% 適合你</p>
            <p>黑暗 獵奇</p>
          </div> -->
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
    margin-right: -15%;
    margin-top: 0px;
  }
}
.swiper {
  width: 100%;
  padding: 0 60px;
  overflow: unset;

  .swiper-wrapper {
    .swiper-slide {
      position: relative;
      border-radius: 5px;
      overflow: hidden;
      transition: ease 0.3s;
      &:hover {
        // transform: scale(1.3);
        // z-index: 10;
        // transform-origin: left;

        // .info {
        //   display: block;
        // }
      }

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

      .info {
        display: none;
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
