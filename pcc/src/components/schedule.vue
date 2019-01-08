<template>
  <div>
    <div class="title-block flex-row flex-start">
      <el-menu :default-active="activeItem" class="full-width" mode="horizontal" @select="exchange">
        <el-menu-item index="list">任务列表</el-menu-item>
        <el-menu-item index="add">新增任务</el-menu-item>
      </el-menu>
    </div>
    <div>
      <div class="list" v-if="activeItem === 'list'">

      </div>
      <div class="add" v-if="activeItem === 'add'">
        <div>
          <el-form ref="form" :model="schedule" label-width="80px">
            <el-form-item label="任务内容">
              <el-input type="textarea" v-model="schedule.content"></el-input>
            </el-form-item>
            <el-form-item label="接收人">
              <el-select v-model="schedule.region" placeholder="请选择活动区域" style="display:flex;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="schedule.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="schedule.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="即时配送">
              <el-switch v-model="schedule.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质">
              <el-checkbox-group v-model="schedule.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
              <el-radio-group v-model="schedule.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="schedule.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "schedule",
    data: function () {
      return {
        activeItem:'add',
        schedule: {

        }
      }
    },
    methods: {
      exchange: function (item) {
        this.activeItem = item
      }
    }
  }
</script>

<style scoped>

  .add {
    margin: 10px;
  }

  .active-title-item {
    background: var(--commonColor);
    color: white;
  }

  .title-item {
    width: 80px;
    height: 100%;
    cursor: pointer;
  }

  .title-item:hover {
    background: var(--commonColor);
    color: white;
  }

  .title-block {
    width: 100%;
  }
</style>
