// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig:{
    public: {
      BASE_URL: '',
    }
  },

  css: ['@/assets/css/main.css','~/assets/scss/main.scss'],
  modules: ['@pinia/nuxt'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
  postcss: {
      plugins: {
      tailwindcss: {},
      autoprefixer: {},
      },
  },
});

