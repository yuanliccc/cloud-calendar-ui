<template>
  <div class="publicFrom">
    <div class="publicTitle">分配权限</div>
    <el-transfer
      :titles="titles"
      class="transferDis"
      filterable
      filter-placeholder="请输入权限名称"
      v-model="selectPers"
      :data="permissions">
    </el-transfer>
    <div class="form_Bt2">
      <el-form>
        <el-form-item>
          <el-button type="primary" @click="assign">确定</el-button>
          <el-button @click="reBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'roleAssign',
    data(){
      return {
        permissions: [],
        selectPers:[],
        titles:['未分配','已分配']
      }
    },
    mounted: function(){
      this.getPermission();
    },
    methods:{
      reBack: function(){
        this.$router.go(-1);
      },
      getAllPermissionByRoleId: function(id){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/permission/getAllPermissionByRoleId',{
            params:{roleId: id}
        }).then(res =>{
          const data = res.data.data;
          data.forEach(e =>{
            this.selectPers.push(e.id);
          })
          this.$store.commit("hideLoading");
        }).catch(err =>{
          this.$store.commit("hideLoading");
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        });
      },
      getPermission: function(){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/permission/getPermission').then(res =>{
          const data = res.data.data;

          data.forEach(e =>{
            this.permissions.push({
              key: e.id,
              label: e.name,
              disabled: false,
            });
          });
          this.$store.commit("hideLoading");
          this.getAllPermissionByRoleId(this.$route.params.roleId);
        }).catch(err =>{
          this.$store.commit("hideLoading");
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        });
      },
      assign: function(){
        const permissionDto = {
          roleId: this.$route.params.roleId,
          permissions: this.selectPers,
        };
        this.$store.commit("showLoading");
        this.$axios.post('/occ/role/assignPer', permissionDto)
          .then(res =>{
            const data = res.data;
            if(data.code == '400'){
              this.$store.commit("hideLoading");
              this.$message({
                showClose: true,
                message: data.message,
                type: 'warning'
              });
            } else {
              this.$message({
                type: 'success',
                message: '分配成功!'
              });
              this.$store.commit("hideLoading");
            }
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
