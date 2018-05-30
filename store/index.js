import axios from 'axios'
export const state = () => ({
  user: null,
  routes: null,
  dt: null
})

export const mutations = {
  SET_ROUTE: function (state, routes) {
    state.routes = routes
  },
  ADD_LIST: function (state, dat) {
    state.dt = dat
  },
  SET_USER: function (state, user) {
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
      let { data } = await axios.post('/auth/login', { user, pass })
      commit('SET_USER', data)
    } catch (e) {
      if (e.response && e.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw e
    }
  },
  async logout ({ commit }) {
    await axios.post('/auth/logout')
    commit('SET_USER', null)
  }
}
