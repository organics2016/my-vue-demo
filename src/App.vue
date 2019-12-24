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
    this.$router.replace(this.$router.options.routes[0].path)
  }
}
</script>
