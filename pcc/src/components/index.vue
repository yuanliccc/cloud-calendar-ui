<template>
  <div>
    <div class="huge-screen-block">
      <div class="jumbotron huge-screen">
        <div class="huge-screen-container">

          <!--<div class="index-header-block flex-row">
            <div class="header-content-block flex-row">
              <div class="header-content-left flex-row">
                <div class="header-item-start t-center flex-column">
                  <a class="header-item-a">个人云日历</a>
                </div>
                <div class="header-item t-center flex-column">
                  <a class="header-item-a">日历</a>
                </div>
                <div class="header-item t-center flex-column">
                  <a class="header-item-a">服务</a>
                </div>
              </div>
              <div class="header-content-right flex-row">
                <div class="header-item t-center flex-column">
                  <router-link class="header-item-a" to="/pcc/login">登录</router-link>
                </div>
                <div class="header-item header-item-end t-center flex-column">
                  <router-link class="header-item-a" to="/pcc/signup">注册</router-link>
                </div>
              </div>
            </div>
          </div>-->

          <div class="huge-screen-title-block">
            <div class="huge-screen-title">Cloud-calendar</div>
          </div>
          <div class="huge-screen-content-block">
            <p class="huge-screen-content">
              个人云日历不仅仅是一个日历，更是一个为您自动化办公的服务平台，
              它能为您定时通知，只要您提供服务接口，它甚至可以为您关闭家庭电器等
            </p>
          </div>

          <div class="huge-screen-link-block">
            <a class="huge-screen-link">云日历服务</a>
          </div>

          <div class="huge-screen-login-button-block">
            <button class="huge-screen-login-button" @click="toSignUp">加入云日历</button>
          </div>
        </div>
      </div>
    </div>

    <div class="service-block">
      <div class="service-container">
        <div class="t-center">
          <p class="service-title">热点服务</p>
        </div>
        <div class="t-center">
          <p class="service-desc">云日历为您提供实用的自动服务</p>
        </div>

        <div class="flex-row flex-center">
          <div class="service-img-block flex-column flex-center">
            <div class="service-img-container">
              <img src="../assets/images/index/soundready.png">
            </div>
            <div class="t-center">
              <p class="service-img-desc no-margin">接口测试</p>
            </div>
          </div>
          <div class="service-img-block flex-column flex-center">
            <div class="service-img-container">
              <img src="../assets/images/index/jshint.png">
            </div>
            <div class="t-center">
              <p class="service-img-desc no-margin">文档服务</p>
            </div>
          </div>
          <div class="service-img-block flex-column flex-center">
            <div class="service-img-container">
              <img src="../assets/images/index/kippt.png">
            </div>
            <div class="t-center">
              <p class="service-img-desc no-margin">物联网服务</p>
            </div>
          </div>

        </div>
      </div>

    </div>

    <div class="foot-block flex-row flex-center">
      <div class="foot-container">
        <div class="flex-row flex-center">
          <div class="foot-link-block">
            <a class="foot-link">京ICP证100780号</a>
          </div>
          <div class="foot-link-block">
            <a class="foot-link">京网文[2017]10291-1172号</a>
          </div>
          <div class="foot-link-block">
            <a class="foot-link">增值电信业务经营许可证B2 -20140447</a>
          </div>
          <div class="foot-link-block">
            <a class="foot-link">乙测资字1111805</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    toSignUp: function () {
      this.$router.push({path: '/signup'})
    }
  }
}
</script>

<style scoped>
  body {
    font-size: 16px;
    margin: 0;
    padding: 0;
    background: #ffffff;
  }

  .huge-screen-block {
    position: relative;
  }

  .huge-screen {
    padding-top: 0;
    padding-bottom: 100px;
    background: linear-gradient(var(--commonBg),var(--commonBg) 100%);
  }

  .huge-screen:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(../assets/images/index-huge-screen-back.png) repeat center center;
    opacity: .4;
  }

  .huge-screen-title-block {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  .huge-screen-title {
    font-size: 70px;
    color: white;
    font-weight: 600;
    margin-bottom: 30px;
    margin-top: 70px;
  }

  .huge-screen-content-block {
    width: 80%;
    margin-left: 10%;
    text-align: center;
  }

  .huge-screen-content {
    font-size: 30px;
    color: white;
  }

  .huge-screen-container {
    position: relative;
    z-index: 2;
  }

  .huge-screen-link-block {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 50px;
  }

  .huge-screen-link {
    font-size: 23px;
    color: #ffffffb3;
    text-decoration: underline;
    cursor: pointer;
  }

  .huge-screen-link:hover {
    color: white;
  }

  .huge-screen-login-button-block {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }

  .huge-screen-login-button {
    width: 280px;
    height: 50px;
    font-size: 24px;
    background: linear-gradient(45deg,#1e88e5,#2177c3 100%);
    color: #ccc;
    font-weight: 500;
    border: 1px solid #2388e1;
    border-radius: 2px;
  }

  .huge-screen-login-button:hover {
    color: white;
    background: linear-gradient(45deg,#2177c3,#1e88e5 100%);
  }

  .service-block {
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;
  }

  .service-container {
    width: 80%;
  }

  .service-title {
    font-size: 30px;
    font-weight: 300;
  }

  .service-desc {
    font-size: 18px;
    font-weight: 300;
  }

  .index-header-block {
    padding-top: 3px;
    height: 50px;
    width: 100%;
  }

  .header-content-block {
    width: 80%;
    height: 100%;
  }

  .header-content-left {
    width: 80%;
    height: 100%;
    justify-content: flex-start;
  }

  .header-content-right {
    width: 20%;
    height: 100%;
    justify-content: flex-end;
  }

  .header-item-a {
    color: white;
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .header-item-a:hover {
    text-decoration: none;
    color: white;
  }

  .header-item-start {
    height: 100%;
    min-width: 90px;
    cursor: pointer;
    margin-left: 0px;
    font-size: 20px;
    margin-right: 10px;
  }

  .header-item-end {
    margin-right: 0px;
  }

  .header-item {
    height: 100%;
    min-width: 90px;
    cursor: pointer;

  }

  .header-item:hover {
    background: #2196F3;
    border-radius: 2px;
  }

  .service-img-block {
    width: 300px;
    height: 300px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .service-img-container {
    cursor: pointer;
    width: 300px;
    height: 250px;
    border: 1px solid #f5f5f5;
    box-shadow: 0px 1px 1px 1px #999;
  }

  .service-img-container:hover {
    transform: scale(1.03);
    transition: all 300ms linear;
  }

  .service-img-desc {
    font-weight: 300;
    padding-top: 10px;
    display: inline-block;
  }

  .foot-block {
    margin-top: 70px;
    background: #f5f5f5;
  }

  .foot-container {
    width: 80%;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .foot-link-block {
    padding: 10px;
  }

  .foot-link {
    font-size: 14px;
    text-decoration: none;
    cursor: pointer;
    color: #777;
  }

  .foot-link:hover {
    color: #381942;
    text-decoration: none;
  }
</style>
