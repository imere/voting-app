<template>
<div class="content">

<!--[if lt IE 9]>
<script src="https://img.hcharts.cn/highcharts/modules/oldie.js"></script>
<![endif]-->

<div class="fixed">
  <form>
    <fieldset>
      <div class="t">
        注册/登录<span id="close" class="close" @click="clear">×</span>
      </div>
      <div class="m">
        <div>用户名: <input type="text" v-model.trim="user" @keyup.enter="login" placeholder="5-10位字母数字" /></div>
        <div>密码: <input type="password" v-model.trim="pass" @keyup.enter="login" placeholder="6-15位字母数字" /></div>
      </div>
      <div class="b">
        <button type="button" @click="register" >注册</button>
        <button type="button" @click="login">登录</button>
      </div>
    </fieldset>
  </form>
</div>

<header class="t-header">
  <!--div class="search">
    <input class="searchbar" type="text" placeholder="Type To Search" v-model.trim="filter" />
  </div-->
  <ul class="h-nav">
    <li><a href="/">主页</a></li>
    <li v-if="$store.state.user && !/^\/message\/[a-zA-Z]+/.test($route.fullPath)">
      <a :href="'/message/'+$store.state.user">{{ $store.state.user }}</a>
    </li>
    <li v-if="$store.state.user">
      <a @click="logout">退出</a>
    </li>
    <li v-else>
      <a id="logreg">登录</a>
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
  </div>
</footer>

<script src="/js/logreg.js"></script>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      user: '',
      pass: ''
    }
  },
  methods: {
    clear () {
      this.user = ''
      this.pass = ''
    },
    async register () {
      let user = this.user
      let pass = this.pass
      if (!user || !pass) {
        return alert('不能为空')
      } else {
        if (user.length > 10 || user.length < 5) {
          return alert('用户名格式不正确')
        }
        if (pass.length > 15 || pass.length < 6) {
          return alert('密码格式不正确')
        }
      }
      try {
        await axios.post(window.location.origin + '/user/add', { user, pass })
        alert('注册成功')
        window.location.reload()
      } catch (e) {
        alert(e.message)
      }
    },
    async login () {
      try {
        await this.$store.dispatch('login', { user: this.user, pass: this.pass })
        window.location.reload()
      } catch (e) {
        alert(e.message)
      }
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
        window.location.href = '/'
      } catch (e) {
        alert(e.message)
      }
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
