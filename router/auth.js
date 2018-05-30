const router = require('express').Router()

router.post('/login', (req, res) => {
  if (req.body.user === 'admin' && req.body.pass === 'pass') {
    req.session.user = 'admin'
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
