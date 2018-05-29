const router = require('express').Router()
const votes = require('../data/mongo.js')

router.post('/add', (req, res) => {
  if (!req.session || !req.session.user || !req.body.user || req.session.user !== req.body.user) {
    res.status(403).json({ message: 'Unauthorized' })
  } else if (!req.body.toadd) {
    res.status(400).json({ message: 'Bad request' })
  } else {
    res.json({ ok: true })
  }
})

module.exports = router
