export default {

  namespaced: true,

  state: {
    session: {
      userid: '',
      username: '',
      nickname: '',
      token: '',
      permissions: [],
      isLogin: false,
      user: {}
    }
  },
  mutations: {
    cacheSession (state, session) {
      state.session.userid = session.userid
      state.session.username = session.username
      state.session.nickname = session.nickname
      state.session.token = session.token
      state.session.permissions = session.permissions
      state.session.isLogin = true
      state.session.user = session
    },

    unCacheSession (state) {
      state.session = {
        userid: '',
        username: '',
        nickname: '',
        token: '',
        permissions: [],
        isLogin: false,
        user: {}
      }
    }
  }
}
