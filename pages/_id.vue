<template>
<div class="show">

  <div id="message">
    <h2 class="header">{{data.title}}</h2>
    <br/>
    <select v-model="sel">
      <option :disabled="true" value="">选择一项投票</option>
      <option v-for="(v, k) in data.item" :value="v.name" :key="k">{{v.name}}</option>
    </select>
    <p><input class="btn btn-primary" type="button" value="submit" @click="updateChart" :disabled="!sel"/></p>
    <p><a ref="share" class="qcShareQQDiv" href="javascript:void(0)" target="_blank">分享到QQ</a></p>

  </div>

  <highcharts-component :options="options" ref="sc"/>

<script src="http://connect.qq.com/widget/loader/loader.js" widget="shareqq" charset="utf-8"></script>
<!--script src="/drawchart.js"></script-->
</div>
</template>

<script>
import HighchartsComponent from '~/components/HighchartsComponent.vue'
import Options from '../config/chartcfg.js'
import { ObjectID } from 'mongodb'
import votes from '../data/mongo.js'
export default {
  components: {
    HighchartsComponent
  },
  validate ({ store, params }) {
    let f = false
    store.state.dt.some((v, i, arr) => {
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
          reject(error({ stasusCode: 500 }))
        }
        resolve(v = dat)
      }, {
        projection: {
          owner: 0,
          voteby: 0
        }
      })
    })
    /* set chart options  */
    let opts = {}
    Object.assign(opts, Options)
    opts.series[0].data = v[0].item.map((v, i, arr) => {
      return { name: v.name, y: v.count }
    })
    return {
      data: v[0],
      options: opts
    }
  },
  data () {
    return {
      sel: ''
    }
  },
  mounted () {
    var p = {
      url: encodeURIComponent(location.href), /* 获取URL，可加上来自分享到QQ标识，方便统计 */
      desc: '投票分享', /* 分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔） */
      title: '投票分享', /* 分享标题(可选) */
      summary: '投票分享', /* 分享摘要(可选) */
      pics: 'null', /* 分享图片(可选) */
      flash: '', /* 视频地址(可选) */
      site: '投票系统', /* 分享来源(可选) 如：QQ分享 */
      style: '101',
      width: 96,
      height: 24
    }
    var s = []
    for (var i in p) {
      s.push(i + '=' + encodeURIComponent(p[i] || ''))
    }
    var qqhref = 'https://connect.qq.com/widget/shareqq/index.html?' + s.join('&')
    this.$refs.share.href = qqhref
  },
  methods: {
    updateChart () {
      this.$refs.sc.chart.series[0].addPoint([this.sel, Math.random() * 600])
    }
  }
}
</script>
