<template>
  <div class="publicFrom">
    <div class="publicTitle notice_Title">{{notice.title}}</div>
    <div class="publicTitle_Data">{{notice.starttime | formatDate}}</div>
    <div class="public_Display">
      <el-form label-position="left" ref="notice"class="add_Edit" :model="notice"
            label-width="120px">
        <!--<el-form-item label="用户id">
          <el-input v-model="notice.userid" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="notice.state" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="notice.title" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-input v-model="notice.starttime" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="notice.type" disabled="disabled"></el-input>
        </el-form-item>-->
        <div class="notice_Content">
          {{notice.content}}
        </div>
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
  import {formatDate} from '../../../assets/lib/common'
export default{
  name: 'noticeDisplay',
  data(){
    return {
     notice: {},
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  },
  mounted: function(){
    this.getInfoById(this.$route.params.noticeId);
  },
  methods:{
    reBack: function(){
      this.$router.go(-1);
    },
    getInfoById: function(noticeId){

      this.$store.commit("showLoading");
      this.$axios.get('/occ/notice/detail',{
        params:{id: noticeId}
      }).then(res =>{
        const data = res.data;
        this.notice = data.data;
        this.$store.commit("hideLoading");


        if(this.notice.state == '未读' || this.notice.state == '已通知'){
          this.notice.state = '已读';
          this.notice.checktime = new Date();
          this.$store.commit("showLoading");
          this.$axios.put('/occ/notice/update', this.notice).then(res =>{
            const data = res.data;
            if(data.code == '400'){
              this.$store.commit("hideLoading");
              this.$message({
               showClose: true,
               message: data.message,
               type: 'warning'
              });
            }else {
              this.$store.commit("hideLoading");
              this.$parent.$children[0].flushUnreadNotice();
            }
          }).catch(err =>{
            this.$store.commit("hideLoading");
            this.$message({
             showClose: true,
             message: err,
             type: 'error'
            });
          });
        }
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
  .notice_Title{
    margin-top: 100px!important;
  }
  .publicTitle_Data{
    font-size: 16px;
    text-align: center;
    margin-top: 20px;
  }
  .notice_Content{
    width:650px;
    margin: 0 auto;
  }
</style>
