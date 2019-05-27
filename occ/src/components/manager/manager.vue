<template>
  <div>
    <hhead></hhead>
    <left></left>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import left from './left.vue'
  import hhead from './header.vue'
  export default {
    name: 'manager',
    components: {
      left,
      hhead
    }
  }
</script>

<style scoped>
  .slide-fade{
    position: absolute;left:0;right: 0;
  }
  .slide-fade-enter-active {
    transition: all 1.2s ease;
  }
  .slide-fade-leave-active {

    transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  {
    left:0;right: 0;
    transform: translateX(50px);
    opacity: 0;
  }
</style>
