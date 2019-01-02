/* eslint-disable */
<template>
  <div class="header-block flex-column flex-center">
    <div class="index-header-block flex-row flex-center">
      <div class="header-content-block flex-row flex-center">
        <div class="header-content-left flex-row flex-center">
          <div class="header-item-start t-center flex-column flex-center">
            <router-link class="header-item-a" to="/">个人云日历</router-link>
          </div>
          <div v-bind:class="[ titles[0].isActive ? 'header-item-active' : 'header-item', 't-center', 'flex-column', 'flex-center' ]">
            <a class="header-item-a" v-on:click="jump(0)">{{titles[0].title}}</a>
          </div>
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
          <div class="right-item-common cell flex-column flex-center text-center">
            <div class="glyphicon glyphicon-bell"></div>
          </div>
          <div class="mock-user-logo right-item-common flex-column flex-center text-center">
            <div class="glyphicon glyphicon-user"></div>
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
        }
      ]
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
    }
  }
}
</script>

<style scoped>

  .cell {
    cursor: pointer;
  }

  .cell div {
    color: white;
    font-size: 21px;
  }

  .cell div:hover {
    color: #acacac;
  }

  .right-item-common {
    width: 40px;
    height: 40px;
    margin-left: 10px;
  }

  .mock-user-logo {
    border: 1px solid #009688;
    border-radius: 25px;
    background: #009688;
    cursor: pointer;
  }

  .mock-user-logo div {
    font-size: 22px;
    color: white;
  }

  .header-block {
    background: var(--commonBg);
    height: 50px;
    width: 100%;
    color: var(--commonBgHeaderColor);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  }

  .index-header-block {
    height: 40px;
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
