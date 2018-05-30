const router = require('express').Router()
const votes = require('../data/mongo.js')
const { ObjectID } = require('mongodb')

router.post('/add', (req, res) => {
  if (!req.session || !req.session.user || !req.body.user || req.session.user !== req.body.user) {
    res.status(403).json({ msg: '需要登录重试' })
  } else if (!req.body.toadd || !req.body.id) {
    res.status(400).json({ msg: 'Bad Request' })
  } else {
    let ip = req.headers['x-forwarded-for'] ||
             req.connection.remoteAddress ||
             req.socket.remoteAddress ||
             req.connection.socket.remoteAddress
    votes.upd({
      _id: ObjectID(req.body.id)
    }, {
      $addToSet: {
        item: {
          name: req.body.toadd,
          count: 1
        },
        'voteby.user': req.body.user,
        'voteby.ip': ip
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

router.post('/vote', (req, res) => {
  if (!req.body.votefor || !req.body.id) {
    res.status(400).json({ msg: 'Bad Request' })
  } else {
    let ip = req.headers['x-forwarded-for'] ||
             req.connection.remoteAddress ||
             req.socket.remoteAddress ||
             req.connection.socket.remoteAddress
    votes.get({
      'voteby.user': req.body.user,
    }, (err, dat) => {
      if (err) {
        res.status(500).json({ ok: false })
      } else if (dat.length) {
        res.status(400).json({ msg: '同IP或用户只能投一次' })
      } else {

        votes.get({
          'voteby.ip': ip
        }, (err, dat) => {
          if (err) {
            res.status(500).json({ ok: false })
          } else if (dat.length) {
            res.status(400).json({ msg: '同IP或用户只能投一次' })
          } else {

            votes.upd({
              _id: ObjectID(req.body.id),
              'item.name': req.body.votefor
            }, {
              $inc: {
                'item.$.count': 1
              },
              $addToSet: {
                'voteby.user': req.body.user || '',
                'voteby.ip': ip
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

      }
    })

  }
})

module.exports = router
