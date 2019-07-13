<template>
  <div class="wrapper">
    <hhead></hhead>
    <left></left>
    <div :class="{content2:collapse, content:!collapse}">
      <transition name="slide-fade">
          <router-view></router-view>
      </transition>
    </div>
    <!--<transition name="slide-fade">
      <router-view></router-view>
    </transition>-->
  </div>
</template>

<script>
  import left from './left.vue'
  import hhead from './header.vue'
  import bus from '../../assets/lib/bus'
  export default {
    name: 'manager',
    components: {
      left,
      hhead
    },
    data(){
      return {
        collapse: true
      }
    },
    created(){
      bus.$on('collapse', msg => {
        this.collapse = msg;
      })

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
  .content {
    width: auto;
    height: 100%;
    margin-left: 250px;
  }
  .wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .content2 {
    width: auto;
    height: 100%;
    margin-left: 70px;
  }
</style>
