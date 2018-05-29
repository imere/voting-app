const express = require('express')
const router = express.Router()

const app = express()

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

const auth = require('./auth')
router.use('/auth', auth)

const api = require('./api')
router.use('/api', api)

module.exports = {
  path: '/',
  handler: router
}
