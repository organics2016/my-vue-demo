import Vue from 'vue'
import Vuex from 'vuex'

import session from './modules/session.js'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    session: session
  }

})
