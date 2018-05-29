const router = require('express').Router()

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
  res.json({ ok: true })
})

module.exports = router