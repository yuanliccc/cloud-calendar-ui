<template>
  <div class="publicFrom">
    <div class="publicTitle">查看机构日历</div>
    <div class="public_Display">
      <el-form label-position="left" ref="orgCalender"class="add_Edit" :model="orgCalender":inline="true"
            label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="orgCalender.title" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="是否重复">
          <el-input v-model="orgCalender.isrepeat" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="是否到期" v-if="">
          <el-input :value="formatDate(orgCalender.specifictime) < formatDate(orgCalender.submittime) ? '是' : '否'" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="具体时间">
          <el-date-picker
            v-if="orgCalender.isrepeat == '是'"
            v-model="orgCalender.specifictime"
            format="MM-dd"
            type="datetime"
            disabled="disabled">
          </el-date-picker>
          <el-date-picker
            v-if="orgCalender.isrepeat == '否'"
            v-model="orgCalender.specifictime"
            format="yyyy-MM-dd"
            type="datetime"
            disabled="disabled">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="orgCalender.content"
                    type="textarea" disabled="disabled" resize="none"></el-input>
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
  import {formatDate} from '../../../assets/lib/common'
export default{
  name: 'orgCalenderDisplay',
  data(){
    return {
     orgCalender: {},
    }
  },
  mounted: function(){
    this.getInfoById(this.$route.params.orgCalenderId);
  },
  methods:{
    reBack: function(){
      this.$router.go(-1);
    },
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    },
    getInfoById: function(orgCalenderId){

      this.$store.commit("showLoading");
      this.$axios.get('/occ/orgCalender/detail',{
        params:{id: orgCalenderId}
      }).then(res =>{
        const data = res.data;
        this.orgCalender = data.data;
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
