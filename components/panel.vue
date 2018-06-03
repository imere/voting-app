<template>
<div id="message" :msg='msg'>

  <h2 class="header">{{data.title}}</h2>
  <br/>
  <select v-model="sel">
    <option :disabled="true" value="">选择一项投票</option>
    <option v-for="(v, k) in data.item" :value="v.name" :key="k">{{v.name}}</option>
  </select>
  <p id="item" v-if="this.$store.state.user">
    <input type="text" v-model.trim="toadd" placeholder="对选项不满意?添加+"/>
    <input type="button" value="+" :disabled="!toadd" @click="add"/>
  </p>
  <p><input class="btn btn-primary" type="button" value="submit" @click.once="updateChart" :disabled="!sel"/></p>
  <p><a ref="share" class="qcShareQQDiv" href="javascript:void(0)" target="_blank">分享到QQ</a></p>

<script ref="src" src="" widget="shareqq" charset="utf-8"></script>
</div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['msg'],
  data () {
    return {
      sel: '',
      toadd: '',
      data: this.msg
    }
  },
  methods: {
    updateChart () {
      this.$root.$emit('updateChart', this.sel)
    },
    async add () {
      let id = this.$route.params.id
      let toadd = this.toadd
      let user = this.$store.state.user
      if (!id || !toadd || !user) {
        return alert('Request Faild')
      }
      try {
        await axios.post(window.location.origin + '/api/add', { user, id, toadd })
        window.location.reload()
      } catch (e) {
        return alert(e.message)
      }
      this.toadd = ''
    }
  },
  mounted () {
    var p = {
      url: encodeURIComponent(window.location.href), /* 获取URL，可加上来自分享到QQ标识，方便统计 */
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
    this.$refs.src.src = 'http://connect.qq.com/widget/loader/loader.js'
  }
}
</script>
