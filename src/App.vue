<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',

  mounted () {
    this.$router.replace('/')
  }
}
</script>
