<template>
    <div>
      <div>
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="filter">
        </el-input>
      </div>
      <el-table
        :data="friends"
        style="width: 100%">
        <el-table-column type="selection">

        </el-table-column>
        <el-table-column
          prop="friendName"
          label="任务内容">
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
            <el-button type="success" icon="el-icon-view" circle></el-button>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  export default {
    name: "friends",
    data: function () {
      return {
        friends:[],
        filter
      }
    },
    methods: {
      getFriendsDetailList: function () {
        this.$store.commit('showLoading')
        // 请求
        this.$axios.get('/pcc/user/friendsDetail', {
          params: {
            page:1,
            size: 20,
            pccUserId: this.$store.getters.userInfo.id
          }
        })
          .then(res => {
            const data = res.data

            if(data.data == null) {
              // 弹框
            }
            else {
              this.friends = data.data.list
            }

            console.log(res.data)
            this.$store.commit('hideLoading')
          })
          .catch(err => {
            this.$store.commit('hideLoading')
          })
      }
    },
    mounted: function () {
      this.getFriendsDetailList()
    }
  }
</script>

<style scoped>

</style>
