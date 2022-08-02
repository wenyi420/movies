import { readonly, ref, reactive } from "vue";

// 共用值
const isShow = ref(false);
const data = reactive({});

export function useMovieModal() {
  const showMovieModal = () => (isShow.value = true);
  const hideMovieModal = () => (isShow.value = false);

  const resetMovieModalData = (v) => Object.assign(data, v);

  return {
    isShow: readonly(isShow),
    data: readonly(data),
    showMovieModal,
    hideMovieModal,
    resetMovieModalData,
  };
}
