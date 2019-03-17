<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">通知编辑</div>
    <div class="publicTitle" v-if="add">新增通知</div>
    <div>
      <el-form label-position="left" ref="notice"class="add_Edit" :model="notice" :rules="rules" :inline="true"
                label-width="120px">
        <el-form-item label="用户id" prop="userid">
          <el-input v-model="notice.userid" placeholder="用户id，一旦新建便无法修改"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="notice.state" placeholder="状态，一旦新建便无法修改"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="notice.title" placeholder="标题，一旦新建便无法修改"></el-input>
        </el-form-item>
        <el-form-item label="提交时间" prop="starttime">
          <el-input v-model="notice.starttime" placeholder="提交时间，一旦新建便无法修改"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="notice.type" placeholder="类型，一旦新建便无法修改"></el-input>
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
          type: '',
        },
        rules:{
          userid: [
            { required: true, message: '请输入用户id，一旦新建便无法修改', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请输入状态，一旦新建便无法修改', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '请输入标题，一旦新建便无法修改', trigger: 'blur' }
          ],
          starttime: [
            { required: true, message: '请输入提交时间，一旦新建便无法修改', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请输入类型，一旦新建便无法修改', trigger: 'blur' }
          ],
        }
      }
    },
    mounted: function(){
      this.add = (this.$route.name == 'noticeForm_Add' ? true : false);
      if(!this.add){
        this.getInfoById(this.$route.params.noticeId);
       }
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
          type: '',
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
    }
  }
</script>

<style scoped>

</style>
