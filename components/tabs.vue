<template>
<div :data='data'>

  <div class="tabs">
    <button v-for="(v, i) in tabs" :key="i" @click="current = v" class="btn" :class="{ active: current === v }">{{v}}</button>
    <div class="add">
      <button class="btn">+</button>
      <div class="box">
        <div class="top-field">
          <h6>添加投票</h6>
        </div>
        <div class="mid-field">
          <div>
            <label>主题</label>
            <input v-model="title" type="text" />
          </div>
          <div v-for="v in optCount" :key="v">
            <label>选项</label>
            <input v-model.trim="opts[v]" type="text" />
          </div>
        </div>
        <div class="bot-field">
          <button id="add" type="button" @click="addCount">添加选项</button>
          <button type="button" @click="addPoll">确定</button>
        </div>
      </div>
    </div>
  </div>
  <section v-if="current === tabs[0]">
    <div v-if="data.host.length">
      <div v-for="(v, i) in data.host" :key="i">
        <a :href="'/'+v._id">{{v.title}}</a>
        <button type="button" @click="del">×</button>
      </div>
    </div>
    <div v-else>
      <p>没有数据</p>
    </div>
  </section>
  <section v-if="current === tabs[1]">
    <div v-if="data.votefor.length">
      <div v-for="(v, i) in data.votefor" :key="i">
        <a :href="'/'+v._id">{{v.title}}</a>
      </div>
    </div>
    <div v-else>
      <p>没有数据</p>
    </div>
  </section>

</div>
</template>

<script>
import axios from 'axios'
// import votes from '~/data/mongo'
export default {
  props: ['data'],
  head () {
    return {
      script: [
        { src: '/js/up.js' }
      ]
    }
  },
  data () {
    return {
      current: '我的',
      tabs: ['我的', '已投'],
      optCount: 1,
      title: '',
      opts: {}
    }
  },
  methods: {
    addCount () {
      this.optCount++
    },
    async addPoll () {
      let user = this.$store.state.user
      let title = this.title
      let opts = this.opts
      if (!user || !title || !Object.keys(opts).length) {
        return alert('确认有标题且至少一个选项')
      }
      try {
        await axios.post(window.location.origin + '/poll/add', { user, title, opts })
        this.title = ''
        this.opts = {}
        alert('操作成功')
      } catch (e) {
        alert(e.message)
      }
    },
    async del (e) {
      let user = this.$store.state.user
      let id = /^[\s\S]+\/([a-zA-Z0-9]+)$/.exec(e.currentTarget.parentNode.children[0].href)[1]
      let cf = confirm('确认删除id\n' + id)
      if (!cf) {
        return
      }
      try {
        await axios.post(window.location.origin + '/poll/del', { user, id })
        window.location.reload()
      } catch (e) {
        alert(e.message)
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
  position: relative;
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
  .add {
    float: right;
    button {
      background-color: $info;
    }
    .box {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      min-height: 600%;
      text-align: center;
      color: white;
      background-color: rgba(100, 100, 100, 1);
      border-radius: 3px;
      box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.4);
      z-index: 500;
      &>div {
        padding: 20px 0;
        display: flex;
        &:not(:nth-of-type(3)) {
          flex-direction: column;
        }
        &:nth-of-type(3) {
          justify-content: space-around;
        }
        & *{
          label {
            width: 20%;
          }
          input {
            max-width: 100%;
            background-color: rgba(100, 100, 100, 1);
            border-width: 0 0 2px 0;
            border-color: $warning;
            margin: -2px;
            &:focus {
              outline: none;
              border-bottom: 2px solid $info;
            }
          }
        }
        &.top-field {
          h6 {
            font-weight: bold;
          }
        }
        &.mid-field {
          border-width: 1px 0;
          border-style: solid;
          border-color: $listBorder;
          div {
            margin: 5px 0;
          }
        }
        &.bot-field {
          button {
            color: white;
            background-color: transparent;
            border-width: 0;
            cursor: pointer;
          }
        }
      }
    }
    &:hover .box, &:active .box {
      display: block;
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
@media (max-width: 770px) {
  section {
    &>div {
      div {
        width: 100%;
      }
    }
  }
}
</style>
