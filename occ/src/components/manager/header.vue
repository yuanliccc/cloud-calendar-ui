<template>
  <!--<div class="header">
    <div class="tip">
      <router-link to="/manager/index" class="tipSpan"><i class="el-icon-star-off"></i>机构日历系统</router-link>
    </div>
    <ul class="right">
      <li class="li">
        <el-badge :value="chat" :max="99" class="item">
          <el-button @click="jumpTo('/manager/noticeList/perLetter')" size="small"><i class="el-icon-message"></i></el-button>
        </el-badge>
        <el-badge :value="infomation.length" :max="99" class="item" type="primary">
          <el-button size="small" @click="jumpTo('/manager/noticeList/notice')"><i class="el-icon-bell"></i></el-button>
        </el-badge>
      </li>

      <li class="portraitLi">
        <img src="../../assets/image/testPortrait.jpg" class="portrait"/>
        <span class="userName">{{user.name != "" ? user.name : user.account}}</span>
        <i class="el-icon-caret-bottom"></i>

        <div class="userMenu">
          <div>用户中心</div>
          <div>修改密码</div>
          <div @click="selectOrNot">选择机构 </div>
          <div @click="singOut">退出登录</div>
        </div>
      </li>
    </ul>
    <div class="selOrg" v-if="selOrNot">
      <div class="chooseLogin">
        <el-form>
          <el-form-item label="选择登录的机构">
            <el-select v-model="organization.id">
              <el-option v-for="i in organizations" :key="i.id" :value="i.id" :label="i.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="chooseBt">
            <el-button type="primary" @click="changeOrg()">进入</el-button>
            <el-button @click="selectOrNot">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>-->
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo"  @click="jumpTo('/manager/index')">机构日历系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="chat > 0?`有${chat}条未读私信`:`私信中心`" placement="bottom">
            <router-link to="/manager/noticeList/perLetter">
              <i class="el-icon-message"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="chat > 0"></span>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="infomation.length > 0?`有${infomation.length}条未读消息`:`消息中心`" placement="bottom">
            <router-link to="/manager/noticeList/notice">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="infomation.length > 0"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator"><img src="../../assets/image/testPortrait.jpg"></div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided><span @click="selectOrNot">选择机构</span></el-dropdown-item>
            <el-dropdown-item divided ><span  @click="singOut">退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="selOrg" v-if="selOrNot">
      <div class="chooseLogin">
        <el-form>
          <el-form-item label="选择登录的机构">
            <el-select v-model="organization.id">
              <el-option v-for="i in organizations" :key="i.id" :value="i.id" :label="i.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="chooseBt">
            <el-button type="primary" @click="changeOrg()">进入</el-button>
            <el-button @click="selectOrNot">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from '../../assets/lib/bus'
  export default{
    inject:['reload'],
    name: 'managerHeader',
    data(){
      return {
        chat:0,
        infomation:[],
        organizations:[],
        testNotice:{
          id:1,
          name: 'hello'
        },
        selOrNot: false,
        websocket:null,
        collapse: true,
        fullscreen: false,
        name: 'linxin',
        message: 2
      }
    },
    computed:{
      user: function () {
        return this.$store.getters.userInfo.user
      },
      username:function(){
        return this.$store.getters.userInfo.user.name;
      },
      organization: function () {
        return this.$store.getters.userInfo.organization
      },
      allInfo: function(){ //测试用 要删
        return this.$store.getters.userInfo
      },
    },
    created:function(){
      let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(() => {
        this.flushUnreadNotice();
      }, 30000);
      this.getAllLoginUserOrg();
      this.initWebSocket();
      this.flushUnreadNotice();
      this.flushUnreadChatMessage();
    },
    destroyed: function() {
      //页面销毁时关闭长连接
      this.websocketclose();
      if(this.timer){
        clearInterval(this.timer);
      }
    },
    methods:{
      singOut: function(){
        this.$axios.get('/occ/user/singUp').then(res =>{
          //this.websocket.onclose;
        }).catch(err =>{
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        });

        this.$router.push("/manager/login");
        this.$store.commit("loginOut");
      },
      getAllLoginUserOrg: function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/organization/getAllLoginUserOrg").then(res =>{
          this.organizations = res.data.data;
          this.$store.commit("hideLoading");
        }).catch(err =>{
          this.$store.commit("hideLoading");
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        })
      },
      jumpTo: function (url) {
        this.$router.push({path: url});
      },
      selectOrNot:function(){
        this.selOrNot = !this.selOrNot;
      },
      changeOrg: function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/user/switchOrg",{
            params:{orgId: this.organization.id}
        }).then(res =>{
          const data = res.data;
          if(data.code == '400'){
            this.$message({
              showClose: true,
              message: data.message,
              type: 'warning'
            });
          }else{
            this.$store.commit('setUserInfo', data.data);
            this.selectOrNot();
            this.reload();
            this.$router.push("/manager/index");
          }
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
      initWebSocket(){ //初始化weosocket
        const ip = window.location.href.split('/')[2].split(":")[0];
        //const wsuri = "ws://" + ip + ":8000/notice/" + this.user.id;//ws地址
        const wsuri = "ws://120.78.161.19:8000/notice/" + this.user.id;//ws地址
        this.websocket = new WebSocket(wsuri);
        this.websocket.onopen = this.websocketonopen;

        this.websocket.onerror = this.websocketonerror;

        this.websocket.onmessage = this.websocketonmessage;
        this.websocket.onclose = this.websocketclose;
      },
      websocketonopen() {
        console.log("WebSocket连接成功");
      },
      websocketonerror(e) { //错误
        console.log("WebSocket连接发生错误");
      },
      websocketonmessage(e){ //数据接收
          const data = eval("(" + e.data + ")")
        //注意：长连接我们是后台直接1秒推送一条数据，
        //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
        //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
        console.log(data);



        if(data.type == 1) {
          this.$notify.info({
            title: '私信通知',
            message: data.obj.content
          });
          if(this.$parent.$children[2].showImg != true){
            this.$parent.$children[2].chatMessages.push({
              content: data.obj.content,
              senduserid: data.obj.senduserid,
              receiveuserid: data.obj.receiveuserid,
              sendtime: data.obj.sendtime,
            });

            setTimeout(()=>{
              this.$parent.$children[2].chatBottom();
            },100);
          }
        }else {
          this.$notify.info({
            title: '消息通知',
            message: data.obj
          });
        }
      },
      websocketsend(message){//数据发送
        this.websocket.send(JSON.stringify(message));
      },
      websocketclose(e){ //关闭
        this.websocket.close();
        console.log("connection closed (" + e + ")");
      },
      flushUnreadNotice: function(){
        this.$axios.get("/occ/notice/getAllUnread").then(res =>{
          this.infomation = res.data.data;
        }).catch(err =>{
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        })
      },
      flushUnreadChatMessage: function(){
        this.$axios.get("/occ/notice/getUnreadMessage").then(res =>{
          this.chat = res.data.data;
        }).catch(err =>{
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        })
      },
      // 用户名下拉菜单选择事件
      handleCommand(command) {
        if(command == 'loginout'){
          this.$router.push('/login');
        }
      },
      // 侧边栏折叠
      collapseChage(){
        this.collapse = !this.collapse;
        bus.$emit('collapse', this.collapse);
      },
      // 全屏事件
      handleFullScreen(){
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      }
    }
  }
</script>

<style scoped>
  /*.header{
    position: fixed;
    display: inline;
    top: 0;
    z-index: 1001;
    left: 0;
    right: 0;
    height: 60px;
    border-bottom: 1px solid #ccc;
    background: #ffffff;
  }
  .icon{
    cursor: pointer;
    font-size: 18px;
    padding-right: 5px;
    display: inline;
  }
  .tip{
    width:260px;
    height:60px;
    display: inline;
    line-height: 60px;
  }
  .tipSpan{
    text-decoration: none;
    padding-left: 40px;
  }
  .right{
    width:450px;
    padding: 0 10px;
    padding-left: 60px;
    height:60px;
    float: right;
    line-height: 60px;
    display: inline;
  }
  .li, .portraitLi{
    width: 100px;
    cursor:pointer;
    display: inline;
  }
  .portraitLi{
    padding-bottom: 23px;
  }
  .portrait{
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 50%;
  }
  .item{
    margin-top: 10px;
    margin-right: 30px;
    display: inline;
  }
  .item:hover{
    color: deepskyblue;
  }
  .userMenu{
    top: 60px;
    position: absolute;
    width:150px;
    border: 1px solid #ccc;
    margin-left: 170px;
    display: none;
    background: #ffffff;
  }
  .userMenu div{
    height: 40px;
    text-align: left;
    line-height: 40px;
    padding-left: 20px;
    border-bottom: 1px solid #ccc;
  }
  .userMenu div:hover{
    background: #cccccc;
    color: #000;
  }
  li:hover .userMenu{
    display: block;
  }
  li:hover .chooseOrg{
    display: block;
  }
  .userMenu:hover{
    display: block;
  }
  .userName{
    margin: 0 2px;
    font-size: 13px;
    font-weight: bold;
  }*/
  .selOrg{
    position: fixed;
    z-index: 1009;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-color: #fff;
  }
  .chooseLogin{
    width: 400px;
    margin: 0 auto;
    margin-top:15%;
  }
  .chooseBt{
    text-align: center;
  }
  .header {
    position: fixed;
    z-index: 1003;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    background-color: #131313;
  }
  .collapse-btn{
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }
  .header .logo{
    float: left;
    width:250px;
    font-size: 16px;
    line-height: 70px;
    cursor: pointer;
  }
  .header-right{
    float: right;
    padding-right: 50px;
  }
  .header-user-con{
    display: flex;
    height: 70px;
    align-items: center;
  }
  .btn-fullscreen{
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }
  .btn-bell, .btn-fullscreen{
    position: relative;
    width: 30px;
    margin:0 5px;
    color:#fff;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }
  .btn-bell-badge{
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }
  .btn-bell .el-icon-bell{
    color: #fff;
  }
  .user-name{
    margin-left: 10px;
  }
  .user-avator{
    margin-left: 20px;
  }
  .user-avator img{
    display: block;
    width:40px;
    height:40px;
    border-radius: 50%;
  }
  .el-dropdown-link{
    color: #fff;
    cursor: pointer;
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
</style>
