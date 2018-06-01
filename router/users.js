const router = require('express').Router()
const users = require('../data/users')
const userMax = 10
const passMax = 15

router.post('/add', (req, res) => {
  let user = req.body.user
  let pass = req.body.pass
  let email = req.body.email
  if (!user || !req.body.pass || user.length > userMax || pass.length > passMax) {
    res.status(400).json({ ok: false })
  } else {
    users.get({
      user: user
    }, (err, dat) => {
      if (err) {
        res.status(500).json({ ok: false })
      } else if (dat.length) {
        res.status(500).json({ msg: '用户已存在' })
      } else {

        users.ins({
          user: user,
          pass: pass,
          email: email || '',
          lastLogin: '',
          votefor: []
        }, (err, dat) => {
          if (err) {
            res.status(500).json({ ok: false })
          } else if (dat.length) {
            res.status(500).json({ msg: '用户已存在' })
          } else {

          }
        })

      }
    })
  }
})

router.post('/del', (req, res) => {
  res.json({})
})

module.exports = router
