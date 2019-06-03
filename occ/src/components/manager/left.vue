<template>
  <!--<div class="left">
    <div class="leftTop"></div>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
          <el-submenu v-for="(item, index) in info" :index="''+index" :key="''+index">
            <template slot="title"><i :class="logo[index % 3]"></i>{{item.module.name}}</template>
            <el-menu-item-group>
              <template slot="title" >{{item.module.name}}</template>
              <el-menu-item v-for="e in item.children" @click="jumpTo(e.url)" :key="e.name">{{e.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>
  </div>-->
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :collapse="collapse" background-color="#131313"
             text-color="#fff" active-text-color="#fff" unique-opened router>
      <template v-for="(item, index) in info">
        <template>
          <el-submenu :index="''+index" :key="''+index">
            <template slot="title">
              <i :class="logo[index]"></i><span slot="title">{{ item.module.name }}</span>
            </template>
            <template v-for="(subItem, e) in item.children">
              <el-menu-item @click="jumpTo(subItem.url)">
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import bus from '../../assets/lib/bus';
export default{
  name:'left',
  data(){
    return {
      info:[],
      logo:['el-icon-setting','el-icon-rank', 'el-icon-s-order','el-icon-s-unfold', 'el-icon-message'],
      collapse: true,

    }
  },
  created:function(){
    this.init();
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
    });

  },
  methods:{
    display: function(index){
      this.info[index].showChild = !this.info[index].showChild;
    },
    jumpTo: function (url) {
      this.$router.push({path: url});
    },
    init: function(){
      this.$store.commit('showLoading');
      this.$axios.get('/occ/module/getLoginModule')
        .then(res =>{
          const data = res.data;
          this.info = data.data;
          this.$store.commit('hideLoading');
        })
        .catch(err =>{
          this.$refs.con.show(err.data.message, null);
          this.$store.commit('hideLoading');
        });
    },
  }
}
</script>

<style scoped>
 /* .left{
    position:absolute;
    top:0;
    bottom: 0;
    left: 0;
    width: 200px;
    padding-top: 60px;
    border-right: 1px solid #ccc;
  }
  .leftTop{
    padding-top: 20px;
    background-color: #409eff1c;
  }
  .left_Sidebar{
    border-top: 1px solid #ccc;
  }

  .left_Sidebar, .left_Sidebar_son{
    cursor: pointer;
    height:52px;
    padding: 1px 0;
    line-height: 50px;
    padding-left: 40px;
  }
  .left_Sidebar_son{
    padding-left: 60px;
    color: rgba(0,0,0,0.45);
    border-top: 1px solid #ccc;
  }
  .left_Sidebar_son:hover{
    color: red;
  }
  .iLogo{
    padding-right: 5px;
  }*/
 .sidebar{
   display: block;
   position: fixed;
   left: 0;
   top: 70px;
   bottom:0;
 }
 .sidebar::-webkit-scrollbar{
   width: 0;
 }
 .sidebar-el-menu:not(.el-menu--collapse){
   width: 250px;
 }
 .sidebar > ul {
   height:100%;
 }
</style>
