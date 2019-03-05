<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">模块编辑</div>
    <div class="publicTitle" v-if="add">新增模块</div>
    <div>
      <el-form label-position="left" ref="module"class="add_Edit" :model="module" :rules="rules" :inline="true"
                label-width="120px">
        <el-form-item label="模块名称" prop="name" v-if="add">
          <el-input v-model="module.name" placeholder="模块名称，一旦新建便无法修改名称"></el-input>
        </el-form-item>
        <el-form-item label="模块名称" prop="name" v-if="!add">
          <el-input v-model="module.name" disabled="disabled" placeholder="模块名称，一旦新建便无法修改名称"></el-input>
        </el-form-item>
        <el-form-item label="模块key" prop="modulekey" v-if="add">
          <el-input v-model="module.modulekey" placeholder="模块key，一旦新建便无法修改名称"></el-input>
        </el-form-item>
        <el-form-item label="模块key" prop="modulekey" v-if="!add">
          <el-input v-model="module.modulekey" disabled="disabled" placeholder="模块key，一旦新建便无法修改名称"></el-input>
        </el-form-item>
        <el-form-item label="模块路由">
          <el-input v-model="module.url"></el-input>
        </el-form-item>
        <el-form-item label="是否系统模块">
          <el-select v-model="module.issystem">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父模块" v-if="module.issystem == '否'">
          <el-select v-model:value="module.parent">
            <el-option v-for="i in parentModule" :label="i.name" :value="i.id" :key="i.id">
              <span style="float: left">{{i.name}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{i.modulekey}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <div class="form_Bt">
          <el-form-item>
            <el-button v-if="add" type="primary" @click="submit">立即创建</el-button>
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
    name: 'moduleForm',
    data(){
      return {
        add: true,
        module: {
          name: '',
          issystem: '是',
          parent: '',
          modulekey: '',
          url:'',
          left:'left'
        },
        parentModule: [],
        rules:{
          name: [
            { required: true, message: '请输入模块名称，一旦新建便无法修改名称', trigger: 'blur' }
          ],
          modulekey:[
            { required: true, message: '请输入模块key，一旦新建便无法修改key', trigger: 'blur' }
          ],
        }
      }
    },
    mounted: function(){
      this.add = (this.$route.name == 'moduleForm_Add' ? true : false);
      this.getAllParent();

      if(!this.add){
        this.getInfoById(this.$route.params.moduleId);
      }
    },
    methods:{
      clear:function(){
          this.module= {
            name: '',
            issystem: '是',
            parent: '',
            modulekey: '',
            url:'',
          }
      },
      submit: function(){
        this.$refs.module.validate((valid) => {
          if (valid) {
            if(this.module.issystem == '否' && this.module.parent == ''){
              this.$message({
                showClose: true,
                message: '该模块非系统模块，请选择父模块！',
                type: 'warning'
              });
              return false;
            }

            if(this.module.issystem == '是')
              this.module.parent = null;

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
        this.$axios.post('/occ/module/add', this.module)
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
      getAllParent: function(){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/module/getAllParent')
          .then(res =>{
            const data = res.data;
            this.parentModule = data.data;
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
      getInfoById: function(moduleId){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/module/detail',{
            params:{id: moduleId}
        })
          .then(res =>{
            const data = res.data;
            this.module = data.data;
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
        this.$axios.put('/occ/module/update', this.module)
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
