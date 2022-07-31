<script setup>
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useMovieModalStore } from "@/stores/movieModal.js";
import { isMobile } from "@/utils.js";

const _isMobile = isMobile();
const modalOpenClass = _isMobile ? "mobile-modal-open" : "modal-open";

const movieModalStore = useMovieModalStore();
const { isShow } = storeToRefs(movieModalStore);

const modalContainer = ref(null);
const modal = ref(null);
const isShowModal = ref(false);

watch(isShowModal, (v) => {
  if (v) {
    document.body.classList.add(modalOpenClass);
  }
});

defineExpose({
  showModalHandler,
});

function showModalHandler() {
  addClickOutSideEvent();
  isShowModal.value = true;
}

function closeModalHandler() {
  removeClickOutSideEvent();
  isShowModal.value = false;
  isShow.value = false;

  // 等淡出動畫結束, 避免雙滾軸出現
  setTimeout(() => {
    document.body.classList.remove(modalOpenClass);
    INITModalscrollToTop();
  }, 300);
}

function addClickOutSideEvent() {
  modalContainer.value.addEventListener("click", checkClickOutSide);
}
function removeClickOutSideEvent() {
  modalContainer.value.removeEventListener("click", checkClickOutSide);
}

function checkClickOutSide(e) {
  const clickEl = e.target;
  const isClickOutSide =
    clickEl !== modal.value && !modal.value.contains(clickEl);
  if (isClickOutSide) {
    closeModalHandler();
  }
}

// 解決 modal 捲動過導致再次打開時仍是之前捲動的位置
function INITModalscrollToTop() {
  modalContainer.value.scroll({ top: 0 });
}
</script>

<template>
  <div
    class="modal-container"
    ref="modalContainer"
    :class="{ show: isShowModal }"
  >
    <div class="modal" ref="modal">
      <div class="close" @click="closeModalHandler">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="Hawkins-Icon Hawkins-Icon-Standard"
          data-uia="previewModal-closebtn"
          role="button"
          aria-label="close"
          tabindex="0"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <slot name="body">
        這是modaldefaultstesttt這是modaldefaultstesttt這是modaldefaultstesttt這是modaldefaultstesttt這是modaldefaultstesttt這是modaldefaultstesttt這是modaldefaultstesttt
        這是modaldefaultstesttt這是modaldefaultstesttt
        這是modaldefaultstesttt這是modaldefaultstesttt 這是modaldefaultstesttt
        這是modaldefaultstesttt
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.modal-container.show {
  opacity: 1;
  pointer-events: inherit;
}
.modal {
  max-width: 100%;
  border-radius: 5px;
  overflow: hidden;

  position: relative;
  left: 50%;
  top: 0px;
  transform: translateX(-50%) scale(0.9);
  transition: ease 0.3s;
}
.modal .close {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 10;
  background-color: #181818;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 18px;
    height: 18px;
  }
}

.modal-container.show .modal {
  top: 30px;
  transform: translateX(-50%) scale(1);

  /* 底部留一點間距, 由於 top 為 30 需要多一些 */
  margin-bottom: 60px;
}

.light .modal .close {
  background: #fff !important;
}
</style>
