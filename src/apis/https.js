/**
 * 封裝axios，設置攔截器，統一管理錯誤
 */

import axios from "axios";
import { tip } from "./utils.js";
// import { Toast } from "vant";
/**
 * 請求失敗的統一處理
 * @param {Number} status 請求失敗的狀態碼
 */
const errorHandle = (status, msg) => {
  switch (status) {
    // 400: 登入失敗, 可能是帳號或密碼錯誤
    case 400:
      tip(msg, "error");
      break;

    // 401: backend session過期 => 移到checklogin去判斷
    case 401:
      tip("登入過期，請重新登入", "error");
      //   setTimeout(() => {
      //     toLogin();
      //   }, 1000);
      break;

    // 403: 權限不足
    case 403:
      //   to403Page();
      break;

    // 404: 請求失敗
    case 404:
      console.log("404 error msg", msg);
      tip(msg, "error");
      break;

    // 其他錯誤, 直接拋出提式錯誤
    default:
      console.log("resp沒有攔截到的錯誤: " + msg);
  }
};

// 新建 axios movie 實例，設置攔截器
let instance = axios.create();

// request 攔截器
instance.interceptors.request.use(
  (config) => {
    // Toast.loading({
    //   mask: false,
    //   duration: 0, // 一直存在
    //   forbidClick: true, //禁止點擊
    //   message: "加載中...",
    // });
    return config;
  },
  (error) => {
    // Toast.clear();
    return Promise.reject(error);
  }
);

// response 攔截器
instance.interceptors.response.use(
  (reponse) => {
    // 請求成功
    // Toast.clear();
    // window.scroll({
    //     top: 0,
    //     behavior: 'smooth'
    // });
    return reponse;
  },
  (error) => {
    // 請求錯誤
    // Toast.clear();

    const { response } = error;

    if (response) {
      // 成功發出請求且收到resp, 但有 error
      console.log("response", response);
      errorHandle(response.status, response.data.status_message);
      return Promise.reject(response.data);
    } else {
      // 成功發出請求但沒收到resp
      if (!window.navigator.onLine) {
        // 如果是網路斷線
        tip("網路出現問題，請重新連線後刷新網頁");
      } else {
        // 可能是跨域, 或是程式問題
        return Promise.reject(error);
      }
    }
  }
);

// 封裝請求方法
export default function (method, url, data = null) {
  method = method.toLowerCase();

  switch (method) {
    case "get":
      return instance.get(url, { params: data });
    case "post":
      return instance.post(url, data);
    case "delete":
      return instance.delete(url, { params: data });
    case "patch":
      return instance.put(url, data);
    default:
      console.log("未知的method " + method);
      return false;
  }
}
