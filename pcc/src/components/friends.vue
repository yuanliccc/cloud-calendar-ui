<template>
  <div>
    <div class="flex-row flex-start title-block">
      <div class="search-form flex-row flex-start">
        <div class="title-select-block">
          <el-select v-model="filters[0].key" placeholder="请选择">
            <el-option
              v-for="item in filterOpinions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="filters[0].value">
          </el-input>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-search"></el-button>
        </div>
      </div>
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

            if (data.data == null) {
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
      },
      openAddFriends: function () {
        // this.$msgbox( {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //   inputErrorMessage: '邮箱格式不正确'
        // })
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '内容可以是 '),
            h('i', { style: 'color: teal' }, 'VNode')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
      }
    },
    mounted: function () {
      this.getFriendsDetailList()
    }
  }
</script>

<style scoped>

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
