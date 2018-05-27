<template>
<div id="chart" :msg='msg'></div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import Options from '~/config/chartcfg.js'
export default {
  props: ['msg'],
  data () {
    let opts = {}
    Object.assign(opts, Options)
    opts.series[0].data = this.msg.item.map((v, i, arr) => {
      return { name: v.name, y: v.count }
    })
    return {
      chart: null,
      options: opts
    }
  },
  mounted () {
    /* eslint-disable */
    this.chart = new Highcharts.chart('chart', this.options)
    /* eslint-enable */
  }
}
</script>
