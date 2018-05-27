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

router.post('/login', (req, res) => {
  if (req.body.user === 'admin' && req.body.pass === 'pass') {
    req.session.user = 'admin'
    res.json({ user: 'admin' })
  } else {
    res.status(401).json({ msg: 'error' })
  }
})

router.post('/logout', (req, res) => {
  delete req.session.user
  res.json({ msg: 'logout' })
})

module.exports = {
  path: '/auth',
  handler: router
}
