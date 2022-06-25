<script setup>
import { ref, nextTick, onUpdated, onUnmounted, getCurrentInstance } from "vue";
import { useUserStore } from "@/stores/user.js";
import { apiGetMovieDetail } from "@/apis/movie.js";
import noImg from "@/assets/image/noImg.jpg";
import movieImg from "@/assets/image/LoginedMovieSlideImgBox.png";
import renderComponent from "@/renderComponent";
import MovieModal from "@/components/Home/movieModal.vue";

const store = useUserStore();
const movies = store.getUserMovies();
let hoverTimer = null;

const movieList = ref([]);

if (movies && movies.length) {
  console.log("movies", movies);
  let promiseArr = [];
  // movies: [123456, 234576]
  movies.forEach((id) => {
    let p = apiGetMovieDetail(id);
    promiseArr.push(p);
  });

  Promise.all(promiseArr).then(async (values) => {
    let result = [];
    values.forEach((v) => {
      result.push(v.data);
    });

    console.log("result", result);

    movieList.value = result.map((d) => {
      return {
        id: d.id,
        //   url: d.poster_path,
        url: d.backdrop_path, // 改長寬的圖
        title: d.title ? d.title : d.name,
        score: d.vote_average,
        movie: d,
      };
    });

    await nextTick();
    setLazyLoad();
  });
}

const moviesEl = ref(null);
function setLazyLoad() {
  const imgs = moviesEl.value.querySelectorAll("a.movie-item");
  const option = {
    root: document.querySelector(".myMovies-wrapper"),
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

let destroyComp = null;
onUnmounted(() => destroyComp?.());

onUpdated(() => {
  movieSlidesBindHoverEvent();
});

function movieSlidesBindHoverEvent() {
  let wrapper = moviesEl.value;
  // 為了抓取到 swiper loop 自己生成的元素，透過 nextTick 後再抓取 dom 添加 eventlistener
  nextTick(() => {
    let movies = wrapper.querySelectorAll(".movies-list");
    movies.forEach((item) => {
      item.addEventListener("mouseover", mouseoverHandler);
      item.addEventListener("mouseleave", mouseLeaveHandler);
    });
  });

  document.body.addEventListener("mouseover", checkIsHovered);
}

function mouseoverHandler(e) {
  hoverTimer = setTimeout(() => {
    const parent = e.target.parentElement;
    if (parent?.dataset?.movieIndex) {
      let index = parent.dataset.movieIndex;
      let movie = movieList.value[index];
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
  <div class="myMovies-wrapper">
    <div class="myMovies-wrapper-title">
      <h3>我的片單</h3>
    </div>
    <div class="movies-content" ref="moviesEl">
      <!-- Slides -->
      <div
        class="movies-list"
        :key="index"
        v-for="(movie, index) in movieList"
        :data-movie-index="index"
      >
        <a class="movie-item" :data-src="movie.url">
          <img :src="movieImg" alt="" />
        </a>
      </div>
    </div>

    <!-- 負責呈現 hover preview -->
    <div id="triggerModal" ref="triggerModal"></div>

    <MovieModal ref="modal" />
  </div>
</template>

<style lang="scss" scoped>
.myMovies-wrapper {
  min-height: 100vh;
  width: 100%;
  padding: 0 60px;
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
}
.movies-content {
  display: grid;
  grid-template-columns: 16.66665% 16.66665% 16.66665% 16.66665% 16.66665% 16.66665%;
  margin: -5px;
  .movies-list {
    margin: 5px;
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
  .movies-content {
    .movies-list {
      border-radius: 5px;
    }
  }
}
</style>