<template>
  <div class="head">
    您无此权限进入该路由，<span style="color:red">{{time}}</span>秒后回到首页！
  </div>
</template>

<script>
  export default {
    name: 'noPermission',
    data () {
      return {
        time: 3,
      }
    },
    created: function(){
      window.setInterval(() => {
        this.time--
      },1000);
      setTimeout(() => {
       this.$router.push("/");
      }, 3000);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .head{
    width:300px;
    margin: 20% auto;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
