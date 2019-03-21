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

          <el-container direction="vertical">
            <el-main style="background-color: #f3f5f7;padding-top: 50px;" class="innerbox">
              <div class="chat_Window" ref="chatMain">
                <img src="../../../assets/logo.png" style="margin: 0 auto" v-if="showImg"/>

                <div :class="[i.senduserid == chatUser.id ? 'messageItem_Left' : 'messageItem_Right']" v-for=" i in chatMessages" v-if="!showImg">
                  <div :class="[i.senduserid == chatUser.id ? 'chat_Logo_Left' : 'chat_Logo_Right']">
                    <img src="../../../assets/image/testPortrait.jpg" class="chat_Img"/>
                  </div>
                  <div :class="[i.senduserid == chatUser.id ? 'chat_Text_Left' : 'chat_Text_Right']">
                    <pre>{{i.content}}</pre>
                  </div>
                  <div :class="[i.senduserid == chatUser.id ? 'chat_subTime_Left' : 'chat_subTime_Right']">{{i.sendtime | formatDate}}</div>
                </div>
                <!--<div class="messageItem_Right" v-if="!showImg">
                  <div class="chat_Logo_Right">
                    <img src="../../../assets/image/testPortrait.jpg" class="chat_Img"/>
                  </div>
                  <div class="chat_Text_Right">
                    <pre>618大促，慕课网与千万级程序员，“惠”战到底！详情请查看：<a href="https://www.imooc.com/act/discount">https://www.imooc.com/act/discount</a></pre>
                  </div>
                  <div class="chat_subTime_Right">2019-03-20 16:58:42</div>
                </div>-->
              </div>
            </el-main>

            <el-footer style="height:75px;padding: 0;">
              <div class="submit">
               <div class="submit_Text">
                  <el-input type="textarea" :rows="3" resize="none" v-model="chatContent" @keydown.native="listen($event)"></el-input>
                </div>
                <div class="submit_Button">
                  <el-button @click="sendToOther" type="primary">发送</el-button>
                </div>;
              </div>
            </el-footer>

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
        orgUsers:[],
        chatContent:'',
        showImg:true,
        findUser:"",
        chatUser:{},
        chatMessages:new Array()
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
        this.showImg = false;
        this.getChatUserMessage();
        this.seeAllMessage();
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
      },
      getChatUserMessage:function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/notice/getChatUserMessage",{
            params:{chatUserId: this.chatUser.id}
        }).then(res =>{
          this.chatMessages = res.data.data;
          this.$store.commit("hideLoading");

          setTimeout(()=>{
              this.chatBottom();
          }, 100)
        }).catch(err =>{
          this.$store.commit("hideLoading");
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        });
      },
      chatBottom:function(){
        const container = this.$el.querySelector(".el-main");
        container.scrollTop = container.scrollHeight;
      },
      sendToOther:function(){
        const chat = {
          sendtime: new Date(),
          senduserid: this.$parent.$children[0].user.id,
          receiveuserid: this.chatUser.id,
          type:'文字',
          hadseen:'否',
          content: this.chatContent,
        };
        this.$parent.$children[0].websocketsend(chat);
        this.chatMessages.push({
          sendtime: new Date(),
          senduserid: this.$parent.$children[0].user.id,
          receiveuserid: this.chatUser.id,
          type:'文字',
          content: this.chatContent,
        });
        this.chatContent= '';
        setTimeout(()=>{
          this.chatBottom();
        }, 100)
      },
      listen (event) {
        if (event.keyCode === 13) {
          this.sendToOther() // 发送文本
          event.preventDefault() // 阻止浏览器默认换行操作
          return false
        }
      },
      seeAllMessage:function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/notice/seeAllMessage",{
            params:{sendUserId: this.chatUser.id}
        }).then(res =>{
          this.$store.commit("hideLoading");
          this.$parent.$children[0].flushUnreadChatMessage();
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
  .noticeTabs{
  }
  pre{
    white-space: pre-wrap;
    word-break: break-all;
    word-wrap: break-word;
    border: none;
    line-height: 40px;
    background-color: #fff;
    font-family: 微软雅黑;
    margin: 0;
    font-size: 14px;
    padding: 0;
    width: 100%;
    height: 100%;
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
  .messageItem_Left, .messageItem_Right{
    overflow:hidden;
    margin:0 0 60px 0;
  }
  .chat_Logo_Right{
    width: 52px;
    height: 52px;
    float: right;
  }
  .chat_Logo_Left{
    width: 52px;
    height: 52px;
    float: left;
  }
  .chat_Img{
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
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
  }
  .chat_Window .img{
    margin: 25% 38% 25% 38%!important;
  }
  .chat_Text_Right{
    max-width: 550px;
    min-width: 10px;
    line-height: 25px;
    min-height: 50px;
    max-height: 1000px;
    padding: 5px;
    margin-right: 15px;
    border-radius: 10px;
    display: inline-block;
    background-color: #fff;
    word-wrap:break-word;
    float: right;
  }

  .chat_Text_Left{
    max-width: 550px;
    min-width: 10px;
    line-height: 25px;
    min-height: 50px;
    max-height: 1000px;
    padding: 5px;
    margin-left: 15px;
    border-radius: 10px;
    display: inline-block;
    background-color: #fff;
    word-wrap:break-word;
    float: left;
  }
  .chat_subTime_Right{
    margin-top: 13px;
    margin-right: 20px;
    float: right;
  }
  .chat_subTime_Left{
    margin-top: 13px;
    margin-left: 20px;
    float: left;
  }
  .submit{
    height: 75px;
    width: 100%;
  }
  .submit_Text{
    width: 85%;
    height: 80px;
    float: left;
  }
  .submit_Text .el-textarea .el-textarea__inner{
    width: 700px!important;
    font-size: 16px;
  }
  .submit_Button{
    width: 15%;;
    height: 75px;
    float: left;
  }
  .submit_Button .el-button{
    width: 100%;
    height: 75px;
  }
</style>
