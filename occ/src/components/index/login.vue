<template>
<!--<div class="login">
  <div class="title">
    <span>登录</span>
  </div>
  &lt;!&ndash;<div class="loginInput">
    <span>账号</span>
    <input type="text" v-model="account" />
  </div>
  <div class="loginInput">
    <span>密码</span>
    <input type="password" v-model="password"/>
  </div>&ndash;&gt;
  <div class="register">
    <router-link to="/register">注册</router-link>
  </div>
  <div class="loginBt_">
    <el-button type="primary" @click="login" >登录</el-button>
  </div>
</div>-->
  <!--<el-form :model="user" :rules="rules" ref="user" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="user.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="login">登录</el-button>
      <el-button style="width:100%;margin:2px 0 0 0;" @click="register">注册</el-button>
    </el-form-item>
  </el-form>-->
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">系统登录</div>
      <el-form :model="user" :rules="rules" ref="user" label-width="0px" class="ms-content">
        <el-form-item prop="account">
          <el-input v-model="user.account" placeholder="username">
            <el-button slot="prepend" icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="user.password" @keyup.enter.native="login">
            <el-button slot="prepend" icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  export default{
    name: 'login',
    data() {
      return {
        user:{
          account:'',
          password:'',
        },
        account:'',
        password:'',
        rules:{
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      login: function() {
          if (this.user.password == '' || this.user.account == '') {
            this.$message({
              showClose: true,
              message: '请输入账号或密码！',
              type: 'warning'
            });
            return;
          }
          this.$store.commit('showLoading');
          this.user.password = md5(this.user.password);
          this.$axios.get('/occ/user/login', {
            params: {account: this.user.account, password: this.user.password}
          }).then(res => {
            const data = res.data;
            if(data == '' || data.message != 'SUCCESS'){
              this.$message({
                showClose: true,
                message: data.message,
                type: 'warning'
              });
            }else{
              this.$store.commit('setUserInfo', data.data);
              this.$router.push('/main');
            }
            this.$store.commit('hideLoading');
          }).catch(err => {
            this.$store.commit('hideLoading');
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
        },
      register: function(){
        this.$router.push('./register');
      },
    }
  }

</script>

<style scoped>
.login{
  width:600px;
  height:450px;
  margin: 0 auto;
  margin-top: 40px;
}
/*  .loginInput{
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
  .loginBt_{
    text-align: center;
    height: 80px;
  }
  .loginBt_ button{
    width: 100px;
    height: 40px;
    margin-top: 20px;
    border: none;
    color: #000;
    cursor: pointer;
    background-color: rgba(25,221,255,0.58);
  }*/
 /* .login-container {
    !*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*!
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }*/

  .login-wrap{
    position: fixed;
    width:100%;
    height:100%;
    background-image: url(../../assets/image/login-bg.jpg);
    background-size: 100%;
  }
  .ms-title{
    width:100%;
    line-height: 50px;
    text-align: center;
    font-size:20px;
    color: #000000;
    border-bottom: 1px solid #ddd;
  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:350px;
    margin:-190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255,255,255, 0.3);
    overflow: hidden;
  }
  .ms-content{
    padding: 30px 30px;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
    margin-bottom: 10px;
  }
  .login-tips{
    font-size:12px;
    line-height:30px;
    color:#fff;
  }
</style>
