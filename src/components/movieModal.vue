<script>
import {
  ref,
  defineComponent,
  onUnmounted,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faPlus,
  faThumbsUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
/* add icons to the library */
library.add(faPlay, faPlus, faThumbsUp, faChevronDown);

export default defineComponent({
  name: "movieModal",
  props: {
    title: {
      type: String,
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
    // msg: {
    //   type: String,
    //   required: true,
    // },
  },
  setup(props) {
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
    onUnmounted(() => console.log("unmounting title", props.title));
    onBeforeUnmount(() => {
      isActive.value = false;
    });

    return { count, isActive };
  },
});
</script>
<template>
  <div class="movieModal-wrapper" :class="{ active: isActive }">
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
          <a-space>
            <div class="infoIcon-btn">
              <font-awesome-icon icon="play" />
            </div>

            <div class="infoIcon-btn">
              <font-awesome-icon icon="plus" />
            </div>
            <div class="infoIcon-btn">
              <font-awesome-icon icon="thumbs-up" />
            </div>
            <div class="infoIcon-btn">
              <font-awesome-icon icon="chevron-down" />
            </div>
          </a-space>
        </div>
      </div>
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.movieModal-wrapper {
  position: relative;
  transition: ease 0.3s;
  transform: scale(1);
  &.active {
    transform: scale(1.2);
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
  color: #fff;
  opacity: 0;
  padding: 10px;
  overflow: hidden;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: rgb(0 0 0 / 75%) 0px 6px 10px;

  .infoBtns-wrapper {
    .infoIcon-btn {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 2px solid #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
