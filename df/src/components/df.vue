<template>
  <div>
    <df-header :userInfo="userInfo"></df-header>
    <transition :name="transitionName">
      <router-view class="main-block" @userInfoCallback="getUserInfo" :userInfo="userInfo"></router-view>
    </transition>
    <!--<df-foot></df-foot>-->
  </div>
</template>

<script>
import DfHeader from './base/DfHeader.vue'
import DfFoot from './base/DfFoot.vue'
export default {
  name: 'df',
  components: {
    DfHeader,
    DfFoot
  },
  data () {
    return {
      transitionName: '',
      userInfo: null
    }
  },
  methods: {
    // 获取用户信息的回调
    getUserInfo: function (data) {
      this.userInfo = data
    },
    // 判断用户是否登录
    isLogin: function () {
      this.$axios.get('/df/user/isLogin')
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            this.userInfo = res.data.data
          } else if (code === 400) {
            this.$router.push({path: '/'})
          }
        })
        .catch(err => {
          console.log('err: ' + err)
        })
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
  },
  mounted () {
    this.isLogin()
  }
}
</script>

<style>
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

  .main-block {
    height: 100%;
  }
</style>
