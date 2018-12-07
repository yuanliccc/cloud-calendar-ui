/* eslint-disable */
<template>
  <div class="header-block flex-column">
    <div class="index-header-block flex-row">
      <div class="header-content-block flex-row">
        <div class="header-content-left flex-row">
          <div class="header-item-start t-center flex-column">
            <router-link class="header-item-a" to="/">个人云日历</router-link>
          </div>
          <div v-bind:class="[ titles[0].isActive ? 'header-item-active' : 'header-item', 't-center', 'flex-column' ]">
            <a class="header-item-a" v-on:click="jump(0)">{{titles[0].title}}</a>
          </div>
          <!--<div v-bind:class="[ titles[1].isActive ? 'header-item-active' : 'header-item', 't-center', 'flex-column' ]">
            <a class="header-item-a" v-on:click="jump(1)">{{titles[1].title}}</a>
          </div>-->
        </div>
        <div class="header-content-right flex-row">
          <div v-bind:class="[ titles[2].isActive ? 'header-item-active' : 'header-item', 't-center', 'flex-column' ]">
            <a class="header-item-a" v-on:click="jump(2)">{{titles[2].title}}</a>
          </div>
          <div v-bind:class="[ titles[3].isActive ? 'header-item-active' : 'header-item', 't-center', 'flex-column', 'header-item-end' ]">
            <a class="header-item-a" v-on:click="jump(3)">{{titles[3].title}}</a>
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
  .header-block {
    background: rgb(33, 150, 243);
    height: 60px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  }

  .index-header-block {
    padding-top: 3px;
    height: 50px;
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
    color: white;
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-decoration: none;
  }

  .header-item-a:hover {
    text-decoration: none;
    color: white;
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
    min-width: 90px;
    cursor: pointer;
  }

  .header-item-active {
    height: 100%;
    min-width: 90px;
    cursor: pointer;
    background: #1e88e5;
    border-radius: 2px;
  }

  .header-item:hover {
    background: #1e88e5;
    border-radius: 2px;
  }
</style>
