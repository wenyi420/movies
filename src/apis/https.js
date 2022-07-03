/**
 * 封裝axios，設置攔截器，統一管理錯誤
 */

import axios from "axios";
import { showErrorAlert } from "@/utils.js";
/**
 * 請求失敗的統一處理
 * @param {Number} status 請求失敗的狀態碼
 */
const errorHandle = (status, msg) => {
  switch (status) {
    case 400:
      showErrorAlert({ title: msg });
      break;
    case 401:
      showErrorAlert({ title: "登入過期，請重新登入" });
      break;
    // 403: 權限不足
    case 403:
      break;
    // 404: 請求失敗
    case 404:
      showErrorAlert({ title: msg });
      break;

    // 其他錯誤, 直接拋出提式錯誤
    default:
      console.log("resp沒有攔截到的錯誤: " + msg);
  }
};

let instance = axios.create();
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 攔截器
instance.interceptors.response.use(
  (reponse) => {
    return reponse;
  },
  (error) => {
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
        showErrorAlert({ title: "網路出現問題，請重新連線後刷新網頁" });
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
