<template>
  <div class="loading-page" v-if="loading">
    <p>Loading.....</p>
    <p>长时间无反应请刷新</p>
  </div>
</template>

<script>
module.exports = {
  data: () => ({
    loading: true
  }),
  mounted () {
    this.loading = false
  },
  methods: {
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(150, 150, 150, 1);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: Helvetica, sans-serif;
    z-index: 9999;
  }
</style>
