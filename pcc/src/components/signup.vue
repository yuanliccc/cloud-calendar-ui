<template>
    <div>
      <div class="content flex-column flex-center">
        <div class="content-container flex-row flex-center">
          <div class="content-left">
            <el-carousel class="full" indicator-position="outside">
              <el-carousel-item class="img-block" v-for="(item, index) in images" :key="index">
                <img class="full" v-bind:src="item.src">
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="content-right flex-row">
            <div class="content-right-container">
              <div class="register-title">
                注册
              </div>

              <div class="register-content">
                <div>
                  <div class="input-container">
                    <div class="input-item">
                      <div class="input-title">
                      </div>
                      <div class="input-block flex-row">
                        <div class="input-icon-block">
                          <span class="fa fa-user"></span>
                        </div>
                        <input type="text" value="" class="input-style"
                               v-model="user.name" placeholder="用户名">
                      </div>
                    </div>

                    <div class="input-item">
                      <div class="input-title">
                        {{tips.email}}
                      </div>
                      <div class="input-block flex-row">
                        <div class="input-icon-block">
                          <span class="fa fa-envelope"></span>
                        </div>
                        <input type="text" v-on:input="verifyEmail" value="" class="input-style"
                               v-model="user.email" placeholder="邮箱地址">
                      </div>
                    </div>

                    <div class="input-item">
                      <div class="input-title">{{tips.phone}}
                      </div>
                      <div class="input-block flex-row">
                        <div class="input-icon-block">
                          <span class="fa fa-phone"></span>
                        </div>
                        <input type="number" v-on:input="verifyPhone" value="" class="input-style"
                               v-model="user.phone" placeholder="电话号码">
                      </div>
                    </div>

                    <div class="input-item">
                      <div class="input-title">
                        {{tips.password}}
                      </div>
                      <div class="input-block flex-row">
                        <div class="input-icon-block">
                          <span class="fa fa-lock"></span>
                        </div>
                        <input type="password" v-on:input="checkPassword" value="" class="input-style"
                               v-model="user.password" placeholder="密码">
                      </div>
                    </div>
                    <div class="input-item">
                      <div class="input-title">{{tips.verifyPassword}}
                      </div>
                      <div class="input-block flex-row">
                        <div class="input-icon-block">
                          <span class="fa fa-lock"></span>
                        </div>
                        <input type="password" v-on:input="verifyCheckPassword" value=""
                               class="input-style" v-model="verifyPassword"
                               placeholder="确认密码">
                      </div>
                    </div>

                    <div class="flex-row flex-center login-line-block">
                      <div class="flex-column flex-center flex-grow">
                        <div class="normal-line"></div>
                      </div>
                      <div class="line-tip">已经有账号，请 <router-link to="/login" style="color: #333333;">登录</router-link></div>
                      <div class="flex-column flex-center flex-grow">
                        <div class="normal-line"></div>
                      </div>
                    </div>

                    <div class="submit-block flex-row flex-center">
                      <button class="submit-btn" @click="signUp">submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'signUp',
  data: function() {
    return {
      images: [
        {
          src:require('../assets/images/signup/one.jpg')
        },
        {
          src:require('../assets/images/signup/two.jpg')
        }
      ],
      user: {
        name: null,
        email: null,
        phone: null,
        password: null
      },
      verifyPassword: null,
      tips: {
        email : '',
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    signUp: function () {
      if (this.verifyPassword === this.user.password) {
        this.addUser()
      } else {
        // 弹框
      }
    },
    addUser: function () {
      // 显示加载动画
      this.$store.commit("showLoading")
      // 请求
      this.$axios.post('/pcc/user', this.user)
        .then(res => {
          this.$store.commit("hideLoading")
          if(res.data.data == 'repeat email') {
            this.$message.warning("邮箱地址已经被注册过了")
          }
          else {
            this.$message.success("注册成功，现在可以登录了")
            this.$router.push({path: '/login'})
          }

        })
        .catch(err => {
          this.$store.commit("hideLoading")
          this.$message.error("注册失败")
        })
    },
    verifyEmail: function () {

      if (this.user.email == '') {
        this.tips.email = ""
        return
      }

      let regEmail = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/
      if (!regEmail.test(this.user.email)) {
        this.tips.email = "邮箱格式不正确"
      } else {
        this.tips.email = "";
      }
    },
    verifyPhone: function () {
      if (this.user.phone == '') {
        this.tips.phone = ""
        return
      }

      let regPhone = /^1(3|4|5|7|8)\d{9}$/
      if (!regPhone.test(this.user.phone)) {
        this.tips.phone = "请输入正确手机号"
      } else {
        this.tips.phone = ""
      }
    },
    checkPassword: function () {
      if (this.user.password == "") {
        this.tips.password = ""
        return
      }
      if (this.user.password.indexOf(' ') != -1) {
        this.tips.password = "不允许存在空格"
      } else if (this.user.password.length <= 7) {
        this.tips.password = "至少八个字母或数字"
      } else if (this.user.password.length > 20) {
        this.tips.password = "至多20哥字母或数字"
      } else {
        this.tips.password = ""
      }
    },
    verifyCheckPassword: function () {
      if(this.verifyPassword == "") {
        this.tips.verifyPassword = ""
        return
      }

      if(this.verifyPassword === this.user.password) {
        this.tips.verifyPassword = ""
      }
      else {
        this.tips.verifyPassword = "输入不一致"
      }
    }
  }
}
</script>

<style scoped>

  .img-block {
    height: 350px;
  }

  .line-tip {
    margin-left: 10px;
    margin-right: 10px;
  }

  .login-line-block {
    margin-top: 20px
  }
  .content {
    width: 100%;
    margin-top: 100px;
  }

  .content-container {
    width: 70%;
    height: 500px;
    margin: 0 auto;
  }

  .content-left {
    width: 650px;
  }

  .content-right {
    width: 350px;
    padding-left: 30px;
  }

  .img-size {
    width: 700px;
    height: 400px;
  }

  .img-item {
    width: 700px;
    height: 400px;
  }

  .content-right-container {
    width: 100%;
  }

  .register-title {
    text-align: center;
    width: 100%;
    height: 40px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px 0px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: white;
    color: var(--commonBg);
    font-size: 20px;
  }

  .input-icon-block {
    width: 40px;
    height: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 20px;
    color: var(--commonColor)
  }

  .input-container {
    position: relative;
    overflow: visible;
  }

  .input-block {
    font-size: 16px;
    font-family: Helvetica, Arial, sans-serif;
    position: relative;
    box-sizing: border-box;
    color: inherit;
    height: 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.14) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.12) 0px 0px 1px 0px;
    background: white;
    border-radius: 5px;
  }

  .input-style {
    font-weight: inherit;
    color: inherit;
    border: none;
    display: block;
    margin: 0px;
    width: 100%;
    background: 0px 0px;
    text-align: left;
    box-sizing: border-box;
    line-height: 1;
    outline: none;
    box-shadow: none;
    resize: none;
    height: 100%;
  }

  input::-webkit-input-placeholder{
    color: #c3c3c3;
  }

  .input-title {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    font-size: 12px;
    color: rgba(255, 0, 0, 0.76);
    height: 20px;
  }

  .input-item {
    height: 60px;
  }

  .submit-block {
    margin-top: 10px;
  }

  .input-block-underline {
    border: none;
    box-sizing: border-box;
    background-color: var(--commonColor);
    top: -1px;
    left: 45%;
    width: 10px;
    height: 2px;
    visibility: hidden;
    margin: 0px;
    position: relative;
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .input-placeholder {
    font-size: 14px;
    font-family: Helvetica, Arial, sans-serif;
    color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    box-sizing: border-box;
    top: 5px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    pointer-events: none;
    position: absolute;
    display: block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  }

  .input-notes {
    font-family: Helvetica, Arial, sans-serif;
    font-size: inherit;
    color: rgba(0, 0, 0, 0.5);
    top: 5px;
    box-sizing: border-box;
    margin: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    pointer-events: none;
    position: absolute;
    display: block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .input-block-bottom {
    font-size: 12px;
    color: rgb(244, 67, 54);
    margin-top: 3px;
    box-sizing: border-box;
    visibility: hidden;
    display: block;
    position: absolute;
  }
</style>
