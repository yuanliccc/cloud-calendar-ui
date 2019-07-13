<template>
  <div class="publicFrom">
    <div class="publicTitle">查看机构邀请</div>
    <div class="public_Display">
      <el-form label-position="left" ref="orgInvite"class="add_Edit" :model="orgInvite"
            label-width="120px">
        <el-form-item label="提交时间">
          <el-input v-model="orgInvite.submittime" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="邀请的机构">
          <el-input v-model="orgInvite.approvalorgid" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="orgInvite.state" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="orgInvite.content" disabled="disabled"></el-input>
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
  name: 'orgInviteDisplay',
  data(){
    return {
     orgInvite: {},
    }
  },
  mounted: function(){
    this.getInfoById(this.$route.params.orgInviteId);
  },
  methods:{
    reBack: function(){
      this.$router.go(-1);
    },
    getInfoById: function(orgInviteId){

      this.$store.commit("showLoading");
      this.$axios.get('/occ/orgInvite/detail',{
        params:{id: orgInviteId}
      }).then(res =>{
        const data = res.data;
        this.orgInvite = data.data;
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
