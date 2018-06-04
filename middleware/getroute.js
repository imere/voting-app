import votes from '../data/mongo.js'
export default async function ({ req, store, route, error }) {
  await new Promise((resolve, reject) => {
    votes.get({}, (err, dat) => {
      if (err) {
        reject(error({ statusCode: 500, message: 'Data Error' }))
      }
      resolve(store.commit('SET_ROUTE', dat))
    }, {
      _id: 1
    })
  })
}
