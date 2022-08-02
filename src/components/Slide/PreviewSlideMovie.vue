<script>
import {
  ref,
  defineComponent,
  onUnmounted,
  onMounted,
  onBeforeUnmount,
  computed,
} from "vue";
import PlayIcon from "@/components/Icon/Play.vue";
import CheckMark from "@/components/Icon/CheckMark.vue";
import Plus from "@/components/Icon/Plus.vue";
import ThumbUp from "@/components/Icon/ThumbUp.vue";
import ArrowDown from "@/components/Icon/ArrowDown.vue";
import { apiGetPopularMovie } from "@/apis/movie.js";
import { useMovieModal } from "@/composables/movieModal.js";
import { useUserStore } from "@/stores/user.js";
import {
  addToMyMovieHandle,
  removeToMyMovieHandle,
} from "@/common/movieHandle.js";

const { showMovieModal, resetMovieModalData } = useMovieModal();

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
    function showModal() {
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
            id: movieID,
          };

          resetMovieModalData(reuslt);
          showMovieModal();
        });
      }
    };

    const addToMyMovies = async () => {
      let id = isNetflix ? "n" + movieID : movieID; // 針對 neflix 需額外 api 搜索處理 避免myMovies api 查不到
      let isAdded = await addToMyMovieHandle(id);
      isAddedMovie.value = isAdded ? true : false;
    };

    const removeToMyMovies = async () => {
      let isRemove = await removeToMyMovieHandle(movieID);
      isAddedMovie.value = isRemove ? false : true;
    };

    return {
      count,
      isActive,
      getMovieScore,
      showModal,
      isAddedMovie,
      addToMyMovies,
      removeToMyMovies,
    };
  },
  components: {
    PlayIcon,
    CheckMark,
    Plus,
    ArrowDown,
    ThumbUp,
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
            <PlayIcon />
          </div>

          <!-- 從我的片單移除 -->
          <div
            v-show="isAddedMovie"
            @click="removeToMyMovies"
            class="infoIcon-btn"
          >
            <CheckMark />
          </div>
          <!-- 新增至我的片單 -->
          <div
            class="infoIcon-btn"
            @click="addToMyMovies"
            v-show="!isAddedMovie"
          >
            <Plus />
          </div>
          <div class="infoIcon-btn">
            <ThumbUp />
          </div>
        </div>
        <div class="right">
          <div class="infoIcon-btn" @click="showModal">
            <!-- <font-awesome-icon icon="chevron-down" /> -->
            <ArrowDown />
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
