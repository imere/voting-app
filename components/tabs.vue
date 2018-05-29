<template>
<div :data='data'>

  <div class="tabs">
    <button v-for="(v, i) in tabs" :key="i" @click="current = v" class="btn" :class="{ active: current === v }">{{v}}</button>
  </div>
  <section v-if="current === tabs[0]">
    <div v-for="(v, i) in data" :key="i">
      <a :href="'/'+v._id">{{v.title}}</a>
      <button type="button">×</button>
    </div>
  </section>
  <section v-if="current === tabs[1]">
    <div v-for="(v, i) in data" :key="i"><a :href="'/'+v._id">{{v.title}}</a></div>
  </section>

</div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      current: '我的',
      tabs: ['我的', '已投']
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
  text-align: center;
  border: 1px solid $info;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px 0;
  overflow: auto;
  div {
    width: 50%;
    min-width: 33%;
    padding: 10px;
    overflow: hidden;
    * {
      border-radius: 2px;
      border-style: none;
    }
    a {
      max-width: 80%;
      max-height: 30px;
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
.active {
  color: white;
  background-color: $info;
}
</style>
