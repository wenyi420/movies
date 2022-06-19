<script setup>
import { reactive, ref, defineProps } from "vue";
import { changeI18n } from "@/i18n/config.js";
import { isMobile } from "@/utils.js";
const footerList = reactive([
  {
    text: "常見問題",
    link: "",
  },
  {
    text: "說明中心",
    link: "",
  },
  {
    text: "帳戶",
    link: "",
  },
  {
    text: "媒體中心",
    link: "",
  },
  {
    text: "投資人關係",
    link: "",
  },
  {
    text: "工作機會",
    link: "",
  },
  {
    text: "觀賞方式",
    link: "",
  },
  {
    text: "使用條款",
    link: "",
  },
  {
    text: "隱私權",
    link: "",
  },
  {
    text: "Cookie 設定",
    link: "",
  },
  {
    text: "企業資訊",
    link: "",
  },
  {
    text: "聯絡我們",
    link: "",
  },
  {
    text: "速度測試",
    link: "",
  },
  {
    text: "法律聲明",
    link: "",
  },
  {
    text: "Netflix 獨家",
    link: "",
  },
]);
const mobileFooterList = reactive([
  {
    text: "常見問題",
    link: "",
  },
  {
    text: "說明中心",
    link: "",
  },
  {
    text: "使用條款",
    link: "",
  },
  {
    text: "隱私權",
    link: "",
  },
  {
    text: "Cookie 設定",
    link: "",
  },
  {
    text: "企業資訊",
    link: "",
  },
]);

const footerLinks = getFooterLinks();

const props = defineProps(["isLogined"]);
const isLogined = props.isLogined;

function getFooterLinks() {
  if (isMobile()) {
    return mobileFooterList;
  } else {
    return footerList;
  }
}

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
        <li
          class="footer-link-item"
          v-for="item in footerLinks"
          :key="item.text"
        >
          <a class="footer-link" href="javascript:;">{{ item.text }}</a>
        </li>
      </ul>
      <div class="lang-section-container" v-if="!isLogined">
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
  padding-top: 30px;
  padding-bottom: 20px;
  font-size: 1em;
  position: relative;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--v-border-color);
}
body.b-transition footer {
  transition: color 0.5s, background-color 0.5s;
}

.loginPage footer {
  margin-top: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1;
  border-top: 1px solid var(--footer-text-color);
  .site-footer {
    max-width: 1000px;
    margin: 0 auto;
  }
}
.light .loginPage footer {
  background: rgba(255, 255, 255, 0.75);
}
.site-footer {
  margin: 0 auto;
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
      margin-bottom: 12px;
      display: inline-block;
      min-width: 100px;
      width: 25%;
      padding-right: 12px;
      vertical-align: top;
      .footer-link {
        font-size: 13px;
      }
    }
    @media screen and (max-width: 480px) {
      .footer-link-item {
        width: 50%;
      }
    }
  }
}

.ant-select:not(.ant-select-customize-input) .ant-select-selector,
.lang-section-container .ant-select {
  background-color: var(--color-background) !important;
  color: var(--footer-text-color);
  border: none !important;
}
</style>
