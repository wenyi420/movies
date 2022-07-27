<script setup>
import { defineProps} from "vue";
import noImg from "@/assets/image/noImg.svg";
import movieImg from "@/assets/image/LoginedMovieSlideImgBox.png";
import CheckMark from "@/components/Icon/checkMark.vue";
import Plus from "@/components/Icon/plus.vue";

import {
  addToMyMovieHandle,
  removeToMyMovieHandle,
  getFirstSentence,
  getMovieScore,
} from "@/common/movieHandle.js";

const props = defineProps({
  movie: Object,
});


async function addToMyMovie(item) {
  let isAdded = await addToMyMovieHandle(item.id);
  item.isAddedMovie = isAdded ? true : false;
};
async function removeToMyMovie(item) {
  let isRemove = await removeToMyMovieHandle(item.id);
  item.isAddedMovie = isRemove ? false : true;
};
</script>

<template>
  <div class="similarMovies-item">
    <div class="similarMovies-img-wrapper">
      <div
        class="img-bg"
        :style="{
          'background-image':
            'url(' +
            'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/' +
            movie.backdrop_path +
            ')',
        }"
      >
        <img v-if="movie.backdrop_path" :src="movieImg" alt="" />
        <img v-else :src="noImg" alt="" />
      </div>
    </div>
    <div class="similarMovies-item-info">
      <div class="similarMovies-item-header">
        <div class="left">
          <div class="title">{{ movie.title }}</div>
          <div class="match-score">
            {{ getMovieScore(movie.vote_average) }}% 適合你
          </div>
        </div>
        <div class="right">
          <!-- 新增至我的片單 -->
          <div
            class="infoIcon-btn"
            v-show="!movie.isAddedMovie"
            @click="addToMyMovie(movie)"
          >
            <Plus />
          </div>
          <!-- 從我的片單移除 -->
          <div
            v-show="movie.isAddedMovie"
            class="infoIcon-btn"
            @click="removeToMyMovie(movie)"
          >
            <CheckMark />
          </div>
        </div>
      </div>

      <div class="desc">{{ getFirstSentence(movie.overview) }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.similarMovies-item {
  margin: 10px;
  background: #2f2f2f;
  border-radius: 5px;
  overflow: hidden;

  .similarMovies-img-wrapper {
    width: 100%;
    img {
      position: relative;
      z-index: -1; // 呈現 movie-item 背景圖用
      width: 100%;
      height: auto;
      visibility: hidden; // 避免顯示圖片文字
    }

    .img-bg {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
  .similarMovies-item-info {
    padding: 20px 15px;
  }

  @media screen and (max-width: 480px) {
    .similarMovies-item-info {
      padding: 12px;
    }
  }
}

.similarMovies-item-header {
  position: relative;

  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .match-score {
    color: #46d369;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 16px;
  }
  .left {
    width: calc(100% - 55px);
  }
  .right {
    position: absolute;
    right: 0;
    top: 0;
  }
  @media screen and (max-width: 480px) {
    .left {
      width: 100%;
    }
    .right {
      position: inherit;
      margin-bottom: 8px;
    }
  }
}
.infoIcon-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid;
  background-color: rgba(42, 42, 42, 0.6);
  border-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.play {
    background-color: #fff;
    color: #000;
  }

  svg {
    width: 24px;
    height: 24px;
  }
  @media screen and (max-width: 1440px) {
    width: 34px;
    height: 34px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
}

.light {
  .infoIcon-btn {
    background-color: #fff !important;
    border-color: var(--border-color) !important;
    color: var(---color-tex) !important;
  }

  .similarMovies-item {
    background: #fff !important;
    border: 1px solid var(--border-color);
  }
}
</style>
