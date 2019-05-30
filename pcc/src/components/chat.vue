<template>
  <div>
    <el-dialog width="850px" :visible.sync="isShow" :modal="true" :close-on-click-modal="false" :show-close="false">
      <div class="title flex-row flex-start" slot="title">
        <div class="flex-grow flex-row flex-end">
          <div class="el-icon-close pointer" @click="closeDialog"></div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">关闭</el-button>
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
      }
    },
    props: {
      isShow: Boolean
    },
    created() {
      //this.initWebSocket();
    },
    destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    },
    methods: {
      initWebSocket() { //初始化weosocket
        const wsUri = "ws://127.0.0.1:8090/pcc/chat/" + this.$store.getters.userInfo.id;
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
      }
    },
  }</script>
<style scoped>
  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__body {
    padding: 0px;
  }
</style>
