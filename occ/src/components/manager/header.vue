<template>
  <div class="header">
    <div class="tip">
      <router-link to="/manager" class="tipSpan"><i class="glyphicon glyphicon-home icon"></i>机构日历系统</router-link>
    </div>
    <ul class="right">
      <li class="li">
        <i class="glyphicon glyphicon-envelope iIcon"></i>
        <div class="emailTips">
          <div v-for="i in email" class="item">
            <div class="title">{{i.title}}</div>
            <div class="date">{{i.dateTime}}</div>
          </div>
          <div class="item">
            <div class="title">更多...</div>
          </div>
        </div>
      </li>

      <li class="li">
        <i class="glyphicon glyphicon-bell iIcon"></i>
        <div class="infomation">
          <div v-for="i in infomation" class="item">
            <div class="title">{{i.title}}</div>
            <div class="date">{{i.dateTime}}</div>
          </div>
          <div class="item">
            <div class="title">更多...</div>
          </div>
        </div>
      </li>

      <li class="portraitLi">
        <img src="../../assets/image/testPortrait.jpg" class="portrait"/>
        <span class="userName">{{user.name != "" ? user.name : user.account}}</span>
        <i class="glyphicon glyphicon-triangle-bottom"></i>

        <div class="userMenu">
          <div>用户中心</div>
          <div>修改密码</div>
          <div>退出登录</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    name: 'managerHeader',
    data(){
      return {
        email:[
          {
            title: '尊敬的XX用户，明天在某地某时间集合，请勿迟到！！！',
            dateTime: '2019-01-25 15:58'
          },
          {
            title: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            dateTime: '2019-01-25 15:58'
          },
          {
            title: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            dateTime: '2019-01-25 15:58'
          },
          {
            title: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            dateTime: '2019-01-25 15:58'
          },
          {
            title: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            dateTime: '2019-01-25 15:58'
          }
        ],
        infomation:[
          {
            title: '系统消息：明天在某地某时间集合，请勿迟到！！！',
            dateTime: '2019-01-25 15:58'
          },
          {
            title: '机构消息：明天在某地某时间集合，请勿迟到！！！',
            dateTime: '2019-01-25 15:58'
          },
          {
            title: '机构消息：明天在某地某时间集合，请勿迟到！！！',
            dateTime: '2019-01-25 15:58'
          },
          {
            title: '机构消息：明天在某地某时间集合，请勿迟到！！！',
            dateTime: '2019-01-25 15:58'
          },
          {
            title: '机构消息：明天在某地某时间集合，请勿迟到！！！',
            dateTime: '2019-01-25 15:58'
          }
        ]
      }
    },
    computed:{
      user: function () {
        return this.$store.getters.userInfo.user
      }
    },
    methods:{

    }
  }
</script>

<style scoped>
  .header{
    position: fixed;
    display: inline;
    top: 0;
    z-index: 1001;
    left: 0;
    right: 0;
    height: 60px;
    border-bottom: 1px solid #ccc;
    background: #ffffff;
  }
  .icon{
    cursor: pointer;
    font-size: 18px;
    padding-right: 5px;
    display: inline;
  }
  .tip{
    width:260px;
    height:60px;
    display: inline;
    line-height: 60px;
  }
  .tipSpan{
    text-decoration: none;
    padding-left: 40px;
  }
  .right{
    width:350px;
    padding: 0 10px;
    padding-left: 60px;
    height:60px;
    float: right;
    line-height: 60px;
    display: inline;
  }
  .li, .portraitLi{
    width: 60px;
    cursor:pointer;
    display: inline;
    padding-bottom: 22px;
  }
  .iIcon{
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    color: rgba(0,0,0,0.4);
    margin-right: 20px;
  }
  .iIcon:hover{
    color:red
  }
  .portrait{
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 50%;
  }
  .emailTips, .infomation{
    top: 60px;
    position: absolute;
    width:250px;
    margin-left: -100px;
    border: 1px solid #ccc;
    display: none;
    background: #ffffff;
  }
  .item{
    width:250px;
    padding:0 10px 5px 10px;
    border-bottom: 1px solid #cccccc;
  }
  .title, .date{
    height: 30px;
    overflow: hidden;
    line-height: 45px;
  }
  .item:hover{
    text-decoration: underline;
    color: deepskyblue;
  }
  .infomation{
    margin-left: -70px;
  }
  .userMenu{
    top: 60px;
    position: absolute;
    width:120px;
    border: 1px solid #ccc;
    margin-left: 100px;
    display: none;
    background: #ffffff;
  }
  .userMenu div{
    height: 40px;
    text-align: left;
    line-height: 40px;
    padding-left: 20px;
  }
  .userMenu div:hover{
    background: #cccccc;
    color: #000;
  }
  li:hover .emailTips, li:hover .userMenu, li:hover .infomation{
    display: block;
  }
  .emailTips:hover, .userMenu:hover{
    display: block;
  }
  .userName{
    margin: 0 2px;
    font-size: 13px;
    font-weight: bold;
  }
</style>
