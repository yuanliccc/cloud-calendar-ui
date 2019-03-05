<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">角色编辑</div>
    <div class="publicTitle" v-if="add">新增角色</div>
    <div>
      <el-form label-position="left" ref="role"class="add_Edit" :model="role" :rules="rules" :inline="true"
                label-width="120px">
        <el-form-item label="角色名称" prop="name" v-if="add">
          <el-input v-model="role.name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色key" prop="rolekey" v-if="add">
          <el-input v-model="role.rolekey" placeholder="角色key"></el-input>
        </el-form-item>
        <el-form-item label="组织机构" prop="orgid" v-if="add">
          <el-select v-model="role.orgid" filterable placeholder="请选择" clearable>
            <el-option v-for="i in organizations" :value="i.id" :key="i.id" :label="i.name">
              <span style="float: left">{{i.name}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{i.orgkey}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色级别" prop="rolelevel">
          <el-select v-model="role.rolelevel" filterable placeholder="默认6最高，1最低">
            <el-option v-for="i in roleLevels" :value="i" :key="i" :label="i">
              <span style="float: left">{{i}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{suggest[i]}}</span>
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
    name: 'roleForm',
    data(){
      return {
        add: true,
        role: {
          id: '',
          name: '',
          rolekey: '',
          orgid: '',
          rolelevel: 0,
        },
        roleLevels:[0,1,2,3,4,5],
        organizations:[],
        suggest:["游客类角色","普通员工类角色","负责管理员工类角色","低级机构管理类角色","上级机构管理类角色","机构总管理类角色"],
        rules:{
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
          rolekey: [
            { required: true, message: '请输入角色key', trigger: 'blur' }
          ],
          rolelevel:[
            { required: true, message: '请选择角色级别', trigger: 'blur' }
          ]
        }
      }
    },
    mounted: function(){
      this.add = (this.$route.name == 'roleForm_Add' ? true : false);
      this.getAllOrg();
      if(!this.add){
        this.getInfoById(this.$route.params.roleId);
       }
    },
    methods:{
      clear:function(){
        this.role= {
          id: '',
          name: '',
          rolekey: '',
          orgid: '',
          rolelevel: 0,
        }
      },
      submit: function(){
        this.$refs.role.validate((valid) => {
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
        this.$axios.post('/occ/role/add', this.role)
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
      getInfoById: function(roleId){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/role/detail',{
             params:{id: roleId}
        }).then(res =>{
          const data = res.data;
          this.role = data.data;
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
        this.$axios.put('/occ/role/update', this.role)
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
      }
    }
  }
</script>

<style scoped>

</style>
