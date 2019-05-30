<template>
  <div class="login">
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
  </div>
</template>

<script>
  import con from '../../confirm/index.vue'
  export default{
    name: 'register',
    components: {
      con,
    },
    data() {
      return {
        account:'',
        name:'',
        password:'',
        rePassword:'',
        phone:'',
        email:'',
        sex:'',
        user:{},
      }
    },
    mounted : function(){
      if(this.$store.state.userInfo != '' && this.$store.state.userInfo != null && this.$store.state.userInfo != undefined)
          this.$router.push('/');
    },
    methods:{
      register: function(){
        if(this.account == '') {
          this.$refs.myConfirm.show('请输入账号！', null);
          ;return ;
        }
        if(this.password == '') {
          this.$refs.myConfirm.show('请输入密码！', null);
          ;return ;
        }
        if(this.rePassword == '') {
          this.$refs.myConfirm.show('请重复输入密码！', null);
          ;return ;
        }

        if(this.rePassword != this.password) {
          this.$refs.myConfirm.show('两次密码不相符，请确认！', null);
          ;return ;
        }

        if(!(/^1[34578]\d{9}$/.test(this.phone))){
          this.$refs.myConfirm.show('电话号码有误，请重新输入！', null);
          ;return ;
        }
        this.user.name = this.name;
        this.user.account = this.account;
        this.user.password = this.password;
        this.user.phone = this.phone;
        this.user.email = this.email;
        this.user.sex = this.sex;

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
  }
</style>
