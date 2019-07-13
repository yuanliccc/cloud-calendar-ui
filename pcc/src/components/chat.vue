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
          <div class="friends-item flex-row flex-center"
               v-for="(item, index) in friends" :key="index"
               v-bind:class="[activeFriendIndex == index ? 'friends-item-active' : '']" >
            <div class="friends-item-block flex-row" @click="active(index)">
              <div class="flex-start flex-column flex-center">
                <el-button type="primary" class="friends-item-icon" circle>{{item.name.substring(0, 1)}}</el-button>
              </div>
              <div class="flex-end flex-column flex-center friends-item-name">
                {{item.name}}
              </div>
            </div>
          </div>
        </div>
        <div class="chat-right">
          <div class="info-block" id="info-block">
            <div v-for="(message, messageIndex) in messages" :key="messageIndex" class=" message-item"
              v-bind:class="message.receiveUserId==userId ? 'flex-row' : 'flex-row-reverse'">
              <div class="">
                <el-button v-if="message.receiveUserId==userId" type="primary" class="friends-item-icon" circle>
                  {{friends[activeFriendIndex].name.substring(0, 1) }}
                </el-button>
                <el-button v-else type="primary" class="friends-item-icon" circle>{{userName.substring(0, 1)}}</el-button>
              </div>
              <div class="">
                <div  v-if="message.receiveUserId == userId" class="message-item-name-block">
                  <span>{{friends[activeFriendIndex].name}}</span>
                  <span class="time-span">{{message.sendTime | formatDate}}</span>
                </div>
                <div  v-else  class="message-item-name-block-right">
                  <span class="time-span-right">{{message.sendTime | formatDate}}</span>
                  <span >{{userName}}</span>
                </div>
                <div class="message-item-content" v-bind:class="message.receiveUserId!=userId ? 'message-item-content-right' : ''">
                  <span v-bind:class="message.receiveUserId==userId? 'content-span-left' : 'content-span-right'"
                        class="message-item-content-span">
                    {{message.content}}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <textarea placeholder="发送信息" v-model="content" contenteditable="true" class="full chat-input" @keyup.13="sendInfo">
              </textarea>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import DateUtil from '../util/DateUtil'
  export default {
    name: 'chat',
    data() {
      return {
        websock: null,
        friends: [],
        userId: this.$store.getters.userInfo.id,
        userName: this.$store.getters.userInfo.name,
        activeFriendIndex: 0,
        messages:[],
        content: ''
      }
    },
    watch: {
      isShow: function (val, oldVal) {
        if(val) {
          this.getFriends()
        }
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
    filters: {
      formatDate: function (dateStr) {
        if (!dateStr) {
          return ''
        }
        const date = new Date(dateStr)
        return DateUtil.formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    destroyed() {
      //this.websock.close()
    },
    methods: {
      initWebSocket() {
        const wsUri = "ws://127.0.0.1:8090/chat/" + this.$store.getters.userInfo.id;
        this.websock = new WebSocket(wsUri);
        this.websock.onmessage = this.onMessage;
        this.websock.onopen = this.onOpen;
        this.websock.onerror = this.onError;
        this.websock.onclose = this.onClose;
      },
      onOpen() {
      },
      onError() {//连接建立失败重连
        //this.initWebSocket();
      },
      onMessage(res) { //数据接收
        let data = JSON.parse(res.data)

        if(data && data.infoType){}
        else return

        if(data.infoType === 'chat') {
          this.chatMessage(data.content)
        }
        else if(data.infoType === 'online-notice') {
          this.onlineMessage(data.content)
        }
        else if(data.infoType === 'friend-apply') {
          this.friendApplyMessage(data.content)
        }
        else {
          return
        }
      },
      friendApplyMessage: function(pccNotice) {
        this.$notify({
          title: '好友申请',
          message: JSON.parse(pccNotice.content).name + '申请加您为好友，请至通知栏进行确认',
          duration: 0
        });
      },
      onlineMessage: function(content) {
        // this.$notify({
        //   title: '上线提醒',
        //   message: content,
        //   duration: 0
        // });
      },
      chatMessage: function(content) {
        this.messages.push(content)
        this.$nextTick(function(){
          this.scrollTop()
        })
        this.$notify({
          title: '新聊天消息',
          message: content.content,
          duration: 0
        });
      },
      sendMessage(message) {
        this.websock.send(message)
      },
      onClose(e) {  //关闭
        console.log('cl')
        this.initWebSocket()
      },
      closeDialog: function () {
        this.$emit('close');
      },
      getFriends: function () {
        this.$axios.get('/pcc/user/friends', {params: {pccUserId: this.$store.getters.userInfo.id}})
        .then(res => {
          const data = res.data
          this.friends = data.data
          this.getMessages()
        })
        .catch(err => {
          console.log(err)
        })
      },
      active: function (index) {
        this.activeFriendIndex = index
        this.getMessages()
      },
      sendInfo: function () {
        const info = {
          sendUserId: this.userId,
          receiveUserId: this.friends[this.activeFriendIndex].id,
          content: this.content
        }
        this.sendMessage(JSON.stringify(info))
        this.content = ''
        info.sendTime = new Date()
        this.messages.push(info)
        this.$nextTick(function(){
          this.scrollTop()
        })
        console.log(this.messages)
      },
      scrollTop: function() {
        var div = document.getElementById('info-block')
        div.scrollTop = div.scrollHeight + 354
      },
      getMessages: function () {
        this.$axios.get('/pcc/chat/info/info', {
          params: {
            sendUserId: this.$store.getters.userInfo.id,
            receiveUserId: this.friends[this.activeFriendIndex].id}
        })
          .then(res => {
            const data = res.data
            this.messages = data.data
            this.$nextTick(function(){
              this.scrollTop()
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>
<style scoped>

  .message-item-content-right {
    text-align: right;
    margin-right: 10px;
  }

  .content-span-left {
    border-radius: 0px 12px 0px 12px;
  }

  .content-span-right {
    border-radius: 12px 0px 12px 0px;
  }

  .message-item-content-span {
    display: inline-block;
    border: 1px solid rgba(33, 150, 243, 0.55);
    background: rgba(33, 150, 243, 0.73);
    -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 1px 2px 0 rgba(3, 169, 244, 0.81);
    color: white;
    padding: 2px 10px 2px 10px;
  }

  .message-item-content {
    margin-left: 10px;
    margin-top: 10px;
  }
  .time-span-right {
    padding-right: 10px;
  }
  .time-span {
    padding-left: 10px;
  }
  .message-item-name-block {
    color: rgb(134, 130, 130);
    margin-left: 10px;
  }

  .message-item-name-block-right {
    color: rgb(134, 130, 130);
    margin-right: 10px;
  }
  .message-item {
    width: 96%;
    margin-left: 2%;
    margin-bottom: 20px;
  }
  .chat-input {
    display: inline-block;
    height: 69px;
    box-sizing: border-box;//其他浏览器
    -webkit-box-sizing: border-box;//谷歌
    -moz-box-sizing: border-box;
    border: 1px solid rgba(96, 98, 102, 0.31);
    outline-style: none ;
    padding-left: 10px;
    padding-top: 10px;
    overflow: hidden;
  }
  .info-block {
    border-bottom: 1px solid rgba(96, 98, 102, 0.31);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
    overflow: auto;
    height: 380px;
  }
  .info-block::-webkit-scrollbar {
    display:none
  }

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
    overflow-y: scroll;
  }
  .el-dialog__header {
    padding: 0 !important;
  }

  .el-dialog__body {
    padding: 0px!important;
  }
</style>
