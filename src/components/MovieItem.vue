<script setup>
import {
  defineProps,
  onMounted,
  onBeforeUnmount,
  ref,
  getCurrentInstance,
} from "vue";
import SkeletonItem from "@/components/SkeletonItem.vue";
import movieImg from "@/assets/image/LoginedMovieSlideImgBox.png";
import renderComponent from "@/renderComponent";
import { getCoords } from "@/utils.js";

const props = defineProps({
  movie: Object,
});

const movieItem = ref(null);
let preiveEl;
let hoverTimer = null;
let destroyComp = null;

onMounted(() => {
  createPreviewElement();
  bindHoverPreiveEvent();
});

onBeforeUnmount(() => {
  destroyComp?.();
  removeBindEvent();
});

function createPreviewElement() {
  const id = "previewModal";
  const target = document.getElementById(id);
  if (target) return (preiveEl = target);

  const root = document.getElementById("app");
  preiveEl = document.createElement("div");
  preiveEl.id = id;
  root.appendChild(preiveEl);
}

function bindHoverPreiveEvent() {
  movieItem.value.addEventListener("mouseover", mouseoverHandler);
  movieItem.value.addEventListener("mouseleave", mouseLeaveHandler);

  document.body.addEventListener("mouseover", checkIsHovered);
}

function mouseoverHandler(e) {
  hoverTimer = setTimeout(() => {
    const { x, y, width, height } = getCoords(e.target, "center");

    const bodyWidth = document.body.getBoundingClientRect()?.width;
    createPreviewMovieModal({
      x,
      y,
      width,
      height,
      movie: props.movie,
      // 處理 slide 前後 sacle 時往左放大與往右放大
      isFirstItem: x - width < 0,
      isLastItem: x + width > bodyWidth,
    });
  }, 500);
}
function mouseLeaveHandler() {
  clearTimeout(hoverTimer);
}

function checkIsHovered(e) {
  let el = e.target;
  if (!preiveEl) return;

  if (el !== preiveEl && !preiveEl.contains(e.target)) {
    let previewWrapper = preiveEl.querySelector(".previewMovie-wrapper");
    if (previewWrapper) {
      previewWrapper.classList.remove("active");
      setTimeout(() => {
        destroyComp?.();
      }, 300);
    }
  }
}

function removeBindEvent() {
  document.body.removeEventListener("mouseover", checkIsHovered);
  movieItem.value.removeEventListener("mouseover", mouseoverHandler);
  movieItem.value.removeEventListener("mouseleave", mouseLeaveHandler);
}

const { appContext } = getCurrentInstance();
const createPreviewMovieModal = async (data) => {
  destroyComp?.();
  destroyComp = renderComponent({
    el: "#previewModal",
    component: (await import("@/components/PreviewMovieItem.vue")).default,
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
</script>

<template>
  <div class="movie-item" ref="movieItem">
    <SkeletonItem :content-url="movieImg" :img-url="movie.url" />
  </div>
</template>

<style>
#previewModal {
  position: absolute;
  z-index: 10;
  transform: translate(-50%, -50%);
}
</style>
