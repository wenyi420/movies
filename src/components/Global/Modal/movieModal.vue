<script setup>
import { ref, watch } from "vue";
import PlayIcon from "@/components/Icon/play.vue";
import CheckMark from "@/components/Icon/checkMark.vue";
import Plus from "@/components/Icon/plus.vue";
import ThumbUp from "@/components/Icon/thumbUp.vue";

import PopupModal from "@/components/Global/Modal/popupModal.vue";
import noImg from "@/assets/image/noImg.svg";
import movieImg from "@/assets/image/LoginedMovieSlideImgBox.png";
import { i18n } from "@/i18n/config.js";

import { storeToRefs } from "pinia";
import { useMovieModalStore } from "@/stores/movieModal.js";
import { useUserStore } from "@/stores/user.js";

import {
  addToMyMovieHandle,
  removeToMyMovieHandle,
} from "@/common/movieHandle.js";

const movieModalStore = useMovieModalStore();
const { isShow, data } = storeToRefs(movieModalStore);

const store = useUserStore();

let userMovies;
watch(isShow, (v) => {
  if (v) {
    userMovies = store.getUserMovies();
    setMovieData();
    checkIsAddedToMyMovies();
    INITSimilarMovies();
    showModalHandler();
  }
});

const modal = ref(null);
const movieData = ref({});

console.log("movie data", data);

const isAddedMovie = ref(false);

function showModalHandler() {
  modal.value?.showModalHandler();
}

function setMovieData() {
  movieData.value = data.value;
}

function checkIsAddedToMyMovies() {
  isAddedMovie.value = userMovies.find((id) =>
    id.toString().includes(movieData.value.id)
  )
    ? true
    : false;
}

function INITSimilarMovies() {
  movieData.value.similarMovies.forEach((item) => {
    item.isAddedMovie = isSimilarAddedMovie(item.id);
  });
}

function isSimilarAddedMovie(similarID) {
  let isFind = userMovies.find((id) => id.toString().includes(similarID));
  return isFind ? true : false;
}

function getFirstSentence(info) {
  if (info) {
    let result = "";
    const MAX_LENGTH = 65;
    let searchText;
    if (i18n.global.locale === "zh-TW") {
      searchText = "。";
    }
    if (i18n.global.locale === "en") {
      searchText = ".";
    }
    result = info.split(searchText)[0];
    if (result.length > MAX_LENGTH) {
      return (result = result.substr(0, MAX_LENGTH) + "...");
    }

    return result + searchText;
  }
  return "";
}

function getMovieScore(score) {
  return (score * 10).toFixed(0);
}

const addToMyMovies = async () => {
  let id = movieData.value.isNetflix
    ? "n" + movieData.value.id
    : movieData.value.id; // 針對 neflix 需額外 api 搜索處理 避免myMovies api 查不到
  let isAdded = await addToMyMovieHandle(id);
  isAddedMovie.value = isAdded ? true : false;
};

const removeToMyMovies = async () => {
  let isRemove = await removeToMyMovieHandle(movieData.value.id);
  isAddedMovie.value = isRemove ? false : true;
};

const addSimilarMovieToMyMovie = async (item) => {
  let similarMovieID = item.id;
  let isAdded = await addToMyMovieHandle(similarMovieID);
  item.isAddedMovie = isAdded ? true : false;
};
const removeSimilarMovieToMyMovie = async (item) => {
  let similarMovieID = item.id;
  let isRemove = await removeToMyMovieHandle(similarMovieID);
  item.isAddedMovie = isRemove ? false : true;
};

defineExpose({
  showModalHandler,
  setMovieData,
});
</script>

<template>
  <!-- 封裝 movie modal 內容呈現規格 -->
  <div class="movie-modal">
    <PopupModal ref="modal">
      <template #body>
        <div v-if="movieData.name">
          <div class="img-wrapper">
            <div
              class="img-bg"
              :style="{
                'background-image':
                  'url(' +
                  'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/' +
                  movieData.backdrop_path +
                  ')',
              }"
            ></div>
            <div class="img-wrapper-info">
              <div class="title">
                {{ movieData.name }}
              </div>
              <div class="img-wrapper-btns">
                <div class="movie-btn play">
                  <div>
                    <span class="movie-btn-icon">
                      <PlayIcon />
                    </span>
                    <span class="movie-btn-text">播放</span>
                  </div>
                </div>
                <!-- 新增至我的片單 -->
                <div
                  class="infoIcon-btn"
                  v-show="!isAddedMovie"
                  @click="addToMyMovies"
                >
                  <Plus />
                </div>
                <!-- 從我的片單移除 -->

                <div
                  v-show="isAddedMovie"
                  class="infoIcon-btn"
                  @click="removeToMyMovies"
                >
                  <CheckMark />
                </div>
                <div class="infoIcon-btn">
                  <ThumbUp />
                </div>
              </div>
            </div>
            <div class="img-wrapper-mask"></div>
          </div>
          <div class="movie-modal-info">
            <div class="match-score">
              {{ getMovieScore(movieData.vote_average) }}% 適合你
            </div>
            <div class="desc">{{ getFirstSentence(movieData.overview) }}</div>
          </div>
          <div class="similarMovies">
            <h3 class="title">類似影片</h3>
            <div class="similarMovies-list">
              <div
                class="similarMovies-item"
                v-for="item in movieData.similarMovies"
                :key="item.id"
              >
                <div class="similarMovies-img-wrapper">
                  <div
                    class="img-bg"
                    :style="{
                      'background-image':
                        'url(' +
                        'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/' +
                        item.backdrop_path +
                        ')',
                    }"
                  >
                    <img v-if="item.backdrop_path" :src="movieImg" alt="" />
                    <img v-else :src="noImg" alt="" />
                  </div>
                </div>
                <div class="similarMovies-item-info">
                  <div class="similarMovies-item-header">
                    <div class="left">
                      <div class="title">{{ item.title }}</div>
                      <div class="match-score">
                        {{ getMovieScore(item.vote_average) }}% 適合你
                      </div>
                    </div>
                    <div class="right">
                      <!-- 新增至我的片單 -->
                      <div
                        class="infoIcon-btn"
                        v-show="!item.isAddedMovie"
                        @click="addSimilarMovieToMyMovie(item)"
                      >
                        <Plus />
                      </div>
                      <!-- 從我的片單移除 -->
                      <div
                        v-show="item.isAddedMovie"
                        class="infoIcon-btn"
                        @click="removeSimilarMovieToMyMovie(item)"
                      >
                        <CheckMark />
                      </div>
                    </div>
                  </div>

                  <div class="desc">{{ getFirstSentence(item.overview) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </PopupModal>
  </div>
</template>

<style lang="scss">
.movie-modal {
  .modal {
    width: 50%;
    background-color: var(--color-background);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
    @media screen and (max-width: 1440px) {
      width: 70%;
    }
    @media screen and (max-width: 768px) {
      width: 95%;
    }
    h1 {
      color: var(--color-text) !important;
    }
    color: var(--color-text);
  }
}
</style>

<style lang="scss" scoped>
.img-wrapper {
  position: relative;
  width: 100%;
  height: 50vh;
  .img-bg {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .img-wrapper-info {
    position: absolute;
    left: 3rem;
    bottom: 10%;
    z-index: 10;
    width: 65%;

    @media screen and (max-width: 1024px) {
      left: 2rem;
    }
    @media screen and (max-width: 480px) {
      left: 1rem;
      width: 90%;
    }
  }
  .title {
    font-size: 2.5vw;
    text-shadow: 1px 1px 8px rgb(0 0 0 / 80%);
    @media screen and (max-width: 768px) {
      font-size: 24px;
    }
    @media screen and (max-width: 480px) {
      font-size: 20px;
    }
  }
  .img-wrapper-btns {
    display: flex;
    align-items: center;
    .movie-btn {
      display: inline-block;
      padding: 4.5px 31.5px;
      border-radius: 5px;
      margin-right: 10px;
      cursor: pointer;

      &.play {
        background: #fff;
        color: #000;

        &:hover {
          background: rgba(255, 255, 255, 0.75);
        }
      }
      &.info {
        background: rgba(109, 109, 110, 0.8);
        color: #fff;
        &:hover {
          background: rgba(109, 109, 110, 0.6);
        }
      }

      > div {
        display: flex;
        align-items: center;
      }
      .movie-btn-icon {
        display: flex;
        align-items: center;
        margin-right: 15px;

        svg {
          width: 34px;
          height: 34px;
        }
      }
      .movie-btn-text {
        font-size: 23px;
        font-weight: bold;
      }

      @media screen and (max-width: 480px) {
        padding: 4px 12px;
        .movie-btn-icon {
          margin-right: 5px;

          svg {
            width: 24px;
            height: 24px;
          }
        }
        .movie-btn-text {
          font-size: 16px;
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
      margin-right: 10px;
      cursor: pointer;

      &.play {
        background-color: #fff;
        color: #000;
      }

      svg {
        width: 24px;
        height: 24px;
      }

      @media screen and (max-width: 480px) {
        width: 32px;
        height: 32px;
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .img-wrapper-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(to top, #181818, transparent 50%);
  }
}
.movie-modal-info {
  padding: 1rem 3rem;
  width: 70%;
  .match-score {
    color: #46d369;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 16px;
  }
  .desc {
    font-size: 16px;
  }
  @media screen and (max-width: 1024px) {
    padding: 1rem 2rem;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    padding: 1rem;
  }
}
.similarMovies {
  padding: 0rem 3rem 1rem;

  .similarMovies-list {
    display: grid;
    grid-template-columns: 33.33333% 33.33333% 33.33333%;
    margin: -10px;
  }

  h3.title {
    font-weight: 700;
    font-size: 28px;
    margin-top: 48px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 1024px) {
    padding: 0rem 2rem 1rem;
    .similarMovies-list {
      grid-template-columns: 50% 50%;
    }
  }
  @media screen and (max-width: 480px) {
    padding: 1rem;
    h3.title {
      margin-top: 18px;
    }
  }
}

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
  .img-wrapper .title {
    color: #fff !important;
  }
  .img-wrapper-mask {
    background: linear-gradient(to top, #f3f3f3, transparent 50%) !important;
  }

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
