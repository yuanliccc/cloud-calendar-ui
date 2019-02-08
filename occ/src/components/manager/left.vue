<template>
  <div class="left">
    <div v-for="(i, index) in info">
      <div class="left_Sidebar" @click="display(index)">
        <i class="glyphicon glyphicon-th-large iLogo"></i>{{i.name}}
      </div>
      <div v-for="t in i.children" v-if="i.showChild">
        <div class="left_Sidebar_son">
          <i class="glyphicon glyphicon-th-list iLogo"></i>{{t.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name:'left',
  data(){
    return {
      info:[
        {
          id: '0',
          name: '用户管理',
          url: '',
          children: [
            {
              id: '01',
              name: '用户管理',
              url: '',
              children: []
            },
            {
              id: '02',
              name: '角色管理',
              url: '',
              children: []
            }
          ],
          showChild: false,
        },
        {
          id: '1',
          name: '团队管理',
          url: '',
          children: [
            {
              id: '11',
              name: '团队管理',
              url: '',
              children: []
            },
            {
              id: '12',
              name: '日程管理',
              url: '',
              children: []
            }
          ],
          showChild: false,
        },
        {
          id: '0',
          name: '用户管理',
          url: '',
          children: [
            {
              id: '01',
              name: '用户管理',
              url: '',
              children: []
            },
            {
              id: '02',
              name: '角色管理',
              url: '',
              children: []
            }
          ],
          showChild: false,
        },
        {
          id: '1',
          name: '团队管理',
          url: '',
          children: [
            {
              id: '11',
              name: '团队管理',
              url: '',
              children: []
            },
            {
              id: '12',
              name: '日程管理',
              url: '',
              children: []
            }
          ],
          showChild: false,
        },
        {
          id: '0',
          name: '用户管理',
          url: '',
          children: [
            {
              id: '01',
              name: '用户管理',
              url: '',
              children: []
            },
            {
              id: '02',
              name: '角色管理',
              url: '',
              children: []
            }
          ],
          showChild: false,
        },
        {
          id: '1',
          name: '团队管理',
          url: '',
          children: [
            {
              id: '11',
              name: '团队管理',
              url: '',
              children: []
            },
            {
              id: '12',
              name: '日程管理',
              url: '',
              children: []
            }
          ],
          showChild: false,
        },
        {
          id: '0',
          name: '用户管理',
          url: '',
          children: [
            {
              id: '01',
              name: '用户管理',
              url: '',
              children: []
            },
            {
              id: '02',
              name: '角色管理',
              url: '',
              children: []
            }
          ],
          showChild: false,
        },
        {
          id: '1',
          name: '团队管理',
          url: '',
          children: [
            {
              id: '11',
              name: '团队管理',
              url: '',
              children: []
            },
            {
              id: '12',
              name: '日程管理',
              url: '',
              children: []
            }
          ],
          showChild: false,
        }
      ]
    }
  },
  methods:{
      display: function(index){
          this.info[index].showChild = !this.info[index].showChild;
      }
  }
}
</script>

<style scoped>
  .left{
    position:absolute;
    top:0;
    bottom: 0;
    left: 0;
    width: 260px;
    padding-top: 60px;
    border-right: 1px solid #ccc;
  }
  .left_Sidebar{
    border-top: 1px solid #ccc;
  }

  .left_Sidebar, .left_Sidebar_son{
    cursor: pointer;
    height:52px;
    padding: 1px 0;
    line-height: 50px;
    padding-left: 40px;
  }
  .left_Sidebar_son{
    padding-left: 60px;
    color: rgba(0,0,0,0.45);
    border-top: 1px solid #ccc;
  }
  .left_Sidebar_son:hover{
    color: red;
  }
  .iLogo{
    padding-right: 5px;
  }

</style>
