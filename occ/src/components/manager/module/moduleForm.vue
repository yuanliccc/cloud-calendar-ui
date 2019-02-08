<template>
  <div class="publicFrom">
    <div class="publicTitle" v-if="!add">模块编辑</div>
    <div class="publicTitle" v-if="add">新增模块</div>
    <div class="publicForm_Form">
      <div class="col-md-6">
        <div class="lab"><span class="required">*</span>模块名称</div>
        <input type="text" v-model="module.name"/>
      </div>
      <div class="col-md-6">
        <div class="lab"><span class="required">*</span>key</div>
        <input type="text" v-model="module.key"/>
      </div>
      <div class="col-md-6">
        <div class="lab"><span class="required">*</span>是否系统模块</div>
        <select v-model="module.isSystem">
          <option>否</option>
          <option>是</option>
        </select>
      </div>
      <div class="col-md-6" v-if="module.isSystem == '否'">
        <div class="lab">父模块</div>
        <select v-model="module.parent">
          <option v-for="i in parentModule" v-bind:value="i.id">{{i.name}}</option>
        </select>
      </div>
      <div class="col-md-6">
        <div class="lab">模块路径</div>
        <input type="text" v-model="module.isSystem"/>
      </div>
      <div class="col-md-12 form_Bt">
        <button @click="save" class="sure">保存</button>
        <button @click="reBack" class="cancel">取消</button>
        <con ref="myConfirm"></con>
      </div>
    </div>
  </div>
</template>
<script>
  import con from '../../../confirm/index.vue'
  export default{
    name: 'moduleForm',
    components: {
      con,
    },
    data(){
      return {
        add: true,
        module: {
          name: '',
          isSystem: '是',
          parent: '',
          key: ''
        },
        parentModule: [
          {
            name: '系统管理',
            id: '1'
          },
          {
            name: '用户管理',
            id: '2'
          }
        ]
      }
    },
    mounted: function(){
      this.add = (this.$route.name == 'moduleForm_Add' ? true : false);
    },
    methods:{
      save: function(){
          if(this.module.name == '' || this.module.key == '')
            this.$refs.myConfirm.show('必填项未填写，请填写完毕后点击保存！', null);
          else
            console.log(this.module);
      },
      reBack: function(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>

</style>
