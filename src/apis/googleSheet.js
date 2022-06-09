import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user.js";

import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const baseURL =
  "https://script.google.com/macros/s/AKfycby_vmk_DO7MHF9SqkcEPYZYM0O2weMeAdrIFkztHuoRaMtF9EUx0tNRcBZU-A9uJ0DS/exec";

export const apiCreateAccont = (data, callback) => {
  createAccountHandler(data, callback);

  Swal.fire({
    title: "送出資料中",
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const apiCreateAccountByFB = () => {
  Swal.fire({
    title: "連接 FB 中",
    didOpen: () => {
      Swal.showLoading();
    },
  });
  FB.login(
    function (response) {
      if (response.status === "connected") {
        getFBUserInfo();
      } else {
        console.error("fb error: ", response);
        Swal.fire({
          icon: "error",
          title: "FB 登入失敗",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
    { scope: "public_profile,email" }
  );
};

// 取得 FB email,name
function getFBUserInfo(callback) {
  FB.api("/me?fields=name,email", function (response) {
    console.log("FB me api Successful login for: " + response);
    console.log("FB me name: " + response.name);
    console.log("FB me email: " + response.email);
    let { name, email } = response;

    let params = `account=${encodeURI(name)}&password=${email}&role=fb`;
    createAccountHandler(params, callback);
  });
}

// 中文字需要先 encodeURI 否則傳到 google Sheet 會不見
function createAccountHandler(data, callback = null) {
  //   data = {
  //     account: "testfffffff@gmail.com",
  //     password: "12ffffff3",
  //     role: "member",
  //     postType: "movies",
  //     movies: "[829920,508943]",
  //   };

  fetch(baseURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
  })
    .then((response) => {
      return response.text().then(function (text) {
        console.log("resp text", text);
        let resp = JSON.parse(text);

        let isSuccess = resp.state.includes("success");
        if (isSuccess) {
          Swal.fire({
            icon: "success",
            title: resp.data.account + "，" + resp.msg,
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            // if (callback && typeof callback === "function") {
            //   callback(resp);
            // }
            toHomePage();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: resp.msg,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    })
    .catch((err) => {
      console.log("Error:" + err);
    });
}

export const apiLoginAccont = (data, callback = null) => {
  Swal.fire({
    title: "登入中...",
    didOpen: () => {
      Swal.showLoading();
    },
  });

  fetch(baseURL + "?" + new URLSearchParams(data))
    .then((response) => {
      return response.text().then(function (text) {
        let resp = JSON.parse(text);
        let isSuccess = resp.state.includes("success");
        if (isSuccess) {
          Swal.fire({
            icon: "success",
            title: resp.data.account + "，" + resp.msg,
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            // todo setData to pinia and go to index
            // if (callback && typeof callback === "function") {
            //   callback(resp);
            // } else {
            //   //   setUserDataToStores(resp);
            // }
            setUserDataToStores(resp, callback);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: resp.msg,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    })
    .catch((err) => {
      console.log("Error:" + err);
    });
};

/**
 *  data:
        account: "test@gmail.com"
        params: {role: 'member', account: 'test@gmail.com', password: '123'}
        password: 123
        role: "member",
        movies: [829920, 508943], // 進去我的片單則 forEach 個別抓取如 movieInfo 方式
     

    msg: "登入成功"
    state: "success"
 */
const setUserDataToStores = (resp, callback) => {
  const store = useUserStore();
  store.setUserData(resp.data);
  callback();
};
