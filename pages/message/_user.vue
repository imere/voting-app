<template>
<div class="personal">

  <div>
    <h5>用户名: {{$store.state.user}}</h5>
  </div>

  <tabs :data='data'/>

</div>
</template>

<script>
import { ObjectID } from 'mongodb'
import Tabs from '~/components/tabs.vue'
import users from '~/data/users'
import votes from '~/data/mongo'
export default {
  components: {
    Tabs
  },
  middleware: ['auth'],
  async asyncData ({ store, params, error }) {
    let host = null
    let votefor = null
    await new Promise((resolve, reject) => {
      votes.get({
        owner: params.user
      }, (err, data) => {
        if (err) {
          reject(error({ message: 'Internal Error', statusCode: 500 }))
        }
        resolve(host = data)
      }, {
        _id: 1,
        title: 1
      })
    })
    await new Promise((resolve, reject) => {
      users.get({
        user: params.user
      }, (err, data) => {
        if (err) {
          reject(error({ message: 'Internal Error', statusCode: 500 }))
        } else {
          votes.get({
            _id: {
              $in: data[0].votefor.map(v => ObjectID(v))
            }
          }, (err, dat) => {
            if (err) {
              reject(error({ message: 'Internal Error', statusCode: 500 }))
            } else {
              resolve(votefor = dat)
            }
          }, {
            _id: 1,
            title: 1
          })
        }
      }, {
        _id: 0,
        votefor: 1
      })
    })
    return {
      data: {
        host: host,
        votefor: votefor
      }
    }
  }
}
</script>

<style lang="scss">
$primary: #e0e0e0;
$secondary: #d0d0d0;
$listBorder: #cccccc;
.personal {
  padding: 20px 40px;
  border-radius: 5px;
  & > div {
    margin-bottom: 20px;
  }
}
</style>
