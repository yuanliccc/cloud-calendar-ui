<template>
  <div class="header">
    <div class="tip">
      <router-link to="/" class="tipSpan"><i class="glyphicon glyphicon-home icon"></i>机构日历系统</router-link>
    </div>
    <ul class="right">
      <li class="li">
        <el-badge :value="email.length" :max="99" class="item">
          <el-button size="small"><i class="el-icon-message"></i></el-button>
        </el-badge>
        <el-badge :value="infomation.length" :max="10" class="item">
          <el-button size="small"><i class="el-icon-bell"></i></el-button>
        </el-badge>
      </li>

      <li class="portraitLi">
        <img src="../../assets/image/testPortrait.jpg" class="portrait"/>
        <span class="userName">{{user.name != "" ? user.name : user.account}}</span>
        <i class="glyphicon glyphicon-triangle-bottom"></i>

        <div class="userMenu">
          <div>用户中心</div>
          <div>修改密码</div>
          <div @click="selectOrNot">选择机构 </div>
          <div @click="singOut">退出登录</div>
        </div>
      </li>
    </ul>
    <div class="selOrg" v-if="selOrNot">
      <div class="chooseLogin">
        <el-form>
          <el-form-item label="选择登录的机构">
            <el-select v-model="organization.id">
              <el-option v-for="i in organizations" :key="i.id" :value="i.id" :label="i.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="chooseBt">
            <el-button type="primary" @click="changeOrg()">进入</el-button>
            <el-button @click="selectOrNot">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    inject:['reload'],
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
        ],
        organizations:[],
        selOrNot: false,
      }
    },
    computed:{
      user: function () {
        return this.$store.getters.userInfo.user
      },
      organization: function () {
        return this.$store.getters.userInfo.organization
      },
      allInfo: function(){ //测试用 要删
        return this.$store.getters.userInfo
      }
    },
    created:function(){
      this.getAllLoginUserOrg();
    },
    methods:{
      singOut: function(){
        this.$axios.get('/occ/user/singUp').then(res =>{
          this.$router.push("/login");
          this.$store.commit("loginOut");
        }).catch(err =>{
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        });
      },
      getAllLoginUserOrg: function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/organization/getAllLoginUserOrg").then(res =>{
          this.organizations = res.data.data;
          this.$store.commit("hideLoading");
        }).catch(err =>{
          this.$store.commit("hideLoading");
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        })
      },
      jumpTo: function (url) {
        this.$router.push({path: url});
      },
      selectOrNot:function(){
        this.selOrNot = !this.selOrNot;
      },
      changeOrg: function(){
        this.$store.commit("showLoading");
        this.$axios.get("/occ/user/switchOrg",{
            params:{orgId: this.organization.id}
        }).then(res =>{
          const data = res.data;
          if(data.code == '400'){
            this.$message({
              showClose: true,
              message: data.message,
              type: 'warning'
            });
          }else{
            this.$store.commit('setUserInfo', data.data);
            this.selectOrNot();
            this.reload();
          }
          this.$store.commit("hideLoading");
        }).catch(err =>{
          this.$store.commit("hideLoading");
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        });
      }
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
    width:450px;
    padding: 0 10px;
    padding-left: 60px;
    height:60px;
    float: right;
    line-height: 60px;
    display: inline;
  }
  .li, .portraitLi{
    width: 100px;
    cursor:pointer;
    display: inline;
  }
  .portraitLi{
    padding-bottom: 23px;
  }
  .portrait{
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 50%;
  }
  .item{
    margin-top: 10px;
    margin-right: 30px;
    display: inline;
  }
  .item:hover{
    color: deepskyblue;
  }
  .userMenu{
    top: 60px;
    position: absolute;
    width:150px;
    border: 1px solid #ccc;
    margin-left: 170px;
    display: none;
    background: #ffffff;
  }
  .userMenu div{
    height: 40px;
    text-align: left;
    line-height: 40px;
    padding-left: 20px;
    border-bottom: 1px solid #ccc;
  }
  .userMenu div:hover{
    background: #cccccc;
    color: #000;
  }
  li:hover .userMenu{
    display: block;
  }
  li:hover .chooseOrg{
    display: block;
  }
  .userMenu:hover{
    display: block;
  }
  .userName{
    margin: 0 2px;
    font-size: 13px;
    font-weight: bold;
  }
  .selOrg{
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-color: #fff;
  }
  .chooseLogin{
    width: 400px;
    margin: 0 auto;
    margin-top:15%;
  }
  .chooseBt{
    text-align: center;
  }
</style>
