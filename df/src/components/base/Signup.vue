<template>
  <div>
    <div class="signup-block">
      <div class="signup-title-block">
        <div class="signup-title-line">
          <span class="signup-title">注册</span>
        </div>
      </div>
      <div class="signup-container-block">
        <div class="signup-container flex-column">
          <el-form>
            <div class="input-item-block">
              <el-input class="input-style" placeholder="用户名"></el-input>
            </div>
            <div class="input-item-block">
              <el-input class="input-style" placeholder="密码"></el-input>
            </div>
            <div class="input-item-block">
              <el-input class="input-style" placeholder="重复密码"></el-input>
            </div>
            <div class="input-item-block">
              <el-input class="input-style" placeholder="手机"></el-input>
            </div>
            <div class="input-item-block">
              <el-input class="input-style" placeholder="邮箱"></el-input>
            </div>
            <div class="input-item-block">
              <button class="signup-button">立即创建</button>
            </div>
            <div class="to-login-block">
              <router-link to="/login">已有账号,直接登录></router-link>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      user: {
        name: null,
        email: null,
        phone: null,
        password: null
      }
    }
  }
}
</script>

<style>
  .signup-block {
    padding-top: 50px;
    padding-bottom: 100px;
    background: #ffeeee40;
  }

  .signup-title-line {
    width: 980px;
    height: 28px;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    margin-bottom: 28px;
    text-align: center;
  }

  .signup-title {
    height: 56px;
    line-height: 56px;
    margin: 0 auto;
    padding: 0 20px;
    font-size: 40px;
    background: #fff;
    text-align: center;
  }

  .input-item-block {
    margin:0 auto;
    margin-top: 30px;
    width: 420px;
  }

  .signup-button {
    width: 420px;
    height: 40px;
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
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }

  .signup-button:hover {
    background: #33b4de;
    border-color: #33b4de;
    color: #fff;
  }

  .to-login-block {
    margin:0 auto;
    width: 420px;
    text-align: right;
    margin-top: 5px;
  }

  .input-style input {
    height: 40px!important;
  }

  .to-login-block a {
    cursor: pointer;
    font-size: 12px;
    color: #00a1d6;
    border: none;
    text-decoration: none;
  }
</style>
