import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useMovieModalStore = defineStore("movieModal", () => {
  const data = ref({});

  const isShow = ref(false);

  function resetMovieData(v) {
    data.value = v;
  }

  return { data, isShow, resetMovieData };
});
