<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">机构邀请编辑</div>
    <div class="publicTitle" v-if="add">新增机构邀请</div>
    <div>
      <el-form label-position="left" ref="systemconfig"class="add_Edit" :model="systemconfig" :rules="rules" :inline="true"
                label-width="120px">
        <el-form-item label="键" prop="systemkey">
          <el-input v-model="systemconfig.systemkey" placeholder="键，一旦新建便无法修改"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="value">
          <el-input v-model="systemconfig.value" placeholder="值，一旦新建便无法修改"></el-input>
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
    name: 'systemconfigForm',
    data(){
      return {
        add: true,
        systemconfig: {
          id: '',
          systemkey: '',
          value: '',
        },
        rules:{
          systemkey: [
            { required: true, message: '请输入键，一旦新建便无法修改', trigger: 'blur' }
          ],
          value: [
            { required: true, message: '请输入值，一旦新建便无法修改', trigger: 'blur' }
          ],
        }
      }
    },
    mounted: function(){
      this.add = (this.$route.name == 'systemconfigForm_Add' ? true : false);
      if(!this.add){
        this.getInfoById(this.$route.params.systemconfigId);
       }
    },
    methods:{
      clear:function(){
        this.systemconfig= {
          id: '',
          systemkey: '',
          value: '',
        }
      },
      submit: function(){
        this.$refs.systemconfig.validate((valid) => {
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
        this.$axios.post('/occ/systemconfig/add', this.systemconfig)
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
      getInfoById: function(systemconfigId){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/systemconfig/detail',{
             params:{id: systemconfigId}
        }).then(res =>{
          const data = res.data;
          this.systemconfig = data.data;
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
        this.$axios.put('/occ/systemconfig/update', this.systemconfig)
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
