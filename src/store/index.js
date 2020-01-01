import Vue from 'vue'
import Vuex from 'vuex'

import session from './modules/session.js'

Vue.use(Vuex)

const store = new Vuex.Store({

  modules: {
    session: session
  }

})

const STORE_NAME = 'ink.organics.backend.store'

function parse (storeJson) {
  if (storeJson) {
    const hStore = JSON.parse(storeJson)
    if (hStore && hStore.session && Object.keys(hStore.session).length === Object.keys(session.state).length) {
      if (hStore.session.userSession.isLogin) {
        return Object.assign({}, hStore)
      } else {
        // 在反序列化时，如果登陆已失效则初始化userSession对象
        hStore.session.userSession = session.state.userSession
        return Object.assign({}, hStore)
      }
    }
  }
}

if (localStorage) {
  const hStore = parse(localStorage.getItem(STORE_NAME))
  if (hStore) {
    store.replaceState(hStore)
  }
} else if (sessionStorage) {
  const hStore = parse(sessionStorage.getItem(STORE_NAME))
  if (hStore) {
    store.replaceState(hStore)
  }
}

addEventListener('beforeunload', () => {
  if (localStorage) {
    localStorage.setItem(STORE_NAME, JSON.stringify(store.state))
  } else if (sessionStorage) {
    sessionStorage.setItem(STORE_NAME, JSON.stringify(store.state))
  }
})

export default store
