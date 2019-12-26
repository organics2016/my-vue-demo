<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'

// import { routes } from '../../menus'

const { mapState } = createNamespacedHelpers('session')

export default {
  name: 'app',

  computed: {
    ...mapState(['session'])
  },

  mounted () {
    // TODO 将session数据存入localStorage，或 sessionStorage
    if (this.session.isLogin) {
      this.$router.forward()
    } else {
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>
