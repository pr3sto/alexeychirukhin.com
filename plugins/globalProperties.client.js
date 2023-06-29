import Vue from "vue";

export default function (_, inject) {
  inject(
    "globalProperties",
    Vue.observable({ nuxtImgProvider: process.env.NUXT_IMG_PROVIDER })
  );
}
