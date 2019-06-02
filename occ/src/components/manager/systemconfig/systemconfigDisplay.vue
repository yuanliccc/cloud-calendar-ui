<template>
  <div class="publicFrom">
    <div class="publicTitle">查看机构邀请</div>
    <div class="public_Display">
      <el-form label-position="left" ref="systemconfig"class="add_Edit" :model="systemconfig"
            label-width="120px">
        <el-form-item label="键">
          <el-input v-model="systemconfig.systemkey" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="值">
          <el-input v-model="systemconfig.value" disabled="disabled"></el-input>
        </el-form-item>
        <div class="form_Bt">
          <el-form-item>
            <el-button type="primary" @click="reBack">确定</el-button>
            <el-button @click="reBack">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default{
  name: 'systemconfigDisplay',
  data(){
    return {
     systemconfig: {},
    }
  },
  mounted: function(){
    this.getInfoById(this.$route.params.systemconfigId);
  },
  methods:{
    reBack: function(){
      this.$router.go(-1);
    },
    getInfoById: function(systemconfigId){

      this.$store.commit("showLoading");
      this.$axios.get('/occ/systemconfig/detail',{
        params:{id: systemconfigId}
      }).then(res =>{
        const data = res.data;
        this.systemconfig = data.data;
        this.$store.commit("hideLoading");

      }).catch(err => {
        this.$store.commit("hideLoading");
        this.$message({
          showClose: true,
          message: err,
          type: 'error'
        });
      })
    },
  }
}
</script>

<style scoped>

</style>
