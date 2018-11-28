<template>
  <div>
    <hh></hh>
    <router-view></router-view>
  </div>
</template>

<script>
  import hh from './header'

  export default {
      name: "pcc",
      components: {
        hh
      }
  }
</script>

<style scoped>

</style>
