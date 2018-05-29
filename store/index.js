import axios from 'axios'
export const state = () => ({
  user: null,
  routes: null,
  dt: null
})

export const mutations = {
  SET_ROUTE (state, routes) {
    state.routes = routes
  },
  SET_UESR (state, user) {
    state.user = user
  },
  ADD_LIST (state, dat) {
    state.dt = dat
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
