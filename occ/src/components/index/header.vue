<template>
  <div class="head">
    <div class="head_Guide">
      <!--<router-link :class="{hSpan:true, redColor:selectWhich['index']}" to="/">首页</router-link>
      -->
      <span :class="{redColor:this.$route.name == route[0].name}" @click="jumpTo(route[0].url)">首页</span>
      <span>介绍</span>
      <span>加入我们</span>
    </div>
    <div class="login">
      <span :class="{redColor:this.$route.name == route[1].name}" @click="jumpTo(route[1].url)" v-if="this.$store.state.userInfo == '' || this.$store.state.userInfo == null">登录</span>
      <!--<span :class="{redColor:this.$route.name == route[2].name}" @click="jumpTo(route[2].url)" v-if="this.$store.state.userInfo == '' || this.$store.state.userInfo == null">注册</span>-->
      <em v-if="user != '' && user != undefined">Welcome，</em>
      <span @click="jumpTo(route[4].url)" v-if="user != '' && user != undefined">{{user.user == '' ? user.user.account : user.user.name}}</span>
      <span class="smallRed" v-if="user != '' && user != null" @click="logout()">退出登录</span>
      <span :class="{redColor:this.$route.name == route[3].name}" @click="jumpTo(route[3].url)">日历</span>
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
              name: 'index',
              url : '/',
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
            url : '/manager',
            }
          ],
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
    padding: 0 5%;
    height: 60px;
    border-bottom: 1px solid #ccc;
  }
  .head_Guide{
    float: left;
    line-height: 60px;
    font-size: 18px;
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
    line-height: 60px;
    font-size: 16px;
  }
  em{
    font-size: 16px;
    font-family: Helvetica ;
  }
  .smallRed{
    font-size: 14px !important;
    color:red !important;
  }
</style>
