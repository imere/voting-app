<template>
<div class="content">

<header class="t-header">
  <input type="text" placeholder="Type To Search" v-model="filter" />
  <ul class="h-nav">
    <li><a v-bind:class="" href="/">Home</a></li>
    <li><a v-bind:class="" href="#">Login</a></li>
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
</div>
</template>

<script>
export default {
  data(){
    return {
      filter: ""
    };
  },
  computed: {
    listFilter(){
      let filter = this.filter.trim();
      return this.data.filter(function(v){
        return v[0].indexOf(filter) !== -1
      })
    }
  }
}
</script>
