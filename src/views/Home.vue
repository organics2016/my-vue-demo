<template>
  <div class="home">
    <img src="../assets/hdImg_3a6263ee917d25abefe28a187aed0c8215628191974.jpg"
         width="30%" height="30%" v-if="flag" @click="change()">
    <img src="../assets/mmqrcode1562819180993.png"
         width="30%" height="30%" v-if="!flag" @click="change()">
    <HelloWorld msg="Welcome to this page"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      flag: true
    }
  },

  methods: {
    change: function () {
      this.flag = !this.flag
    }
  }
}
</script>
