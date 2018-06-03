import votes from '../data/mongo.js'
export default async function ({ req, store, route, error }) {
  await new Promise((resolve, reject) => {
    votes.get({}, (err, dat) => {
      if (err) {
        reject(error({ statusCode: 500, message: 'Data Error' }))
      }
      resolve(store.commit('SET_ROUTE', dat))
    }, {
      projection: {
        _id: 1
      }
    })
  })
  if (req.session && req.session.user) {
    store.commit('SET_USER', req.session.user)
  }
}
