<template>
  <div>
    <router-view v-wechat-title="$route.meta.label" v-if="isRouterAlive"/>
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
  data(){
    return{
      isRouterAlive:true
    }
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  computed: {
    isLoad: function () {
      return this.$store.getters.showLoading
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
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
.innerbox::-webkit-scrollbar {/*滚动条整体样式*/
  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.innerbox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}
.innerbox::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
</style>
