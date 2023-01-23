export default {
  devtools: process.env.NODE_ENV !== "production",
  ssr: false,
  target: "static",
  env: {
    MENU_API_URL: process.env.MENU_API_URL,
    PAGE_API_URL: process.env.PAGE_API_URL,
  },
  head: {
    title: "Alexey Chirukhin",
    titleTemplate: (titleChunk) => {
      return titleChunk && titleChunk !== "Alexey Chirukhin"
        ? `${titleChunk} — Alexey Chirukhin`
        : "Alexey Chirukhin";
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Alexey Chirukhin personal website",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      /* Fonts */
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600&family=Fraunces:opsz,wght@9..144,300&family=Chango&family=Schoolbell&family=Just+Me+Again+Down+Here&display=swap",
      },
    ],
    htmlAttrs: {
      lang: "en",
    },
  },
  css: ["~/assets/scss/main.scss", "~/assets/scss/transitions.scss"],
  loadingIndicator: "~/loading.html",
  buildModules: ["@nuxt/image", "nuxt-client-init-module"],
  plugins: [
    { src: "~/plugins/vueMasonry.client.js", mode: "client" },
    { src: "~/plugins/persistedState.client.js", mode: "client" },
    { src: "~/plugins/windowResizeHandler.client.js", mode: "client" },
    { src: "~/plugins/pageUtility.client.js", mode: "client" },
    { src: "~/plugins/api.client.js", mode: "client" },
    { src: "~/plugins/services.client.js", mode: "client" },
  ],
  build: {
    terser: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  },
  router: {
    middleware: ["routeValidator"],
  },
  image: {
    imagekit: {
      baseURL: "https://ik.imagekit.io/pr3sto",
    },
    screens: {
      md: 700,
    },
    presets: {
      progressivejpg: {
        modifiers: {
          f: "jpg",
          progressive: true,
        },
      },
    },
  },
};
