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
    <div class="info-block">
    </div>
    <div class="foot-block">
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
  }
</style>
