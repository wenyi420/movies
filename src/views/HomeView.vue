<script setup>
import movieCategory from "@/components/slide/movieCategory.vue";
</script>

<template>
  <main>
    <section class="category-section">
      <div class="container">
        <h1 class="category-title">電影</h1>
        <div class="category-desc">
          電影以無人能及的方式帶給我們感動，不論是嚇人、搞笑、誇張、浪漫或其間的所有情緒皆然。
          超多影片，帶來超多體驗。
        </div>
      </div>
    </section>

    <!-- 待做成一個 section 組件 包裝 slide -->
    <movieCategory type="popular"></movieCategory>
    <movieCategory type="plot"></movieCategory>
    <movieCategory type="romantic"></movieCategory>
    <movieCategory type="violence"></movieCategory>
    <movieCategory type="fear"></movieCategory>
    <movieCategory type="animation"></movieCategory>
    <div class="introl with-gradient-blur">
      <div class="introl-content">
        <h2>更多精彩內容任您觀賞。</h2>
        <p>
          Movies 擁有豐富的影片內容庫，包括長片、紀錄片、節目、動畫、獲獎肯定的
          Movies 原創作品與更多內容。隨時隨地，盡情觀賞。
        </p>
        <a-button type="primary" class="large">立即加入</a-button>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  background: var(--color-background);
  height: 100%;
}
.category-section {
  padding: 0 3%;
  margin-bottom: 20px;
}

.movie-slide-list:nth-child(6) {
  filter: blur(5px);
}
.movie-slide-list:nth-child(7) {
  filter: blur(10px);
}
.introl {
  background: #181818;
  text-align: center;
  font-size: 1.5em;
  position: relative;
  padding: 1em;

  h2 {
    font-weight: 700;
  }
  @media screen and (min-width: 700px) {
    h2 {
      font-size: 1.5em;
    }
  }
  .introl-content {
    max-width: 730px;
    margin: 0 auto;
  }
}
.introl.with-gradient-blur {
  margin-top: -13rem;
}
.with-gradient-blur::before {
  content: " ";
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 0)),
    to(#181818)
  );
  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0, #181818 100%);
  background: -moz- oldlinear-gradient(top, rgba(0, 0, 0, 0) 0, #181818 100%);
  background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 0, #181818 100%);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, #181818 100%);
  height: 15em;
  pointer-events: none;
}

@media screen and (min-width: 600px) {
  .category-section .container {
    max-width: 598px;
  }
}

.category-title {
  color: var(--color-text);
  font-size: 2.75rem;
  font-weight: 900;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgb(0 0 0 / 40%);
  word-wrap: break-word;
  margin-top: 4vw;
}

@media screen and (min-width: 1440px) {
  .category-title {
    font-size: 3.25rem;
  }
}
.category-desc {
  color: #fff;
  font-size: 19px;
  margin-top: 0.1vw;
  width: 100%;
  line-height: 1.3;
}
</style>
