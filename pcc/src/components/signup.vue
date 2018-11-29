<template>
    <div>
      <div class="content flex-column">
        <div class="content-container flex-row">
          <div class="content-left">
            <div id="carousel-example-generic" class="carousel slide full" data-ride="carousel">
              <!-- Indicators -->
              <!--<ol class="carousel-indicators">
                  <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                  <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                  <li data-target="#carousel-example-generic" data-slide-to="2"></li>
              </ol>-->

              <!-- Wrapper for slides -->
              <div class="carousel-inner" role="listbox">
                <div class="item active img-item">
                  <img class="img-size" src="../assets/images/signup/one.jpg" alt="...">
                </div>
                <div class="item img-item">
                  <img class="img-size" src="../assets/images/signup/two.jpg" alt="...">
                </div>
              </div>

              <!-- Controls -->
              <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div class="content-right flex-row">
            <div class="content-right-container">
              <div class="register-title">
                Register
              </div>

              <div class="register-content">
                <div>
                  <div class="input-container">
                    <div class="input-item">
                      <!--<div class="input-title">
                          username
                      </div>-->
                      <div class="input-block flex-row">
                        <div class="input-icon-block">
                          <span class="glyphicon glyphicon-user"></span>
                        </div>
                        <input type="text" value="" class="input-style" placeholder="username">
                      </div>
                    </div>

                    <div class="input-item">
                      <!--<div class="input-title">
                          email
                      </div>-->
                      <div class="input-block flex-row">
                        <div class="input-icon-block">
                          <span class="glyphicon glyphicon-envelope"></span>
                        </div>
                        <input type="text" value="" class="input-style" placeholder="email">
                      </div>
                    </div>

                    <div class="input-item">
                      <!--<div class="input-title">
                          phone
                      </div>-->
                      <div class="input-block flex-row">
                        <div class="input-icon-block">
                          <span class="glyphicon glyphicon-earphone"></span>
                        </div>
                        <input type="text" value="" class="input-style" placeholder="phone">
                      </div>
                    </div>
                    <div class="input-item">
                      <!--<div class="input-title">
                          password
                      </div>-->
                      <div class="input-block flex-row">
                        <div class="input-icon-block">
                          <span class="glyphicon glyphicon-lock"></span>
                        </div>
                        <input type="password" value="" class="input-style" placeholder="password">
                      </div>
                    </div>
                    <div class="input-item">
                      <!--<div class="input-title">
                          verify password
                      </div>-->
                      <div class="input-block flex-row">
                        <div class="input-icon-block">
                          <span class="glyphicon glyphicon-lock"></span>
                        </div>
                        <input type="password" value="" class="input-style" placeholder="verify password">
                      </div>
                    </div>

                    <div class="flex-row login-line-block">
                      <div class="flex-column flex-grow">
                        <div class="normal-line"></div>
                      </div>
                      <div class="line-tip">已经有账号，请 <router-link to="/login">登录</router-link></div>
                      <div class="flex-column flex-grow">
                        <div class="normal-line"></div>
                      </div>
                    </div>

                    <div class="submit-block flex-row">
                      <button class="submit-btn">submit</button>
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
        name: "signup"
    }
</script>

<style scoped>

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
    width: 80%;
    height: 400px;
    margin: 0 auto;
  }

  .content-left {
    width: 700px;
  }

  .content-right {
    width: 350px;
    margin-left: 30px;
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
    width: 300px;
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
    background: #2196f3;
    color: white;
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
    color: #2196f3;
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

  .input-title {
    font-size: 16px;
    color: #777;
  }

  .input-item {
    margin-top: 18px;
  }

  .submit-block {
    margin-top: 10px;
  }

  .input-block-underline {
    border: none;
    box-sizing: border-box;
    background-color: rgb(33, 150, 243);
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
