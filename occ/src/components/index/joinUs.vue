<template>
  <div class="login">
    <div class="title">
      <span>机构入驻申请</span>
    </div>
    <el-form label-position="left" ref="orgapply"class="add_Edit" :model="orgapply" :rules="rules"
             label-width="120px">
      <el-form-item label="机构名称" prop="name">
        <el-input v-model="orgapply.name" placeholder="机构名称，一旦新建便无法修改名称"></el-input>
      </el-form-item>
      <el-form-item label="机构标识" prop="orgkey">
        <el-input v-model="orgapply.orgkey" placeholder="机构标识，一旦新建便无法修改名称"></el-input>
      </el-form-item>
      <div class="form_Bt">
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "joinUs",
    data() {
      return {
        orgapply:{
          name:'',
          orgkey:'',
          state:'',
          submittime:'',
          submituserid:'',
        },
        rules:{
          name: [
            { required: true, message: '请输入机构名称，一旦新建便无法修改名称', trigger: 'blur' }
          ],
          orgkey:[
            { required: true, message: '请输入模块机构key，一旦新建便无法修改key', trigger: 'blur' }
          ],
        }
      }
    },
    computed:{
      user: function () {
        return this.$store.getters.userInfo
      }
    },
    created() {
      if(this.user == '' || this.user == undefined){
        this.$router.push('/login');
      }
    },
    methods:{
      clear: function(){
        this.orgapply={
          name:'',
          orgkey:'',
          state:'',
          submittime:'',
          submituserid:'',
        }
      },
      submit: function(){
        this.$refs.orgapply.validate((valid) => {
          if (valid) {
            this.orgapply.state = '待审批';
            this.orgapply.submittime = new Date();
            this.orgapply.submituserid = this.$store.getters.userInfo.user.id;

            this.$store.commit("showLoading");
            this.$axios.post('/occ/orgApply/add', this.orgapply)
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
                    message: '提交申请成功!'
                  });
                  this.$store.commit("hideLoading");
                  this.clear();
                }
              }).catch(err =>{
              this.$store.commit("hideLoading");
              this.$message({
                showClose: true,
                message: err,
                type: 'error'
              });
            });
          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>
  .login {
    width: 600px;
    height: 800px;
    margin: 0 auto;
    margin-top: 40px;
    border-radius: 2px;
    border: 1px solid #ccc;
  }
  .title{
    margin-top: 10px;
    padding-top: 20px;
    height: 70px;
    font-size: 26px;
    text-align: center;
  }
  .form_Bt{
    height: 100px;
    padding: 50px 0 0 0;
  }
</style>
