import { useUserStore } from "@/stores/user.js";
import { showLoadingAlert, showErrorAlert } from "@/utils.js";

const baseURL =
  "https://script.google.com/macros/s/AKfycbx_BEfcq_l7mG-4ikr7knM7r2oOmzpPxuR5ZJAhfkxdT4nXTn_W7xSgNhdL_jKC-0hH/exec";

export const apiCreateAccont = async (data) => {
  showLoadingAlert("送出資料中");
  const resp = await createAccountHandler(data);
  if (resp) {
    await setUserDataToStores(resp);
    return resp;
  }
};

export const apiCreateAccountByFB = async () => {
  try {
    showLoadingAlert("連接 FB 中");
    await FBLogin();
    const fbData = await getFBUserInfo();
    const resp = await createAccountHandler(fbData);
    if (resp) {
      await setUserDataToStores(resp);
      return resp;
    }
  } catch (e) {
    showErrorAlert({ title: e?.msg });
  }
};

async function createAccountHandler(data) {
  try {
    let resp = await apiPostAccount(data);
    return resp;
  } catch (e) {
    showErrorAlert({ title: e?.msg });
  }
}

async function FBLogin() {
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

export const apiLoginAccont = async (data) => {
  try {
    showLoadingAlert("登入中...");
    let resp = await apiGetAccount(data);
    if (resp) {
      await setUserDataToStores(resp);
      return resp;
    }
  } catch (e) {
    showErrorAlert({ title: e?.msg });
  }
};

export const apiUpdateAccount = async (data) => {
  try {
    let resp = await apiGetAccount(data);
    if (resp) {
      setUserDataToStores(resp);
    }
  } catch (e) {
    showErrorAlert({ title: e?.msg });
    clearUserData();
  }
};

export const apiUpdateMovies = async (movies) => {
  try {
    const token = localStorage.getItem("token");
    const _id = localStorage.getItem("_id");
    const data = {
      token,
      _id,
      postType: "movies",
      movies: JSON.stringify(movies),
    };

    let resp = await apiPostAccount(data);
    if (resp) {
      await updateMyMoviesToStores(resp);
      return resp;
    }
  } catch (e) {
    showErrorAlert({ title: e?.msg });
  }
};

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
const setUserDataToStores = async (resp) => {
  const store = useUserStore();
  store.setUserData(resp.data, resp.token);
  return;
};

const updateMyMoviesToStores = async (resp) => {
  const store = useUserStore();
  store.updateMyMovies(resp.data);
  return;
};

const clearUserData = () => {
  const store = useUserStore();
  store.logOutHanlder();
};

const apiGetAccount = (data) => {
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
        reject(err);
      });
  });
};

const apiPostAccount = (data) => {
  return new Promise((resolve, reject) => {
    fetch(baseURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
      .then((response) => {
        return response.text().then((text) => {
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
};
