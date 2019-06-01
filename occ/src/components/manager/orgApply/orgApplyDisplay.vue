<template>
  <div class="publicFrom">
    <div class="publicTitle">查看机构入驻申请</div>
    <div class="public_Display">
      <el-form label-position="left" ref="orgApply"class="add_Edit" :model="orgApply":inline="true"
            label-width="120px">
        <el-form-item label="机构名称">
          <el-input v-model="orgApply.name" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="机构标识">
          <el-input v-model="orgApply.orgkey" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="orgApply.state" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="提交人">
          <el-input v-model="orgApply.submittime" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-input v-model="orgApply.submituserid" disabled="disabled"></el-input>
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
  name: 'orgApplyDisplay',
  data(){
    return {
     orgApply: {},
    }
  },
  mounted: function(){
    this.getInfoById(this.$route.params.orgApplyId);
  },
  methods:{
    reBack: function(){
      this.$router.go(-1);
    },
    getInfoById: function(orgApplyId){

      this.$store.commit("showLoading");
      this.$axios.get('/occ/orgApply/detail',{
        params:{id: orgApplyId}
      }).then(res =>{
        const data = res.data;
        this.orgApply = data.data;
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
