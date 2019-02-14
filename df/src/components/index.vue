<template>
  <div class="flex-column">
    <div class="giant-screen-block flex-column">
      <div class="giant-screen">
        <div class="giant-screen-title-block">
          <div class="giant-screen-title">Cloud-calendar</div>
        </div>
        <div class="giant-screen-container-block">
          <div class="giant-screen-container">
            动态表单可以让您通过简单易操作的方式生成自定义表单,
            满足工作中对于不同类型表单的需求,提高您的工作效率
          </div>

          <div class="giant-screen-signup-button-block">
            <button class="giant-screen-signup-button" @click="toSignUp">立即注册</button>
          </div>
        </div>
      </div>
    </div>
    <div class="info-block flex-column">
      <div class="info-title flex-center">
        在这里,将会更便捷
      </div>
      <div class="info-container">
        <div class="info-cards flex-row flex-space-between">
          <div class="info-card">
            <div class="info-card-title card-title-1"></div>
            <div class="info-card-container">
              更加直观的操作方式，让表单的创建从此不再麻烦
            </div>
            <div class="info-card-foot">了解更多</div>
          </div>
          <div class="info-card">
            <div class="info-card-title card-title-2"></div>
            <div class="info-card-container">
              方便的在线预览，随心定制您想要的格式，记录您的每一份成果
            </div>
            <div class="info-card-foot">了解更多</div>
          </div>
          <div class="info-card">
            <div class="info-card-title card-title-3"></div>
            <div class="info-card-container">
              支持多种样式库，可按需求生成不同样式库的不同代码
            </div>
            <div class="info-card-foot">了解更多</div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot-block flex-row flex-center">
      <div class="foot-container flex-row">
        <div class="foot-link-block">
          <a href="#" class="foot-link">Copyright © 2013-2019 Cloud-calendar</a>
        </div>
        <div class="foot-link-block">
          <a href="#" class="foot-link">沪ICP备110XXXX号-X</a>
        </div>
        <div class="foot-link-block">
          <a href="#" class="foot-link">隐私条款</a>
        </div>
        <div class="foot-link-block">
          <a href="#" class="foot-link">服务条款</a>
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
      alert('点你大爷')
    }
  }
}
</script>

<style scoped>
  .giant-screen {
    padding-top: 0;
    padding-bottom: 100px;
    background-color: #409EFF;
  }

  .giant-screen-title-block {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  .giant-screen-title {
    font-size: 70px;
    font-weight: 600;
    margin-bottom: 30px;
    margin-top: 70px;
    color: #fff;
  }

  .giant-screen-container-block {
    text-align: center;
  }

  .giant-screen-container {
    width: 80%;
    font-size: 30px;
    color: #fff;
    margin: 0 auto;
  }

  .giant-screen-signup-button-block {
    margin-top: 50px;
  }

  .giant-screen-signup-button {
    width: 280px;
    height: 50px;
    font-size: 24px;
    background: #409EFF;
    color: #fff;
    font-weight: 500;
    border: 1px solid #fff;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }

  .giant-screen-signup-button:hover {
    background: rgb(250, 234, 187);
    border: 1px solid #fff;
    color: #5e5e5e;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    cursor: pointer;
  }

  .info-block {
    padding-top: 50px;
    padding-bottom: 100px;
    background: #ffeeee40;
  }

  .info-container {
    padding: 35px 0px;
  }

  .info-title {
    font-size: 30px;
    color: #000;
    text-align: center;
  }

  .info-cards {
    text-align: left;
    width: 80%;
    margin:0 auto;
  }

  .info-card {
    min-width: calc((100% - 48px - 44px * 2) / 3);
    width: calc((100% - 48px - 44px * 2) / 3);
    box-shadow: 3px 3px #3333;
    border: 0.5px solid #3333;
    border-top: none;
  }

  .info-card-title {
    height: 140px;
    -webkit-background-size: 100%;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 50%;
  }

  .card-title-1 {
    background-image: url(../assets/images/card-mi.jpg);
  }

  .card-title-2 {
    background-image: url(../assets/images/card-kai.jpg);
  }

  .card-title-3 {
    background-image: url(../assets/images/card-book.jpg);
  }

  .info-card-container {
    padding: 16px 24px 0;
    font-size: .875em;
    line-height: 22px;
  }

  .info-card-foot {
    border:1px solid #3333;
    text-align: center;
    height: 48px;
    border: 0.5px solid #ddded9;
    justify-content: center;
    align-items: center;
    display: flex;
    color: #50b0f6;
  }

  .info-card-foot:hover {
    cursor: pointer;
    background-color: #a3f3e34a;
    -webkit-transition: background .3s;
    -moz-transition: background .3s;
    -ms-transition: background .3s;
    -o-transition: background .3s;
    transition: background .3s;
  }

  .foot-block {
    padding-bottom: 15px;
    border-top:1px solid #3333;
    padding-top: 15px;
  }

  .foot-link-block {
    margin-right: 15px;
    margin-bottom: 3px;
    font-size: 0.8em;
  }

  .foot-link {
    color: #a6a6a6;
  }
</style>
