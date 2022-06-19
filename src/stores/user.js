import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useUserStore = defineStore("user", () => {
  const userData = ref({});

  const isLogined = ref(false);

  let token = localStorage.getItem("token");
  let _id = localStorage.getItem("_id");
  if (token && _id) {
    isLogined.value = true;
  }
  /**
   * @param data
   * {
        account: "test@gmail.com"
        params: {role: 'member', account: 'test@gmail.com', password: '123'}
        password: 123
        role: "member",
        movies: [829920, 508943], // 進去我的片單則 forEach 個別抓取如 movieInfo 方式
    }
   */

  // 將登入後的資料存入
  let setUserData = (data, token) => {
    userData.value = data;
    // Object.assign(userData, data);
    isLogined.value = true;

    localStorage.setItem("_id", data._id);
    localStorage.setItem("token", token);
  };

  // 登出
  let logOutHanlder = () => {
    // Object.assign(userData, {});
    userData.value = {};
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    isLogined.value = false;
  };

  return { userData, isLogined, setUserData, logOutHanlder };
});
