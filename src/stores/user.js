import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const userData = ref({});

  const myMovies = ref(""); // '[123,456]'

  const isLogined = ref(false);

  let token = localStorage.getItem("token");
  let _id = localStorage.getItem("_id");
  if (token && _id) {
    isLogined.value = true;
  }

  // 將登入後的資料存入
  let setUserData = (data, token) => {
    userData.value = data;
    myMovies.value = data.movies;
    isLogined.value = true;

    localStorage.setItem("_id", data._id);
    localStorage.setItem("token", token);
  };

  let updateMyMovies = (data) => {
    userData.value.movies = data.movies;
    myMovies.value = data.movies;
  };

  let getUserMovies = () => {
    let movies = myMovies.value;
    if (movies) {
      return JSON.parse(movies);
    }
    return [];
  };

  // 登出
  let logOutHanlder = () => {
    // Object.assign(userData, {});
    userData.value = {};
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    isLogined.value = false;

    router.push("/");
  };

  return {
    userData,
    myMovies,
    isLogined,
    setUserData,
    logOutHanlder,
    getUserMovies,
    updateMyMovies,
  };
});
