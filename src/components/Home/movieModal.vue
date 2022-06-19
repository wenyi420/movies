<script setup>
import { ref, watch, onMounted, reactive } from "vue";
import PopupModal from "@/components/Global/Modal/popupModal.vue";
import noImg from "@/assets/image/noImg.svg";
import movieImg from "@/assets/image/LoginedMovieSlideImgBox.png";
import { i18n } from "@/i18n/config.js";

import { storeToRefs } from "pinia";
import { useMovieModalStore } from "@/stores/movieModal.js";

const movieModalStore = useMovieModalStore();
const { isShow, data } = storeToRefs(movieModalStore);

watch(isShow, (v) => {
  if (v) {
    setMovieData();
    showModalHandler();
  }
});

const modal = ref(null);
const movieData = ref({});
function showModalHandler() {
  modal.value?.showModalHandler();
}

function setMovieData() {
  movieData.value = data.value;
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
  return score * 10;
}

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
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="Hawkins-Icon Hawkins-Icon-Standard"
                      >
                        <path
                          d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    <span class="movie-btn-text">播放</span>
                  </div>
                </div>
                <div class="infoIcon-btn">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="Hawkins-Icon Hawkins-Icon-Standard"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11 2V11H2V13H11V22H13V13H22V11H13V2H11Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div class="infoIcon-btn">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="Hawkins-Icon Hawkins-Icon-Standard"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z"
                      fill="currentColor"
                    ></path>
                  </svg>
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
                      <div class="infoIcon-btn">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          class="Hawkins-Icon Hawkins-Icon-Standard"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11 2V11H2V13H11V22H13V13H22V11H13V2H11Z"
                            fill="currentColor"
                          ></path>
                        </svg>
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
