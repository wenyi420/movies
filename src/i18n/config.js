import { en } from "@/i18n/en.js";
import { zhTW } from "@/i18n/zh-tw.js";
import { createI18n } from "vue-i18n";

const messages = {
  en: en,
  "zh-TW": zhTW,
};

export const i18n = createI18n({
  locale: "zh-TW", // set locale
  fallbackLocale: "en", // set fallback locale
  messages,
  // something vue-i18n options here ...
});

export const changeI18n = (lang) => {
  i18n.global.locale = lang;
};
