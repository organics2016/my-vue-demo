<template>
  <div id="app" ref="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import CanvasNest from 'canvas-nest.js'

export default {
  name: 'app',
  mounted () {
    const f = 255
    const config = {
      color: Math.round(Math.random() * f) + ',' +
        Math.round(Math.random() * f) + ',' +
        Math.round(Math.random() * f),
      opacity: 1
    }

    /* eslint-disable no-new */
    new CanvasNest(this.$refs.app, config)
  }
}
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
  overflow-y:hidden;
  overflow-x:hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
  }
</style>
