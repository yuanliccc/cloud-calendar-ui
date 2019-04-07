<template>
  <div>
    <div class="login-block">
      <div class="login-title-block">
        <div class="login-title-line">
          <span class="login-title">登录</span>
        </div>
      </div>
      <div class="login-container-block">
        <div class="login-container flex-row flex-center">
          <div class="login-container-left">
            <div class="login-img-item">
              <img class="img-size" src="../../assets/images/login-right-bg.jpg"/>
            </div>
          </div>
          <div class="login-container-line">
          </div>
          <div class="login-container-right">
            <div class="login-container-right-context flex-column">
              <el-form>
                <div class="input-item-block">
                  <el-input class="input-style" placeholder="用户名" v-model="loginUserInfo.userName"></el-input>
                </div>
                <div class="input-item-block">
                  <el-input class="input-style" type="password" placeholder="密码" v-model="loginUserInfo.password"></el-input>
                </div>
                <div class="prompt-block flex-row flex-space-between">
                  <div class="prompt-left flex-row">
                    <el-checkbox-group v-model="test">
                      <el-checkbox label="记住我">
                      </el-checkbox>
                    </el-checkbox-group>
                    <div class="remark-info">不是自己的电脑上不要勾选此项</div>
                  </div>
                  <div class="prompt-right">
                    <router-link to="/">忘记密码？</router-link>
                  </div>
                </div>
                <div class="button-block flex-row flex-space-between">
                  <div class="left-button-block">
                    <button class="login-page-button blue-button left-button" @click="login">登录</button>
                  </div>
                  <div class="right-button-block">
                    <button type="button" class="login-page-button white-button right-button" @click="toSignup">注册</button>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      test: null,
      userInfo: null,
      loginUserInfo: {
        userName: null,
        password: null
      }
    }
  },
  methods: {
    toSignup: function (path) {
      this.$router.push({path: '/signup'})
    },
    login: function () {
      this.$axios.post('/df/user/login', this.loginUserInfo)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            this.userInfo = res.data.data
            this.$emit('userInfoCallback', this.userInfo)
            this.$router.push({path: '/main/dfList'})
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    }
  }
}
</script>
<style>
  .login-block {
    padding-top: 50px;
    padding-bottom: 100px;
    background: #ffeeee40;
    min-height: 425px;
  }

  .login-title-line {
    width: 980px;
    height: 28px;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    margin-bottom: 28px;
    text-align: center;
  }

  .login-title {
    height: 56px;
    line-height: 56px;
    margin: 0 auto;
    padding: 0 20px;
    font-size: 40px;
    background: #fff;
    text-align: center;
  }

  .login-container-left {
    width: 480px;
  }

  .login-container-line {
    border-right: 1px solid #ddd;
    height: 300px;
    margin-top: 28px;
  }

  .login-container-right {
    width: 480px;
    padding-top: 45px;
  }

  .login-img-item {
    padding-top: 60px;
  }

  .img-size {
    width: 380px;
    display: flex;
    margin:0 auto;
  }

  .input-item-block {
    margin:0 auto;
    margin-top: 30px;
    width: 388px;
  }

  .input-style input {
    height: 40px!important;
  }

  .button-block {
    margin:0 auto;
    margin-top: 15px;
    width: 388px;
  }

  .prompt-block {
    margin:0 auto;
    width: 388px;
    margin-top: 10px;
  }

  .prompt-left {
    font-size: 12px;
    color: #717171;
  }

  .remark-info {
    color: #bbb;
    margin-left: 10px;
  }

  .prompt-right a {
    font-size: 12px;
    color: #00a1d6;
    text-decoration: none;
  }

  .login-page-button {
    width: 186px;
    height: 38px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }

  .blue-button {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }

  .left-button:hover {
    background-color: #00bee7;
  }

  .white-button {
    color: #555;
    background-color: #fff;
    border-color: #ddd;
  }
</style>
