<template>
  <div class="publicList">
    <el-tabs type="border-card" class="noticeTabs" v-model="tabSel">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-bell"></i>通知</span>
        <div class="publicListTable">
          <div class="publicList_Head">
            <div class="publicList_Head_Bt">
              <el-button @click="displayInfo" style="background-color: #ccc">刷新</el-button>
              <el-button @click="seeAll" style="background-color: #ccc">标记为已读</el-button>
              <el-button @click="deleteAll" style="background-color: #ff000096;">批量删除</el-button>
            </div>
            <div class="publicList_Head_Find">
              <el-input v-model="findVal" class="findInput"></el-input>
              <el-select v-model="findKey" placeholder="请选择查找类别" style="float: right">
                <el-option v-for="i in findList" :label="i.name" :key="i.tip" :value="i.tip"></el-option>
              </el-select>
            </div>
          </div>
          <el-table :data="datas.list" ref="table">
            <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column
                :label="titles[2].name"
                width="300" :show-overflow-tooltip="true" sortable>
                <template slot-scope="scope">
                  <span @click="dis(scope.row.id)" class="notice_Span" :class="[scope.row.state == '已读' ? 'grap' : 'black']">{{scope.row.title}}</span>
                </template>
              </el-table-column>
            <el-table-column prop="content" :label="titles[1].name" :show-overflow-tooltip="true" sortable></el-table-column>
            <el-table-column :label="titles[3].name" sortable>
              <template slot-scope="scope">
               {{scope.row.starttime | formatDate}}
              </template>
            </el-table-column>
            <el-table-column prop="type" :label="titles[4].name" sortable></el-table-column>
            <!--<el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button @click="dis(scope.row.id)" type="text" size="mid" v-if="hasPermission('notice_display')">查看</el-button>
                <el-button type="text" size="mid" @click="edit(scope.row.id)" v-if="hasPermission('notice_edit')">编辑</el-button>
                <el-button @click="del(scope.row.id)" type="text" size="mid">删除</el-button>
              </template>
            </el-table-column>-->
          </el-table>
          <div class="notice_Page">
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
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-message"></i>私信</span>
        <el-container style="height: 600px;">
          <el-aside width="250px" style="background-color: #dfe3e6" class="innerbox">
            <div class="search">
              <i class="el-icon-search" style="width:40px;text-align: center"></i>
              <el-input v-model="findUser" placeholder="请输入用户昵称以查找用户"></el-input>
            </div>
            <div class="user" v-for="i in orgUsers" v-if="i.display" @click="chooseThis(i)" :class="[chatUser.id == i.id ? 'user2':'user']">
              <div class="user_Item">
                <img src="../../../assets/image/testPortrait.jpg" class="img"/>
                <span class="user_Nmae">{{i.name}}</span>
              </div>
              <div class="underLine"></div>
            </div>

          </el-aside>

          <el-container>
            <el-main style="background-color: #f3f5f7;">
              <div class="chat_Window">
                <img src="../../../assets/logo.png" style="margin: 0 auto"/>
              </div>
            </el-main>
          </el-container>
        </el-container>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
  import {formatDate} from '../../../assets/lib/common'
  export default{
    name: 'noticeList',
    data(){
      return {
        findList:[
          {
            name: '内容',
            tip: 'content'
          }
        ],
        findKey: '',
        findVal: '',
        titles:[
          {
            name: '用户id',
            tip: 'userid'
          },
          {
            name: '内容',
            tip: 'content'
          },
          {
            name: '标题',
            tip: 'title'
          },
          {
            name: '通知时间',
            tip: 'starttime'
          },
          {
            name: '类型',
            tip: 'type'
          },
        ],
        datas:{
        pageNum: 1,
      },
        displays:[10, 20, 50],
        display: 10,
        orgUsers:[
          {"id":1,"name":"系统管理员","account":"admin","password":"admin","phone":"15310490986","email":"965537330@qq.com","sex":"男", "display": true},
          {"id":2,"name":"管理员","account":"admin","password":"admin","phone":"15310490986","email":"965537330@qq.com","sex":"男", "display": true}
        ],
        findUser:"",
        chatUser:{},
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    watch:{
      findVal(value){
        this.displayInfo();
      },
      findKey(value){
        this.displayInfo();
      },
      findUser(value){
        this.showOrHideUser(value);
      },
    },
    mounted : function(){
      this.displayInfo();
      this.getChatUser();
    },
    computed:{
      rolePers: function () {
        return this.$store.getters.userInfo.permissions;
      },
      notice:function(){
        return this.$parent.$children[0].infomation;
      },
      tabSel:{
        get(){
          return this.$route.name == 'notice' ? '0' : '1';
        },
        set(val){
            return val;
        }
      }
    },
    created: function(){
      this.findKey = this.findList[0].tip;
    },
    methods: {
      jumpTo: function (url) {
            this.$router.push({path: url});
        },
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
      displayInfo: function(){
        this.$store.commit('showLoading');
        this.$axios.get('/occ/notice/listByKey',{
            params:{page: this.datas.pageNum, size: this.display, key: this.findKey, value: this.findVal}
        }).then(res =>{
          const data = res.data;
          //console.log(data.data)
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
      del: function(noticeId){
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('showLoading');

          this.$axios.get('/occ/notice/delete',{
            params:{id: noticeId}
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
          this.$axios.post('/occ/notice/deleteBatch',arr).then(res =>{
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
      dis: function(id){
        this.$router.push('/manager/noticeDisplay/' + id);
      },
      hasPermission(permission){
        return this.rolePers.indexOf(permission) > -1;
      },
      seeAll: function(){
        if(this.$refs.table.store.states.selection.length == 0){
          this.$message({
            type: 'info',
            message: '请标记通知！'
          });
          return;
        }

        this.$confirm('是否标记已读?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const sel = this.$refs.table.store.states.selection;
          let arr = new Array();
          sel.forEach(row =>{
            if(!row.state == '已读')
              arr.push(row);
          });
          if(arr.length == 0){
            this.$message({
              type: 'info',
              message: '请勿选择已读的通知！'
            });
              return ;
          }

          this.$store.commit('showLoading');
          this.$axios.post('/occ/notice/seeBatch',arr).then(res =>{
            this.$store.commit('hideLoading');
            this.$parent.$children[0].flushUnreadNotice();
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
            message: '已取消标记！'
          });
        });
      },
      showOrHideUser:function(val){
        this.orgUsers.forEach(e =>{
           if(e.name.indexOf(val) == -1){
             e.display = false;
           }else {
             e.display = true;
           }
        });
      },
      chooseThis: function(obj){
        this.chatUser = obj;
      },
      getChatUser: function(){
        this.$store.commit('showLoading');
        this.$axios.get('/occ/notice/getChatUser').then(res =>{
          this.orgUsers = res.data.data;
          this.$store.commit('hideLoading');
          this.$parent.$children[0].flushUnreadChatMessage();
        }).catch(err =>{
          this.$store.commit('hideLoading');
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
  .noticeTabs{
  }
  .notice_Page{
    width:430px;
    text-align: right;
    padding: 30px 0;
    padding-left: 50%;
  }
  .notice_Span{
    cursor: pointer;
  }
  .notice_Span:hover{
    color:blue;
    text-decoration: underline;
  }
  .black{
    color:#000;
  }
  .grap{
    color: #ccc;
  }
  .search{
    height: 50px;
    width: 100%;
    margin: 10px auto 0 auto;
  }
  .search .el-input{
    width: 80%;
    margin-left: -10px;
  }
  input{
    background-color: #dfe3e6!important;
  }
  .user{
    height:83px;
    margin: 5px 0;
  }
  .user:hover{
    background-color: #f3f5f7;
    cursor: pointer;
  }
  .user2{
    height:83px;
    margin: 5px 0;
    background-color: #f3f5f7;
    cursor: pointer;
  }
  .user_Item{
    width:90%;
    height: 100%;
    margin: 0 auto;
  }
  .img{
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    margin: 15px 0 15px 10px;
    border-radius: 50%;
  }
  .user_Nmae{
    font-weight: bolder;
    font-size: 16px;
    margin-left: 3px;
  }
  .underLine{
    width: 100%;
    margin: 1px 0;
    height: 1px;
    background-color: #ccc;
  }
  .innerbox::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  .innerbox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .innerbox::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
  .chat_Window{
    width: 100%;
    height:100%;
  }
  .chat_Window img{
    margin: 25% 38% 25% 38%!important;
  }
</style>
