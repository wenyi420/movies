<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSearchStore } from "@/stores/search.js";
import { storeToRefs } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faL, faXmark } from "@fortawesome/free-solid-svg-icons";
library.add(faXmark);

const router = useRouter();
const route = useRoute();

const searchWapprer = ref(null);
const showSearchBox = ref(false);
const showSearchInput = ref(false);
const showCloseButton = ref(false);
const searchInput = ref("");
const vInput = ref(null);
const searchTimer = ref(null);

const searchStore = useSearchStore();
const { searchText } = storeToRefs(searchStore);

watch(searchInput, (v) => {
  if (v) {
    showCloseButton.value = true;
    router.push("/search");
    searchHandle();
  } else {
    showCloseButton.value = false;
    searchText.value = v;
    // 處理返回頁面 如無上一頁則回首頁
    goBackHandle();
  }
});

function searchHandle() {
  if (searchTimer.value) {
    clearTimeout(searchTimer.value);
  }
  // 搜索間隔，避免頻繁輸入
  searchTimer.value = setTimeout(() => {
    searchText.value = searchInput.value;
  }, 1000);
}

function showSearchInputHandle() {
  showSearchBox.value = true;
  setTimeout(() => {
    showSearchInput.value = true;
    vInput.value.focus();
    addSearchListener();
  }, 10);
}

// todo 做成 mixin clickOutside Function
function checkClickOutSide(e) {
  console.log("e.target", e.target);
  console.log("searchWapprer.value", searchWapprer.value);
  let el = e.target;

  let isClickOutSide =
    el !== searchWapprer.value && !searchWapprer.value.contains(el);

  if (isClickOutSide) {
    console.log("route.path", route.path);
    let isSearchPage = route.path.includes("search") ? true : false;
    if (isSearchPage && searchInput.value) return;

    hideSearchInputHandle();
  }
}

function clearSearch() {
  searchInput.value = "";
  hideSearchInputHandle();
}

function hideSearchInputHandle() {
  showSearchInput.value = false;
  searchInput.value = "";

  // 等 ease .3s 效果結束執行
  setTimeout(() => {
    showSearchBox.value = false;
    removeSearchListener();
    goBackHandle();
  }, 250);
}

const body = document.body;
function addSearchListener() {
  body.addEventListener("click", checkClickOutSide);
}
function removeSearchListener() {
  body.removeEventListener("click", checkClickOutSide);
}

function goBackHandle() {
  if (!route.path.includes("search")) return;

  if (!window.history.state.back) {
    router.push("/");
  } else {
    router.go(-1);
  }
}
</script>

<template>
  <div ref="searchWapprer" class="search-wrapper">
    <div
      class="search-icon"
      v-show="!showSearchBox"
      @click="showSearchInputHandle"
    >
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
    <div
      class="search-box"
      v-show="showSearchBox"
      :class="{ active: showSearchInput }"
    >
      <div class="search-icon">
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
      <input
        class="search-input"
        ref="vInput"
        v-model="searchInput"
        type="text"
        placeholder="電影"
      />
      <font-awesome-icon
        icon="xmark"
        class="close-icon"
        @click="clearSearch"
        v-show="showCloseButton"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-box {
  display: flex;
  align-items: center;
  padding: 2px 10px;
  border: 1px solid var(--search-input-border);
  background: var(--header-bg);
  position: relative;
  transition: ease 0.3s;

  .search-input {
    background: transparent;
    border: transparent;
    outline: none;
    display: inline-block;
    margin-left: 8px;
    margin-right: 16px;
    width: 0px;
    transition: ease 0.3s;
  }
  .close-icon {
    color: var(--color-text);
    position: absolute;
    right: 8px;
    font-size: 22px;
  }
  .search-icon {
    color: #fff;
  }
  &.active {
    .search-input {
      width: 190px;
      color: var(--color-text);
    }
    .search-icon {
      color: var(--color-text);
    }
  }
}

@media screen and (max-width: 480px) {
  .search-box {
    &.active {
      .search-input {
        width: calc(100% - 20px - 24px);
      }
    }
  }
}
</style>
