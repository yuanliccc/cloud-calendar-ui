<template>
  <div>
    <div class="flex-row" v-if="this.user != null">
      <div class="meun-container flex-column">
        <el-menu
          :default-active="defaultActive"
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
          <el-menu-item v-for="(item, index) in meunItems" :index="item.route" :key="index" @click="clickMenu(item.route)">
            <i :class="item.icon" class="flex-center"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="main-content">
        <transition :name="transitionName">
          <router-view :userInfo="user"></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mainContainer',
  props: ['userInfo'],
  data () {
    return {
      user: this.userInfo,
      isShowMenu: false,
      transitionName: '',
      defaultActive: '',
      meunItems: [
        {
          title: '动态表单管理',
          icon: 'fa fa-list-alt',
          route: '/main/dfList'
        },
        {
          title: '分享模板',
          icon: 'fa fa-paste',
          route: '/main/shareList'
        },
        {
          title: '我的填写',
          icon: 'fa fa-coffee',
          route: '/main/selfSubmitDynamicForm'
        },
        {
          title: '我的申请',
          icon: 'fa fa-flag',
          route: '/main/collectFormEditApplyList'
        },
        {
          title: '我的审批',
          icon: 'fa fa-gavel',
          route: '/main/collectFormEditApplyApprovalList'
        },
        {
          title: '个人信息管理',
          icon: 'fa fa-user-circle-o',
          route: '/main/personal'
        }
      ]
    }
  },
  methods: {
    // 根据路由来选中对应的导航栏项
    chooseNavItem: function () {
      let routePath = this.$route.path
      this.defaultActive = routePath
    },
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
      this.chooseNavItem()
    },
    'userInfo': function (newVal) {
      if (newVal != null) {
        this.user = newVal
      }
    }
  },
  mounted () {
    this.chooseNavItem()
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
    height:90vh;
    flex-grow: 1;
  }

  .el-menu-vertical-demo {
    height: 100%;
  }
</style>
