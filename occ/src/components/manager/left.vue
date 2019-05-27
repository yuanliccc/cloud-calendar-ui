<template>
  <div class="left">
   <!-- <div v-for="(i, index) in info">
      <div class="left_Sidebar" @click="display(index)">
        <i class="glyphicon glyphicon-th-large iLogo"></i>{{i.module.name}}
      </div>
      <div v-for="t in i.children" v-if="i.showChild == 'true' || i.showChild">
        <div class="left_Sidebar_son" @click="jumpTo(t.url)">
          <i class="glyphicon glyphicon-th-list iLogo"></i>{{t.name}}
        </div>
      </div>
    </div>
    <con ref="con"></con>-->
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
  </div>
</template>

<script>
  import con from '../../confirm/index.vue'
export default{
  name:'left',
  components:{
      con,
  },
  data(){
    return {
      info:[],
      logo:['el-icon-setting','el-icon-menu','el-icon-message'],
    }
  },
  created:function(){
      this.init();
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
    }
  }
}
</script>

<style scoped>
  .left{
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
  }

</style>
