<template>
<div class="show">

  <panel-component :msg="data" ref="pc"/>

  <highcharts-component :msg="data" ref="hc"/>

</div>
</template>

<script>
import axios from 'axios'
import PanelComponent from '~/components/panel.vue'
import HighchartsComponent from '~/components/HighchartsComponent.vue'
import { ObjectID } from 'mongodb'
import votes from '~/data/mongo'
export default {
  head () {
    return {
      title: this.data.title
    }
  },
  components: {
    PanelComponent,
    HighchartsComponent
  },
  validate ({ store, params, error }) {
    let f = false
    store.state.routes.some((v, i, arr) => {
      /* '_id' object to string  */
      if (v['_id'].toString() === params.id) {
        f = true
        return true
      } else {
        return false
      }
    })
    return f
  },
  async asyncData ({ store, params, error }) {
    let dat = []
    await new Promise((resolve, reject) => {
      votes.get({
        _id: ObjectID(params.id)
      }, (err, data) => {
        if (err) {
          reject(error({ message: '内部错误,请刷新重试', statusCode: 500 }))
        }
        resolve(dat = data)
      }, {
        projection: {
          owner: 0,
          voteby: 0
        }
      })
    })
    return {
      data: dat[0]
    }
  },
  data () {
    return {

    }
  },
  methods: {
    async updateChart (title) {
      let id = this.data._id
      let user = this.$store.state.user
      let votefor = title
      try {
        await axios.post(window.location.origin + '/api/vote', { id, user, votefor })
        alert('投票成功')
        window.location.reload()
      } catch (e) {
        alert(e.response.data.msg || e.message)
      }
    }
  },
  created () {
    this.$root.$on('updateChart', this.updateChart)
  },
  beforeDestroyed () {
    this.$root.$off('updateChart')
  }
}
</script>

<style lang="scss">
.show {
  height: inherit;
  position: relative;
  text-align: right;
  p {
    padding: 3% 0;
  }
  #message {
    position: absolute;
    left: 0;
    display: inline-block;
    width: 50%;
    text-align: center;
    padding: 3% 0;
    overflow: hidden;
    * {
      min-width: 200px;
    }
    select {
      margin: 0 0 10px 0;
      outline: none;
      border-radius: 5px;
    }
    #item {
      text-align: center;
      * {
        min-width: 30%;
      }
      input[type="text"] {
        border-radius: 5px 0 0 5px;
      }
      input[type="button"] {
        min-width: 30px;
        min-height: 30px;
        border-radius: 0 5px 5px 0;
      }
    }
  }
  #chart {
    position: relative;
    display: inline-block;
    width: 50%;
  }
}
@media (max-width: 770px) {
  .show {
    text-align: center;
    #message {
      position: relative;
      width: 100%;
      padding: 3% 0;
    }
    #chart {
      width: 100%;
    }
  }
}
</style>
