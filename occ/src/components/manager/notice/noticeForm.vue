<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">通知编辑</div>
    <div class="publicTitle" v-if="add">新增通知</div>
    <div>
      <el-form label-position="left" ref="notice"class="add_Edit" :model="notice" :rules="rules" :inline="true"
                label-width="130px">
        <el-form-item label="用户">
          <el-select v-model="notice.userid">
            <el-option v-for="i in users" :key="i.id" :value="i.id" :label="i.name">
              <span style="float:left;">{{i.name}}</span>
              <span style="float:right;">{{i.account}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="notice.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="所有用户推送">
          <el-switch v-model="allUser"></el-switch>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="notice.type" placeholder="请选择类型">
            <el-option v-for="i in types" :key="i" :value="i" :label="i">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea"  class="text" v-model="notice.content" placeholder="请输入内容"></el-input>
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
    name: 'noticeForm',
    data(){
      return {
        add: true,
        notice: {
          id: '',
          userid: '',
          state: '',
          title: '',
          content: '',
          starttime: '',
          checktime: '',
          type: '消息通知',
        },
        allUser: false,
        users:[],
        types:['部门通知','紧急通知','消息通知'],
        rules:{
          title: [
            { required: true, message: '请输入标题，一旦新建便无法修改', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型，一旦新建便无法修改', trigger: 'blur' }
          ],
        }
      }
    },
    mounted: function(){
      this.add = (this.$route.name == 'noticeForm_Add' ? true : false);
      if(!this.add){
        this.getInfoById(this.$route.params.noticeId);
       }
       this.getUserByLoginOrgId();
    },
    methods:{
      clear:function(){
        this.notice= {
          id: '',
          userid: '',
          state: '',
          title: '',
          content: '',
          starttime: '',
          checktime: '',
          type: '消息通知',
        }
      },
      submit: function(){
        this.$refs.notice.validate((valid) => {
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
          if(this.notice.userid == '' && !this.allUser){
            this.$message({
              showClose: true,
              message: '请选择通知的用户！',
              type: 'warning'
            });
            return;
          }

          if(this.allUser){
            this.notice.id = -1;
          }

        this.$store.commit("showLoading");
        this.$axios.post('/occ/notice/add', this.notice)
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
      getInfoById: function(noticeId){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/notice/detail',{
             params:{id: noticeId}
        }).then(res =>{
          const data = res.data;
          this.notice = data.data;
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
        this.$axios.put('/occ/notice/update', this.notice)
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
      getUserByLoginOrgId: function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/user/getUserByLoginOrgId").then(res =>{
          this.$store.commit("hideLoading");
          this.users = res.data.data;
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
  .text{
    width: 630px !important;
  }
  .el-switch{
    width:250px;
  }
</style>
