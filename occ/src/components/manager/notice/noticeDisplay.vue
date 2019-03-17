<template>
  <div class="publicFrom">
    <div class="publicTitle">查看通知</div>
    <div class="public_Display">
      <el-form label-position="left" ref="notice"class="add_Edit" :model="notice":inline="true"
            label-width="120px">
        <el-form-item label="用户id">
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
  name: 'noticeDisplay',
  data(){
    return {
     notice: {},
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
