<template>

  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
        <div class="login100-form validate-form">
          <span class="login100-form-title p-b-49">
            Welcome to organics
          </span>

          <div class="wrap-input100 m-b-23">
            <span class="label-input100">用户名</span>
            <span class="validate-input" v-show="usernameValid">Username is reauired</span>
            <input class="input100" type="text" name="username" placeholder="请输入您的用户名" v-model="username">
            <span class="focus-input100"></span>
          </div>

          <div class="wrap-input100">
            <span class="label-input100">密码</span>
            <span class="validate-input" v-show="passwordValid">Password is required</span>
            <input class="input100" type="password" name="pass" placeholder="请输入您的密码" v-model="password">
            <span class="focus-input100"></span>
          </div>

          <div class="text-right p-t-8 p-b-31">
            <a href="#">
              Forgot password?
            </a>
          </div>

          <div class="container-login100-form-btn">
            <div class="wrap-login100-form-btn">
              <div class="login100-form-bgbtn"></div>
              <button class="login100-form-btn" @click="login" :disabled="loginDisabled">
                Login
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { MESSAGE_CONFIG } from '../../common/appconfig'

import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapMutations } = createNamespacedHelpers('session')

const pattern = /^([a-z]|[A-Z]|[0-9]){5,}$/

export default {
  name: 'Login',
  data: function () {
    return {
      loginDisabled: false,
      username: '',
      password: '',
      usernameValid: false,
      passwordValid: false
    }
  },

  computed: {
    ...mapGetters(['userRoutes', 'userActiveRoute'])
  },

  mounted () {

  },

  methods: {

    ...mapMutations(['cacheSession', 'unCacheSession']),

    login: function () {
      console.log('username : ' + this.username + '  password : ' + this.password)
      // TODO 从后台请求登录信息

      this.usernameValid = !pattern.test(this.username)
      if (this.usernameValid) {
        return
      }

      this.passwordValid = !pattern.test(this.password)
      if (this.passwordValid) {
        return
      }

      const session = {
        username: this.username,
        token: 'xcvdfsefdf',
        permissions: []
      }

      this.cacheSession(session)

      if (this.userRoutes.length === 0) {
        this.unCacheSession()
        this.$Message.error(MESSAGE_CONFIG('您没有任何操作权限，请联系系统管理员'))
        return
      }

      this.$router.addRoutes(this.userRoutes)

      this.$router.replace({ name: this.userActiveRoute.name })
    }
  }
}
</script>

<style scoped>
  @import "./css/util.css";
  @import "./css/main.css";
</style>
