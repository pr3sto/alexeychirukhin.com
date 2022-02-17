require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

export default {
  devtools: process.env.NODE_ENV !== 'production',
  ssr: false,
  target: 'static',
  head: {
    title: 'Alexey Chirukhin',
    titleTemplate: (titleChunk) => {
      return titleChunk && titleChunk !== 'Alexey Chirukhin' ?
        `Alexey Chirukhin | ${titleChunk}` :
        'Alexey Chirukhin';
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Alexey Chirukhin personal website' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      /* Roboto font */
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600&family=Roboto:wght@400;500;600&display=swap' },
    ],
    htmlAttrs: {
      lang: 'en',
    },
  },
  css: [
    '@/assets/css/main.css',
  ],
  loadingIndicator: '~/loading.html',
  modules: [
    'nuxt-client-init-module',
  ],
  buildModules: [
    ['@nuxtjs/dotenv', { filename: `.env.${process.env.NODE_ENV}` }]
  ],
  plugins: [
    { src: '~/plugins/VueMasonry.client.js', mode: 'client', },
    { src: '~/plugins/persistedState.client.js' },
  ],
}
