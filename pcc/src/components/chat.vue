<template>
  <div>
    <el-dialog width="850px" :visible.sync="isShow" :modal="true" :close-on-click-modal="false" :show-close="false">
      <div class="title flex-row flex-start" slot="title">
        <div class="flex-column flex-start">
          聊天信息
        </div>
        <div class="flex-grow flex-row flex-end">
          <div class="el-icon-close pointer" @click="closeDialog"></div>
        </div>
      </div>
      <div class="flex-row flex-center chat-content">
        <div class="chat-left">
          <div class="friends-item flex-row flex-center" v-for="(friend, index) in friends" :key="index">
            <div class="friends-item-block flex-row">
              <div class="flex-start flex-column flex-center">
                <el-button type="primary" class="friends-item-icon" circle>{{friend.name.substring(0, 1)}}</el-button>
              </div>
              <div class="flex-end flex-column flex-center friends-item-name">
                {{friend.name}}
              </div>
            </div>
          </div>
        </div>
        <div class="chat-right">

        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'chat',
    data() {
      return {
        websock: null,
        friends: [],
      }
    },
    props: {
      isShow: Boolean
    },
    created() {
      this.initWebSocket();
    },
    mounted: function() {
      this.getFriends()
    },
    destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    },
    methods: {
      initWebSocket() { //初始化weosocket
        const wsUri = "ws://127.0.0.1:8090/chat/" + this.$store.getters.userInfo.id;
        this.websock = new WebSocket(wsUri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen() { //连接建立之后执行send方法发送数据
        let actions = {"test": "12345"};
        this.websocketsend(JSON.stringify(actions));
      },
      websocketonerror() {//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e) { //数据接收
        const redata = JSON.parse(e.data);
      },
      websocketsend(Data) {//数据发送
        this.websock.send(Data);
      },
      websocketclose(e) {  //关闭
        console.log('断开连接', e);
      },
      closeDialog: function () {
        this.$emit('close');
      },
      getFriends: function () {
        // 请求
        this.$axios.get('/pcc/user/friends', {
          params: {
            pccUserId: this.$store.getters.userInfo.id
          }
        })
        .then(res => {
          const data = res.data
          this.friends = data.data
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped>

  .friends-item-icon {
    width: 38px;
    height: 38px;
    font-size: 15px;
  }

  .friends-item-name {
    margin-left: 10px;
  }

  .friends-item-block {
    width: 96%;
  }

  .friends-item {
    height: 45px;
    border-bottom: 1px solid rgba(96, 98, 102, 0.31);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
    cursor: pointer;
  }

  .friends-item-active {
    background: #333;
    color: white;
  }

  .friends-item:hover {
    background: #333;
    color: white;
  }

  .chat-right {
    width: 650px;
    height: 450px;
  }

  .chat-content {
    width: 100%;
    height: 450px;
    border: 1px solid #c6cdd4;
  }

  .chat-left {
    width: 200px;
    border-right:1px solid red;
    overflow-y: scroll;
  }
  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__body {
    padding: 0px!important;
  }
</style>
