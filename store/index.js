export const state = () => ({
	dt: {}
})

export const mutations = {
	ADD_LIST(state, list){
		state.dt.data = list
	}
}
