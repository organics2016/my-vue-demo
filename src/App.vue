<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import { STORE_NAME } from './common/appconfig'

import { createNamespacedHelpers } from 'vuex'

// import { routes } from '../../menus'

const { mapState } = createNamespacedHelpers('session')

export default {
  name: 'app',

  computed: {
    ...mapState(['session'])
  },

  created () {
    if (localStorage) {
      const store = localStorage.getItem(STORE_NAME)
      if (store) {
        this.$store.replaceState(Object.assign({}, JSON.parse(store)))
      }
    } else if (sessionStorage) {
      const store = sessionStorage.getItem(STORE_NAME)
      if (store) {
        this.$store.replaceState(Object.assign({}, JSON.parse(store)))
      }
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    addEventListener('beforeunload', () => {
      if (localStorage) {
        localStorage.setItem(STORE_NAME, JSON.stringify(this.$store.state))
      } else if (sessionStorage) {
        sessionStorage.setItem(STORE_NAME, JSON.stringify(this.$store.state))
      }
    })
  },

  mounted () {
    if (this.session.isLogin) {
      this.$router.back()
    } else {
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>
