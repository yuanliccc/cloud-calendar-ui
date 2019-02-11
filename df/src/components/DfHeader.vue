<template>
  <div class="header-block">
    <div class="header-content flex-row flex-space-between">
      <div class="header-content-left flex-row">
        <div class="header-content-title">
          Cloud-calendar
        </div>
      </div>
      <div class="header-content-right flex-row">
        <div class="header-content-item">
          <a>{{titles[0].title}}</a>
        </div>
        <div class="header-content-item">
          <a>{{titles[1].title}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'df-header',
  data: function () {
    return {
      titles: [
        {
          title: '登录',
          route: '/login'
        },
        {
          title: '注册',
          toute: '/signup'
        }
      ]
    }
  }
}
</script>

<style>
  .header-block {
    background-color: #409EFF;
  }

  .header-content {
    margin: 0 15px;
  }

  .header-content-title {
    vertical-align: middle;
    color: #fff;
    font-size: 32px;
    font-weight: 600;
    opacity: 0.8;
    overflow: hidden;
    text-align: left;
  }

  .header-content-item {
    vertical-align: middle;
    margin: 5px;
    color: #fff;
  }
</style>
