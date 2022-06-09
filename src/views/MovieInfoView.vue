<script setup>
import { useRouter, useRoute } from "vue-router";
import {
  apiGetMovieDetail,
  apiGetYoutubeTrailer,
  apiGetPopularMovie,
  apiGetNexflixDetail,
  apiGetNetflixTrailer,
} from "@/apis/movie.js";
import { ref, reactive, computed } from "vue";
import { i18n } from "@/i18n/config.js";

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const isNetflix = route.path.includes("netflix") ? true : false;
const movieData = ref({});
const trailerData = ref({});
const similarMovies = ref([]);

if (id) {
  if (isNetflix) {
    apiGetNexflixDetail(id).then((res) => {
      console.log("res", res);
      movieData.value = res.data;
      getSimilarMovies(res.data.genres);
    });

    apiGetNetflixTrailer(id).then((res) => {
      console.log("trailer", res.data);
      trailerData.value = res.data;
    });
  } else {
    apiGetMovieDetail(id).then((res) => {
      console.log("res", res);
      movieData.value = res.data;
      getSimilarMovies(res.data.genres);
    });

    apiGetYoutubeTrailer(id).then((res) => {
      console.log("trailer", res.data);
      trailerData.value = res.data;
    });
  }
} else {
  alert("error");
}

const trailer = computed(() => {
  let video = trailerData.value.results?.length
    ? trailerData.value.results[0]
    : null;
  let hasYoutube = false;
  if (video) {
    if (video.site.toLowerCase() === "youtube" && video.key) {
      hasYoutube = true;
    }
  }

  return hasYoutube ? video.key : null;
});

const getFirstSentence = (info) => {
  if (info) {
    let searchText;
    if (i18n.global.locale === "zh-TW") {
      searchText = "。";
    }
    if (i18n.global.locale === "en") {
      searchText = ".";
    }
    return info.split(searchText)[0] + searchText;
  }
  return "";
};

// date: 2021-01-01
const getReleaseYear = function (date) {
  if (date) return date.split("-")[0];
};

// 128 min
const getRunTime = (time) => {
  if (time) {
    let result = "";
    const MINUTE = 60;
    const HH = Math.floor(time / MINUTE);
    const MM = Math.floor(time % MINUTE);
    if (HH) result += `${HH} 小時 `;
    if (MM) result += `${MM} 分鐘`;
    return result;
  }
};

// [{id:28, name:動作}]
const getGenresName = (genres) => {
  if (genres && Array.isArray(genres) && genres.length) {
    return genres[0].name;
  }
};

const getSeason = (season) => {
  return `第 ${season} 季`;
};

const getSimilarMovies = (genres) => {
  if (genres && genres.length) {
    let tags;
    if (isNetflix) {
      tags = genres[0]._id; // 只取第一個避免 netflix genres 容易搜不到
    } else {
      tags = genres.map((g) => g.id).join(); // 18,16
    }

    apiGetPopularMovie(1, tags).then((values) => {
      let data = values.data.results;
      similarMovies.value = data.filter((m) => m.id !== movieData.value.id);
    });
  }
};

function goToMovie(id) {
  router.push({ path: `/movie/${id}` });
}

/**
 * adult:false
backdrop_path:"/egoyMDLqCxzjnSrWOz50uLlJWmD.jpg"
belongs_to_collection:Object
budget:110000000
genres:Array[4]
homepage:"https://www.sonicthehedgehogmovie.com"
id:675353
imdb_id:"tt12412888"
original_language:"en"
original_title:"Sonic the Hedgehog 2"
overview:"全世界最受歡迎的藍色刺蝟又回來了，他在《音速小子2》一片中將有一場升級的精采冒險。音速小子索尼克在綠丘鎮安頓下來之後，他就急著要證明自己有能力成為一名真正的英雄。當蛋頭博士帶著全新的搭檔納克魯斯，又回來尋找一塊力量強大足以毀滅人類文明的翡翠的時候，他就面對了另一個嚴峻的考驗。  這次索尼克和他自己的跟班塔爾斯攜手合作，一起踏上一場環遊世界的冒險旅程，希望能在那塊翡翠落入壞人手中之前先找到它。《音速小子2》一片由《玩命關頭》及《死侍》系列電影幕後工作團隊精心打造，堅強的演員陣容包括再度回歸演出的詹姆斯馬斯登、為索尼克配音的班許瓦茲、蒂卡桑普特、娜塔莎羅斯威爾、亞當帕利以及金凱瑞，新加入的演員則是薛馬摩爾，以及為納克魯斯配音的伊卓瑞斯艾巴和為塔爾斯配音的柯琳歐尚納希。"
popularity:8640.583
poster_path:"/xVygjpclB5qhKa4HgCq4R8hH0b7.jpg"
production_companies:Array[5]
production_countries:Array[2]
release_date:"2022-03-30"
revenue:65000000
runtime:122
spoken_languages:Array[2]
status:"Released"
tagline:""
title:"音速小子2"
video:false
vote_average:7.8
vote_count:257
 * 
 * 
 */
</script>
<template>
  <div class="movieSection">
    <div class="info">
      <h1>{{ isNetflix ? movieData.name : movieData.title }}</h1>
      <div class="info-metadata">
        <span class="info-metadata-year">{{
          getReleaseYear(
            isNetflix ? movieData.first_air_date : movieData.release_date
          )
        }}</span>
        <span class="info-spacer"> | </span>
        <span class="info-time info-spacer" v-if="isNetflix">{{
          getSeason(movieData.number_of_seasons)
        }}</span>
        <span class="info-time info-spacer" v-else>{{
          getRunTime(movieData.runtime)
        }}</span>
        <span class="info-spacer"> | </span>
        <span class="info-time info-spacer">{{
          getGenresName(movieData.genres)
        }}</span>
      </div>
      <div class="info-desc">
        {{ getFirstSentence(movieData.overview) }}
      </div>
    </div>
    <div class="img-box">
      <div
        class="img-bg"
        :style="{
          'background-image':
            'url(' +
            'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/' +
            movieData.backdrop_path +
            ')',
        }"
      ></div>
    </div>
  </div>

  <div class="nmtitle-section" v-if="trailer">
    <div class="section-header">
      <h2 class="section-header-text">影片</h2>
      <h2 class="section-subheader-text">{{ movieData.title }}</h2>
    </div>
    <div v-if="trailer" style="margin: 16px 0">
      <!-- 預告片資訊：{ "id": 675353, "results": [ { "iso_639_1": "zh", "iso_3166_1": "TW", "name": "【音速小子2】首支預告 - 2022年 全台戲院見", "key": "o_unED06-lg", "site": "YouTube", "size": 1080, "type": "Trailer", "official": false, "published_at": "2021-12-10T01:51:44.000Z", "id": "620cd7505cea180043ddbfdb" } ] }
 -->
      <iframe
        class="youtube-iframe"
        :src="'https://www.youtube.com/embed/' + trailer"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
  <div class="nmtitle-section" v-if="similarMovies && similarMovies.length">
    <div class="section-header">
      <h2 class="section-header-text">類似影片</h2>
    </div>
    <div class="section-body">
      <div class="similarMovies">
        <div :key="movie.id" v-for="movie in similarMovies">
          <div v-if="movie.backdrop_path" class="similarMovies-item">
            <a @click="goToMovie(movie.id)">
              <img
                :src="
                  'https://image.tmdb.org/t/p/w250_and_h141_face' +
                  movie.backdrop_path
                "
                alt=""
              />
              <span class="title">{{ movie.title }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movieSection {
  margin: 0px 3%;
  padding: 0px 5vw 25px;
  position: relative;
  display: flex;
  overflow: hidden;

  .info {
    width: 35%;
    min-width: 500px;
    max-width: 800px;
    padding: 16px 32px 64px 0;
    z-index: 2;
    position: relative;

    color: var(--color-text);

    h1 {
      color: inherit;
      width: 100%;
      margin-top: 45%;
      font-size: 58px;
    }
    .info-metadata {
      color: #a3a3a3;
      .info-spacer {
        margin: 0 4px;
      }
    }
    .info-desc {
      padding-top: 16px;
      font-size: 16px;
      line-height: 22px;
      font-weight: 400;
      color: var(--color-text);
      max-width: 100%;
    }
  }

  .img-box {
    position: unset;
    flex: 1 1 auto;
    z-index: 1;
    height: 0;
    padding-bottom: 50%;

    .img-bg {
      position: absolute;
      right: -6%;
      width: 100%;
      height: 100%;
      display: block;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }
  }
}

.dark .movieSection::after {
  content: "";
  position: absolute;
  z-index: 1;
  display: block;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    var(--color-background) 10%,
    rgba(23, 23, 23, 0.98) 20%,
    rgba(23, 23, 23, 0.97) 25%,
    rgba(23, 23, 23, 0.95) 35%,
    rgba(23, 23, 23, 0.94) 40%,
    rgba(23, 23, 23, 0.92) 45%,
    rgba(23, 23, 23, 0.9) 50%,
    rgba(23, 23, 23, 0.87) 55%,
    rgba(23, 23, 23, 0.82) 60%,
    rgba(23, 23, 23, 0.75) 65%,
    rgba(23, 23, 23, 0.63) 70%,
    rgba(23, 23, 23, 0.45) 75%,
    rgba(23, 23, 23, 0.27) 80%,
    rgba(23, 23, 23, 0.15) 85%,
    rgba(23, 23, 23, 0.08) 90%,
    rgba(23, 23, 23, 0.03) 95%,
    rgba(23, 23, 23, 0) 100%
  );
  top: 0;
  left: 0;
}
@media screen and (max-width: 480px) {
  .dark .movieSection::after {
    width: 100%;
    background: rgb(0 0 0 / 40%);
  }
}

.light .movieSection::after {
  content: "";
  position: absolute;
  z-index: 1;
  display: block;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    var(--color-background) 10%,
    rgba(232, 232, 232, 0.98) 20%,
    rgba(232, 232, 232, 0.97) 25%,
    rgba(232, 232, 232, 0.95) 35%,
    rgba(232, 232, 232, 0.94) 40%,
    rgba(232, 232, 232, 0.92) 45%,
    rgba(232, 232, 232, 0.9) 50%,
    rgba(232, 232, 232, 0.87) 55%,
    rgba(232, 232, 232, 0.82) 60%,
    rgba(232, 232, 232, 0.75) 65%,
    rgba(232, 232, 232, 0.63) 70%,
    rgba(232, 232, 232, 0.45) 75%,
    rgba(232, 232, 232, 0.27) 80%,
    rgba(232, 232, 232, 0.15) 85%,
    rgba(232, 232, 232, 0.08) 90%,
    rgba(232, 232, 232, 0.03) 95%,
    rgba(232, 232, 232, 0) 100%
  );
  top: 0;
  left: 0;
}
@media screen and (max-width: 480px) {
  .light .movieSection::after {
    width: 100%;
    background: rgb(255 255 255 / 50%);
  }
}

.nmtitle-section {
  margin: 0px 3%;
  padding: 25px 5vw;
  position: relative;

  .section-header {
    display: flex;
    align-items: center;

    .section-header-text {
      font-size: 30px;
      line-height: 34px;
      font-weight: 400;
      color: var(--color-text);
    }
    .section-subheader-text {
      border-left: 1px solid #a3a3a3;
      margin-left: 9px;
      padding-left: 15px;
      color: #a3a3a3;
      font-size: 20px;
      white-space: nowrap;
    }
  }
}

.similarMovies {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  margin: -6px;

  @media screen and (max-width: 1439px) {
    grid-template-columns: 33.333% 33.333% 33.333%;
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: 50% 50%;
  }
  .similarMovies-item {
    max-width: 100%;
    margin: 6px;

    img {
      width: 100%;
    }

    .title {
      display: block;
      color: var(--color-text);
    }
  }
}

@media screen and (max-width: 1760px) {
  .movieSection,
  .nmtitle-section {
    margin: 0px;
  }
}

@media screen and (max-width: 640px) {
  .movieSection {
    .info {
      width: 100%;
      max-width: 100%;
      min-width: unset;

      h1 {
        font-size: 42px;
        margin-top: 15%;
      }
    }
    .img-box {
      .img-bg {
        right: 0%;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .movieSection {
    .info {
      h1 {
        font-size: 32px;
        margin-top: 15%;
      }
      .info-desc {
        font-size: 14px;
      }
    }
    &::after {
      width: 100%;
      background: rgb(0 0 0 / 60%);
    }
  }
}

.youtube-iframe {
  width: 620px;
  height: 350px;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 280px;
  }
  @media screen and (max-width: 480px) {
    height: 200px;
  }
}
</style>
