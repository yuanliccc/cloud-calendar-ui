<template>
  <div class="header-block flex-column">
    <div class="index-header-block flex-row">
      <div class="header-content-block flex-row">
        <div class="header-content-left flex-row">
          <div class="header-item-start t-center flex-column">
            <router-link class="header-item-a" to="/">个人云日历</router-link>
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
            <router-link class="header-item-a" to="/login">登录</router-link>
          </div>
          <div class="header-item header-item-end t-center flex-column">
            <router-link class="header-item-a" to="/signup">注册</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "header"
  }
</script>

<style scoped>
  .header-block {
    background: rgb(33, 150, 243);
    height: 60px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  }

  .index-header-block {
    padding-top: 3px;
    height: 50px;
    width: 100%;
  }

  .header-content-block {
    width: 98%;
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
    text-decoration: none;
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
    background: #1e88e5;
    border-radius: 2px;
  }
</style>
