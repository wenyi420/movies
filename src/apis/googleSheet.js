import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user.js";
import { showLoadingAlert, showErrorAlert } from "@/utils.js";

const baseURL =
  "https://script.google.com/macros/s/AKfycbxX_phlt-Y0tcbjUKPNhKeeeNn2SG306T9i7Z8YzJrYBVR2FmXEUuP2_mZYLRN2hWPP/exec";

export const apiCreateAccont = async (data) => {
  try {
    showLoadingAlert("送出資料中");
    const resp = await createAccountHandler(data);
    await setUserDataToStores(resp);
    return resp;
  } catch (e) {
    showErrorAlert({ title: e?.msg });
  }
};

export const apiCreateAccountByFB = async () => {
  try {
    showLoadingAlert("連接 FB 中");

    await FBLogin();
    const fbData = await getFBUserInfo();
    const resp = await createAccountHandler(fbData);
    await setUserDataToStores(resp);

    return resp;
  } catch (e) {
    showErrorAlert({ title: e?.msg });
  }
};

function FBLogin() {
  return new Promise((resolve, reject) => {
    FB.login(
      function (response) {
        if (response.status === "connected") {
          resolve();
        } else {
          console.error("fb error: ", response);
          reject({ msg: "FB 登入失敗" });
        }
      },
      { scope: "public_profile,email" }
    );
  });
}
// 取得 FB email,name
function getFBUserInfo() {
  return new Promise((resolve, reject) => {
    FB.api("/me?fields=name,email", function (response) {
      if (!response || response.error) {
        reject({ msg: "FB 取得資料失敗" });
      } else {
        let { name, email } = response;
        let data = {
          account: name,
          password: email,
          role: "fb",
        };

        resolve(data);
      }
    });
  });
}

function createAccountHandler(data) {
  return new Promise((resolve, reject) => {
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
            resolve(resp);
          } else {
            reject(resp);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const apiLoginAccont = async (data) => {
  try {
    showLoadingAlert("登入中...");
    let resp = await loginHandle(data);
    await setUserDataToStores(resp);
    return resp;
  } catch (e) {
    showErrorAlert({ title: e?.msg });
  }
};

const loginHandle = (data) => {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "?" + new URLSearchParams(data))
      .then((response) => {
        return response.text().then(function (text) {
          let resp = JSON.parse(text);
          let isSuccess = resp.state.includes("success");
          if (isSuccess) {
            resolve(resp);
          } else {
            reject(resp);
          }
        });
      })
      .catch((err) => {
        console.log("Error:" + err);
        reject(err);
      });
  });
};

export const apiUpdateAccount = (data) => {
  fetch(baseURL + "?" + new URLSearchParams(data))
    .then((response) => {
      return response.text().then(function (text) {
        let resp = JSON.parse(text);
        let isSuccess = resp.state.includes("success");
        if (isSuccess) {
          console.log("apiUpdateAccount success");
          setUserDataToStores(resp);
        } else {
          showErrorAlert("token 已失效，請重新登入");
          clearUserData();
        }
      });
    })
    .catch((err) => {
      console.log("Error:" + err);
    });
};

export const apiUpdateMovies = async (movies) => {
  try {
    const resp = await updateMovies(movies);
    await updateMyMoviesToStores(resp);
    return resp;
  } catch (e) {
    showErrorAlert({ title: e?.msg });
  }
};

function updateMovies(movies = []) {
  console.log("update movies", movies);
  const token = localStorage.getItem("token");
  const _id = localStorage.getItem("_id");

  return new Promise((resolve, reject) => {
    const data = {
      token,
      _id,
      postType: "movies",
      movies: JSON.stringify(movies),
    };

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
            resolve(resp);
          } else {
            reject(resp);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 *  data:
        account: "test@gmail.com"
        params: {role: 'member', account: 'test@gmail.com', password: '123'}
        password: 123
        role: "member",
        movies: [829920, 508943], // 進去我的片單則 forEach 個別抓取如 movieInfo 方式
     

    msg: "登入成功"
    state: "success",
    token: token
 */
const setUserDataToStores = (resp) => {
  return new Promise((resolve, reject) => {
    const store = useUserStore();
    store.setUserData(resp.data, resp.token);
    resolve();
  });
};

const updateMyMoviesToStores = (resp) => {
  return new Promise((resolve, reject) => {
    const store = useUserStore();
    store.updateMyMovies(resp.data);
    resolve();
  });
};

const clearUserData = () => {
  const store = useUserStore();
  store.logOutHanlder();
};
