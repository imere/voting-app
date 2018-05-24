<template>
<div class="show">

  <div id="message">
    <h2 class="header">标题</h2>
    <br/>
    <select v-model="sel">
      <option :disabled="true" value="">选择一项投票</option>
      <option v-for="(v, k) in data.data" :value="v[0]" :key="k">{{v[0]}}</option>
    </select>
    <p><input class="btn btn-primary" type="button" value="submit" @click="updateChart" :disabled="!sel"/></p>
    <p><a ref="share" class="qcShareQQDiv" href="#" target="_blank">分享到QQ</a></p>
  </div>
  <highcharts-component :options="options" ref="sc"/>

<script src="http://connect.qq.com/widget/loader/loader.js" widget="shareqq" charset="utf-8"></script>
<!--script src="/drawchart.js"></script-->
</div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import axios from "axios";
import HighchartsComponent from "~/components/HighchartsComponent.vue";
export default {
  components: {
    HighchartsComponent
  },
  validate({ store, params }) {
    let f = false;
    store.state.dt.data.some((v, i, arr) => {
      if (v[1].toString() === params.id) {
        f = true;
        return true;
      } else {
        return false;
      }
    });
    return f;
  },
  async asyncData({ store, params, error }) {
    return {
      data: store.state.dt,
    }
  },
  data() {
    return {
      sel: "",
      options: {
	chart: {
	  plotBackgroundColor: "#f5f5f5",
	  plotBorderColor: "#f5f5f5",
	  type: "pie"
	},
        title: {
	  floating: false,
          text: this.$store.state.dt.source_name
        },
        subtitle: {
          text: this.$store.state.dt.update_at
        },
        plotOptions: {
            pie: {
	      allowPointSelect: true,
	      cursor: "pointer",
              dataLabels: {
                enabled: true,
                distance: -30,
                style: {
                  fontWeight: "bold",
                  color: "white",
                  textShadow: "0px 1px 2px black"
                },
		showInLegend: true
              },
              //startAngle: -90,
              //endAngle: -90,
              center: ["50%", "50%"],
	      point: {
		events: {

		}
	      }
            },
            enableMouseTracking: true
        },
        tooltip: {
          valueSuffix: "\xB0C"
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
          borderWidth: 1
        },
        series: [
          {
            //type: "pie",
            innerSize: "40%",
            name: "",
            data: [
              ["1947-01-01", 243.1],
              ["1947-04-01", 246.3],
              ["1947-07-01", 250.1],
              ["1947-10-01", 260.3],
              ["1948-01-01", 266.2],
              ["1948-04-01", 272.9],
              ["1948-07-01", 279.5],
              ["1948-10-01", 280.7],
              ["1949-01-01", 275.4],
              ["1949-04-01", 271.7],
              {name: "1949-07-01", y: 273.3},
              ["1949-10-01", 271],
              ["1950-01-01", 281.2],
              ["1950-04-01", 290.7],
              ["1950-07-01", 308.5]
            ]
          }
        ]
      }
    }
  },
  start() {
      var p = {
	url: encodeURIComponent(location.href) , /*获取URL，可加上来自分享到QQ标识，方便统计*/
	desc:'投票分享', /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
	title:'投票分享', /*分享标题(可选)*/
	summary:'投票分享', /*分享摘要(可选)*/
	pics: "null", /*分享图片(可选)*/
	flash: '', /*视频地址(可选)*/
	site:'投票系统', /*分享来源(可选) 如：QQ分享*/
	style:'101',
	width:96,
	height:24
      };
      var s = [];
      for(var i in p){
	s.push(i + '=' + encodeURIComponent(p[i]||''));
      }
      var qqhref = "http://connect.qq.com/widget/shareqq/index.html?"+s.join('&')
      this.$refs.share.href = qqhref;
  },
  methods: {
    createChart() {},
    updateChart() {
      this.$refs.sc.chart.series[0].addPoint([this.sel, Math.random()*600])
    }
  }
};
</script>
