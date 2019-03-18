import dynamicFormComponent from './components/form-editor/Container.vue'

const components = [
  dynamicFormComponent
]

const dynamicForm = {
  // install是默认的方法,当外界在use这个组件时,就会调用其本身的install方法,同时传一个Vue这个类的参数
  install: function (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}

export default dynamicForm
