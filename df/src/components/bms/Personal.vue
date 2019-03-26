<template>
  <div>
    <div class="personal-container">
      <div class="personal-header-block">hi, 高旭东</div>
      <div class="personal-line"></div>
      <div class="personal-form-block">
        <el-form ref="form" :model="user" label-width="80px">
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
                  <el-input v-model="user.sex"></el-input>
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
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Personal',
  data () {
    return {
      user: {
        id: null,
        name: '',
        sex: '',
        email: '',
        phone: ''
      }
    }
  },
  methods: {
  }
}
</script>
<style>
  .personal-container {
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
</style>
