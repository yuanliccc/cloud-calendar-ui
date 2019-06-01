<template>
  <div>
    <div class="personal-container">
      <div class="personal-header-block">hi {{this.user.name}}</div>
      <div class="personal-line"></div>
      <div class="personal-form-block">
        <el-form ref="form" :model="user" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="姓名">
                  <el-input v-model="user.name"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="性别">
                  <el-select v-model="user.sex" placeholder="请选择">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="邮箱">
                  <el-input v-model="user.email"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="联系方式">
                  <el-input v-model="user.phone"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="handleUpdate">更新信息</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import ElCol from 'element-ui/packages/col/src/col'
export default {
  components: {ElCol},
  name: 'Personal',
  props: ['userInfo'],
  data () {
    return {
      user: {
        id: null,
        name: '',
        sex: '',
        email: '',
        phone: ''
      },
      sexOptions: [
        {
          value: '男'
        },
        {
          value: '女'
        }
      ]
    }
  },
  methods: {
    // 点击更新按钮后的操作
    handleUpdate: function () {
      this.updateUser(this.user)
    },
    // 更新用户信息
    updateUser: function (user) {
      this.$axios.post('/df/user/update', user)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            this.findUserById(this.userInfo.id)
            this.$message.success('更新成功')
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 获取用户信息
    findUserById: function (id) {
      this.$axios.get('/df/user/findUserById/' + id)
        .then(res => {
          const code = res.data.code
          if (code === 200) {
            const data = res.data.data
            this.user.id = data.id
            this.user.name = data.name
            this.user.sex = data.sex
            this.user.email = data.email
            this.user.phone = data.phone
          } else if (code === 400) {
            this.$router.push({path: '/'})
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    }
  },
  mounted () {
    this.findUserById(this.userInfo.id)
  }
}
</script>
<style>
  .personal-container {
    padding-top:25px;
    width: 80%;
    margin:0 auto;
  }

 .personal-line {
   width: 100%;
   height: 28px;
   margin: 0 auto;
   border-bottom: 1px solid #ddd;
   margin-bottom: 28px;
   text-align: center;
 }

  .personal-form-block .el-select {
    min-width: 100%;
  }

</style>
