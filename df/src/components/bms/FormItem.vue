<template>
  <el-form-item v-if="element != null" :label="element.label">
    <div v-if="element.type === 'input'">
      <el-input type="text" v-model="element.options.defaultValue"></el-input>
    </div>
    <div v-if="element.type === 'textarea'">
      <el-input type="textarea" :rows="4" v-model="element.options.defaultValue"></el-input>
    </div>
    <div v-if="element.type === 'checkbox'">
      <el-checkbox-group v-model="element.options.defaultValue">
        <el-checkbox v-for="(item, index) in element.options.options" :key="index" :label="item.value"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div v-if="element.type === 'radio'">
      <el-radio-group v-model="element.options.defaultValue">
        <el-radio v-for="(item, index) in element.options.options" :key="index" :label="item.value"></el-radio>
      </el-radio-group>
    </div>
    <div v-if="element.type === 'select'">
      <el-select v-model="element.options.defaultValue">
        <el-option v-for="item in element.options.options" :key="item.value" :value="item.value" :label="item.value"></el-option>
      </el-select>
    </div>
    <div v-if="element.type === 'date'">
      <el-date-picker v-model="element.options.defaultValue" type="date">
      </el-date-picker>
    </div>
  </el-form-item>
</template>

<script>
export default {
  name: 'formItem',
  props: ['element']
}
</script>

<style scoped>
