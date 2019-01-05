<template>
  <div class="flex-row flex-center text-center minePage" ref="minePage">
    <div class="menu flex-row flex-center" v-bind:class="[isShowMenu ? 'show-menu' : 'hide-menu']">
      <div class="menu-container">
        <div class="menu-item flex-row flex-center" v-for="(item, index) in menuItems">
          <div class="flex-column flex-center menu-item-icon">
            <div class="menu-item-icon-container" v-bind:class="item.icon"></div>
          </div>
          <div class="flex-column flex-center text-center flex-grow menu-item-title">{{item.title}}</div>
          <div class="menu-item-icon"></div>
        </div>
      </div>
      <div class="flex-row flex-center control-menu-block">
        <div class="control-menu-item" v-if="isShowMenu" @click="controlMenuDisplay">隐藏</div>
        <div class="control-menu-item" v-else @click="controlMenuDisplay">显示</div>
      </div>
    </div>
    <div class="flex-grow flex-column content">
      <div>
        <h1>Hello !</h1>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mine",
    data: function () {
      return {
        isShowMenu: false,
        menuItems: [
          {
            icon: 'glyphicon glyphicon-stats',
            title: '图表统计'
          },
          {
            icon: 'glyphicon glyphicon-tasks',
            title: '任务管理'
          },
          {
            icon: 'glyphicon glyphicon-list',
            title: '好友列表'
          },
          {
            icon: 'glyphicon glyphicon-calendar',
            title: '日程管理'
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
      }
    }
  }
</script>

<style scoped>

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
    width: 20px;
    height: 45px;
    background: rgba(51, 51, 51, 0.55);
    border-radius: 0 0 10px 0;
  }

  .control-menu-item:hover {
    color: var(--commonBgHeaderActive);
  }

  .control-menu-block {
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
    width: 200px;
    overflow: hidden;
  }

  .menu {
    height: 100%;
  }

</style>
