<template>
  <div>
    <el-dialog width="850px" :visible.sync="isShow" :modal="true" :close-on-click-modal="false" :show-close="false">
      <div class="title flex-row flex-start" slot="title">
        <div class="flex-column flex-center">
          <el-checkbox disabled>日程管理</el-checkbox>
        </div>
        <div class="flex-column flex-center" style="margin-left: 10px">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{this.dayStrTitle}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="flex-grow flex-row flex-end">
          <div class="el-icon-close pointer" @click="closeDialog"></div>
        </div>
      </div>
      <div class="table-block">
        <el-table
          :data="tasks"
          style="width: 100%"
          :height="300">
          <el-table-column
            prop="time"
            label="时间"
            width="200" :formatter="formatDate">
          </el-table-column>
          <el-table-column
            prop="content"
            label="日程内容">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="deleteTask(scope.$index, scope.row)" circle>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="form-block">
        <el-form ref="form" :model="task" label-width="80px">
          <el-form-item label="日程内容" required>
            <el-input type="textarea" v-model="task.content"></el-input>
          </el-form-item>
          <el-form-item label="日程时间" required>
            <el-time-picker class="flex-row flex-start"
                            v-model="task.time"
                            type="datetime"
                            placeholder="选择日期时间"
                            align="left">
            </el-time-picker>
          </el-form-item>
          <el-form-item class="text-right">
            <el-button type="primary" @click="addTask">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DateUtil from '../util/DateUtil'
export default {
  name: "calendarDetail",
  data() {
    return {
      task:{
        pccUserId: this.$store.getters.userInfo.id
      },
      tasks:[],
      dayStrTitle: String
    }
  },
  watch: {
    isShow: function (val, oldVal) {
      if(val) {
        this.getTasks()
        this.dayStrTitle = this.dayStr()
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
  props: {
    isShow: Boolean,
    selectDay: Object
  },
  methods: {
    formatDate: function (row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return DateUtil.formatDate(new Date(date), 'hh:mm:ss')
    },
    closeDialog: function () {
      this.$emit('close');
      this.task.content = ''
      this.task.time = ''
    },
    addTask: function () {

      if(!this.task.content || this.task.content.trim() === '') {
        this.$message.warning('请填写日程内容')
        return
      }
      if(!this.task.time) {
        this.$message.warning('请选择日程时间')
        return
      }
      this.task.time = this.strToDate(this.task.time)
      console.log(this.task.time)
      this.$axios.post('/pcc/task', this.task)
      .then(res => {
        const data = res.data
        this.$message({message: '新增日程成功',type: 'success'})
        this.task.content = ''
        this.getTasks()
      })
      .catch(err => {
        console.log(err)
        this.$message.error('新增日程失败');
      })
    },
    strToDate: function (selectDate) {
      let time = DateUtil.formatDate(selectDate, 'hh:mm:ss')
      let month = (this.selectDay.month + 1) < 10 ? ('0' + (this.selectDay.month + 1)) : (this.selectDay.month + 1)
      const date = this.selectDay.year + '-'
        + month
        + '-' + this.selectDay.day + ' ' + time
      return new Date(date)
    },
    dayStr: function() {
      let month = (this.selectDay.month + 1) < 10 ? ('0' + (this.selectDay.month + 1)) : (this.selectDay.month + 1)
      return this.selectDay.year + '-' + month + '-' + this.selectDay.day
    },
    getTasks: function () {
      this.$axios.get('/pcc/task/day/user', {params:{pccUserId: this.$store.getters.userInfo.id, day: this.dayStr()}})
        .then(res => {
          const data = res.data
          this.tasks = data.data
        })
        .catch(err => {
          console.log(err)
          this.$message.error('查询日程列表失败');
        })
    },
    deleteTask: function (index, row) {
      this.$axios.get('/pcc/task/delete/imitate', {params:{id: row.id}})
        .then(res => {
          const data = res.data
          this.$message('删除日程成功');
          this.getTasks()
        })
        .catch(err => {
          console.log(err)
          this.$message.error('删除日程失败');
        })
    }
  }
}
</script>

<style scoped>

  .form-block {
    margin-top: 20px;
  }
  .table-block {
  }
</style>
