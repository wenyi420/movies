<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "@vue/runtime-core";
import SwitchAppearance from "@/components/Global/switch-appearance.vue";
import SearchMovie from "@/components/Global/Header/searchMovie.vue";
import AccountButton from "@/components/Global/Header/accountButton.vue";

const router = useRouter();

function toHomePage() {
  router.push("/");
}

function toMyMovies() {
  router.push("/myMovies");
}

function goToLogin() {
  router.push("/login");
}

function goToRegister() {
  router.push("/register");
}

const hasScrolled = ref(false);
function checkScrolling() {
  window.addEventListener("scroll", () => {
    let scroll = document.body.getBoundingClientRect().top;
    hasScrolled.value = scroll < 0 ? true : false;
  });
}

onMounted(() => {
  checkScrolling();
});
</script>

<template>
  <header class="isLogined" :class="{ active: hasScrolled }">
    <div class="left">
      <span class="logo" @click="toHomePage"
        ><svg
          viewBox="0 0 111 30"
          class="svg-icon svg-icon-netflix-logo"
          aria-hidden="true"
          focusable="false"
        >
          <g id="netflix-logo">
            <path
              d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
              id="Fill-14"
            ></path>
          </g></svg
      ></span>
      <!-- <span class="mb-logo" @click="toHomePage">
        <svg
          class="svg-icon svg-icon-n-logo"
          focusable="false"
          viewBox="225 0 552 1000"
          aria-hidden="true"
        >
          <defs>
            <radialGradient
              id="1e66cd89-3516-4d2d-a3c5-630f8f11feca-a"
              r="75%"
              gradientTransform="matrix(.38 0 .5785 1 .02 0)"
            >
              <stop offset="60%" stop-opacity=".3"></stop>
              <stop offset="90%" stop-opacity=".05"></stop>
              <stop offset="100%" stop-opacity="0"></stop>
            </radialGradient>
          </defs>
          <path d="M225 0v1000c60-8 138-14 198-17V0H225" fill="#b1060e"></path>
          <path d="M579 0v983c71 3 131 9 198 17V0H579" fill="#b1060e"></path>
          <path
            d="M225 0v200l198 600V557l151 426c76 3 136 9 203 17V800L579 200v240L423 0H225"
            fill="url(#1e66cd89-3516-4d2d-a3c5-630f8f11feca-a)"
          ></path>
          <path
            d="M225 0l349 983c76 3 136 9 203 17L423 0H225"
            fill="#e50914"
          ></path>
        </svg>
      </span> -->
      <a-space :size="25">
        <a class="homeLink" @click="toHomePage">首頁</a>
        <a class="myMovies" @click="toMyMovies">我的片單</a>
      </a-space>
    </div>
    <div class="right">
      <a-space :size="15">
        <SearchMovie />
        <SwitchAppearance />
        <AccountButton />
      </a-space>
    </div>
  </header>
</template>
<style lang="scss">
@media screen and (max-width: 480px) {
  header.isLogined {
    .left {
      .ant-space {
        gap: 0 !important;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Akshar&display=swap");

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 3%;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );
  color: var(--v-white);
  .right {
    font-size: 13px;
  }
  .left {
    display: flex;
    align-items: center;
    a {
      color: var(--v-white);
    }
    .logo {
      fill: var(--color-main);
      cursor: pointer;
      margin-right: 50px;
    }

    .svg-icon-netflix-logo {
      display: block;
      width: 93px;
    }
  }
  // .ant-switch-checked {
  //   background-color: var(--color-background) !important;
  //   border: 1px solid rgb(84 84 84 / 65%) !important;
  // }
}

header.active {
  top: 0px;
  background: var(--header-logined-bg);
  position: fixed;
  color: var(--color-text);
  .left {
    a {
      color: var(--color-text);
    }
  }
}

body.b-transition header {
  transition: color 0.5s, background-color 0.5s;
}

@media screen and (max-width: 1024px) {
  header {
    background-color: rgba(0, 0, 0, 0.75);
  }
  .header-text {
    display: none;
  }
  .light header {
    background-color: rgba(255, 255, 255, 0.8);
  }
}
@media screen and (max-width: 768px) {
  header {
    padding: 8px 3%;
    .left {
      .logo {
        margin-right: 15px;
      }
      .svg-icon-netflix-logo {
        width: 60px;
      }
    }
  }
}
@media screen and (max-width: 580px) {
  header {
    justify-content: flex-end;
    padding: 10px 3%;
    .left {
      position: absolute;
      left: 3%;

      .homeLink {
        display: none;
      }
    }
  }
}
</style>
