<template>
<div class="personal">

  <div>
    <h5>用户名: {{$route.params.user}}</h5>
  </div>

  <tabs :data='data'/>

</div>
</template>

<script>
import Tabs from '~/components/tabs.vue'
import votes from '~/data/mongo'
export default {
  components: {
    Tabs
  },
  middleware: ['auth'],
  async asyncData ({ store, params, error }) {
    let dat = []
    await new Promise((resolve, reject) => {
      votes.get({
        owner: params.user
      }, (err, data) => {
        if (err) {
          reject(error({ message: 'Internal Error', stasusCode: 500 }))
        }
        if (!data.length) {
          error({ stasusCode: 404, message: 'Not Found' })
        }
        resolve(dat = data)
      }, {
        projection: {
          _id: 1,
          title: 1
        }
      })
    })
    return {
      data: dat
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
