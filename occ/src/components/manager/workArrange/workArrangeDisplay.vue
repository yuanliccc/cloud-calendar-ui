<template>
  <div class="publicFrom">
    <div class="publicTitle">查看工作安排</div>
    <div class="public_Display">
      <el-form label-position="left" ref="workArrange"class="add_Edit" :model="workArrange"
            label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="workArrange.title" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" v-if="workArrange.isrepeat == '否'">
          <el-date-picker
            v-model="workArrange.starttime"
            format="yyyy-MM-dd"
            type="datetime"
            disabled="disabled">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间" v-if="workArrange.isrepeat == '是'">
          <el-date-picker
            v-model="workArrange.starttime"
            format="MM-dd"
            type="datetime"
            disabled="disabled">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" v-if="workArrange.isrepeat == '否'">
          <el-date-picker
            v-model="workArrange.endtime"
            format="yyyy-MM-dd"
            type="datetime"
            disabled="disabled">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" v-if="workArrange.isrepeat == '是'">
          <el-date-picker
            v-model="workArrange.endtime"
            format="MM-dd"
            type="datetime"
            disabled="disabled">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="workArrange.state" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="是否重复">
          <el-input v-model="workArrange.isrepeat" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="workArrange.content"
                    type="textarea" disabled="disabled" resize="none" rows="6"></el-input>
        </el-form-item>
        <el-form-item label="分配的用户"></el-form-item>
        <div class="publicListTable">
          <el-table :data="datas.list" ref="table">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="name" :label="Titles[0].name" sortable>
              <template slot-scope="scope">
                <el-select v-model="scope.row.userid" disabled="disabled">
                  <el-option v-for="i in theUsers" :key="i.id" :value="i.id" :label="i.name"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="iscomplete" :label="Titles[1].name" sortable>
              <template slot-scope="scope">
                <span v-if="scope.row.iscomplete == null">未完成</span>
                <span v-else-if="scope.row.iscomplete == '是' && scope.row.isrepeat == '是' && thisYearFinish(scope.row.completeyear)">今年已完成</span>
                <span v-else-if="scope.row.iscomplete == '是' && scope.row.isrepeat == '是' && !thisYearFinish(scope.row.completeyear)">今年未完成</span>
                <span v-else>已完成</span>
              </template>
            </el-table-column>
            <el-table-column prop="completeyear" :label="Titles[2].name" sortable></el-table-column>
            <el-table-column prop="state" :label="Titles[3].name" sortable>
              <template slot-scope="scope">
                <span v-if="scope.row.iscomplete == null">执行中</span>
                <span v-if="scope.row.iscomplete == '是' && scope.row.isrepeat == '否'">已完成</span>
                <span v-if="scope.row.iscomplete == '是' && scope.row.isrepeat == '是' && thisYearFinish(scope.row.completeyear)">今年已完成</span>
                <span v-if="scope.row.iscomplete == '是' && scope.row.isrepeat == '是' && !thisYearFinish(scope.row.completeyear)">今年执行中</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="publicListTable_Page">
            <el-pagination
              @size-change="displayChange"
              @current-change="sizeChange"
              @prev-click="prePage"
              @next-click="nextPage"
              :current-page="datas.pageNum"
              :page-sizes="displays"
              :page-size="display"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="datas.total">
            </el-pagination>
          </div>
        </div>
      </el-form>
      <el-form>
        <div class="form_Bt_Work">
          <el-form-item>
            <el-button @click="displayInfo" style="background-color: #ccc">刷新</el-button>
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
  name: 'workArrangeDisplay',
  data(){
    return {
     workArrange: {},
      Titles:[
        {
          name: '用户姓名',
          tip: 'userName'
        },
        {
          name: '是否完成',
          tip: 'iscomplete'
        },
        {
          name: '完成年份',
          tip: 'completeyear'
        },
        {
          name: '状态',
          tip: 'state'
        },
      ],
      theUsers:[],
      datas:{
        pageNum: 1,
      },
      displays:[10, 20, 50],
      display: 10,
    }
  },
  mounted: function(){
    this.getUserInfo();
    this.getInfoById(this.$route.params.workArrangeId);
    this.displayInfo();
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  },
  methods:{
    prePage:function(){
      if(!this.datas.isFirstPage){
        this.datas.pageNum--;
        this.displayInfo();
      }
    },
    nextPage: function(){
      if(!this.datas.isLastPage){
        this.datas.pageNum++;
        this.displayInfo();
      }
    },
    sizeChange: function(val){
      this.datas.pageNum = val;
      this.displayInfo();
    },
    displayChange: function(val){
      this.display = val;
      this.displayInfo()
    },
    getUserInfo: function(){
      this.$store.commit("showLoading");
      this.$axios.get('/occ/user/getUserByLoginOrgId')
        .then(res =>{
          const data = res.data.data;
          this.theUsers = data;
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
    displayInfo: function(){
      this.$store.commit('showLoading');
      this.$axios.get('/occ/userWorkArrange/listByKey',{
        params:{page: this.datas.pageNum, size: this.display, key: 'workarrangeid', value: this.$route.params.workArrangeId}
      }).then(res =>{
        const data = res.data;
        this.datas = data.data;
        this.$store.commit('hideLoading');
      }).catch(err =>{
        this.$store.commit('hideLoading');
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
    getInfoById: function(workArrangeId){

      this.$store.commit("showLoading");
      this.$axios.get('/occ/workArrange/detail',{
        params:{id: workArrangeId}
      }).then(res =>{
        const data = res.data;
        this.workArrange = data.data;
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
    thisYearFinish: function(completeYear){
      let f = false;

      const year = completeYear.split(",");
      if(year[year.length - 1] == new Date().getFullYear()){
        f = true;
      }
      return f;
    },
  }
}
</script>

<style scoped>
  .form_Bt_Work{
    height: 100px;
    margin-top: 50px;
    padding: 50px 0 0 0;
    padding-left: 300px;
  }
  .publicListTable{
    width:100%;
    margin: 0 auto;
  }
</style>
