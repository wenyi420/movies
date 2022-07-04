import {
  openLoadingMessage,
  openSuccessMessage,
  openErrorMessage,
} from "@/common/message.js";
import { useUserStore } from "@/stores/user.js";
import { apiUpdateMovies } from "@/apis/googleSheet.js";

// return 回傳是否成功，控制 icon 呈現
export const addToMyMovieHandle = async (movieID) => {
  openLoadingMessage("新增到我的片單中...", movieID);
  const store = useUserStore();
  let userMovies = store.getUserMovies();
  userMovies.push(movieID);
  let resp = await apiUpdateMovies(userMovies);
  if (resp) {
    openSuccessMessage("新增到我的片單成功", movieID);
    return true;
  }
  openErrorMessage("新增到我的片單失敗", movieID);
  return false;
};

// return 回傳是否成功，控制 icon 呈現
export const removeToMyMovieHandle = async (movieID) => {
  openLoadingMessage("從我的片單移除中...", movieID);
  const store = useUserStore();
  let userMovies = store.getUserMovies();
  userMovies = userMovies.filter((id) => !id.toString().includes(movieID));
  let resp = await apiUpdateMovies(userMovies);
  if (resp) {
    openSuccessMessage("從我的片單移除成功", movieID);
    return true;
  }
  openErrorMessage("從我的片單移除失敗", movieID);
  return false;
};
