<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">机构日历编辑</div>
    <div class="publicTitle" v-if="add">新增机构日历</div>
    <div>
      <el-form label-position="left" ref="orgCalender"class="add_Edit" :model="orgCalender" :rules="rules"
                label-width="120px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="orgCalender.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="可重复" prop="isrepeat">
          <el-select v-model="orgCalender.isrepeat">
            <el-option v-for="i in repeatList" :key="i" :value="i" :label="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="orgCalender.type">
            <el-option v-for="i in typeList" :key="i" :value="i" :label="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下级机构可见" prop="subordinatecanseen">
          <el-select v-model="orgCalender.subordinatecanseen">
            <el-option v-for="i in repeatList" :key="i" :value="i" :label="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="orgCalender.type == '单日'" label="具体时间" prop="starttime">
          <el-date-picker
            v-model="orgCalender.starttime"
            placeholder="具体时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="orgCalender.type == '多日'" label="具体时间" prop="timeList">
          <el-date-picker
            v-model="orgCalender.timeList"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="orgCalender.content" resize="none" rows="5"
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
    name: 'orgCalenderForm',
    data(){
      return {
        add: true,
        orgCalender: {
          id: '',
          title: '',
          content: '',
          type:'单日',
          isrepeat: '是',
          submituserid: '',
          submittime: '',
          subordinatecanseen: '否',
          orgid: '',
          starttime:'',
          endtime:'',
          timeList:[],
        },
        expireTimeOption: {
          disabledDate(date) { //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
            return date.getTime() <= Date.now();
          }
        },
        repeatList:["是", "否"],
        typeList:["单日","多日"],
        rules:{
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          timeList: [
            { required: true, message: '请选择具体时间', trigger: 'blur' }
          ],
          starttime:[
            { required: true, message: '请选择具体时间', trigger: 'blur' }
          ],
          isrepeat:[
            { required: true, message: '请选择是否可重复', trigger: 'blur' }
          ],
          type:[
            { required: true, message: '请选择单日或多日', trigger: 'blur' }
          ],
          subordinatecanseen:[
            { required: true, message: '请选择下级机构是否可见', trigger: 'blur' }
          ]
        }
      }
    },
    mounted: function(){
      this.add = (this.$route.name == 'orgCalenderForm_Add' ? true : false);
      if(!this.add){
        this.getInfoById(this.$route.params.orgCalenderId);
       }
    },
    methods:{
      clear:function(){
        this.orgCalender= {
          id: '',
          title: '',
          content: '',
          type:'单日',
          isrepeat: '是',
          submituserid: '',
          submittime: '',
          subordinatecanseen: '否',
          orgid: '',
          starttime:'',
          endtime:'',
          timeList:[],
        }
      },
      submit: function(){
        this.$refs.orgCalender.validate((valid) => {
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
        this.orgCalender.submittime = new Date();
        this.orgCalender.submituserid = this.$store.getters.userInfo.user.id;
        this.orgCalender.orgid = this.$store.getters.userInfo.organization.id;
        if(this.orgCalender.type == "单日"){
          this.orgCalender.endtime = this.orgCalender.starttime;
        }else {
          this.orgCalender.starttime = this.orgCalender.timeList[0];
          this.orgCalender.endtime = this.orgCalender.timeList[1];
        }

        this.$store.commit("showLoading");
        this.$axios.post('/occ/orgCalender/add', this.orgCalender)
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
      getInfoById: function(orgCalenderId){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/orgCalender/detail',{
             params:{id: orgCalenderId}
        }).then(res =>{
          const data = res.data.data;
          this.orgCalender= {
            id: data.id,
            title: data.title,
            content: data.content,
            type: data.type,
            isrepeat: data.isrepeat,
            submituserid: data.submituserid,
            submittime: data.submittime,
            subordinatecanseen: data.subordinatecanseen,
            orgid: data.orgid,
            starttime:data.starttime,
            endtime:data.endtime,
            timeList:[data.starttime, data.endtime],
          }
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
        if(this.orgCalender.type == "单日"){
          this.orgCalender.endtime = this.orgCalender.starttime;
        }else {
          this.orgCalender.starttime = this.orgCalender.timeList[0];
          this.orgCalender.endtime = this.orgCalender.timeList[1];
        }
        this.$store.commit("showLoading");
        this.$axios.put('/occ/orgCalender/update', this.orgCalender)
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
  .form_Bt{
    height: 100px;
    padding: 50px 0 0 0;
  }
</style>
