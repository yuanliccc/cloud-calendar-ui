<template>
  <div class="flex-row flex-center text-center minePage" ref="minePage">
    <div class="menu flex-row flex-center">
      <div class="menu-container">
        <!--<div class="menu-item flex-row flex-center" v-for="(item, index) in menuItems" @click="clickMenu(item.route)">
          <div class="flex-column flex-center menu-item-icon">
            <div class="menu-item-icon-container" v-bind:class="item.icon"></div>
          </div>
          <div class="flex-column flex-center text-center flex-grow menu-item-title">{{item.title}}</div>
          <div class="menu-item-icon"></div>
        </div>-->
        <el-menu default-active="图表统计"
                 class="el-menu-vertical-demo"
                 @open="controlMenuDisplay"
                 @close="controlMenuDisplay" :collapse="isShowMenu">
          <div class="hide-show-btn flex-column flex-center text-center" @click="controlMenuDisplay">
            <div class="flex-row flex-center">
              <div class="fa fa-angle-double-left flex-column flex-center" v-if="!isShowMenu"></div>
              <div class="fa fa-angle-double-right" v-else></div>
            </div>
          </div>
          <el-menu-item v-for="(item, index) in menuItems" :index=item.title :key="index" @click="clickMenu(item.route)">
            <i v-bind:class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <!--<div class="flex-column flex-center control-menu-block">
        <div class="control-menu-item fa fa-angle-double-left" v-if="isShowMenu" @click="controlMenuDisplay"></div>
        <div class="control-menu-item fa fa-angle-double-right" v-else @click="controlMenuDisplay"></div>
      </div>-->
    </div>
    <div class="flex-grow flex-column content">
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mine",
    data: function () {
      return {
        isShowMenu: true,
        menuItems: [
          {
            icon: 'fa fa-bar-chart-o',
            title: '图表统计',
            route: '/mine/chart'
          },
          {
            icon: 'fa fa-tasks',
            title: '任务管理',
            route: '/mine/schedule'
          },
          {
            icon: 'fa fa-list',
            title: '好友列表',
            route: '/mine/friends'
          },
          {
            icon: 'fa fa-calendar-check-o',
            title: '日程管理',
            route: '/mine/calendar'
          }
        ]
      }
    },
    mounted() {
      this.$refs.minePage.style.height = (document.body.clientHeight - 50) +'px';
      window.onresize = () => {
        this.$refs.minePage.style.height = (document.body.clientHeight - 50) +'px';
      }
    },
    watch: {

    },
    methods: {
      controlMenuDisplay: function () {
        this.isShowMenu = !this.isShowMenu
      },
      clickMenu: function (route) {
        this.$router.push({path:route})
      }
    }
  }
</script>

<style scoped>

  .el-menu-vertical-demo {
    height: 100%;
  }

  .hide-show-btn {
    height: 56px;
    font-size: 14px;
    cursor: pointer;
  }

  .hide-show-btn:hover {
    outline: 0;
    background-color: #ecf5ff;
  }

  .menu-item-title {
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
  }

  .menu-item-icon-container {
    width: 20px;
    height: 20px;
  }

  .menu-item-icon {
    width: 36px;
    font-size: 18px;
    margin-left: 8px;
  }

  .menu-item {
    height: 36px;
    cursor: pointer;
    color: #383838;
    margin-top: 2px;
    margin-bottom: 2px;
    border-bottom: 1px solid rgba(158, 158, 158, 0.24);
  }

  .menu-item:hover {
    background: #f5f5f5;
  }

  .content {
    overflow-y: scroll;
    background: whitesmoke;
  }

  .show-menu {
    -webkit-animation: showMenu 0.3s linear;
    width: 220px;
  }

  .hide-menu {
    -webkit-animation: hideMenu 0.3s linear;
    width: 20px;
  }

  @keyframes showMenu {
    from {
      width: 20px;
    }
    to {
      width: 220px;
    }
  }

  @keyframes hideMenu {
    from {
      width: 220px;
    }
    to {
      width: 20px;
    }
  }

  .control-menu-item {
    color: var(--commonColorHover);
    cursor: pointer;
    font-size: 20px;
    width: 20px;
  }

  .control-menu-item:hover {
    color: var(--commonBgHeaderActive);
  }

  .control-menu-block {
    background: #fafafc;
  }

  body {
    padding: 0px;
    margin: 0px;
    height: 100%;
  }

  .menu-container {
    height: 100%;
    background: white;
    border-right: 1px solid var(--commonBodyBg);
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
    overflow: hidden;
  }

  .menu {
    height: 100%;
  }

  .slide-fade{
    position: absolute;left:0;right: 0;
  }
  .slide-fade-enter-active {
    transition: all 1.2s ease;
  }
  .slide-fade-leave-active {

    transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  {
    left:0;right: 0;
    transform: translateX(50px);
    opacity: 0;
  }

</style>
