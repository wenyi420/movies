<script setup>
import { defineProps, onMounted, ref } from "vue";
import noImg from "@/assets/image/noImg.svg";

const props = defineProps({
  contentUrl: String, // 預設 skeleton 大小
  imgUrl: String, // 實際替換的圖
  keepLoading: {
    type: Boolean,
    default: false,
  },
});

const skeletonItem = ref(null);

onMounted(() => {
  if (props.keepLoading) return;
  setLazyLoad();
});

function setLazyLoad() {
  const img = skeletonItem.value;
  const option = {
    // 進入畫面前的y軸 150px 即可顯示
    rootMargin: "-150px 0px 150px 0px",
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
  observer.observe(img);
}
</script>

<template>
  <a ref="skeletonItem" class="skeleton-item" :data-src="imgUrl">
    <img :src="contentUrl" alt="" />
  </a>
</template>

<style lang="scss" scoped>
.skeleton-item {
  display: block;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  img {
    position: relative;
    z-index: -1; // 呈現背景圖用
    width: 100%;
    height: auto;
    visibility: hidden; // 避免顯示圖片文字
  }

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

.skeleton-item.active {
  &::before {
    display: none;
  }
  &::after {
    display: none;
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
</style>
