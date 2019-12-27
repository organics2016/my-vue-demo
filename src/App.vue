<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'

const { mapState, mapGetters } = createNamespacedHelpers('session')

export default {
  name: 'app',

  computed: {
    ...mapState(['userSession']),
    ...mapGetters(['userRoutes', 'userActiveRoute'])
  },

  created () {
    if (!this.userSession.isLogin) {
      this.$router.replace({ name: 'login' })
      return
    }

    this.$router.addRoutes(this.userRoutes)

    this.$router.replace({ name: this.userActiveRoute.name })
  },

  mounted () {

  }
}
</script>
