<template>
<div class="show">

  <panel-component :msg="data" ref="pc"/>

  <highcharts-component :msg="data" ref="hc"/>

</div>
</template>

<script>
import PanelComponent from '~/components/panel.vue'
import HighchartsComponent from '~/components/HighchartsComponent.vue'
import { ObjectID } from 'mongodb'
import votes from '../data/mongo.js'
export default {
  components: {
    PanelComponent,
    HighchartsComponent
  },
  validate ({ store, params }) {
    let f = false
    store.state.dt.some((v, i, arr) => {
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
    let v = []
    await new Promise((resolve, reject) => {
      votes.get({
        _id: ObjectID(params.id)
      }, (err, dat) => {
        if (err) {
          reject(error({ message: '内部错误,请刷新重试', stasusCode: 500 }))
        }
        resolve(v = dat)
      }, {
        projection: {
          owner: 0,
          voteby: 0
        }
      })
    })
    return {
      data: v[0]
    }
  },
  data () {
    return {

    }
  },
  methods: {
    updateChart (title) {
      this.$refs.hc.chart.series[0].addPoint([title, Math.random() * 600])
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
