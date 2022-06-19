import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useUserStore = defineStore("user", () => {
  const userData = ref({});

  const isLogined = ref(false);
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
  let setUserData = (data) => {
    console.log("使用 pinia set usr data", data);
    userData.value = data;
    // Object.assign(userData, data);
    isLogined.value = true;
  };

  // 登出
  let logOutHanlder = () => {
    // Object.assign(userData, {});
    userData.value = {};
    isLogined.value = false;
  };

  // 進入網頁時檢查是否以登入
  // checkLoginState() {

  // }

  return { userData, isLogined, setUserData, logOutHanlder };
});
