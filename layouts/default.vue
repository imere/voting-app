<template>
<div class="content">

<!--[if lt IE 9]>
<script src="https://img.hcharts.cn/highcharts/modules/oldie.js"></script>
<![endif]-->

<header class="t-header">
  <div class="search">
    <input class="searchbar" type="text" placeholder="Type To Search" v-model.trim="filter" />
  </div>
  <ul class="h-nav">
    <li><a href="/">Home</a></li>
    <li v-if="$store.state.user">
      <a href="javascript:void(0)">{{ $store.state.user }}</a>
    </li>
    <li v-else>
      <a href="javascript:void(0)">Login</a>
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
export default {
  data () {
    return {
      filter: ''
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
