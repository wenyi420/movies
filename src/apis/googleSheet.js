import req from "./https.js";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const baseURL =
  "https://script.google.com/macros/s/AKfycbzDS8ZKSGv89mQRM577ls-yUmHGXTlYFAxTUxavWUMlImrNOkawKaUezvMIV8t-rJYa/exec";

export const apiCreateAccont = (params, callback) => {
  createAccountHandler(params, callback);

  Swal.fire({
    title: "送出資料中",
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const apiCreateAccountByFB = (callback) => {
  Swal.fire({
    title: "連接 FB 中",
    didOpen: () => {
      Swal.showLoading();
    },
  });
  FB.login(
    function (response) {
      if (response.status === "connected") {
        getFBUserInfo(callback);
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

    let { name, email } = response;

    let params = `account=${name}&password=${email}&type=fb`;
    createAccountHandler(params, callback);
  });
}

function createAccountHandler(params, callback) {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", baseURL);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log("xmlhttp.responseText", JSON.parse(xmlhttp.responseText));
      let resp = JSON.parse(xmlhttp.responseText);

      let isSuccess = resp.state.includes("success");
      if (isSuccess) {
        Swal.fire({
          icon: "success",
          title: resp.data.account + "，" + resp.msg,
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          callback(resp);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: resp.msg,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };
  xmlhttp.send(params);
}

export const apiLoginAccont = (params, callback) => {
  Swal.fire({
    title: "登入中...",
    didOpen: () => {
      Swal.showLoading();
    },
  });
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", `${baseURL}?${params}`);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log("xmlhttp.responseText", JSON.parse(xmlhttp.responseText));
      let resp = JSON.parse(xmlhttp.responseText);

      let isSuccess = resp.state.includes("success");
      if (isSuccess) {
        Swal.fire({
          icon: "success",
          title: resp.data.account + "，" + resp.msg,
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          // todo setData to pinia and go to index
          callback(resp);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: resp.msg,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };
  xmlhttp.send(null);
};
