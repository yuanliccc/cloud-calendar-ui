<template>
  <div class="publicFrom">
    <div class="publicTitle">查看模块</div>
    <div class="public_Display">
      <el-form label-position="left" ref="module"class="add_Edit" :model="module"
               label-width="120px">
        <el-form-item label="模块名称" prop="name">
          <el-input v-model="module.name" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="模块key" prop="modulekey">
          <el-input v-model="module.modulekey" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="模块路由">
          <el-input v-model="module.url" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="是否系统模块">
          <el-input v-model="module.issystem" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="父模块">
          <el-input v-model="module.parent" disabled="disabled"></el-input>
        </el-form-item>
        <div class="form_Bt">
          <el-form-item>
            <el-button type="primary" @click="reBack">确定</el-button>
            <el-button @click="reBack">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'moduleDisplay',
    data(){
      return {
        module: {},
        parentModule: [],
      }
    },
    mounted: function(){
      this.getAllParent();
    },
    methods:{
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

            this.getInfoById(this.$route.params.moduleId);
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

            if(this.module.parent != "")
              this.parentModule.forEach(res =>{
                  if(this.module.parent == res.id)
                    this.module.parent = res.name;
              })
          }).catch(err => {
          this.$store.commit("hideLoading");
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        })
      },
    }
  }
</script>

<style scoped>

</style>
