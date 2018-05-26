<template>

  <ol class="list">
    <li v-for="v in data" v-bind:class="itemClass"><a :href="'/'+v['_id']">{{v['title']}}</a></li>
  </ol>

</template>

<script>
export default {
  async asyncData ({ store, params }) {
    return {
      data: store.state.dt
    }
  },
  data () {
    return {
      itemClass: {
        item: true
      }
    }
  },
  generate: {
    routes: function () {
      return this.$store.state.dt.map((v, i, arr) => {
        return '/' + v['_id']
      })
    }
  }
}
</script>
