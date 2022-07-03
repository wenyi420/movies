import {
  openLoadingMessage,
  openSuccessMessage,
  openErrorMessage,
} from "@/common/message.js";
import { useUserStore } from "@/stores/user.js";
import { apiUpdateMovies } from "@/apis/googleSheet.js";

// return 回傳是否成功，控制 icon 呈現
export const addToMyMovieHandle = async (movieID) => {
  const store = useUserStore();
  return new Promise((resolve, reject) => {
    let userMovies = store.getUserMovies();
    openLoadingMessage("新增到我的片單中...", movieID);
    userMovies.push(movieID);
    apiUpdateMovies(userMovies)
      .then(() => {
        openSuccessMessage("新增到我的片單成功", movieID);
        resolve(true);
      })
      .catch(() => {
        openErrorMessage("新增到我的片單失敗", movieID);
        reject(false);
      });
  });
};

// return 回傳是否成功，控制 icon 呈現
export const removeToMyMovieHandle = async (movieID) => {
  const store = useUserStore();
  return new Promise((resolve, reject) => {
    let userMovies = store.getUserMovies();
    userMovies = userMovies.filter((id) => !id.toString().includes(movieID));

    openLoadingMessage("從我的片單移除中...", movieID);
    apiUpdateMovies(userMovies)
      .then(() => {
        openSuccessMessage("從我的片單移除成功", movieID);
        resolve(true);
      })
      .catch(() => {
        openErrorMessage("從我的片單移除失敗", movieID);
        reject(false);
      });
  });
};
