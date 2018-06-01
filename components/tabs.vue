<template>
<div :data='data'>

  <div class="tabs">
    <button v-for="(v, i) in tabs" :key="i" @click="current = v" class="btn" :class="{ active: current === v }">{{v}}</button>
  </div>
  <section v-if="current === tabs[0]">
    <div v-if="data.length">
      <div v-for="(v, i) in data" :key="i">
        <a :href="'/'+v._id">{{v.title}}</a>
        <button type="button" @click="del">×</button>
      </div>
    </div>
    <div v-else>
      <p>没有数据</p>
    </div>
  </section>
  <section v-if="current === tabs[1]">
    <div v-if="data.votefor">
      <div v-for="(v, i) in data" :key="i"><a :href="'/'+v._id">{{v.title}}</a></div>
    </div>
    <div v-else>
      <p>没有数据</p>
    </div>
  </section>

</div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['data'],
  data () {
    return {
      current: '我的',
      tabs: ['我的', '已投']
    }
  },
  methods: {
    async del (e) {
      let cf = confirm('确认删除?')
      if (!cf) {
        return
      }
      let user = this.$store.state.user
      let id = /^[\s\S]+\/([a-zA-Z0-9]+)$/.exec(e.currentTarget.parentNode.children[0].href)[1]
      try {
        await axios.post(window.location.origin + '/api/del', { user, id })
        window.location.reload()
      } catch (e) {
        alert(e.data.msg || e.message)
      }
    }
  }
}
</script>

<style lang="scss">
$primary: #e0e0e0;
$secondary: #d0d0d0;
$listBorder: #cccccc;
$danger: #dc3545;
$warning: #ffc107;
$info: #007bff;
.tabs {
  button {
    border-width: 0;
    border-radius: 5px 5px 0 0;
    border-color: transparent;
    &:focus {
      box-shadow: none;
    }
    &:hover {
      opacity: 0.7;
    }
  }
}
section {
  position: relative;
  border: 1px solid $info;
  padding: 15px 0;
  &>div {
    width: 100%;
    text-align: center;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    div {
      display: inline-block;
      width: 50%;
      min-width: 33%;
      padding: 10px;
      overflow: hidden;
      * {
        border-radius: 2px;
        border-style: none;
      }
      p {
        position: absolute;
        top: 25%;
        left: 0;
        width: 100%;
        margin: 0;
      }
      a {
        max-width: 80%;
        background-color: $secondary;
        text-overflow: ellipsis;
        &:hover {
          background-color: $primary;
        }
      }
      button {
        outline: none;
        background-color: $warning;
        width: 20%;
        max-width: 30px;
        max-height: 30px;
        float: right;
        cursor: pointer;
        &:hover {
          opacity: 0.5;
        }
        &:active {
          background-color: $danger;
        }
      }
    }
  }
}
.active {
  color: white;
  background-color: $info;
}
</style>
