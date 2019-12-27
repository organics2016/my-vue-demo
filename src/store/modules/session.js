import { routes } from '../../modules/menus'

export default {

  namespaced: true,

  // 整个回话域被分为 userSession 和 userRouter
  state: {
    userSession: {
      userid: '',
      username: '',
      nickname: '',
      token: '',
      permissions: [],
      isLogin: false,
      user: {}
    },
    userRouter: {
      lastActiveRoute: {}
    }
  },
  mutations: {
    cacheSession (state, session) {
      state.userSession.userid = session.userid
      state.userSession.username = session.username
      state.userSession.nickname = session.nickname
      state.userSession.token = session.token
      state.userSession.permissions = session.permissions
      state.userSession.isLogin = true
      state.userSession.user = session
    },

    unCacheSession (state) {
      state.userSession = {
        userid: '',
        username: '',
        nickname: '',
        token: '',
        permissions: [],
        isLogin: false,
        user: {}
      }
    }
  },

  getters: {
    userRoutes: state => {
      const subRoutes = routes(state.userSession.permissions)

      if (subRoutes.length === 0) {
        return []
      }

      subRoutes.push(
        {
          path: 'error/:errorCode',
          component: () => import(/* webpackChunkName: "about" */ '../../components/error/Error.vue')
        },
        {
          path: '*',
          redirect: 'error/404'
        }
      )

      return [
        {
          path: '/home',
          component: () => import(/* webpackChunkName: "about" */ '../../views/home/Home.vue'),
          children: subRoutes
        }
      ]
    },

    userDefaultActiveRoute: (state, getters) => {
      const userRoutes = getters.userRoutes
      if (userRoutes.length === 0) {
        return {}
      }
      return userRoutes[0].children[0]
    },

    userLastActiveRoute: (state) => {
      return state.userRouter.lastActiveRoute
    },

    userActiveRoute: (state, getters) => {
      const userLastActiveRoute = getters.userLastActiveRoute
      if (Object.keys(userLastActiveRoute).length !== 0) {
        // 检查最新的 userRouter 里是否包含 userLastActiveRoute
        const userRoutes = getters.userRoutes
        if (userRoutes.length !== 0) {
          if (userRoutes[0].children.filter((route) => userLastActiveRoute.name === route.name).length !== 0) {
            return userLastActiveRoute
          }
        }
      }
      return getters.userDefaultActiveRoute
    }

  }
}
