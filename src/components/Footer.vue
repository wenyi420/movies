<script setup>
import { ref } from "vue";
import { changeI18n } from "@/i18n/config.js";

const handleChange = (lang) => {
  changeI18n(lang);
};

const lang = ref("zh-TW");
</script>

<template>
  <footer>
    <div class="site-footer">
      <div class="footer-top">
        <a>有疑問嗎？請聯絡我們。</a>
      </div>
      <ul class="footer-link-section">
        <li class="footer-link-item">
          <a class="footer-link" href="javascript:;">常見問題</a>
        </li>
        <li class="footer-link-item">
          <a class="footer-link" href="javascript:;">常見問題</a>
        </li>
        <li class="footer-link-item">
          <a class="footer-link" href="javascript:;">常見問題</a>
        </li>
        <li class="footer-link-item">
          <a class="footer-link" href="javascript:;">常見問題</a>
        </li>
        <li class="footer-link-item">
          <a class="footer-link" href="javascript:;">常見問題</a>
        </li>
        <li class="footer-link-item">
          <a class="footer-link" href="javascript:;">常見問題</a>
        </li>
      </ul>
      <div class="lang-section-container">
        <a-select
          ref="select"
          v-model:value="lang"
          style="width: 120px"
          @change="handleChange"
        >
          <a-select-option value="zh-TW">中文</a-select-option>
          <a-select-option value="en">English</a-select-option>
        </a-select>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  min-width: 190px;
  width: 100%;
  margin-top: 80px;
  padding-bottom: 20px;
  font-size: 1em;
  position: relative;
}
.loginPage footer {
  margin-top: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1;
  .site-footer {
    max-width: 1000px;
    margin: 0 auto;
  }
}
.site-footer {
  margin: 0 auto;
  padding-top: 30px;
  width: 90%;
  .footer-top {
    font-size: 16px;
    padding: 0;
    margin: 0 0 30px;
  }
  ul {
    padding: 0;
  }
  ul,
  li {
    list-style: none;
  }
  a {
    color: var(--footer-text-color);

    &:hover {
      text-decoration: underline;
    }
  }
  .footer-link-section {
    max-width: 1000px;
    .footer-link-item {
      box-sizing: border-box;
      padding: 0;
      margin-bottom: 16px;
      display: inline-block;
      min-width: 100px;
      width: 25%;
      padding-right: 12px;
      vertical-align: top;
      .footer-link {
        font-size: 13px;
      }
    }
  }
}

.lang-section-container .ant-select {
  background-color: #000 !important;
  color: var(--footer-text-color);
}
</style>
