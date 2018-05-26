module.exports = {
  head: {
    title: 'Voting System',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'voting system, 投票系统'}
    ],
    script: [
      {src: 'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js'}
      // {src: "https://cdnjs.cloudflare.com/ajax/libs/highcharts/6.0.7/highcharts.js"},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css'}
    ]
  },
  loading: './components/loading',
  css: [
    {src: '~assets/css/main.scss', lang: 'scss'}
  ],
  rernder: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  router: {
    base: '/',
    middleware: ['getdata'],
    scrollBehavior: function (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        if (to.matched.length < 2) {
          position = {x: 0, y: 0}
        } else if (to.matched.some(v => v.components.default.options.scrollTop)) {
          position = {x: 0, y: 0}
        }
        if (to.hash) {
          position = {selector: to.hash}
        }
        return position
      }
    },
    routes: []
  },
  build: {
    vendor: ['axios'],
    extend (config, ctx) {
      config.node = {
        fs: 'empty',
        dns: 'empty',
        module: 'empty',
        tls: 'empty',
        net: 'empty'
      }
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
