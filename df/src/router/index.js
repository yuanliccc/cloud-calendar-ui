import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/base/index.vue'
import df from '../components/df.vue'
import signup from '../components/base/Signup.vue'
import login from '../components/base/Login.vue'
import main from '../components/bms/Main.vue'
import personal from '../components/bms/Personal.vue'
import dfList from '../components/bms/DynamicFormList.vue'
import dfWorkSpace from '../components/form-editor/Container.vue'
import shareList from '../components/bms/ShareDynamicFormList.vue'
import dfDisplay from '../components/bms/DynamicFormDisplay.vue'
import collectForm from '../components/bms/CollectForm.vue'
import collectList from '../components/bms/CollectList.vue'
import collectDisplay from '../components/bms/CollectDisplay.vue'
import selfSubmitDynamicForm from '../components/bms/SelfSubmitDynamicFormList.vue'
import collectFormEditApplyList from '../components/bms/CollectFormEditApplyList.vue'
import collectFormEditApplyApprovalList from '../components/bms/CollectFormEditApplyApprovalList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: df,
      children: [
        {
          path: '/',
          name: 'index',
          meta: {index: 0},
          component: index
        },
        {
          path: '/login',
          name: 'login',
          meta: {index: 1},
          component: login
        },
        {
          path: '/signup',
          name: 'signup',
          meta: {index: 2},
          component: signup
        },
        {
          path: '/main',
          component: main,
          meta: {index: 3},
          children: [
            {
              path: '/main/dfList',
              name: 'dfList',
              meta: {index: 4},
              component: dfList
            },
            {
              path: '/main/shareList',
              name: 'shareList',
              meta: {index: 5},
              component: shareList
            },
            {
              path: '/main/selfSubmitDynamicForm',
              name: 'selfSubmitDynamicForm',
              meta: {index: 6},
              component: selfSubmitDynamicForm
            },
            {
              path: '/main/collectFormEditApplyList',
              name: 'collectFormEditApplyList',
              meta: {index: 7},
              component: collectFormEditApplyList
            },
            {
              path: '/main/collectFormEditApplyApprovalList',
              name: 'collectFormEditApplyApprovalList',
              meta: {index: 8},
              component: collectFormEditApplyApprovalList
            },
            {
              path: '/main/personal',
              name: 'personal',
              meta: {index: 9},
              component: personal
            }
          ]
        },
        {
          path: '/dfWorkSpace',
          name: 'dfWorkSpace',
          meta: {index: 7},
          component: dfWorkSpace
        },
        {
          path: '/dynamicFormDisplay',
          name: 'dynamicFormDisplay',
          meta: {index: 8},
          component: dfDisplay
        },
        {
          path: '/collectForm/:formId/',
          name: 'collectForm',
          meta: {index: 9},
          component: collectForm
        },
        {
          path: '/collectList',
          name: 'collectList',
          meta: {index: 10},
          component: collectList
        },
        {
          path: '/collectDisplay',
          name: 'collectDisplay',
          meta: {index: 11},
          component: collectDisplay
        }
      ]
    }
  ]
})
