<template>
    <div>
      <el-dialog width="450px" :visible.sync="isShow" :modal="true" :close-on-click-modal="false" :show-close="false">
        <div class="title flex-row flex-start" slot="title">
          <div class="flex-column flex-center">
            <el-checkbox disabled>好友申请列表</el-checkbox>
          </div>
          <div class="flex-grow flex-row flex-end">
            <div class="el-icon-close pointer" @click="closeDialog"></div>
          </div>
        </div>
        <div>
          <el-table
            :data="notices"
            style="width: 100%"
            :height="300">
            <el-table-column
              prop="time"
              label="申请时间"
              width="200" :formatter="formatDate">
            </el-table-column>
            <el-table-column
              prop="content"
              label="申请人" :formatter="formatName">
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-check"
                  @click="saveFriend(scope.$index, scope.row)" circle>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import DateUtil from '../util/DateUtil'
  export default {
    name: "notice",
    data() {
      return {
        pccUserId: this.$store.getters.userInfo.id,
        notices:[]
      }
    },
    watch: {
      isShow: function (val, oldVal) {
        if (val) {
          this.getNotices()
        }
      }
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
    mounted: function() {
      //this.getNotices()
    },
    props: {
      isShow: Boolean
    },
    methods: {
      getNotices: function () {
        this.$axios.get('/pcc/notice/list/apply', {
          params: {pccUserId: this.$store.getters.userInfo.id}
        }).then(res => {
          const data = res.data
          this.notices = data.data
          console.log(this.notices)
        }).catch(err => {
          this.$message.error('获取日程数错误');
        })
      },
      closeDialog: function () {
        this.$emit('close');
      },
      saveFriend: function (index, row) {
        console.log(this.$store.getters.userInfo.id)
        let content = row['content']
        let js = JSON.parse(content)
        console.log(js.id)

        this.$axios.get('/pcc/user/friend/save/friend', {
          params: {pccUserId: this.$store.getters.userInfo.id, friendPccUserId: js.id}
        }).then(res => {
          this.$message.success("您已经同意申请")
          this.getNotices()
        }).catch(err => {
          this.$message.error('同意好友申请失败');
        })
      },
      formatDate: function (row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return DateUtil.formatDate(new Date(date), 'yyyy-MM-dd hh:mm:ss')
      },
      formatName: function (row, column) {
        var content = row[column.property];
        if (content == undefined) {
          return "";
        }
        var js = JSON.parse(content)
        return js.name
      }
    }
  }
</script>

<style scoped>

</style>
