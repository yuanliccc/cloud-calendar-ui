<template>
    <div class="flex-row flex-center">
      <div class="content flex-row flex-around">
        <div class="menu-block">
          <el-menu
            default-active="1" class="menu">
            <el-menu-item index="1" @click="clickMenu(1)">
              <i class="fa fa-user-o"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item index="2" @click="clickMenu(2)">
              <i class="fa fa-lock"></i>
              <span slot="title">账户密码</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="content-block">
          <div class="personal-info layer" v-show="showIndex === 1">
            <div>
              <el-form :model="user" label-width="80px">
                <el-form-item label="头像">
                  <div class="flex-row flex-start">
                    <div class="img-block">
                      <div class="full half-radius" v-if="!user.url"></div>
                      <img class="full half-radius" v-else :src="'/pcc/file/imgId?pccFileId=' + user.pcc_file_id"/>
                    </div>
                    <user-img-upload @uploadSuccess="uploadSuccess"></user-img-upload>
                  </div>
                </el-form-item>

                <el-form-item label="姓名">
                  <el-input v-model="user.name"></el-input>
                </el-form-item>

                <el-form-item label="电话号码">
                  <el-input v-model="user.phone"></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                  <el-input v-model="user.email"></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="sex">
                  <el-radio-group v-model="user.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="editUser">提交修改</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="personal-info layer" v-show="showIndex === 2">
            <div>
              <el-form label-width="100px">
                <el-form-item label="新密码">
                  <el-input type="password" v-model="password"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码">
                  <el-input type="password" v-model="verifyPassword"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="editPassword">确认修改</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import UserImgUpload from './file/userImgUpload'
export default {
  name: "personal",
  components: {
    UserImgUpload
  },
  data: function () {
    return {
      user: this.$store.getters.userInfo,
      showIndex: 1,
      password: '',
      verifyPassword:''
    }
  },
  methods: {
    editUser: function () {
      let user = this.parseUser()
      this.$store.commit('showLoading')
      this.$axios.put('/pcc/user', user)
        .then(res => {
          this.$store.commit('hideLoading')
          this.$message('修改个人信息成功')
          this.updateUserInfo()
        })
        .catch(err => {
          this.$store.commit('hideLoading')
          this.$message.error('修改个人信息失败，程序员小袁正在处理，请稍后重试')
        })
    },
    parseUser: function () {
      let re = {}
      for(var key in this.user) {
        if(key !== 'url' && key !== 'urlType' && key !== 'pcc_file_id') {
          re[key] = this.user[key]
        }
      }
      return re
    },
    clickUpload: function () {

    },
    uploadSuccess: function (file) {
      this.$store.commit('showLoading')
      this.updateUserImg(file.id)
    },
    updateUserImg: function (fileId) {
      if(!fileId) {
        this.$message.warning('上传头像失败，请重试')
      }
      this.$axios.get('/pcc/user/updateImg', {
        params: {
          pccUserId: this.user.id,
          pccFileId: fileId
        }
      }).then(res => {
        const data = res.data
        this.updateUserInfo()
        this.$message('头像修改成功')
        this.$store.commit('hideLoading')
      }).catch(err => {
        this.$store.commit('hideLoading')
      })
    },
    updateUserInfo: function () {
      this.$axios.get('/pcc/user/detail', {
        params: {
          pccUserId: this.user.id,
        }
      }).then(res => {
        const data = res.data
        this.user = data.data
        this.$store.commit("setUserInfo", data.data)
        this.$store.commit('hideLoading')
      }).catch(err => {
        this.$message.error('个人信息获取失败')
        this.$store.commit('hideLoading')
      })
    },
    clickMenu: function (index) {
      this.showIndex = index
    },
    editPassword: function () {
      if(!this.judgePassword()) {
        return
      }
      this.$axios.post('/pcc/user/update/password', {
        params: {
          pccUserId: this.user.id,
          password: this.password
        }
      }).then(res => {
        this.updateUserInfo()
        this.$message('修改密码成功')
      }).catch(err => {
        this.$message.error('修改密码失败，程序员小袁正在处理，请稍后重试')
      })
    },
    judgePassword: function () {
      if(this.password && this.verifyPassword) {
        if(this.password === this.verifyPassword) {
          return true
        }
        else {
          this.$message.warning('两次输入不相同，请重新输入')
          return false
        }
      }
      else {
        this.$message.warning('请确保已经输入了密码且确认了密码')
        return false
      }
    }
  }
}
</script>

<style scoped>

  .layer {
    transition: transform .3s,opacity .3s;
  }

  .img-block {
    height: 70px;
    width: 70px;
    border: 1px solid rgba(158, 158, 158, 0.2);
    border-radius: 50%;
    cursor: pointer;
    margin-right: 20px;
  }

  .el-menu {
    border-right: none;
  }

  .content {
    margin-top: 40px;
  }

  .menu {
    width: 300px;
  }

  .menu-block {
    width: 300px;
  }

  .content-block {
    width: 640px;
    margin-left: 40px;
    background: white;
    padding: 40px;
    position: relative;
  }

  body {
    background: #ededed;
    height: 100vh;
  }

</style>
