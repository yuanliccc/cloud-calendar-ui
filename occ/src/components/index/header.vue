<template>
  <!---->
  <div>
    <div class="head">
      <div class="head_Guide">
        <!--&lt;!&ndash;<router-link :class="{hSpan:true, redColor:selectWhich['index']}" to="/">首页</router-link>
        &ndash;&gt;-->
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
          {
            name: 'index',
            url : '/',
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
    line-height: 60px;
    font-size: 16px;
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
</style>
