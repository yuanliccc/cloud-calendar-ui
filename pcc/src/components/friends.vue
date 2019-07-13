<template>
  <div>
    <div class="flex-row flex-start title-block">
      <!--<div class="search-form flex-row flex-start">-->
        <!--<div class="title-select-block">-->
          <!--<el-select v-model="filters[0].key" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in filterOpinions"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</div>-->
        <!--<div>-->
          <!--<el-input-->
            <!--placeholder="请输入内容"-->
            <!--prefix-icon="el-icon-search"-->
            <!--v-model="filters[0].value">-->
          <!--</el-input>-->
        <!--</div>-->
        <!--<div>-->
          <!--<el-button type="primary" icon="el-icon-search"></el-button>-->
        <!--</div>-->
      <!--</div>-->
      <div class="flex-grow flex-row flex-end title-control-block">
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click="openAddFriends">新增</el-button>
        </el-button-group>
      </div>
    </div>
    <el-table
      :data="friends"
      style="width: 100%">
      <el-table-column type="selection">

      </el-table-column>
      <el-table-column
        prop="friendName"
        label="名字">
      </el-table-column>
      <el-table-column
        prop="friendRemark"
        label="备注"
        sortable>
      </el-table-column>
      <el-table-column
        prop="friendSex"
        label="性别"
        sortable>
      </el-table-column>
      <el-table-column
        prop="friendEmail"
        label="邮箱地址"
        sortable>
      </el-table-column>
      <el-table-column
        label="联系电话"
        sortable>
        <template slot-scope="scope">
          <i class="el-icon-phone"></i>
          <span style="margin-left: 10px">{{ scope.row.friendPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-view" @click="showInfo(scope.$index, scope.row)" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteFriend(scope.$index, scope.row)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="550px" :visible.sync="isShowInfo" :modal="true" :show-close="false">
      <div class="title flex-row flex-start" slot="title">
        <div class="flex-column flex-center">
          <el-checkbox disabled>好友信息</el-checkbox>
        </div>
        <div class="flex-column flex-center" style="margin-left: 10px">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{showUserInfo.friendName}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="flex-grow flex-row flex-end">
          <div class="el-icon-close pointer" @click="closeShowInfo"></div>
        </div>
      </div>
      <div>
        <div class="flex-row flex-center column-block">
          <div class="flex-row flex-start column-label-block">
            <div class="fa fa-clock-o flex-column flex-center"></div>
            <div class="flex-column flex-center column-label-title">昵称</div>
          </div>
          <div class="flex-grow flex-column flex-center text-left">
            {{showUserInfo.friendName}}
          </div>
        </div>
        <div class="flex-row flex-center column-block">
          <div class="flex-row flex-start column-label-block">
            <div class="fa fa-clock-o flex-column flex-center"></div>
            <div class="flex-column flex-center column-label-title">邮箱</div>
          </div>
          <div class="flex-grow flex-column flex-center text-left">
            {{showUserInfo.friendEmail}}
          </div>
        </div>
        <div class="flex-row flex-center column-block">
          <div class="flex-row flex-start column-label-block">
            <div class="fa fa-clock-o flex-column flex-center"></div>
            <div class="flex-column flex-center column-label-title">电话</div>
          </div>
          <div class="flex-grow flex-column flex-center text-left">
            {{showUserInfo.friendPhone}}
          </div>
        </div>
        <div class="flex-row flex-center column-block">
          <div class="flex-row flex-start column-label-block">
            <div class="fa fa-clock-o flex-column flex-center"></div>
            <div class="flex-column flex-center column-label-title">性别</div>
          </div>
          <div class="flex-grow flex-column flex-center text-left">
            {{showUserInfo.friendSex}}
          </div>
        </div>
        <div class="flex-row flex-center column-block">
          <div class="flex-row flex-start column-label-block">
            <div class="fa fa-clock-o flex-column flex-center"></div>
            <div class="flex-column flex-center column-label-title">备注</div>
          </div>
          <div class="flex-grow flex-column flex-center text-left">
            <el-form ref="form">
              <el-input v-model="showUserInfo.friendRemark"></el-input>
            </el-form>
          </div>
        </div>
        <div style="margin-top: 15px;text-align: right; margin-right: 6px;">
          <el-button size="small"
                     type="primary" @click="editRemark()">修改备注</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "friends",
    data: function () {
      return {
        isShowInfo: false,
        showUserInfo: {},
        friends: [],
        filterOpinions: [
          {
            value: 'name',
            label: '名字'
          }, {
            value: 'remark',
            label: '备注'
          }, {
            value: 'phone',
            label: '电话'
          }, {
            value: 'email',
            label: '邮箱'
          }, {
            value: 'sex',
            label: '性别'
          }
        ],
        filters: [
          {
            key: '',
            value: ''
          }
        ]
      }
    },
    methods: {
      showInfo: function(index, row) {
        this.showUserInfo = row
        this.isShowInfo = true
        console.log(row)
      },
      deleteFriend: function(index, row) {
        this.$confirm('您要删除您的好友, 是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteReal(row.friendId)
        }).catch(() => {
          //
        });
      },
      deleteReal: function(friendId) {
        this.$axios.get('/pcc/user/friend/delete',{
          params:{
            pccUserId: this.$store.getters.userInfo.id,
            friendPccUserId: friendId,
          }
        })
        .then(res => {
          const data = res.data
          this.getFriendsDetailList()
          this.$message.success("删除成功")
        })
        .catch(err => {
          this.$message.error("删除失败")
        })
      },
      editRemark: function() {
        this.$axios.get('/pcc/user/friend/remark',{
          params:{
            pccUserId: this.$store.getters.userInfo.id,
            friendPccUserId: this.showUserInfo.friendId,
            remark: this.showUserInfo.friendRemark
          }
        })
        .then(res => {
          const data = res.data
          this.$message.success("修改成功")
        })
        .catch(err => {
          this.$message.error("修改失败")
        })
        this.closeShowInfo()
      },
      closeShowInfo: function() {
        this.isShowInfo = false
      },
      getFriendsDetailList: function () {
        this.$store.commit('showLoading')
        // 请求
        this.$axios.get('/pcc/user/friendsDetail', {
          params: {
            page: 1,
            size: 20,
            pccUserId: this.$store.getters.userInfo.id
          }
        })
          .then(res => {
            const data = res.data
            this.friends = data.data.list
            this.$store.commit('hideLoading')
          })
          .catch(err => {
            this.$store.commit('hideLoading')
          })
      },
      openAddFriends: function () {
        this.$prompt('请输入对方邮箱', '添加好友', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.applyFriend(value)
        }).catch(() => {
          //
        });
      },
      applyFriend: function (email) {
        // 请求
        this.$axios.get('/pcc/user/friend/apply', {
          params: {
            email: email,
            pccUserId: this.$store.getters.userInfo.id
          }
        })
          .then(res => {
            this.$message.success(res.data.data)
          })
          .catch(err => {
            this.$message.error("好友申请失败")
          })
      }
    },
    mounted: function () {
      this.getFriendsDetailList()
    }
  }
</script>

<style scoped>

  .column-label-title {
    margin-left: 10px;
  }

  .column-label-block {
    width: 120px;
    color: #a6a6a6;
    font-size: 15px;
  }

  .column-block {
    height: 36px;
    width: 98%;
    margin-left: 1%;
    margin-top: 12px;
  }

  .title-control-block {
    margin-right: 10px;
  }

  .title-select-block {
    width: 100px;
  }

  .search-form {
    width: 50%;
  }

  .title-block {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 10px;
  }
</style>
