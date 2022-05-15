import req from "./https.js";

const baseURL = "https://api.themoviedb.org/3";
const apiKey = "ccc4da600602f73cf752066796a150b0";
const language = "zh-TW";

// 定義接口
export const apiGetPopularMovie = (page = 1, tag) =>
  req("get", `${baseURL}/discover/movie`, {
    api_key: apiKey,
    sort_by: "popularity.desc",
    page: page,
    language: language,
    with_genres: tag,
  });

export const apiSearchMovie = (name) =>
  req("get", `${baseURL}/search/movie`, {
    api_key: apiKey,
    language: language,
    query: name,
  });

export const apiGetMovieTags = () =>
  req("get", `${baseURL}/genre/movie/list`, {
    api_key: apiKey,
    language: language,
  });

export const apiGetMovieDetail = (id) =>
  req("get", `${baseURL}/movie/${id}`, {
    api_key: apiKey,
    language: language,
  });

export const apiGetYoutubeTrailer = (id) =>
  req("get", `${baseURL}/movie/${id}/videos`, {
    api_key: apiKey,
    language: language,
  });
