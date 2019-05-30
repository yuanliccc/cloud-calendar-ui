/* eslint-disable */
<template>
  <div class="header-block flex-column flex-center">
    <div class="index-header-block flex-row flex-center">
      <div class="header-content-block flex-row flex-center">
        <div class="header-content-left flex-row flex-center">
          <div class="header-item-start t-center flex-column flex-center">
            <router-link class="header-logo-a" to="/">个人云日历</router-link>
          </div>
          <!--<div v-bind:class="[ titles[0].isActive ? 'header-item-active' : 'header-item', 't-center', 'flex-column', 'flex-center' ]">-->
            <!--<a class="header-item-a" v-on:click="jump(0)">{{titles[0].title}}</a>-->
          <!--</div>-->
          <!--<div v-bind:class="[ titles[1].isActive ? 'header-item-active' : 'header-item', 't-center', 'flex-column' ]">
            <a class="header-item-a" v-on:click="jump(1)">{{titles[1].title}}</a>
          </div>-->
        </div>
        <div class="header-content-right flex-row" v-if="userInfo === undefined">
          <div v-bind:class="[ titles[2].isActive ? 'header-item-active' : 'header-item', 't-center', 'flex-column', 'flex-center' ]">
            <a class="header-item-a" v-on:click="jump(2)">{{titles[2].title}}</a>
          </div>
          <div v-bind:class="[ titles[3].isActive ? 'header-item-active' : 'header-item', 't-center', 'flex-column', 'header-item-end', 'flex-center' ]">
            <a class="header-item-a" v-on:click="jump(3)">{{titles[3].title}}</a>
          </div>
        </div>
        <div class="header-content-right flex-row" v-else>
          <div v-bind:class="[ titles[4].isActive ? 'header-item-active' : 'header-item', 't-center', 'flex-column', 'header-item-end',
          'flex-center' ]">
            <a class="header-item-a" v-on:click="jump(4)">{{titles[4].title}}</a>
          </div>
          <div class="right-item-common cell flex-column flex-center text-center">
            <el-badge :value="12" class="item">
            <div class="el-icon-bell"></div>
            </el-badge>
          </div>
          <div>
            <div class="mock-user-logo right-item-common flex-column flex-center text-center" @click="showUserMenu">
              <div v-if="!userInfo.url" class="el-icon-picture-outline"></div>
              <img v-else class="full half-radius" :src="'/pcc/file/imgId?pccFileId=' + userInfo.pcc_file_id"/>
            </div>
            <div class="user-menu" v-if="isShowUserMenu"
                 v-bind:class="[isShowUserMenu ? 'menuDisplay' : 'menuDisappear']">
              <div>
                <div class="user-menu-item flex-column flex-center">
                  <div class="user-menu-item-container" @click="toPersonal">账号设置</div>
                </div>
                <div class="user-menu-item flex-column flex-center">
                  <div class="user-menu-item-container">好友列表</div>
                </div>
                <div class="line"></div>
                <div class="user-menu-item flex-column flex-center">
                  <div class="user-menu-item-container" @click="loginOut">退出登录</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hheader',
  data: function () {
    return {
      titles: [
        {
          title: '日历',
          route: '/calendar',
          isActive: false
        },
        {
          title: '服务',
          route: '/services',
          isActive: false
        },
        {
          title: '登录',
          route: '/login',
          isActive: false
        },
        {
          title: '注册',
          route: '/signup',
          isActive: false
        },
        {
          title: '我的',
          route: '/mine/chart',
          isActive: false
        }
      ],
      isShowUserMenu: false
    }
  },
  watch: {
    '$route': 'changeActive'
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  mounted: function () {

  },
  methods: {
    jump: function (index) {
      this.$router.push({path: this.titles[index].route})
    },
    changeActive: function () {
      let currentPath = this.$route.path

      for (let i = 0; i < this.titles.length; i++) {
        if (currentPath.endsWith(this.titles[i].route)) {
          this.titles[i].isActive = true
        } else {
          this.titles[i].isActive = false
        }
      }
    },
    showUserMenu: function () {
      this.isShowUserMenu = !this.isShowUserMenu
    },
    loginOut: function () {
      this.showUserMenu()
      this.$store.commit("loginOut")
      this.$router.push({path: "/login"})
    },
    toPersonal: function () {
      this.showUserMenu()
      this.$router.push({path: "/personal"})
    }
  }
}
</script>

<style scoped>

  .line {
    width: 100%;
    height: 1px;
    border-bottom: 1px solid rgba(158, 158, 158, 0.24);
  }

  .user-menu-item-container {
    width: 90%;
    margin-left: 5%;
  }

  .user-menu-item {
    height: 36px;
    cursor: pointer;
    color: #383838;
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .user-menu-item:hover {
    background: #f5f5f5;
  }

  .user-menu {
    position: absolute;
    top: 55px;
    right: 1%;
    background: #fff;
    z-index: 9999;
    width: 200px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
    border: 1px solid #d2d2d2;
    border-radius: 2px;
    -webkit-user-select: none;

  }

  .menuDisplay {
    -webkit-animation: menuDisplay 0.2s linear;
  }

  .menuDisappear {
    -webkit-animation: menuDisappear 0.2s linear;
  }

  @keyframes menuDisappear {
    from {
      opacity: 1;
      top: 55px;
    }
    to {
      opacity: 0.4;
      top: 45px;
    }
  }

  @keyframes menuDisplay {
    from {
      opacity: 0.4;
      top: 45px;
    }
    to {
      opacity: 1;
      top: 55px;
    }
  }

  .header-logo-a {
    color: white;
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-decoration: none;
  }

  .cell {
    cursor: pointer;
  }

  .cell div {
    color: var(--commonBgHeaderColor);
    font-size: 21px;
  }

  .cell div:hover {
    color: var(--commonBgHeaderActive);
  }

  .right-item-common {
    width: 40px;
    height: 40px;
    margin-left: 10px;
  }

  .mock-user-logo {
    border: 1px solid rgba(14, 14, 14, 0.23);
    border-radius: 25px;
    background: rgba(0, 150, 136, 0.34);
    cursor: pointer;
  }

  .mock-user-logo div {
    font-size: 22px;
    color: white;
  }

  .header-block {
    position: relative;
    background: var(--commonBg);
    height: 50px;
    width: 100%;
    color: var(--commonBgHeaderColor);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  }

  /*.index-header-block:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(../assets/images/index-huge-screen-back.png) repeat center center;
    opacity: .4;
  }*/

  .index-header-block {
    height: 40px;
    width: 100%;
    z-index: 1;
  }

  .header-content-block {
    width: 98%;
    height: 100%;
    z-index: 1;
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
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-decoration: none;
    color: var(--commonBgHeaderColor);
  }

  .header-item-a:hover {
    text-decoration: none;
    color: var(--commonBgHeaderActive);
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
    min-width: 60px;
    cursor: pointer;
  }

  .header-item-active {
    height: 100%;
    min-width: 60px;
    cursor: pointer;
    border-bottom: 2px solid #9E9E9E;
    /*background: var(--commonBgHeaderHover);
    !*#1e88e5*!
    border-radius: 2px;*/
  }

  .header-item-active a {
    color: var(--commonBgHeaderActive);
  }

  .header-item:hover {
    color: var(--commonBgHeaderHover);
    border-radius: 2px;
  }
</style>
