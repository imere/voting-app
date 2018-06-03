const router = require('express').Router()
const users = require('../data/users')

router.post('/add', (req, res) => {
  let user = req.body.user
  let pass = req.body.pass
  let email = req.body.email
  if (!user || !pass) {
    res.status(400).json({ ok: false })
  } else if (!/^[a-zA-Z0-9]{5,10}$/.test(user) ||
    !/^[a-zA-Z0-9]{6,15}$/.test(pass)) {
     res.status(400).json({ msg: 'Bad Format' })   
  } else {

    users.get({
      user: user
    }, (err, dat) => {
      if (err) {
        res.status(500).json({ ok: false })
      } else if (dat.length) {
        res.status(400).json({ msg: 'User Exists' })
      } else {

        users.ins({
          user: user,
          pass: pass,
          email: email || '',
          lastLogin: '',
          votefor: ''
        }, (err, dat) => {
          if (err) {
            res.status(500).json({ ok: false })
          } else {
            res.json({ ok: true })
          }
        })

      }
    })

  }
})

module.exports = router
