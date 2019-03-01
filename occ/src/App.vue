<template>
  <div>
    <router-view/>
    <loading v-if="isLoad"></loading>
  </div>
</template>

<script>
  import loading from './confirm/loading.vue'
export default {
  name: 'App',
  components:{
    loading,
  },
  computed: {
    isLoad: function () {
      return this.$store.getters.showLoading
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
