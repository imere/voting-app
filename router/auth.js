const router = require('express').Router()
const users = require('../data/users')

router.post('/login', (req, res) => {
  let user = req.body.user
  let pass = req.body.pass
  if (!user || !pass) {
    res.status(400).json({ ok: false })
  } else {
    users.get({
      user: user,
      pass: pass
    }, (err, dat) => {
      if (err) {
        res.status(500).json({ ok: false })
      } else if (dat.length) {
        req.session.user = user
        res.json({ ok: true })
      } else {
        res.status(401).json({ msg: '用户或密码错误' })
      }
    })
  }
})

router.post('/logout', (req, res) => {
  delete req.session.user
  res.json({ ok: true })
})

module.exports = router
