<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',

  mounted () {
    this.$router.replace({ name: '控制台首页' })
  }
}
</script>
