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

const poll = require('./poll')
router.use('/poll', poll)

const api = require('./api')
router.use('/api', api)

const user = require('./user')
router.use('/user', user)

module.exports = {
  path: '/',
  handler: router
}
