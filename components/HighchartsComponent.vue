<template>
<div id="chart" :options="options"></div>
</template>

<script>
import Highcharts from "highcharts/highstock"
export default {
  props: ["options"],
  data(){
    return {
      chart: null
    }
  },
  mounted(){
    this.chart = new Highcharts.chart("chart", this.options)
  }
}
</script>
