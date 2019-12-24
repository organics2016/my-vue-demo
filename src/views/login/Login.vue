<template>

  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
        <div class="login100-form validate-form">
          <span class="login100-form-title p-b-49">
            嘻嘻哈哈
          </span>

          <div class="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
            <span class="label-input100">滴滴滴滴滴</span>
            <input class="input100" type="text" name="username" placeholder="Type your username">
            <span class="focus-input100"></span>
          </div>

          <div class="wrap-input100 validate-input" data-validate="Password is required">
            <span class="label-input100">Password</span>
            <input class="input100" type="password" name="pass" placeholder="Type your password">
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
              <button class="login100-form-btn">
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
export default {
  name: 'Login'
}
</script>

<style scoped>
  @import "./css/util.css";
  @import "./css/main.css";
</style>
