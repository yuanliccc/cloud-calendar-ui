<template>
  <div>
    <df-header></df-header>
    <router-view></router-view>
  </div>
</template>

<script>
import DfHeader from './DfHeader.vue'
export default {
  name: 'df',
  components: {
    DfHeader
  }
}
</script>

<style>

</style>
