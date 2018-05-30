<template>
<div class="content">

<!--[if lt IE 9]>
<script src="https://img.hcharts.cn/highcharts/modules/oldie.js"></script>
<![endif]-->

<div class="fixed">
<div class="box">
  <form>
    <fieldset>
    <div class="t">
      注册/登录<span id="close" class="close">×</span>
    </div>
      <div class="m">
      <div>用户名: <input type="text" v-model.trim="user"/></div>
      <div>密码: <input type="password" v-model.trim="pass"/></div>
      </div>
      <div class="b">
        <button type="button" @click="reg" >注册</button>
        <button type="button" @click="log">登录</button>
      </div>
      </fieldset>
  </form>
</div>
</div>
<script src="/js/logreg.js"></script>

<header class="t-header">
  <!--div class="search">
    <input class="searchbar" type="text" placeholder="Type To Search" v-model.trim="filter" />
  </div-->
  <ul class="h-nav">
    <li><a href="/">主页</a></li>
    <li v-if="$store.state.user">
      <a href="javascript:void(0)">{{ $store.state.user }}</a>
    </li>
    <li v-else>
      <a id="login">登录</a>
    </li>
  </ul>
</header>

<div class="container">
  <nuxt/>
</div>

<footer class="b-footer">
  <div>
    <p>
      contact: <a href="mailto:838914662@qq.com">838914662@qq.com</a>
    </p>
    <p>
      open-source: <a href="https://github.com/imere/voting-app">https://github.com/imere/voting-app</a>
    </p>
  </div>
</footer>

</div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      user: '',
      pass: ''
    }
  },
  methods: {
    reg () {
      console.log(this.user)
    },
    log () {
      console.log(this.user)
    }
  },
  computed: {
    listFilter () {
      let filter = this.filter.trim()
      return this.data.filter(function (v) {
        return v[0].indexOf(filter) !== -1
      })
    }
  }
}
</script>
