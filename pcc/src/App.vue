<template>
  <div>
    <router-view/>
    <loading v-if="isShow"></loading>
  </div>
</template>

<script>

import loading from './components/loading'

export default {
  name: 'App',
  components: {
    loading
  },
  computed: {
    isShow: function () {
      return this.$store.getters.showLoading
    }
  }
}
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }

</style>
