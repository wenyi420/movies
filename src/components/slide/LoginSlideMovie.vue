<script setup>
import { ref, nextTick, onUpdated, onUnmounted, getCurrentInstance } from "vue";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { apiGetPopularMovie, apiGetNexflix } from "@/apis/movie.js";
import { useRouter } from "vue-router";
import noImg from "@/assets/image/noImg.jpg";
import movieImg from "@/assets/image/LoginedMovieSlideImgBox.png";
import renderComponent from "@/renderComponent";

const router = useRouter();
const movies = ref([]);
const props = defineProps(["tag"]);
const isNetflix = props.tag === "213" ? true : false;
let hoverTimer = null;

getMovies();

let swiper;
const swiperEl = ref(null);
const slideNext = ref(null);
const slidePrev = ref(null);
const swiperWrapper = ref(null);

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

let destroyComp = null;
onUnmounted(() => destroyComp?.());

onUpdated(() => {
  movieSlidesBindHoverEvent();
});

function movieSlidesBindHoverEvent() {
  let wrapper = swiperWrapper.value;
  // 為了抓取到 swiper loop 自己生成的元素，透過 nextTick 後再抓取 dom 添加 eventlistener
  nextTick(() => {
    let slides = wrapper.querySelectorAll(".swiper-slide");
    slides.forEach((item) => {
      item.addEventListener("mouseover", mouseoverHandler);
      item.addEventListener("mouseleave", mouseLeaveHandler);
    });
  });

  document.body.addEventListener("mouseover", checkIsHovered);
}

function mouseoverHandler(e) {
  hoverTimer = setTimeout(() => {
    const parent = e.target.parentElement;
    if (parent?.dataset?.swiperSlideIndex) {
      let index = parent.dataset.swiperSlideIndex;
      let movie = movies.value[index];
      const { x, y, width, height } = getCoords(e.target, "center");

      const bodyWidth = document.body.getBoundingClientRect()?.width;
      createPreviewMovieModal({
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

function checkIsHovered(e) {
  let el = e.target;
  let target = document.querySelector("#triggerModal");
  if (!target) return;

  if (el !== target && !target.contains(e.target)) {
    let previewWrapper = target.querySelector(".previewMovie-wrapper");
    if (previewWrapper) {
      previewWrapper.classList.remove("active");
      setTimeout(() => {
        destroyComp?.();
      }, 295);
    }
  }
}
const { appContext } = getCurrentInstance();
const createPreviewMovieModal = async (data) => {
  destroyComp?.();
  destroyComp = renderComponent({
    el: "#triggerModal",
    component: (await import("@/components/slide/previewSlideMovie.vue"))
      .default,
    props: {
      key: data.movie.id,
      movie: data.movie,
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

    /**
     * adult: false
        backdrop_path: "/gUNRlH66yNDH3NQblYMIwgZXJ2u.jpg"
        genre_ids: (3) [14, 28, 12]
        id: 453395
        original_language: "en"
        original_title: "Doctor Strange in the Multiverse of Madness"
        overview: "漫威將開拓多元宇宙，漫威宇宙第四階段公開《奇異博士》續集。藉由電影、影集、動畫所呈現的多重宇宙世界觀，將整個故事格局進一步擴大。  劇情描述，多重宇宙正式開啟，世界變得加倍危險。  熟知的一切邏輯都將被打破……最強至尊法師聯手最強女巫，是否有機會拯救世界？"
        popularity: 2707.539
        poster_path: "/xSNSQSuzEsVIVMDlcsfK9gw7GQC.jpg"
        release_date: "2022-05-04"
        title: "奇異博士2：失控多重宇宙"
        video: false
        vote_average: 7.4
        vote_count: 2238
     */

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

    // 待 dom 更新後才 setLazyLoad 避免查無 dom el 導致 setLazy 無效
    await nextTick();
    INITswiper();
    setLazyLoad();
  });
}

function setLazyLoad() {
  const imgs = swiperEl.value.querySelectorAll("a.movie-item");
  const option = {
    root: document.querySelector(".main-swiper-wrapper"),
    rootMargin: "100px",
  };
  const observer = new IntersectionObserver((nodes) => {
    nodes.forEach((v) => {
      // 進入可視區域才加載
      if (v.isIntersecting) {
        let bgImg;
        if (v.target.dataset.src) {
          bgImg = `url(https://image.tmdb.org/t/p/w300${v.target.dataset.src})`;
        } else {
          bgImg = `url(${noImg})`;
        }
        v.target.style.backgroundImage = bgImg;

        // 避免 skeleton 動畫還沒運作而直接關閉，導致畫面閃爍
        setTimeout(() => {
          v.target.classList.add("active");
        }, 800);
        observer.unobserve(v.target); // 停止監聽已加載圖片
      }
    });
  }, option);
  imgs.forEach((v) => observer.observe(v));
}

function getCoords(element, position) {
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
  return point;
}
</script>

<template>
  <div class="slide-content">
    <div class="swiper" ref="swiperEl">
      <div class="swiper-wrapper" ref="swiperWrapper">
        <!-- Slides -->
        <div class="swiper-slide" :key="index" v-for="(movie, index) in movies">
          <a class="movie-item" :data-src="movie.url">
            <!-- 當進入  Intersection Observer API 後，透過 js 添加此 style 
              :style="{
              'background-image':
                'url(https://image.tmdb.org/t/p/w300' + movie.url + ')',
              }" 
            -->
            <img :src="movieImg" alt="" />
          </a>
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

          background: var(--skeleton-bg);
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
