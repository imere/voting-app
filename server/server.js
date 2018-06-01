const express = require('express')
const { Nuxt, Builder } = require('nuxt')

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 8000

const app = express()

const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

if (config.dev) {
  let builder = new Builder()
  builder.build()
}

const nuxt = new Nuxt(config)
app.use(nuxt.render)

app.get('/', (req, res) => {
  res.json([])
})

app.listen(PORT, HOST, () => {
  console.log(`Listening on ${HOST}:${PORT}`)
})
