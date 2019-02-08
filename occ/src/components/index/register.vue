<template>
  <div class="login">
    <div class="title">
      <span>注册</span>
    </div>
    <div class="loginInput">
      <span>账号</span>
      <input type="text" :model="account"/>
    </div>
    <div class="loginInput">
      <span>密码</span>
      <input type="password" :model="password"/>
    </div>
    <div class="loginInput2">
      <span>重复密码</span>
      <input type="password" :model="rePassword"/>
    </div>

    <div class="loginInput">
      <span>手机</span>
      <input type="text" :model="phone"/>
    </div>

    <div class="loginInput">
      <span>邮箱</span>
      <input type="text" :model="email"/>
    </div>

    <div class="loginInput">
      <span>性别</span>
      <select :model="sex">
        <option>男</option>
        <option>女</option>
      </select>
    </div>

    <div class="loginBt">
      <button @click="register" >注册</button>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'register',
    data() {
      return {
        account:'',
        password:'',
        rePassword:'',
        phone:'',
        email:'',
        sex:'',
      }
    },
    methods:{
      register: function(){
        console.log(this.account);
        console.log(this.password);
        console.log(this.rePassword);
        console.log(this.phone);
        console.log(this.email);
        console.log(this.sex);
      }
    }
  }

</script>

<style scoped>
  .login{
    width:500px;
    height:700px;
    margin: 0 auto;
    margin-top: 40px;
    border: 1px solid #1e88e5;
  }
  .loginInput, loginInput2{
    height: 80px;

  }
  .loginInput span, .loginInput2 span{
    font-size: 18px;
    line-height: 80px;
    margin-left: 60px;
    margin-right: 50px;
  }
  .loginInput2 span{
    margin-left: 24px;
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
  .loginInput input, .loginInput2 input, .loginInput select{
    width:200px;
    height:30px;
    font-size: 16px;
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
