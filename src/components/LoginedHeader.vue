<script setup>
import { useRouter } from "vue-router";
import switchAppearance from "@/components/switch-appearance.vue";
import { onMounted, ref } from "@vue/runtime-core";
import profilePic from "@/assets/image/profilePic.png";

const router = useRouter();

function toHomePage() {
  router.push("/");
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
      <span class="mb-logo" @click="toHomePage">
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
      </span>
      <a-space :size="25">
        <a>首頁</a>
        <a>我的片單</a>
      </a-space>
    </div>
    <div class="right">
      <a-space :size="15">
        <div class="searchBox">
          <div class="searchBox-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="search-icon"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13 11C13 13.7614 10.7614 16 8 16C5.23858 16 3 13.7614 3 11C3 8.23858 5.23858 6 8 6C10.7614 6 13 8.23858 13 11ZM14.0425 16.2431C12.5758 17.932 10.4126 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 11.9287 15.8417 12.8205 15.5507 13.6497L24.2533 18.7028L22.7468 21.2972L14.0425 16.2431Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        <div class="switch-styleMode">
          <switchAppearance />
        </div>
        <div class="account-dropdown-button">
          <div class="account-img">
            <img :src="profilePic" alt="" />
          </div>
          <span class="arrow-icon"></span>
        </div>
      </a-space>
    </div>
  </header>
</template>

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
  padding: 21px 3%;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );
  color: var(--color-text);
  .right {
    font-size: 13px;

    .account-dropdown-button {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;

      .account-img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
      }
      .arrow-icon {
        margin-left: 10px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 5px 0 5px;
        border-color: #fff transparent transparent transparent;
        transition: transform 367ms cubic-bezier(0.21, 0, 0.07, 1);
      }
    }
  }
  .left {
    display: flex;
    align-items: center;
    a {
      color: #fff;
    }
    .logo,
    .mb-logo {
      fill: var(--color-main);
      cursor: pointer;
      margin-right: 50px;
    }
    .mb-logo {
      display: none;
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
  background: rgb(20, 20, 20);
  position: fixed;
}

body.b-transition header {
  transition: color 0.5s, background-color 0.5s;
}

@media screen and (max-width: 1024px) {
  header {
    background-color: rgba(0, 0, 0, 0.75);
  }
  .light header {
    background-color: rgba(255, 255, 255, 0.8);
  }
}

@media screen and (max-width: 580px) {
  header {
    justify-content: flex-end;

    .left {
      position: absolute;
      left: 3%;
      .logo {
        display: none;
      }
      .mb-logo {
        display: block;
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .header-text {
    display: none;
  }
}
</style>
