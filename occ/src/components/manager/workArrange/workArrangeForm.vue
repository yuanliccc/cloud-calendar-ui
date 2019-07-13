<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">工作安排编辑</div>
    <div class="publicTitle" v-if="add">新增工作安排</div>
    <div>
      <el-form label-position="left" ref="workArrange"class="add_Edit" :model="workArrange" :rules="rules"
                label-width="120px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="workArrange.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="是否重复" prop="isrepeat">
          <el-select v-model="workArrange.isrepeat">r
            <el-option v-for="i in repeatList" :key="i" :value="i" :label="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="workArrange.isrepeat == '否'" label="开始日期" prop="timeList">
          <el-date-picker
            v-model="workArrange.timeList"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
          <el-form-item v-if="workArrange.isrepeat == '是'" label="开始日期" prop="timeList">
            <el-date-picker
              v-model="workArrange.timeList"
              type="daterange"
              format="M-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="workArrange.content" resize="none" rows="5"
                    placeholder="内容"></el-input>
        </el-form-item>
        <el-form-item label="分配的用户" v-if="!add"></el-form-item>
        <div class="publicListTable" v-if="!add">
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
            <el-button v-if="add" type="primary" @click="submit">立即创建</el-button>
            <el-button v-if="!add" @click="displayInfo" style="background-color: #ccc">刷新</el-button>
            <el-button v-if="!add" type="primary" icon="el-icon-s-custom" @click="closeOrOpen">分配用户</el-button>
            <el-button v-if="add" type="primary" @click="clear">重置</el-button>
            <el-button v-if="!add" type="primary" @click="submit">立即修改</el-button>
            <el-button @click="reBack">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="assign_User" v-if="selUser">
      <div class="publicTitle" v-if="add">分配用户</div>
      <el-transfer
        :titles="titles"
        class="transferDis"
        filterable
        filter-placeholder="请输入用户名称"
        v-model="selectUsers"
        :data="users">
      </el-transfer>
      <div class="center_Bt">
        <el-button type="primary" @click="saveUserForWork">确定</el-button>
        <el-button @click="closeAndClear">取消</el-button>
      </div>

    </div>
  </div>
</template>
<script>
  import {formatDate} from '../../../assets/lib/common'
  export default{
    name: 'workArrangeForm',
    data(){
      return {
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
        datas:{
          pageNum: 1,
        },
        displays:[10, 20, 50],
        display: 10,
        add: true,
        workArrange: {
          id: '',
          orgid: '',
          submituserid: '',
          submittime: '',
          isrepeat: '否',
          starttime: '',
          endtime: '',
          title: '',
          content: '',
          state: '',
          timeList:[]
        },
        repeatList:["是", "否"],
        titles:['未分配','已分配'],
        users:[],
        selectUsers:[],
        expireTimeOption: {
          disabledDate(date) { //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
            return date.getTime() <= Date.now();
          }
        },
        selUser: false,
        theUsers:[],
        rules:{
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          timeList: [
            { required: true, message: '请输入开始日期', trigger: 'blur' }
          ],
          showUser: [
            { required: false, message: '请选择负责此工作的用户', trigger: 'blur,change' }
          ],
          isrepeat: [
            { required: true, message: '请输入是否重复', trigger: 'blur' }
          ],
        }
      }
    },
    mounted: function(){
      this.add = (this.$route.name == 'workArrangeForm_Add' ? true : false);
      this.getUserInfo();
      if(!this.add){
        this.getInfoById(this.$route.params.workArrangeId);
        this.displayInfo();
       }
    },
    computed:{
      rolePers: function () {
        return this.$store.getters.userInfo.permissions;
      },
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
      revoke: function(scheduleId){
        this.$confirm('此操作将永久撤销该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('showLoading');
          this.$axios.get("/occ/schedule/revoke",{
            params:{id: scheduleId}
          }).then(res =>{
            this.$store.commit('hideLoading');
            this.$message({
              type: 'success',
              message: '撤销成功!'
            });
            this.displayInfo();
          }).catch(err =>{
            this.$store.commit('hideLoading');
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
        }).catch(() =>{
          this.$message({
            type: 'info',
            message: '已取消撤销'
          });
        })
      },
      displayInfo: function(){
        this.$store.commit('showLoading');
        this.$axios.get('/occ/userWorkArrange/listByKey',{
          params:{page: this.datas.pageNum, size: this.display, key: 'workarrangeid', value: this.$route.params.workArrangeId}
        }).then(res =>{
          const data = res.data;
          this.datas = data.data;
          this.selectUsers = [];
          for(let i = 0; i < this.datas.list.length; i++){
            this.selectUsers.push(this.datas.list[i].userid);
          }
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
      del: function(scheduleId){
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('showLoading');

          this.$axios.get('/occ/schedule/delete',{
            params:{id: scheduleId}
          }).then(res =>{
            this.$store.commit('hideLoading');
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.displayInfo();
          }).catch(err =>{
            this.$store.commit('hideLoading');
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteAll: function(){
        if(this.$refs.table.store.states.selection.length == 0){
          this.$message({
            type: 'info',
            message: '请选择删除的内容！'
          });
          return;
        }

        this.$confirm('此操作将永久删除所选数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const sel = this.$refs.table.store.states.selection;
          let arr = new Array();
          sel.forEach(row =>{
            arr.push(row);
          });
          this.$store.commit('showLoading');
          this.$axios.post('/occ/schedule/deleteBatch',arr).then(res =>{
            this.$store.commit('hideLoading');
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.displayInfo();
          }).catch(err =>{
            this.$store.commit('hideLoading');
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      clear:function(){
        this.workArrange= {
          id: '',
          orgid: '',
          submituserid: '',
          submittime: '',
          isrepeat: '否',
          starttime: '',
          endtime: '',
          title: '',
          content: '',
          state: '',
          timeList:[]
        };
        this.selectUsers = [];
      },
      submit: function(){
        this.$refs.workArrange.validate((valid) => {
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
        this.workArrange.submittime = new Date();
        this.workArrange.submituserid = this.$store.getters.userInfo.user.id;
        this.workArrange.orgid = this.$store.getters.userInfo.organization.id;
        this.workArrange.starttime = this.workArrange.timeList[0];
        this.workArrange.endtime = this.workArrange.timeList[1];
        this.workArrange.state = '执行';

        this.$store.commit("showLoading");
        this.$axios.post('/occ/workArrange/add', this.workArrange)
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
      getInfoById: function(workArrangeId){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/workArrange/detail',{
             params:{id: workArrangeId}
        }).then(res =>{
          const data = res.data.data;
          this.workArrange = {
            id: data.id,
            orgid: data.orgid,
            submittime: data.submittime,
            isrepeat: data.isrepeat,
            title: data.title,
            content: data.content,
            state: data.state,
            timeList:[data.starttime, data.endtime]
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
        this.$axios.put('/occ/workArrange/update', this.workArrange)
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
            this.displayInfo();
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
      hasPermission(permission){
        return this.rolePers.indexOf(permission) > -1;
      },
      getUserInfo: function(){
        this.$store.commit("showLoading");
        this.$axios.get('/occ/user/getUserByLoginOrgId')
          .then(res =>{
            const data = res.data.data;
            this.theUsers = data;
            data.forEach(e =>{
              this.users.push({
                key: e.id,
                label: e.name,
                disabled: false,
              });
            });
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
      closeOrOpen: function(){
        this.selUser = !this.selUser;
      },
      saveUserForWork: function(){
        let workArrangeDto = {
          workarrangeid: this.$route.params.workArrangeId,
          userlist: this.selectUsers
        };
        this.$store.commit("showLoading");
        this.$axios.post('/occ/workArrange/saveUserForWork',workArrangeDto)
        .then(res =>{
          this.closeOrOpen();
          this.$store.commit("hideLoading");
          this.$message({
            showClose: true,
            message: '分配成功！',
            type: 'success'
          });
          this.displayInfo();
        }).catch(err =>{
          this.$store.commit("hideLoading");
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        });
      },
      closeAndClear:function(){
        this.closeOrOpen();
        this.selectUsers = [];
        this.displayInfo();
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
  .assign_User{
    position: fixed;
    z-index: 1100;
    top:0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: #fff;
  }
  .center_Bt{
    text-align: center;
    margin-top: 20px;
  }
  .form_Bt_Work{
    height: 100px;
    margin-top: 50px;
    padding: 50px 0 0 0;
    padding-left: 400px;
  }
  .publicListTable{
    width:100%;
    margin: 0 auto;
  }
</style>
