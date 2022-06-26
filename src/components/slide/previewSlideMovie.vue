<script>
import {
  ref,
  defineComponent,
  onUnmounted,
  onMounted,
  onBeforeUnmount,
  computed,
} from "vue";
import { apiGetPopularMovie } from "@/apis/movie.js";
import { storeToRefs } from "pinia";
import { useMovieModalStore } from "@/stores/movieModal.js";
import { useUserStore } from "@/stores/user.js";
import { apiUpdateMovies } from "@/apis/googleSheet.js";

const movieModalStore = useMovieModalStore();
const { isShow } = storeToRefs(movieModalStore);

export default defineComponent({
  name: "previewSlideMovie",
  props: {
    movie: {
      type: Object,
      required: true,
    },
    left: {
      type: Number,
      required: true,
    },
    top: {
      type: Number,
      required: true,
    },
    imgurl: {
      type: String,
      required: true,
    },
    imgbox: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    isFirstItem: {
      type: Boolean,
      required: true,
    },
    isLastItem: {
      type: Boolean,
      required: true,
    },
    // msg: {
    //   type: String,
    //   required: true,
    // },
  },
  setup(props) {
    const movieID = props.movie.movie.id;
    const isNetflix = props.movie.isNetflix;
    console.log("props.movie.movie", props.movie.movie);
    const store = useUserStore();
    let userMovies = store.getUserMovies();
    const isAddedMovie = ref(false);
    isAddedMovie.value = userMovies.find((id) =>
      id.toString().includes(movieID)
    )
      ? true
      : false;

    const count = ref(0);
    const isActive = ref(false);
    onMounted(() => {
      let triggerModal = document.querySelector("#triggerModal");
      triggerModal.style.top = props.top + "px";
      triggerModal.style.left = props.left + "px";

      setTimeout(() => {
        isActive.value = true;
      }, 20);
    });
    onBeforeUnmount(() => {
      isActive.value = false;
    });

    function getMovieScore(score) {
      return (score * 10).toFixed(0);
    }

    const similarMovies = ref([]);
    function showMovieModal() {
      let movieData = props.movie.movie;
      let genres = movieData.genre_ids ? movieData.genre_ids : movieData.genres;
      getSimilarMovies(genres);
    }

    const getSimilarMovies = (genres) => {
      if (genres && genres.length) {
        let tag = genres[0]._id;

        apiGetPopularMovie(1, tag).then((values) => {
          let data = values.data.results;
          similarMovies.value = data.filter((m) => m.id !== props.movie.id);

          let movieData = props.movie.movie;
          let reuslt = {
            name: props.movie.title,
            backdrop_path: props.imgurl,
            vote_average: props.movie.score,
            overview: movieData.overview,
            similarMovies: similarMovies.value,
            isNetflix,
            id: movieID
          };

          movieModalStore.resetMovieData(reuslt);
          isShow.value = true;
        });
      }
    };

    const addToMyMovies = async () => {
      let id = isNetflix ? "n" + movieID : movieID; // 針對 neflix 需額外 api 搜索處理 避免myMovies api 查不到
      userMovies.push(id);
      let resp = await apiUpdateMovies(userMovies);
      if (resp) {
        isAddedMovie.value = true;
      }
    };

    const removeToMyMovies = async () => {
      userMovies = userMovies.filter((id) => !id.toString().includes(movieID));
      let resp = await apiUpdateMovies(userMovies);
      if (resp) {
        isAddedMovie.value = false;
      }
    };

    return {
      count,
      isActive,
      getMovieScore,
      showMovieModal,
      isAddedMovie,
      addToMyMovies,
      removeToMyMovies,
    };
  },
});
</script>
<template>
  <div
    class="previewMovie-wrapper"
    :class="{ active: isActive, isFirstItem, isLastItem }"
  >
    <div
      class="movie-box"
      :style="{ width: width + 'px', height: height + 'px' }"
    >
      <a
        class="movie-bg"
        :style="{
          'background-image':
            'url(https://image.tmdb.org/t/p/w300' + imgurl + ')',
        }"
      >
      </a>
    </div>
    <div class="info">
      <div class="infoBtns-wrapper">
        <div class="left">
          <div class="infoIcon-btn play">
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
          </div>

          <!-- 從我的片單移除 -->
          <div
            v-show="isAddedMovie"
            @click="removeToMyMovies"
            class="infoIcon-btn"
          >
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
                d="M8.68239 19.7312L23.6824 5.73115L22.3178 4.26904L8.02404 17.6098L2.70718 12.293L1.29297 13.7072L7.29297 19.7072C7.67401 20.0882 8.28845 20.0988 8.68239 19.7312Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <!-- 新增至我的片單 -->
          <div
            class="infoIcon-btn"
            @click="addToMyMovies"
            v-show="!isAddedMovie"
          >
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
        <div class="right">
          <div class="infoIcon-btn" @click="showMovieModal">
            <!-- <font-awesome-icon icon="chevron-down" /> -->
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
                d="M19.293 7.29297L12.0001 14.5859L4.70718 7.29297L3.29297 8.70718L11.293 16.7072C11.4805 16.8947 11.7349 17.0001 12.0001 17.0001C12.2653 17.0001 12.5196 16.8947 12.7072 16.7072L20.7072 8.70718L19.293 7.29297Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="preview-info">
        <h3 class="movie-title">{{ movie.title }}</h3>
        <div class="score match-score" v-if="movie.score">
          {{ getMovieScore(movie.score) }}% 適合你
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.previewMovie-wrapper {
  position: relative;
  transition: ease 0.3s;
  transform: scale(1);
  &.isFirstItem {
    transform-origin: left;
  }
  &.isLastItem {
    transform-origin: right;
  }
  &.active {
    transform: scale(1.4);
    .info {
      opacity: 1;
    }
  }
  .movie-box {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;

    .movie-bg {
      display: block;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
    }
  }
}
.info {
  position: absolute;
  margin-top: -1px;
  z-index: 10;
  transition: ease 0.3s;
  width: 100%;
  background: var(--color-background);
  color: var(--color-text);
  opacity: 0;
  padding: 1rem;
  overflow: hidden;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: rgb(0 0 0 / 75%) 0px 6px 10px;

  .infoBtns-wrapper {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      .infoIcon-btn:not(:last-child) {
        margin-right: 5px;
      }
    }

    .infoIcon-btn {
      width: 30px;
      height: 30px;
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
        width: 18px;
        height: 18px;
      }
    }
    @media screen and (max-width: 1440px) {
      .infoIcon-btn {
        width: 24px;
        height: 24px;
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
    @media screen and (max-width: 480px) {
      .infoIcon-btn {
        width: 20px;
        height: 20px;
        svg {
          width: 12px;
          height: 12px;
        }
      }
    }
  }
  .movie-title {
    font-size: 16px;
    margin-bottom: 0 !important;
    font-weight: bold;
  }
  .match-score {
    color: #46d369;
    font-weight: bold;
    font-size: 12px;
  }
}
@media screen and (max-width: 480px) {
  .info {
    padding: 8px;
    .movie-title {
      font-size: 12px;
    }
  }
}

.light .infoIcon-btn {
  background-color: #fff !important;
  border-color: var(--border-color) !important;
  color: var(---color-tex) !important;
}
</style>
