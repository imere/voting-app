<template>
<div>

<div class="container">
  <p v-if="typeof error.statusCode === 'number'">{{error.statusCode}}<br/>{{error.message}}</p>
  <p v-else>emmmm 貌似出了点问题</p>
  <nuxt-link to="/">回首页</nuxt-link>
</div>

</div>
</template>

<script>
module.exports = {
  props: ['error']
}
</script>

<style scoped>
.container {
  text-align: center;
}
p {
  padding-top: 10%;
  font-size: 2.5rem;
}
</style>
