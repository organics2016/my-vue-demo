export default {

  namespaced: true,

  state: {
    session: {
      userid: '',
      username: '',
      nickname: '',
      token: '',
      isLogin: false,
      user: {}
    }
  },
  mutations: {
    cacheSession (state, session) {
      state.session.username = session.username
      state.session.isLogin = true
      state.session.username = session.token
      state.session.user = session
    },

    unCacheSession (state) {
      state.session = {}
    }

  }
}
