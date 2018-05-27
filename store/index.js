import axios from 'axios'
export const state = () => ({
  user: null,
  dt: {}
})

export const mutations = {
  ADD_LIST (state, votes) {
    state.dt = votes
  },
  SET_UESR (state, user) {
    state.user = user
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.user) {
      commit('SET_USER', req.session.user)
    }
  },
  async login ({ commit }, { user, pass }) {
    try {
      const { data } = await axios.post('/login', { user, pass })
      commit('SET_USER', data)
    } catch (e) {
      if (e.response && e.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw e
    }
  },
  async logout ({ commit }) {
    await axios.post('/logout')
    commit('SET_USER', null)
  }
}
