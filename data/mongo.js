const mgc = require('mongodb').MongoClient

const uri = process.env.vuri || 'mongodb://127.0.0.1:27017'
/* eslint-disable */
const votes = {
  get: (filter, cb, options = {}) => {
    mgc.connect(uri, { useNewUrlParser: true }, (err, client) => {
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
    mgc.connect(uri, { useNewUrlParser: true }, function (err, client) {
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
    mgc.connect(uri, { useNewUrlParser: true }, function (err, client) {
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
    mgc.connect(uri, { useNewUrlParser: true }, function (err, client) {
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
