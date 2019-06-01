<template>
  <!---->
  <!--<div>
    <div class="head">
      <div class="head_Guide">
        &lt;!&ndash;&lt;!&ndash;<router-link :class="{hSpan:true, redColor:selectWhich['index']}" to="/">首页</router-link>
        &ndash;&gt;&ndash;&gt;
        <span :class="{redColor:this.$route.name == route[0].name}" @click="jumpTo(route[0].url)">首页</span>
        <span :class="{redColor:this.$route.name == route[6].name}" @click="jumpTo(route[6].url)">介绍</span>
        <span :class="{redColor:this.$route.name == route[5].name}" @click="jumpTo(route[5].url)">加入我们</span>
      </div>
      <div class="login">
        <span :class="{redColor:this.$route.name == route[1].name}" @click="jumpTo(route[1].url)" v-if="this.$store.state.userInfo == '' || this.$store.state.userInfo == null">登录</span>
        <span :class="{redColor:this.$route.name == route[2].name}" @click="jumpTo(route[2].url)" v-if="this.$store.state.userInfo == '' || this.$store.state.userInfo == null">注册</span>
        <em v-if="user != '' && user != undefined">Welcome，</em>
        <span @click="jumpTo(route[4].url)" v-if="user != '' && user != undefined">{{user.user == '' ? user.user.account : user.user.name}}</span>
        <span class="smallRed" v-if="user != '' && user != null" @click="logout()">退出登录</span>
        <span :class="{redColor:this.$route.name == route[3].name}" @click="jumpTo(route[3].url)">日历</span>
      </div>
    </div>
  </div>-->
  <div id="header">
    <div class="nav_main">
      <a :class="{now:this.$route.name == route[0].name}"><span  @click="jumpTo(route[0].url)">首页</span></a>
      <a v-if="this.$store.state.userInfo == '' || this.$store.state.userInfo == null" :class="{now:this.$route.name == route[1].name}"><span @click="jumpTo(route[1].url)">登录</span></a>
      <a v-if="this.$store.state.userInfo == '' || this.$store.state.userInfo == null" :class="{now:this.$route.name == route[2].name}" ><span @click="jumpTo(route[2].url)">注册</span></a>
      <a v-if="this.$store.state.userInfo == '' || this.$store.state.userInfo == null"><span @click="jumpTo('/manager/login')">管理页面</span></a>
      <a v-if="this.$store.state.userInfo != '' && this.$store.state.userInfo != null"><span @click="jumpTo(route[4].url)">管理页面</span></a>
      <a :class="{now:this.$route.name == route[5].name}"><span @click="jumpTo(route[5].url)">加入我们</span></a>
    </div>
    <div class="login">
      <span v-if="user != '' && user != undefined">{{user.user.name}}</span>
      <span v-if="user == '' || user == undefined">未登录</span>
      <a v-if="user != '' && user != null" @click="logout">退出登录</a>
    </div>
  </div>


</template>

<script>

  export default {
    name: 'occHead',
    data () {
      return {
        route : [
          {
            name: 'main',
            url : '/main',
          },
          {
            name: 'login',
            url : '/login',
          },
          {
            name: 'register',
            url : '/register',
          },
          {
            name: 'calender',
            url : '/calender',
          },
          {
            name: 'manager',
            url : '/manager/index',
          },
          {
            name: 'joinUs',
            url : '/joinUs',
          },
          ],
        image: [{
          url: "../../assets/image/calender.jpg",
        }],
      }
    },
    computed:{
      user: function () {
        return this.$store.getters.userInfo
      }
    },
    mounted : function(){
    },
    methods: {
      jumpTo: function (url) {
        this.$router.push({path: url});
      },
      logout: function(){
          this.$store.commit("loginOut");
      }
    },
  }
</script>

<style scoped>
  .head{
    padding: 5px 10%;
    height: 70px;
    border-bottom: 1px solid #ccc;
  }
  .head_Guide{
    float: left;
    line-height: 60px;
    font-size: 26px;
  }
  .head span:hover, .hSpan:hover{
    color:red;
  }
  .redColor{
    color: red!important;
  }
  .head span, .hSpan{
    margin-right: 10px;
    cursor: pointer;
    font-size: 18px;
    color: #000;
    text-decoration: none;
  }
  .login{
    float:right;
    line-height: 80px;
    font-size: 20px;
    transform:none;-webkit-transform:none;
    transition:all 0.4s ease-out 0s;-webkit-transition:all 0.4s ease-out 0s;
    margin-right: 10%;
  }
  em{
    font-size: 18px;
    font-family: Helvetica ;
  }
  .smallRed{
    font-size: 14px !important;
    color:red !important;
  }
  .content p{
    padding-top: 2px;
    padding-bottom: 2px;
  }
  .el-button {
    margin-top: 3px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .image{
    height:380px;
    width:100%;
    text-align: center;
  }
  #header{height:80px;left:0;top:0;width:100%;z-index:1999;background: #ffffff94;position: fixed}
  #header .nav_main{position:fixed;top:0;box-sizing:border-box;height:80px;
    transform:none;-webkit-transform:none;
    transition:all 0.4s ease-out 0s;-webkit-transition:all 0.4s ease-out 0s;}
  #header .nav_main.show{right:0;box-shadow:0 0 10px rgba(0,0,0,0.1);}
  #header .nav_main a, login a{display:block;padding:0 25px;height:54px;line-height:54px;font-size:14px;margin:0;float:none;}
  #header .nav_main a:hover, .login a:hover{font-size:14px;}
  #header .nav_main a.now{border-left:3px solid #409eff;padding-left:22px;}
  #header .nav_main .t a{padding:0;}
  #header .nav_main a span, .login a{cursor: pointer}
  #header .nav_main{opacity:1;padding-top: 28px;
    transform:translateX(100px);-webkit-transform:translateX(100px);
    transition:all 1s cubic-bezier(0,0,0,1) 0s;-webkit-transition:all 1s cubic-bezier(0,0,0,1) 0s;}
  #header.show .nav_main{transform:translateX(0);-webkit-transform:translateX(0);opacity:1;}
  #header .nav_main a, .login a{color:#blue;font-size:20px;margin:0 20px;padding:0 20px;float:left;height:20px;line-height:20px;
    transition:all 0.1s ease-out 0s;-webkit-transition:all 0.1s ease-out 0s}
  #header .nav_main a:hover, .login a:hover{font-size:25px; text-shadow:5px 5px 10px rgba(0,0,0,0.5);}
  #header .nav_main .t{display:none;}
  .login a{
    line-height: 80px;
    cursor: pointer;
  }
</style>
