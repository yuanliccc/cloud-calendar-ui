<template>
  <div>
    <div class="login-block flex-row flex-center">
      <div class="login-container-bg">
        <div class="login-container">
          <div class="login-container-header">
            登录
          </div>
          <div class="flex-row login-line-block">
            <div class="flex-column flex-grow flex-center">
              <div class="normal-line"></div>
            </div>
            <div class="line-tip">
              无账号，请
              <router-link to="/signup" style="color: #333333;">注册</router-link>
            </div>
            <div class="flex-column flex-grow flex-center">
              <div class="normal-line"></div>
            </div>
          </div>

          <div class="login-container-content flex-row flex-center">
            <div class="login-container-content-block">
              <div class="login-input-item">
                <div class="login-input-item-title">邮箱</div>
                <div class="login-input-block">
                  <input v-model="pccUser.email" class="login-input">
                </div>
              </div>
              <div class="login-input-item">
                <div class="login-input-item-title">密码</div>
                <div class="login-input-block">
                  <input v-model="pccUser.password" type="password" class="login-input">
                </div>
              </div>
              <!--<div class="login-radio">
                <input type="radio"> keep login in
              </div>-->
              <div class="submit-block flex-row flex-center">
                <button
                        v-bind:disabled="pccUser.phone === '' || pccUser.password === ''"
                        v-bind:class="[pccUser.phone === '' || pccUser.password === '' ? 'submit-btn-unactive' : 'submit-btn']"
                        @click="login">
                  Login in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="line">
      </div>

      <div class="simple-info-block">
        <div class="simple-info-title">
          合理的利用您的时间
        </div>

        <div class="simple-info-desc">
          您可以通过云日历获得以下或更多的便利
        </div>

        <div class="icon-block">
          <div class="icon-container">
            <div class="icon-div"><span class="fa fa-edit"></span></div>
            <div class="icon-desc">便利的编辑</div>
          </div>

          <div class="icon-container">
            <div class="icon-div"><span class="fa fa-bar-chart"></span></div>
            <div class="icon-desc">丰富的统计</div>
          </div>

          <div class="icon-container">
            <div class="icon-div"><span class="fa fa-gear"></span></div>
            <div class="icon-desc">个性化配置</div>
          </div>

          <div class="icon-container">
            <div class="icon-div"><span class="fa fa-server"></span></div>
            <div class="icon-desc">多样的服务</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {
  },
  data: function () {
    return {
      pccUser: {
        email: '',
        password: ''
      }
    }
  },
  mounted: function () {

  },
  methods: {
    login: function () {
      // 显示加载动画
      this.$store.commit("showLoading")
      // 请求
      this.$axios.post('/pcc/user/detail',this.pccUser)
        .then(res => {
          const data = res.data

          if(data.data == 'error') {
            this.$message.success('邮箱或密码错误')
          }
          else {
            this.$store.commit("setUserInfo", data.data)
            this.$router.push({path: '/mine/chart'})
          }

          console.log(res.data)
          this.$store.commit("hideLoading")
        })
        .catch(err => {
          this.$store.commit("hideLoading")
        })
    }
  }
}
</script>

<style scoped>

  .login-input-block {
    margin-top: 5px;
    position: relative;
  }

  .line-tip {
    margin-left: 10px;
    margin-right: 10px;
  }

  .login-line-block {
    margin-top: 20px
  }

  body {
    background: #f2f2f2;
  }

  .login-block {
    margin-top: 50px;
    width: 100%;
  }

  .login-container-bg {
    width: 390px;
    background-size: 100%;
    margin-right: 60px;
  }

  .simple-info-block {
    width: 400px;
    height: 380px;
    margin-left: 60px;
  }

  .simple-info-title {
    height: 40px;
    text-align: center;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 18px;
    font-weight: 300;
  }

  .icon-block {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 13px;
  }

  .icon-container {
    width: 133px;
    height: 110px;
  }

  .simple-info-desc {
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
  }

  .icon-desc {
    margin-top: 5px;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 14px;
    text-align: center;
  }

  .icon-div {
    width: 65px;
    height: 65px;
    font-size: 35px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin: 0 auto;
    text-align: center;
    color: var(--commonColor);
  }

  .line {
    height: 380px;
    border: 1px solid rgba(158, 158, 158, 0.24);
  }

  .login-container {
    width: 100%;
    height: 100%;
    border-bottom-color: rgb(0, 0, 0);
    border-radius: 4px;
  }

  .login-container-header {
    width: 100%;
    text-align: center;
    height: 48px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 20px;
    border-bottom: 1px solid #999;
    background: white;
    color: var(--commonBg);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px 0px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
  }

  .login-container-content {
    margin-top: 20px;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px 0px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
  }

  .login-container-content-block {
    width: 80%;
    margin-top: 10px;
    margin-bottom: 22px;
  }

  .login-input-item {
    margin-top: 10px;
  }

  .login-input-item-title {
    color: #aaa;
  }

  .submit-block {
    margin-top: 20px;
  }

  .login-input {
    width: 90%;
    border-radius: 23px;
    border: 1px solid rgba(158, 158, 158, 0.29);
    padding: 15px 20px;
    background: rgba(158, 158, 158, 0.15);
    display: inline-block;
    outline: none;
  }

  .login-radio {
    margin-top: 8px;
    color: #5555559c;
  }
</style>
