<template>
  <div id="app">
    <router-view/>
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
