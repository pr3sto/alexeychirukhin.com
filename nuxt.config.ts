export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    public: {
      HEAD_TITLE: "Alexey Chirukhin",
      MENU_API_URL: process.env.MENU_API_URL,
      PAGE_API_URL: process.env.PAGE_API_URL,
      NUXT_IMG_PROVIDER: process.env.NUXT_IMG_PROVIDER,
    },
  },
  modules: ["nuxt-lodash", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Personal Website of Alexey Chirukhin",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        /* Fonts */
        { rel: "preconnect", href: "https://fonts.cdnfonts.com" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600&family=Schoolbell&family=Just+Me+Again+Down+Here&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.cdnfonts.com/css/violet-sans",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.cdnfonts.com/css/druk-wide-bold",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  css: ["@/assets/scss/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_variables.scss" as *;',
        },
      },
    },
  },
});
