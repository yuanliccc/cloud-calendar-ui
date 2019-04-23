<template>
  <div class="publicFrom">
    <div class="publicTitle">查看组织机构</div>
    <div class="public_Display">
      <el-form label-position="left" ref="organization"class="add_Edit" :model="organization":inline="true"
            label-width="120px">
        <el-form-item label="机构名称">
          <el-input v-model="organization.name" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="机构标识">
          <el-input v-model="organization.orgkey" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="父机构">
          <el-select v-model="organization.parentorgid" placeholder="无" disabled="disabled" >
            <el-option v-for="i in organizations" :value="i.id" :key="i.id" :label="i.name">
            </el-option>
          </el-select>
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
  name: 'organizationDisplay',
  data(){
    return {
     organization: {},
      organizations:[],
    }
  },
  mounted: function(){
    this.getInfoById(this.$route.params.organizationId);
    this.getAllOrg();
  },
  methods:{
    reBack: function(){
      this.$router.go(-1);
    },
    getInfoById: function(organizationId){

      this.$store.commit("showLoading");
      this.$axios.get('/occ/organization/detail',{
        params:{id: organizationId}
      }).then(res =>{
        const data = res.data;
        this.organization = data.data;
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
    getAllOrg:function(){
      this.$store.commit("showLoading");
      this.$axios.get("/occ/organization/getAllOrganization").then(res =>{
        const data = res.data;
        this.organizations = data.data;
        this.$store.commit("hideLoading");
      }).catch(err =>{
        this.$store.commit("hideLoading");
        this.$message({
          showClose: true,
          message: err,
          type: 'error'
        });
      });
    }
  }
}
</script>

<style scoped>

</style>
