<template>
  <div class="header-block flex-column">
    <div class="logo-block flex-column">
      <a class="logo-a" href="/">个人云日历</a>
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

  .logo-block {
    height: 100%;
    width: 100px;
    text-align: center;
    cursor: pointer;
    margin-left: 20px;
  }

  .logo-a {
    font-size: 20px;
    color: white;
    text-decoration: none;
  }

  .logo-a:hover {
    text-decoration: none;
    color: white;
  }
</style>
