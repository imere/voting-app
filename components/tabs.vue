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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align: center;
    overflow: hidden;
    div {
      position: relative;
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
        display: inline-table;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        max-width: 80%;
        max-height: 30px;
        background-color: $secondary;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        &:hover {
          background-color: $primary;
        }
      }
      button {
        position: absolute;
        top: 25%;
        right: 10%;
        outline: none;
        background-color: $warning;
        width: 13%;
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
