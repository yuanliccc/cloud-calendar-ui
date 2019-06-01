<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">机构工作日程编辑</div>
    <div class="publicTitle" v-if="add">新增机构工作日程</div>
    <div>
      <el-form label-position="left" ref="schedule" class="add_Edit" :model="schedule" :rules="rules"
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
        <el-form>
          <el-timeline style="padding-left: 0;">
            <el-timeline-item
              style="padding:0;"
              v-for="(i, index) in timeLine"
              placement="top"
              :timestamp="formatDate(i.time)"
              :color="i.tip == 'start' ? 'red' : 'balck'"
              :key="index">
              <el-card>
                <h4>{{i.title}}</h4>
                <p>{{i.time | formatDate}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-form>
        <div class="form_Bt_Schedule">
          <el-form-item>
            <el-button v-if="add" type="primary" @click="submit">立即创建</el-button>
            <el-button v-if="!add && schedule.state != ''" type="primary" @click="addEvent">追加事件</el-button>
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
        events:[],
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
        timeLine:[],
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      }
    },
    watch:{
      'schedule.timeList':{
        handler(val, old){
          if(val == null){
            this.updateEvent();
          }else if(val != null && val.length != 0){
            this.updateTimeLine(val);
          }
        }
      }
    },
   /* computed:{
      timeLine:function(){
        return this.schedule.timeList;
      }
    },*/
    mounted: function(){
      this.add = (this.$route.name == 'scheduleForm_Add' ? true : false);
      if(!this.add){
        this.getInfoById(this.$route.params.scheduleId);
        this.getTheEventByScheduleId(this.$route.params.scheduleId)
        setTimeout(()=>{
          this.updateTimeLine(this.schedule.timeList);
        }, 200)
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
        },
        setTimeout(()=>{
          this.timeLine = [];
        }, 200)
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
      getTheEventByScheduleId: function(scheduleId){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/event/getTheEventByScheduleId', {
          params:{id: scheduleId }
        }).then(res =>{
          const data = res.data;
          this.events = data.data;
          this.updateEvent();
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
      updateEvent: function(){
        this.timeLine = new Array();
        this.events.forEach(e =>{
          this.timeLine.push({
            title: e.type + ":" + e.title + "开始",
            level: e.level,
            time: e.starttime,
            tip: 'start'
          });

          this.timeLine.push({
            title: e.type + ":" + e.title + "结束",
            level: e.level,
            time: e.endtime,
            tip: 'end'
          });
        });

        this.timeLine.sort(function(a,b){
          if((new Date(a.time).getTime()) - (new Date(b.time).getTime()) == 0 && a.level > b.level)
            return 1;
          else if((new Date(a.time).getTime()) - (new Date(b.time).getTime()) == 0 && a.level < b.level)
            return -1;
          return (new Date(a.time).getTime()) - (new Date(b.time).getTime());
        });
      },
      updateTimeLine:function(val){
        this.timeLine.push({
          title: '日程开始',
          level: 2,
          time: val[0],
          tip: 'start'
        });
        this.timeLine.push({
          title: '日程结束',
          level: 2,
          time: val[1],
          tip: 'end'
        })

        this.timeLine.sort(function(a,b){
          if((new Date(a.time).getTime()) - (new Date(b.time).getTime()) == 0 && a.level > b.level)
            return 1;
          else if((new Date(a.time).getTime()) - (new Date(b.time).getTime()) == 0 && a.level < b.level)
            return -1;
          return (new Date(a.time).getTime()) - (new Date(b.time).getTime());
        });
      },
      addEvent: function(){
        this.$router.push("/manager/eventForm/addForSchedule/" + this.$route.params.scheduleId);
      },
    }
  }
</script>

<style scoped>
  .form_Bt_Schedule{
    height: 100px;
    padding: 50px 0 0 0;
  }
  .start{
    color:red;
  }
  .end{

  }
</style>
