<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('session')

export default {
  name: 'app',

  computed: {
    ...mapState(['userSession', 'userRouter'])
  },

  created () {
    if (!this.userSession.isLogin) {
      this.$router.replace({ name: 'login' })
      return
    }

    if (this.userRouter.routes.length === 0) {
      this.$router.replace({ name: 'login' })
      return
    }

    this.$router.addRoutes(this.userRouter.routes)

    if ('name' in this.userRouter.lastActiveRoute) {
      this.$router.replace({ name: this.userRouter.lastActiveRoute.name })
    } else {
      this.$router.replace({ name: this.userRouter.defaultActiveRoute.name })
    }
  },

  mounted () {

  }
}
</script>
