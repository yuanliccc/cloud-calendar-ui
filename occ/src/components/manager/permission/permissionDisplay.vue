<template>
  <div class="publicFrom">
    <div class="publicTitle">查看权限点</div>
    <div class="public_Display">
      <el-form label-position="left" ref="permission"class="add_Edit" :model="permission":inline="true"
            label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="permission.name" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="唯一标识">
          <el-input v-model="permission.identify" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="permission.perexplain" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="对应模块" prop="moduleid">
          <el-select v-model="permission.moduleid" disabled="disabled">
            <el-option v-for="i in modules" :value="i.id" :key="i.id" :label="i.name">
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
  name: 'permissionDisplay',
  data(){
    return {
     permission: {},
      modules:[],
    }
  },
  mounted: function(){
    this.getInfoById(this.$route.params.permissionId);
    this.getAllModule();
  },
  methods:{
    reBack: function(){
      this.$router.go(-1);
    },
    getInfoById: function(permissionId){

      this.$store.commit("showLoading");
      this.$axios.get('/occ/permission/detail',{
        params:{id: permissionId}
      }).then(res =>{
        const data = res.data;
        this.permission = data.data;
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
    getAllModule: function(){
      this.$store.commit('showLoading');
      this.$axios.get('/occ/module/getAllModule').then(res =>{
        this.$store.commit('hideLoading');
        const data = res.data;
        this.modules = data.data;
      }).catch(err =>{
        this.$store.commit('showLoading');
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
