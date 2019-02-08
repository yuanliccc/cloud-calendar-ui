<template>
  <el-table
        :data="scheduleList"
        style="width: 100%">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column
          prop="content"
          label="任务内容" width="200">
        </el-table-column>
        <el-table-column
          prop="createUserName"
          label="创建人"
          width="100px" sortable>
        </el-table-column>
        <el-table-column
          prop="receiverName"
          label="接收人"
          width="100px" sortable>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="250" sortable>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.creatTime | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="截止时间"
          width="250" sortable>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.deadline | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Tags"  class="text-center">
          <template slot-scope="scope">
            <el-tag type="success">及时完成</el-tag>
            <el-tag type="info">超时完成</el-tag>
            <el-tag type="danger">未完成</el-tag>
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
</template>

<script>
    export default {
        name: "schedule-table"
    }
</script>

<style scoped>

</style>
