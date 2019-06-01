<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">机构邀请编辑</div>
    <div class="publicTitle" v-if="add">新增机构邀请</div>
    <div>
      <el-form label-position="left" ref="orgInvite"class="add_Edit" :model="orgInvite" :rules="rules" :inline="true"
                label-width="120px">
        <el-form-item label="提交时间" prop="submittime">
          <el-input v-model="orgInvite.submittime" placeholder="提交时间，一旦新建便无法修改"></el-input>
        </el-form-item>
        <el-form-item label="邀请的机构" prop="approvalorgid">
          <el-input v-model="orgInvite.approvalorgid" placeholder="邀请的机构，一旦新建便无法修改"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="orgInvite.state" placeholder="状态，一旦新建便无法修改"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="orgInvite.content" placeholder="内容，一旦新建便无法修改"></el-input>
        </el-form-item>
        <div class="form_Bt">
          <el-form-item>
            <el-button v-if="add" type="primary" @click="submit">立即创建</el-button>
            <el-button v-if="add" type="primary" @click="clear">重置</el-button>
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
    name: 'orgInviteForm',
    data(){
      return {
        add: true,
        orgInvite: {
          id: '',
          content: '',
          approvalorgid: '',
          submituserid: '',
          checktime: '',
          state: '',
          submittime: '',
          userid: '',
        },
        rules:{
          submittime: [
            { required: true, message: '请输入提交时间，一旦新建便无法修改', trigger: 'blur' }
          ],
          approvalorgid: [
            { required: true, message: '请输入邀请的机构，一旦新建便无法修改', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请输入状态，一旦新建便无法修改', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容，一旦新建便无法修改', trigger: 'blur' }
          ],
        }
      }
    },
    mounted: function(){
      this.add = (this.$route.name == 'orgInviteForm_Add' ? true : false);
      if(!this.add){
        this.getInfoById(this.$route.params.orgInviteId);
       }
    },
    methods:{
      clear:function(){
        this.orgInvite= {
          id: '',
          content: '',
          approvalorgid: '',
          submituserid: '',
          checktime: '',
          state: '',
          submittime: '',
          userid: '',
        }
      },
      submit: function(){
        this.$refs.orgInvite.validate((valid) => {
          if (valid) {
            if(this.add) {
              this.save();
            }else{
              this.edit();
            }
          } else {
            return false;
          }
        });
      },
      save: function(){
        this.$store.commit("showLoading");
        this.$axios.post('/occ/orgInvite/add', this.orgInvite)
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
              message: '新增成功!'
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
      },
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
      edit: function(){
        this.$store.commit("showLoading");
        this.$axios.put('/occ/orgInvite/update', this.orgInvite)
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
              message: '修改成功!'
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
      },
    }
  }
</script>

<style scoped>

</style>
