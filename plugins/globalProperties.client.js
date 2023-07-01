import Vue from "vue";

export default function (_, inject) {
  inject(
    "globalProperties",
    Vue.observable({
      nuxtImgProvider: process.env.NUXT_IMG_PROVIDER,
      menuApiUrl: process.env.MENU_API_URL,
      pageApiUrl: process.env.PAGE_API_URL,
    })
  );
}
