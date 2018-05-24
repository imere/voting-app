<template>

  <ol class="list">
    <li v-for="v in data.data" v-bind:class="itemClass"><a :href="'/'+v[1]">{{v}}</a></li>
  </ol>

</template>

<script>
import axios from "axios"
export default {
	async asyncData({store, params, error}){

	},
	async asyncData({store, params}){
		return {
			data: store.state.dt
		}
	},
	data(){
		return {
			itemClass: {
				item: true
			},
		}
	},
	generate: {
		routes: function(){
			return this.$store.state.dt.data.map((v, i, arr) => {
				return "/"+v[1]
			})
		}
	}
}
</script>
