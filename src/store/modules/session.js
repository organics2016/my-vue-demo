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
      routes: [],
      lastActiveRoute: {},
      defaultActiveRoute: {}
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

      const subRoutes = routes(state.userSession.permissions)
      // 没有路由匹配不对路由store做任何处理
      if (subRoutes.length === 0) {
        return
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

      state.userRouter.routes = [
        {
          path: '/home',
          component: () => import(/* webpackChunkName: "about" */ '../../views/home/Home.vue'),
          children: subRoutes
        }
      ]

      state.userRouter.defaultActiveRoute = subRoutes[0]
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
      state.userRouter = {
        routes: [],
        lastActiveRoute: {},
        defaultActiveRoute: {}
      }
    }
  }
}
