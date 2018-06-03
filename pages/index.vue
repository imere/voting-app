<template>

  <ol v-if="data.length" class="list">
    <li v-for="(v, i) in data" v-bind:class="itemClass" :key="i"><a :href="'/'+v['_id']">{{v['title']}}</a></li>
  </ol>
  <div v-else>
    <p>没有数据</p>
    <p>登录后添加</p>
  </div>

</template>

<script>
import votes from '../data/mongo'
export default {
  async asyncData ({ store, params, error }) {
    await new Promise((resolve, reject) => {
      votes.get({}, (err, dat) => {
        if (err) {
          reject(error({ statusCode: 500, message: 'Get Data Error' }))
        }
        resolve(store.commit('ADD_LIST', dat))
      }, {
        projection: {
          _id: 1,
          title: 1
        }
      })
    })
    return {
      data: store.state.dt
    }
  },
  data () {
    return {
      itemClass: {
        item: true
      }
    }
  }
  /* generate: {
    routes: function () {
      return this.$store.state.dt.map((v, i, arr) => {
        return '/' + v['_id']
      })
    }
  } */
}
</script>

<style lang="scss" scoped>
p {
  font-size: 25px;
  text-align: center;
}
</style>
