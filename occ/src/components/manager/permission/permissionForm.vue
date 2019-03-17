<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">权限点编辑</div>
    <div class="publicTitle" v-if="add">新增权限点</div>
    <div>
      <el-form label-position="left" ref="permission"class="add_Edit" :model="permission" :rules="rules" :inline="true"
                label-width="120px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="permission.name"></el-input>
        </el-form-item>
        <el-form-item label="唯一标识" prop="identify">
          <el-input v-model="permission.identify"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="perexplain">
          <el-input v-model="permission.perexplain"></el-input>
        </el-form-item>
        <el-form-item label="对应模块" prop="moduleid">
          <el-select v-model="permission.moduleid">
            <el-option v-for="i in modules" :value="i.id" :key="i.id" :label="i.name">
              <span style="float: left">{{i.name}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{i.modulekey}}</span>
            </el-option>
          </el-select>
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
    name: 'permissionForm',
    data(){
      return {
        add: true,
        permission: {
          id: '',
          name: '',
          identify: '',
          perexplain: '',
          moduleid: '',
        },
        modules:[],
        rules:{
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          identify: [
            { required: true, message: '请输入唯一标识', trigger: 'blur' }
          ],
          perexplain: [
            { required: true, message: '请输入描述', trigger: 'blur' }
          ],
          moduleid: [
            { required: true, message: '请输入对应模块', trigger: 'blur' }
          ],
        }
      }
    },
    mounted: function(){
      this.add = (this.$route.name == 'permissionForm_Add' ? true : false);
      this.getAllModule();
      if(!this.add){
        this.getInfoById(this.$route.params.permissionId);
       }
    },
    methods:{
      clear:function(){
        this.permission= {
          id: '',
          name: '',
          identify: '',
          perexplain: '',
          moduleid: '',
        }
      },
      submit: function(){
        this.$refs.permission.validate((valid) => {
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
        this.$axios.post('/occ/permission/add', this.permission)
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
      edit: function(){
        this.$store.commit("showLoading");
        this.$axios.put('/occ/permission/update', this.permission)
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
