<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">分配角色</div>
    <div>
      <el-form label-position="left" ref="role"class="add_Edit" :rules="rules" :model="role"
                label-width="120px" v-if="!add">
        <el-form-item label="角色" prop="id">
          <el-select v-model="role.id" filterable placeholder="请选择" clearable>
            <el-option v-for="i in roles" :value="i.id" :key="i.id" :label="i.name">
              <span style="float: left">{{i.name}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{i.rolekey}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item>
          <el-form-item label="所拥有权限">
            <el-input></el-input>
        </el-form-item>-->
       <!-- <el-form-item label="昵称" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="user.account" placeholder="账号，一旦新建便无法修改" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email" placeholder="邮箱，一旦新建便无法修改"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="user.sex"></el-input>
        </el-form-item>-->
        <div class="form_Bt">
          <el-form-item>
            <el-button v-if="!add" type="primary" @click="submit">立即修改</el-button>
            <el-button @click="reBack">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'userForm',
    data(){
      return {
        add: true,
        role:{
          id:'',
        },
        roles:[],
        rules:{
          id: [
            { required: true, message: '请选择角色！', trigger: 'blur' }
          ]
        }
      }
    },
    mounted: function(){
      this.add = (this.$route.name == 'userForm_Add' ? true : false);
      if(!this.add){
          this.getRoles();
       }else {
      }
    },
    methods:{
      submit: function(){
        this.$refs.role.validate((valid) => {
          if (valid) {
            this.distribute();
          } else {
            return false;
          }
        });
      },
      reBack: function(){
        this.$router.go(-1);
      },
      getRoles: function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/role/getRoles").then(res =>{
          const data = res.data;
          this.roles = data.data;
          this.$store.commit("hideLoading");
          this.getRoleByUserId();
        }).catch(err =>{
          this.$store.commit("hideLoading");
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        });
      },
      getRoleByUserId: function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/role/getRoleByUserId",{
          params:{userId: this.$route.params.userId}
        }).then(res =>{
            const  data = res.data;
          this.$store.commit("hideLoading");
          console.log(data)
          this.role.id = data.data.id;
        }).catch(err =>{
          this.$store.commit("hideLoading");
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        });
      },
      distribute: function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/role/distributeRole",{
            params:{userId: this.$route.params.userId, roleId: this.role.id}
        }).then(res =>{
          this.$store.commit("hideLoading");
          this.$message({
            showClose: true,
            message: "分配成功",
            type: 'success'
          });
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
