<template>
    <div class="flex-row flex-center">
      <div class="content flex-row flex-around">
        <div class="menu-block">
          <el-menu
            default-active="1" class="menu">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">账户密码</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="content-block">
          <div class="personal-info">
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "personal"
    }
</script>

<style scoped>

  .el-menu {
    border-right: none;
  }

  .content {
    margin-top: 40px;
  }

  .menu {
    width: 300px;
  }

  .menu-block {
    width: 300px;
  }

  .content-block {
    width: 640px;
    margin-left: 40px;
  }

  body {
    background: #ededed;
    height: 100vh;
  }

</style>
