<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">通知编辑</div>
    <div class="publicTitle" v-if="add">新增通知</div>
    <div>
      <el-form label-position="left" ref="notice"class="add_Edit" :model="notice" :rules="rules"
                label-width="130px">
        <el-form-item label="用户" v-if="notice.type == '个人通知'">
          <el-select v-model="notice.submituserid">
            <el-option v-for="i in users" :key="i.id" :value="i.id" :label="i.name">
              <span style="float:left;">{{i.name}}</span>
              <span style="float:right;">{{i.account}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="notice.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type" v-if="role.rolelevel == 6">
          <el-select v-model="notice.type" placeholder="请选择类型">
            <el-option v-for="i in types2" :key="i" :value="i" :label="i">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type" v-if="role.rolelevel != 6">
          <el-select v-model="notice.type" placeholder="请选择类型">
            <el-option v-for="i in types" :key="i" :value="i" :label="i">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子机构群发" prop="subordinatecanseen" v-if="notice.type == '机构通知'">
          <el-select v-model="notice.subordinatecanseen" placeholder="请选择子机构也发布">
            <el-option v-for="i in canBeSeen" :key="i" :value="i" :label="i">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="notice.content" resize="none" rows="5"
                    placeholder="内容"></el-input>
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
          submituserid: '',
          orgId: '',
          title: '',
          content: '',
          submittime: '',
          subordinatecanseen: '否',
          type: '机构通知',
        },
        allUser: false,
        users:[],
        types:['机构通知','个人通知'],
        types2:['机构通知','个人通知','系统通知'],
        canBeSeen:['是','否'],
        rules:{
          title: [
            { required: true, message: '请输入标题，一旦新建便无法修改', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型，一旦新建便无法修改', trigger: 'blur' }
          ],
          content:[
            { required: true, message: '请输入内容，一旦新建便无法修改', trigger: 'blur' }
          ],
          subordinatecanseen:[
            { required: true, message: '请选择子机构是否群发', trigger: 'blur' }
          ]
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
    computed:{
      role: function () {
        return this.$store.getters.userInfo.role
      },
    },
    methods:{
      clear:function(){
        this.notice= {
          id: '',
          submituserid: '',
          orgId: '',
          title: '',
          content: '',
          submittime: '',
          subordinatecanseen: '否',
          type: '机构通知',
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
          if(this.notice.submituserid == '' && this.notice.type == '个人通知'){
            this.$message({
              showClose: true,
              message: '请选择通知的用户！',
              type: 'warning'
            });
            return;
          }

        this.$store.commit("showLoading");
        this.$axios.post('/occ/noticeList/add', this.notice)
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
            console.log(this.$parent.$children[0])
            this.$parent.$children[0].flushUnreadNotice();
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
  .form_Bt{
    height: 100px;
    padding: 50px 0 0 0;
  }
</style>
