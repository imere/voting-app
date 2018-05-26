import votes from '../data/mongo.js'
export default async function ({store, route}) {
  await new Promise((resolve, reject) => {
    votes.get({}, (err, dat) => {
      if (err) {
        reject(console.error(err))
      }
      resolve(store.commit('ADD_LIST', dat))
    }, {
      projection: {
        owner: 0,
        voteby: 0
      }
    })
  })
}
