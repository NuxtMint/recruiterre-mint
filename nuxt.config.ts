// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxtjs/leaflet',
  ],

  app: {
    head: {
      title: 'Modern Job Board',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Modern Job Board built with Nuxt 3' },
      ],
      link: [
        {
          href: 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css',
          rel: 'stylesheet',
        },
      ],
    },
  },
  content: {
    database: {
      type: 'd1',
      bindingName: 'recruiterre',
    },
  },
  css: ['@/assets/css/scroll.css'],
});
