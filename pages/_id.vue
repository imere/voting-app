<template>

<div v-if="!isNaN(+params.id)">
<div id="chart"></div>
<script src="/drawchart.js"></script>
</div>

</template>

<script>
import axios from "axios"
export default {
	async asyncData({params, error}){
		try{
			let {data} = await axios.get("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json")
			return {
				params: params,
				data: data
			}
		}catch(e){
			error({message: "Info Not Found", statusCode: 404})
		}
	}
}
</script>
