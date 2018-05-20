import axios from "axios"
export default async function({store, route}){
	let {data} = await axios.get("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json")
	store.commit("ADD_LIST", data)
}
