<template>
  <div class="publicFrom">
    <div class="publicTitle">邀请用户</div>
    <div>
      <el-form label-position="left" ref="user"class="add_Edit" :model="invite" :rules="rules"
               label-width="120px">
        <el-form-item label="昵称或账号" prop="nameOrAccount">
          <el-input v-model="nameOrAccount"></el-input>
        </el-form-item>
        <el-form-item label="用户详情" prop="userId">
          <el-select v-model="invite.userId" filterable placeholder="请选择" clearable>
            <el-option v-for="i in users" :value="i.id" :key="i.id" :label="i.name">
              <span style="float: left">{{i.name}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{i.account}}</span>
            </el-option>
          </el-select>
        </el-form-item>
       <!-- <el-form-item label="组织机构" prop="orgId">
          <el-select v-model="invite.orgId" filterable placeholder="请选择" clearable>
            <el-option v-for="i in organizations" :value="i.id" :key="i.id" :label="i.name">
              <span style="float: left">{{i.name}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{i.orgkey}}</span>
            </el-option>
          </el-select>
        </el-form-item>-->
        <div class="form_Bt">
          <el-form-item>
            <el-button type="primary" @click="submit">立即邀请</el-button>
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
        invite: {
          userId:'',
          orgId:'',
        },
        nameOrAccount:'',
        users:[],
        organizations:[],
        rules:{
          userId: [
            { required: true, message: '请选择用户', trigger: 'blur, change' }
          ]/*,
          orgId: [
            { required: true, message: '请选择组织机构', trigger: 'blur, change' }
          ]*/
        }
      }
    },
    watch:{
      nameOrAccount(value){
        if(value != '')
          this.findUserByAccountOrName(value);
        else {
          this.users = [];
        }
      },
    },
    mounted: function(){
      this.getAllOrg();
    },
    methods:{
      clear:function(){
        this.user= {
          id: '',
          name: '',
          account: '',
          password: '',
          phone: '',
          email: '',
          sex: '',
        }
      },
      submit: function(){
        this.$refs.user.validate((valid) => {
          if (valid) {
              this.inviteUser();
          } else {
            return false;
          }
        });
      },
      reBack: function(){
        this.$router.go(-1);
      },
      findUserByAccountOrName: function(val){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/user/findUserByIdOrNameByLoginOrg',{
            params: {value: val}
        }).then(res =>{
            const data = res.data;
            this.users = data.data;

            if(this.users.length == 0){
                this.invite= {
                  userId: '',
                  orgId: '',
                };
            }
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
      },
      inviteUser:function(){
        const orgInvite = {
          approvalorgid: this.$store.getters.userInfo.organization.id,
          submituserid: this.$store.getters.userInfo.user.id,
          submittime: new Date(),
          userid:this.invite.userId,
          state: '邀请中'
        };
        this.$store.commit("showLoading");
        this.$axios.post("/occ/orgInvite/add", orgInvite).then(res =>{
          const data = res.data;
          if(data.code == '400'){
            this.$message({
              showClose: true,
              message: data.message,
              type: 'warning'
            });
          }else {
            this.$message({
              showClose: true,
              message: '邀请成功！',
              type: 'success'
            });
          }

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
