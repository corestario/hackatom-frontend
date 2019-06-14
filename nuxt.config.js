export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/app.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  router: {
    linkExactActiveClass: 'active',
  },
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
    // componentPlugins: [
    //   'Layout',
    //   'Form',
    //   'FormCheckbox',
    //   'FormInput',
    //   'FormRadio'
    // ],
    // directivePlugins: ['Popover']
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    vendor: ['axios'],
    extend(config, ctx) {}
  }
}
