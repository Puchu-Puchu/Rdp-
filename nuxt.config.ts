// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt'
  ],

  // CSS
  css: [
    '~/assets/css/animations.css'
  ],

  // Build optimizations
  nitro: {
    prerender: {
      routes: ['/']
    }
  },

  // App configuration
  app: {
    head: {
      title: 'Graphic Designer Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portfolio showcasing graphic design work with cutting-edge animations' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ]
    }
  },

  // Runtime config
  runtimeConfig: {
    public: {
      appName: 'Graphic Designer Portfolio'
    }
  }
})
