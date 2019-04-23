<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">机构工作日程编辑</div>
    <div class="publicTitle" v-if="add">新增机构工作日程</div>
    <div>
      <el-form label-position="left" ref="schedule"class="add_Edit" :model="schedule" :rules="rules"
                label-width="120px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="schedule.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="下级机构可见" prop="subordinatecanseen">
          <el-select v-model="schedule.subordinatecanseen">
            <el-option v-for="i in repeatList" :key="i" :value="i" :label="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期" prop="timeList">
          <el-date-picker
            v-model="schedule.timeList"
            type="daterange"
            :picker-options="expireTimeOption"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="schedule.content" resize="none" rows="5"
                    placeholder="内容"></el-input>
        </el-form-item>
        <el-timeline>
          <el-timeline-item
            style="padding:0;"
            v-for="(i, index) in timeLine"
            color="#0bbd87"
            :timestamp="formatDate(i)"
            :key="index">
            <span v-if="index == 0">开始</span>
            <span v-if="index != 0">结束</span>
          </el-timeline-item>
        </el-timeline>
        <div class="form_Bt">
          <el-form-item>
            <el-button v-if="add" type="primary" @click="submit">立即创建</el-button>
            <el-button v-if="schedule.state != '执行'" type="primary" @click="submit2">存入草稿</el-button>
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
  import {formatDate} from '../../../assets/lib/common'
  export default{
    name: 'scheduleForm',
    data(){
      return {
        add: true,
        schedule: {
          id: '',
          title: '',
          content: '',
          starttime: '',
          endtime: '',
          submituserid: '',
          submittime: '',
          subordinatecanseen: '否',
          orgid: '',
          state: '',
          updateuserid: '',
          updatetime: '',
          timeList:[],
        },
        repeatList:["是", "否"],
        rules:{
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          subordinatecanseen: [
            { required: true, message: '请选择下级机构是否可见', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          timeList: [
            { required: true, message: '请选择开始和结束日期', trigger: 'blur' }
          ],
        },
        expireTimeOption: {
          disabledDate(date) { //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
            return date.getTime() <= Date.now();
          }
        },
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    computed:{
      timeLine:function(){
        return this.schedule.timeList;
      }
    },
    mounted: function(){
      this.add = (this.$route.name == 'scheduleForm_Add' ? true : false);
      if(!this.add){
        this.getInfoById(this.$route.params.scheduleId);
       }
    },
    methods:{
      clear:function(){
        this.schedule= {
          id: '',
          title: '',
          content: '',
          starttime: '',
          endtime: '',
          submituserid: '',
          submittime: '',
          subordinatecanseen: '否',
          orgid: '',
          state: '',
          updateuserid: '',
          updatetime: '',
          timeList: []
        }
      },
      submit: function(){
        this.$refs.schedule.validate((valid) => {
          if (valid) {
            if(this.add) {
              this.save("执行");
            }else{
              this.edit("执行");
            }
          } else {
            return false;
          }
        });
      },
      submit2: function(){
        this.$refs.schedule.validate((valid) => {
          if (valid) {
            if(this.add) {
              this.save("草稿");
            }else{
              this.edit("草稿");
            }
          } else {
            return false;
          }
        });
      },
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      },
      save: function(state){
        this.schedule.submittime = new Date();
        this.schedule.submituserid = this.$store.getters.userInfo.user.id;
        this.schedule.orgid = this.$store.getters.userInfo.organization.id;
        this.schedule.starttime = this.schedule.timeList[0];
        this.schedule.endtime = this.schedule.timeList[1];
        this.schedule.state = state;

        this.$store.commit("showLoading");
        this.$axios.post('/occ/schedule/add', this.schedule)
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
      getInfoById: function(scheduleId){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/schedule/detail',{
             params:{id: scheduleId}
        }).then(res =>{
          const data = res.data.data;
          data.data;
          this.schedule = {
            id: data.id,
            title: data.title,
            content: data.content,
            starttime: data.starttime,
            endtime: data.endtime,
            submituserid: data.submituserid,
            submittime: data.submittime,
            subordinatecanseen: data.subordinatecanseen,
            orgid: data.orgid,
            state: data.state,
            updateuserid:  data.updateuserid,
            updatetime: data.updatetime,
            timeList: [data.starttime, data.endtime]
          };
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
      edit: function(state){
        if(this.schedule.state == "草稿" && state == "执行"){
          this.schedule.state = "执行";
        }

        this.schedule.updatetime = new Date();
        this.schedule.updateuserid = this.$store.getters.userInfo.user.id;
        this.schedule.starttime = this.schedule.timeList[0];
        this.schedule.endtime = this.schedule.timeList[1];

        this.$store.commit("showLoading");
        this.$axios.put('/occ/schedule/update', this.schedule)
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
