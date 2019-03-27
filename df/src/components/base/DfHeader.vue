<template>
  <div class="header-block">
    <div class="header-content flex-row flex-space-between">
      <div class="header-content-left flex-row">
        <div class="header-content-title">
          <router-link to="/">Cloud-calendar</router-link>
        </div>
      </div>
      <div class="header-content-right flex-row" v-if="this.userInfo == null">
        <div class="header-content-item" :class="[titles[0].isActive ? 'header-item-active' : '']">
          <a @click="jump(0)">{{titles[0].title}}</a>
        </div>
        <div class="header-content-item" :class="[titles[1].isActive ? 'header-item-active' : '']">
          <a @click="jump(1)">{{titles[1].title}}</a>
        </div>
      </div>
      <div class="header-content-right flex-row" v-else>
        <div class="header-content-item">
          {{this.userInfo.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'df-header',
  props: ['userInfo'],
  data: function () {
    return {
      titles: [
        {
          title: '登录',
          route: '/login',
          isActive: false
        },
        {
          title: '注册',
          route: '/signup',
          isActive: false
        }
      ]
    }
  },
  watch: {
    '$route': 'changeActive'
  },
  methods: {
    jump: function (index) {
      this.$router.push({path: this.titles[index].route})
    },
    changeActive: function () {
      // 获取当前路由
      let currentPath = this.$route.path

      // 遍历导航栏的条目列表,更新激活状态
      for (let i = 0; i < this.titles.length; i++) {
        if (currentPath.endsWith(this.titles[i].route)) {
          this.titles[i].isActive = true
        } else {
          this.titles[i].isActive = false
        }
      }
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

  .header-content-title a {
    color: #fff;
  }

  .header-content-item {
    vertical-align: middle;
    margin: 5px;
    color: #fff;
  }

  .header-content-item a:hover {
    cursor: pointer;
  }

  .header-item-active {
    border-bottom: 2px solid #fff;
  }
</style>
