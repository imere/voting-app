const mgc = require('mongodb').MongoClient

const uri = 'mongodb://127.0.0.1:27017'
/* eslint-disable */
const init = () => {
  mgc.connect(uri, function (err, client) {
    if (err) {
      return console.error(err)
    }
    client.db('voting').collection('votes').insertOne({
      owner: 'admin',
      title: '投个票',
      time: new Date().toUTCString(),
      item: [
        {
          name: '电脑',
          count: 3
        }, {
          name: 'ANDROID',
          count: 5
        }, {
          name: 'IPHONE',
          count: 1
        }
      ],
      voteby: {
        auth: false,
        user: [],
        ip: []
      }
    })
    client.close()
  })
}

const votes = {
  get: (filter, cb, options = {}) => {
    mgc.connect(uri, (err, client) => {
      if (err) {
        return cb(err)
      }
      client.db('voting').collection('votes').find(filter, options).toArray((err, res) => {
        cb(null, res)
        client.close()
      })
    })
  },

  ins: (filter, cb, options = {}) => {
    mgc.connect(uri, function (err, client) {
      if (err) {
        return cb(err)
      }
      client.db('voting').collection('votes').insertOne(filter, options, (err, res) => {
        if (err) {
          return cb(err)
        }
        return cb(null, res)
      })
      client.close()
    })
  },

  upd: (filter, update, cb, options = {}) => {
    mgc.connect(uri, function (err, client) {
      if (err) {
        return cb(err)
      }
      client.db('voting').collection('votes').findOneAndUpdate(filter, update, options, (err, res) => {
        if (err) {
          return cb(err)
        }
        return cb(null, res)
      })
      client.close()
    })
  },

  del: (filter, cb, options = {}) => {
    mgc.connect(uri, function (err, client) {
      if (err) {
        return cb(err)
      }
      client.db('voting').collection('votes').deleteOne(filter, options, (err, res) => {
        if (err) {
          return cb(err)
        }
        return cb(null, res)
      })
      client.close()
    })
  }
}

module.exports = votes
