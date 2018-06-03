const router = require('express').Router()
const { ObjectID } = require('mongodb')
const users = require('../data/users')
const votes = require('../data/mongo')

router.post('/add', (req, res) => {
  if (!req.session || !req.session.user || !req.body.user || req.session.user !== req.body.user) {
    res.status(403).json({ msg: '需要登录重试' })
  } else if (!req.body.title || !req.body.opts) {
    res.status(400).json({ msg: 'Bad Request' })
  } else {
    let opts = []
    for (let k in req.body.opts) {
      opts.push({
        name: req.body.opts[k],
        count: 0
      })
    }
    votes.ins({
      owner: req.body.user,
      title: req.body.title,
      time: new Date().toUTCString(),
      item: opts,
      voteby: {
        auth: false,
        user: [],
        ip: []
      }
    }, (err, dat) => {
      if (err) {
        res.status(500).json({ ok: false })
      } else {
        res.json({ ok: true })
      }
    })
  } 
})

router.post('/del', (req, res) => {
  if (!req.session || !req.session.user || !req.body.user || req.session.user !== req.body.user) {
    res.status(403).json({ msg: '需要登录重试' })
  } else if (!req.body.id) {
    res.status(400).json({ msg: 'Bad Request' })
  } else {
    let ip = req.headers['x-forwarded-for'] ||
             req.connection.remoteAddress ||
             req.socket.remoteAddress ||
             req.connection.socket.remoteAddress
    votes.del({
      _id: ObjectID(req.body.id)
    }, (err, dat) => {
      if (err) {
        res.status(500).json({ ok: false })
      } else {

        users.upd({}, {
          $pullAll: {
            votfor: [req.body.id]
          }
        }, (err, dat) => {
          if (err) {
            res.status(500).json({ msg: 'Update Faild' })
          } else {
            res.json({ ok: true })
          }
        })

      }
    })
  }
})

module.exports = router
