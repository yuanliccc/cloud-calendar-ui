<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">事件编辑</div>
    <div class="publicTitle" v-if="add">新增事件</div>
    <div>
      <el-form label-position="left" ref="event"class="add_Edit" :model="event" :rules="rules"
                label-width="120px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="event.title"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="timeList">
          <el-date-picker
            v-model="event.timeList"
            type="daterange"
            :picker-options="expireTimeOption"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="event.type">
            <el-option v-for="i in types" :key="i" :value="i" :label="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="this.$route.params.scheduleId == undefined" label="对应日程" prop="scheduleid">
          <el-select v-model="event.scheduleid">
            <el-option v-for="i in schedules" :key="i.id" :value="i.id" :label="i.title"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优先级" prop="level">
          <el-select v-model="event.level">
            <el-option v-for="i in levels" :key="i.name" :value="i.name" :label="i.tip">
              <span style="float: left">{{i.name}}</span>
              <span style="float: right;">{{i.tip}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="event.content" resize="none" rows="5"
                    placeholder="内容"></el-input>
        </el-form-item>
        <div class="form_Bt_Event">
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
    name: 'eventForm',
    data(){
      return {
        add: true,
        event: {
          id: '',
          title: '',
          content: '',
          starttime: '',
          endtime: '',
          submituserid: '',
          submittime: '',
          type: '',
          level: 1,
          scheduleid: '',
          timeList:[],
        },
        schedules:[],
        levels:[
          {
            name: 1,
            tip: '默认等级'
          },
          {
            name: 2,
            tip: '优先级比默认等级高'
          },
          {
            name: 3,
            tip: '优先级比日程高'
          },
        ],
        types:['追加事件', '紧急事件'],
        rules:{
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          timeList: [
            { required: true, message: '请选择开始时间和结束时间', trigger: 'blur' }
          ],
          scheduleid:[
            { required: true, message: '请选择对应事件', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'blur' }
          ],
          level: [
            { required: true, message: '请选择优先级', trigger: 'blur' }
          ],
        },
        expireTimeOption: {
          disabledDate(date) { //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
            return date.getTime() <= Date.now();
          }
        },
      }
    },
    mounted: function(){
      this.add = (this.$route.name == 'eventForm_Add' ? true : false);
      if(!this.add){
        this.getInfoById(this.$route.params.eventId);
       }
      if(this.$route.params.scheduleId == undefined){
        this.getAllSchedule();
      }
    },
    methods:{
      clear:function(){
        this.event= {
          id: '',
          title: '',
          content: '',
          starttime: '',
          endtime: '',
          submituserid: '',
          submittime: '',
          type: '',
          level: 1,
          scheduleid: '',
          timeList:[]
        }
      },
      submit: function(){
        this.$refs.event.validate((valid) => {
          if (valid) {
            if(this.$route.params.scheduleId != undefined){
               this. event.scheduleid = this.$route.params.scheduleId;
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
        this.event.submittime = new Date();
        this.event.starttime = this.event.timeList[0];
        this.event.endtime = this.event.timeList[1];
        this.event.submituserid = this.$store.getters.userInfo.user.id

        this.$store.commit("showLoading");
        this.$axios.post('/occ/event/add', this.event)
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
      getInfoById: function(eventId){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/event/detail',{
             params:{id: eventId}
        }).then(res =>{
          const data = res.data.data;
          this.event = {
            id: data.id,
            title: data.title,
            content: data.content,
            starttime: data.starttime,
            endtime: data.endtime,
            submituserid: data.submituserid,
            submittime: data.submittime,
            type: data.type,
            scheduleid: data.scheduleid,
            level: data.level,
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
      edit: function(){
        this.$store.commit("showLoading");
        this.$axios.put('/occ/event/update', this.event)
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
      getAllSchedule: function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/schedule/findAllSchedule").then(res =>{
          this.$store.commit("hideLoading");
          const  data = res.data.data;
          this.schedules = data;
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
  .form_Bt_Event{
    height: 100px;
    padding: 50px 0 0 0;
  }
</style>
