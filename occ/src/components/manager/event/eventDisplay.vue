<template>
  <div class="publicFrom">
    <div class="publicTitle">查看事件</div>
    <div class="public_Display">
      <el-form label-position="left" ref="event"class="add_Edit" :model="event"
            label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="event.title" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="event.content" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-input v-model="event.starttime" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="event.endtime" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="event.type" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="优先级">
          <el-input v-model="event.level" disabled="disabled"></el-input>
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
  name: 'eventDisplay',
  data(){
    return {
     event: {},
    }
  },
  mounted: function(){
    this.getInfoById(this.$route.params.eventId);
  },
  methods:{
    reBack: function(){
      this.$router.go(-1);
    },
    getInfoById: function(eventId){

      this.$store.commit("showLoading");
      this.$axios.get('/occ/event/detail',{
        params:{id: eventId}
      }).then(res =>{
        const data = res.data;
        this.event = data.data;
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
