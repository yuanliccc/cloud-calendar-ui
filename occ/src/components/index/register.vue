<template>
  <!--<div class="login">
    <div class="title">
      <span>注册</span>
    </div>
    <div class="loginInput">
      <span><i class="required">*</i>账号</span>
      <input type="text" v-model="account"/>
    </div>
    <div class="loginInput">
      <span><i class="required2">&nbsp;</i>昵称</span>
      <input type="text" v-model="name"/>
    </div>
    <div class="loginInput">
      <span><i class="required">*</i>密码</span>
      <input type="password" v-model="password"/>
    </div>
    <div class="loginInput2">
      <span><i class="required">*</i>重复密码</span>
      <input type="password" v-model="rePassword"/>
    </div>

    <div class="loginInput">
      <span><i class="required">*</i>手机</span>
      <input type="text" v-model="phone"/>
    </div>

    <div class="loginInput">
      <span><i class="required2">&nbsp;</i>邮箱</span>
      <input type="text" v-model="email"/>
    </div>

    <div class="loginInput">
      <span><i class="required2">&nbsp;</i>性别</span>
      <select v-model:value="sex">
        <option>男</option>
        <option>女</option>
      </select>
    </div>

    <div class="loginBt_">
      <button @click="register" >注册</button>
    </div>

    <con ref="myConfirm"></con>
  </div>-->
  <div class="login-wrap">
    <div class="backgroup"></div>
    <div class="ms-login">
      <div class="ms-title">系统登录</div>
      <el-form :model="user" :rules="rules" ref="user" label-width="0px" class="ms-content">
        <el-form-item prop="name">
          <el-input v-model="user.name" placeholder="昵称">
            <el-button slot="prepend" icon="el-icon-message"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="account">
          <el-input v-model="user.account" placeholder="账号">
            <el-button slot="prepend" icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="user.password">
            <el-button slot="prepend" icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input type="password" placeholder="重复输入密码" v-model="user.rePassword">
            <el-button slot="prepend" icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="user.phone" placeholder="手机号码">
            <el-button slot="prepend" icon="el-icon-phone"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="sex">
          <el-button class="prepend" icon="el-icon-s-custom"></el-button>
          <el-select v-model="user.sex" placeholder="性别" style="width: 79%">
            <el-option v-for="i in sex" :key="i" :label="i" :value="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="user.email" placeholder="邮件">
            <el-button slot="prepend" icon="el-icon-message"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="register">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import con from '../../confirm/index.vue'
  import md5 from 'js-md5'
  export default{
    name: 'register',
    components: {
      con,
    },
    data() {
      return {
        user:{
          account:'',
          name:'',
          password:'',
          rePassword:'',
          phone:'',
          email:'',
          sex:'',
        },
        sex:["男","女"],
        rules:{
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          rePassword:[
            { required: true, message: '请重复输入密码', trigger: 'blur' }
          ],
        }
      }
    },
    mounted : function(){
      if(this.$store.state.userInfo != '' && this.$store.state.userInfo != null && this.$store.state.userInfo != undefined)
          this.$router.push('/');
    },
    methods:{
      register: function(){
        if(this.user.rePassword != this.user.password) {
          this.$message.warning('两次密码不相符，请确认！');
          ;return ;
        }

        if(!(/^1[34578]\d{9}$/.test(this.user.phone))){
          this.$message.warning()('电话号码有误，请重新输入！');
          ;return ;
        }

        this.$store.commit('showLoading');
        this.$axios.post("/occ/user/register",
          this.user
        ).then(res => {
          let data = res.data;
          if(data == '' || data.message != 'SUCCESS'){
            this.$refs.myConfirm.show(data.message, null);
          }else {
            this.$store.commit('setUserInfo', data.data);
            this.$router.push('/main');
          }
          this.$store.commit('hideLoading');
        }).catch(err =>{
          this.$store.commit('hideLoading');
          this.$refs.con.show(err.data.message, null);
        });

      }
    }
  }

</script>

<style scoped>
/*  .login{
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
  .loginBt_{
    text-align: center;
    height: 80px;
  }
  .loginBt_ button{
    width: 100px;
    height: 40px;
    border: none;
    margin: 20px;
    color: #000;
    cursor: pointer;
    background-color: rgba(25,221,255,0.58);
  }
  .required{
    padding: 0;
  }
  .required2{
    padding-left: 2px;
  }*/
.login-wrap{
  background-image: url(../../assets/image/login-bg.jpg);
  background-repeat: repeat;
  width: 100%;
  height: 100%;
}
.backgroup{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
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
