<template>
  <div class="left">
    <div v-for="(i, index) in info">
      <div class="left_Sidebar" @click="display(index)">
        <i class="glyphicon glyphicon-th-large iLogo"></i>{{i.module.name}}
      </div>
      <div v-for="t in i.children" v-if="i.showChild == 'true' || i.showChild">
        <div class="left_Sidebar_son" @click="jumpTo(t.url)">
          <i class="glyphicon glyphicon-th-list iLogo"></i>{{t.name}}
        </div>
      </div>
    </div>
    <con ref="con"></con>
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
      info:[]
    }
  },
  created:function(){
      console.log(this.info);
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
          console.log(data);
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
    width: 260px;
    padding-top: 60px;
    border-right: 1px solid #ccc;
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
