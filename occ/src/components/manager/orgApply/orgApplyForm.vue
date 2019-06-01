<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">机构入驻申请编辑</div>
    <div class="publicTitle" v-if="add">新增机构入驻申请</div>
    <div>
      <el-form label-position="left" ref="orgApply"class="add_Edit" :model="orgApply" :rules="rules" :inline="true"
                label-width="120px">
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="orgApply.name" disabled="disabled" placeholder="机构名称，一旦新建便无法修改"></el-input>
        </el-form-item>
        <el-form-item label="机构标识" prop="orgkey">
          <el-input v-model="orgApply.orgkey" disabled="disabled" placeholder="机构标识，一旦新建便无法修改"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="orgApply.state" disabled="disabled" placeholder="状态，一旦新建便无法修改"></el-input>
        </el-form-item>
        <el-form-item label="提交人" prop="submittime">
          <el-input v-model="orgApply.submituserid" disabled="disabled" placeholder="提交人，一旦新建便无法修改"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="orgApply.submittime"
            format="yyyy-MM-dd"
            type="datetime"
            disabled="disabled">
          </el-date-picker>
        </el-form-item>
        <div class="form_Bt">
          <el-form-item>
            <el-button type="primary" @click="submit('同意')">同意入驻</el-button>
            <el-button type="primary" @click="submit('拒绝')">拒绝入驻</el-button>
            <el-button @click="reBack">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'orgApplyForm',
    data(){
      return {
        add: true,
        orgApply: {
          id: '',
          name: '',
          orgkey: '',
          state: '',
          submittime: '',
          submituserid: '',
          approvaluserid: '',
          approvaltime: '',
        },
        rules:{
          name: [
            { required: true, message: '请输入机构名称，一旦新建便无法修改', trigger: 'blur' }
          ],
          orgkey: [
            { required: true, message: '请输入机构标识，一旦新建便无法修改', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请输入状态，一旦新建便无法修改', trigger: 'blur' }
          ],
          submittime: [
            { required: true, message: '请输入提交人，一旦新建便无法修改', trigger: 'blur' }
          ],
          submituserid: [
            { required: true, message: '请输入提交时间，一旦新建便无法修改', trigger: 'blur' }
          ],
        }
      }
    },
    mounted: function(){
      this.add = (this.$route.name == 'orgApplyForm_Add' ? true : false);
      if(!this.add){
        this.getInfoById(this.$route.params.orgApplyId);
       }
    },
    methods:{
      clear:function(){
        this.orgApply= {
          id: '',
          name: '',
          orgkey: '',
          state: '',
          submittime: '',
          submituserid: '',
          approvaluserid: '',
          approvaltime: '',
        }
      },
      submit: function(applyState){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/orgApply/approveApply',{
          params:{applyId: this.orgApply.id, state: applyState}
        })
          .then(res =>{
            this.$store.commit("hideLoading");
           this.reBack();
          }).catch(err =>{
          this.$store.commit("hideLoading");
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        });
      },
      save: function(){
        this.$store.commit("showLoading");
        this.$axios.post('/occ/orgApply/add', this.orgApply)
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
      getInfoById: function(orgApplyId){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/orgApply/detail',{
             params:{id: orgApplyId}
        }).then(res =>{
          const data = res.data;
          this.orgApply = data.data;
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
        this.$axios.put('/occ/orgApply/update', this.orgApply)
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
