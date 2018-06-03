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
  nuxtServerInit ({ commit }, { req, store }) {
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
        throw new Error('认证错误')
      }
      if (e.response && e.response.status === 400) {
        throw new Error('用户已存在')
      }
      throw e
    }
  },
  async logout ({ commit }) {
    await axios.post('/auth/logout')
    commit('SET_USER', null)
  }
}
