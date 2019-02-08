<template>
<div class="login">
  <div class="title">
    <span>登录</span>
  </div>
  <div class="loginInput">
    <span>账号</span>
    <input type="text" :model="account" />
  </div>
  <div class="loginInput">
    <span>密码</span>
    <input type="password" :model="password"/>
  </div>
  <div class="register">
    <router-link to="/register">注册</router-link>
  </div>
  <div class="loginBt">
    <button @click="" >登录</button>
  </div>
</div>
</template>

<script>
  export default{
    name: 'login',
    data() {
      return {
        account:'',
        password:'',
      }
    },
    methods:{
    }
  }

</script>

<style scoped>
.login{
  width:400px;
  height:380px;
  margin: 0 auto;
  margin-top: 40px;
  border: 1px solid #1e88e5;
}
  .loginInput{
    height: 80px;

  }
  .loginInput span{
    font-size: 18px;
    line-height: 80px;
    margin-left: 50px;
    margin-right: 30px;
  }
  .title{
    margin-top: 10px;
    padding-top: 20px;
    height: 70px;
    text-align: center;
  }
  .title span{
    font-size: 35px;
    font-weight: bold;
  }
  .loginInput input{
    width:200px;
    height:30px;
    font-size: 16px;
  }
  .register{
    margin-top: 5px;
    text-align: center;
  }
  .register a{
    font-size: 16px;
    text-decoration: none;
    color: #ff8732;
  }
  .register a:hover{
    color:red;
  }
  .loginBt{
    text-align: center;
    height: 80px;
    line-height: 80px;
  }
  .loginBt button{
    width: 100px;
    height: 40px;
    border: none;
    color: #000;
    cursor: pointer;
    background-color: rgba(25,221,255,0.58);
  }
</style>
