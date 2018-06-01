const router = require('express').Router()
const users = require('../data/users.js')

router.post('/login', (req, res) => {
  if (req.body.user && req.body.pass) {
    
    req.session.user = req.body.user
    res.json({ ok: true })
  } else {
    res.status(401).json({ ok: false })
  }
})

router.post('/logout', (req, res) => {
  delete req.session.user
  res.json({ ok: true })
})

module.exports = router
