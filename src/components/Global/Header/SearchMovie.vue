<script setup>
import { ref, watch } from "vue";
import { useSearchStore } from "@/stores/search.js";
import { storeToRefs } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { routerUtils } from "@/common/routerUtils.js";
import SearchIcon from "@/components/Icon/search.vue";

library.add(faXmark);
const { toHome, toSearch, routerGoBack, getPath } = routerUtils();

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
    toSearch();
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

function checkClickOutSide(e) {
  const el = e.target;
  const isClickOutSide =
    el !== searchWapprer.value && !searchWapprer.value.contains(el);

  if (isClickOutSide) {
    const isSearchPage = getPath().includes("search") ? true : false;
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
  if (!getPath().includes("search")) return;

  if (!window.history.state.back) {
    toHome();
  } else {
    routerGoBack();
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
      <SearchIcon />
    </div>
    <div
      class="search-box"
      v-show="showSearchBox"
      :class="{ active: showSearchInput }"
    >
      <div class="search-icon">
        <SearchIcon />
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
