// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // @ts-ignore
    './src/module'
  ],
  css: [
    'viewerjs/dist/viewer.css'
  ]
})