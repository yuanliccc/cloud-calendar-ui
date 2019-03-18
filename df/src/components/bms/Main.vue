<template>
  <div>
    <div class="flex-row">
      <div class="meun-container flex-column">
        <el-menu default-active="动态表单管理"
                 class="el-menu-vertical-demo"
                 @open="controlMenuDisplay"
                 @close="controlMenuDisplay"
                 :collapse="isShowMenu">
          <div class="control-menu-block text-center" @click="controlMenuDisplay">
            <div class="flex-row control-menu-btn flex-center">
              <div class="fa fa-angle-left fa-lg flex-column flex-center" v-if="!isShowMenu"></div>
              <div class="fa fa-angle-right fa-lg" v-else></div>
            </div>
          </div>
          <el-menu-item v-for="(item, index) in meunItems" :index="item.title" :key="index" @click="clickMenu(item.route)">
            <i v-bind:class="item.icon" class="flex-center"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="main-content">
        <transition :name="transitionName">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mainContainer',
  data () {
    return {
      isShowMenu: true,
      transitionName: '',
      meunItems: [
        {
          title: '动态表单管理',
          icon: 'fa fa-list-alt',
          route: '/main/dfList'
        },
        {
          title: '个人信息管理',
          icon: 'fa fa-user-circle-o',
          route: '/main/personal'
        },
        {
          title: '模板管理',
          icon: 'fa fa-paste',
          route: '/'
        },
        {
          title: '系统参数配置',
          icon: 'fa fa-gears',
          route: '/'
        },
        {
          title: '社区中心',
          icon: 'fa fa-users',
          route: '/'
        },
        {
          title: '帮助中心',
          icon: 'fa fa-coffee',
          route: '/'
        }
      ]
    }
  },
  methods: {
    controlMenuDisplay: function () {
      this.isShowMenu = !this.isShowMenu
    },
    clickMenu: function (route) {
      this.$router.push({path: route})
    }
  },
  watch: {
    // 监听路由变化,设置过场动画
    $route (to, from) {
      if (to.meta.index > from.meta.index) {
        // 设置动画名称
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  }
}
</script>
<style scope>
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .menu-container {
    height: 100%;
    background: white;
    border-right: 1px solid #ddd;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
    overflow: hidden;
  }

  .control-menu-btn {
    width:64px;
    height: 56px;
    font-size: 14px;
    cursor: pointer;
    align-items: center;
  }

  .main-content {
    min-height: 576px;
    flex-grow: 1;
    padding: 56px 20px;
  }

  .el-menu-vertical-demo {
    height: 100%;
  }
</style>
