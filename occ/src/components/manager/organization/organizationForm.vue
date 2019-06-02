<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">组织机构编辑</div>
    <div class="publicTitle" v-if="add">新增组织机构</div>
    <div>
      <el-form label-position="left" ref="organization"class="add_Edit" :model="organization" :rules="rules"
                label-width="120px">
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="organization.name"></el-input>
        </el-form-item>
        <el-form-item label="机构标识" prop="orgkey" v-if="add">
          <el-input v-model="organization.orgkey" placeholder="机构标识，一旦新建便无法修改"></el-input>
        </el-form-item>
        <el-form-item label="机构标识" prop="orgkey" v-if="!add">
          <el-input v-model="organization.orgkey" placeholder="机构标识，一旦新建便无法修改" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="父机构" prop="parentorgid" v-if="roleLevel != 6">
          <el-select v-model="organization.parentorgid" placeholder="请选择" filterable clearable>
            <el-option v-for="i in organizations" :value="i.id" :key="i.id" :label="i.name">
              <span style="float: left">{{i.name}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{i.orgkey}}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="父机构" v-if="roleLevel == 6">
          <el-select v-model="organization.parentorgid" placeholder="无" filterable clearable>
            <el-option v-for="i in organizations" :value="i.id" :key="i.id" :label="i.name">
              <span style="float: left">{{i.name}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{i.orgkey}}</span>
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
    name: 'organizationForm',
    data(){
      return {
        add: true,
        organization: {
          id: '',
          name: '',
          orgkey: '',
          parentorgid: '',
        },
        roleLevel:0,
        organizations:[],
        rules:{
          name: [
            { required: true, message: '请输入机构名称', trigger: 'blur' }
          ],
          orgkey: [
            { required: true, message: '请输入机构标识，一旦新建便无法修改', trigger: 'blur' }
          ],
          parentorgid: [
            { required: true, message: '请输入父模块', trigger: 'blur' }
          ],
        }
      }
    },
    mounted: function(){
      this.add = (this.$route.name == 'organizationForm_Add' ? true : false);
      this.roleLevel = this.$store.getters.userInfo.role.rolelevel;

      this.getAllOrgByThisOrLow();

      if(!this.add){
        this.getInfoById(this.$route.params.organizationId);
       }
    },
    methods:{
      clear:function(){
        this.organization= {
          id: '',
          name: '',
          orgkey: '',
          parentorgid: '',
        }
      },
      submit: function(){
        this.$refs.organization.validate((valid) => {
          if (valid) {
              if(this.organization.id == this.organization.parentorgid){
                this.$message({
                  showClose: true,
                  message: '父机构不能为自身',
                  type: 'warning'
                });
                  return;
              }

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
        this.$axios.post('/occ/organization/add', this.organization)
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
      getInfoById: function(organizationId){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/organization/detail',{
             params:{id: organizationId}
        }).then(res =>{
          const data = res.data;
          this.organization = data.data;
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
        this.$axios.put('/occ/organization/update', this.organization)
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
      getAllOrgByThisOrLow: function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/organization/getAllOrgByThisOrLow").then(res =>{
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
      }
    }
  }
</script>

<style scoped>

</style>
