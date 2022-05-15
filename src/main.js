import { createApp } from "vue";
import { i18n } from "@/i18n/config.js";
import { createPinia } from "pinia";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.less";
import router from "./router";

window.fbAsyncInit = function () {
  FB.init({
    appId: "307282398242165",
    cookie: true,
    xfbml: true,
    version: "v13.0",
  });

  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Antd);
app.use(i18n);
app.provide("rootVueInstance", app);
app.mount("#app");
