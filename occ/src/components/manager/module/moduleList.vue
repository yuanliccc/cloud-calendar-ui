<template>
  <div class="publicList">
    <div class="publicTitle">模块管理</div>
    <div class="publicList_Head">
      <div class="publicList_Head_NewBt">
        <button @click="jumpTo('/manager/moduleForm/add')">新增</button>
      </div>

      <div class="publicList_Head_Find">
        <select>
          <option v-for="i in findList">{{i.name}}</option>
        </select>
        <input type="text" :bind="findVal"/>
        <button>查询</button>
      </div>
    </div>
    <div class="publicListTable">
      <table>
        <tr v-for="i in tables">
          <th v-for="c in i.children" :text="c.name">{{c.name}}</th>
          <th class="tableBt">
            <span>查看</span>
            <span>修改</span>
            <span>删除</span>
            <span>备用</span>
          </th>
        </tr>
      </table>
      <div class="publicListTable_Page">
        <button v-bind:class="[page.nowPage == 1 ? 'btGray' : 'btBlack']">首页</button>
        <button v-bind:class="[page.nowPage == 1 ? 'btGray' : 'btBlack']">上一页</button>
        <select v-model="page.nowPage">
          <option v-for="i in page.allPages">{{i}}</option>
        </select>
        <button v-bind:class="[page.nowPage == page.allPage ? 'btGray' : 'btBlack']">下一页</button>
        <button v-bind:class="[page.nowPage == page.allPage ? 'btGray' : 'btBlack']">尾页</button>
        <span>每页显示条数</span>
        <select>
          <option v-for="i in display">{{i}}</option>
        </select>
      </div>
    </div>

  </div>
</template>
<script>
  export default{
    name: 'moduleList',
    data(){
        return {
          findList:[
            {
              name: '模块名称',
              tip: 'name'
            },{
              name: '模块ID',
              tip: 'id'
            }
          ],
          findKdy: '',
          findVal: '',
          tables:[
            {
              name: '测试1',
              children:[
                {
                  name:'测试11qwerqerqerqewwwwwwwwwwwwwwwwwwwwrrrrrrrrrrrrrrrrrrrrwwwwwwwwwwwwwwwwwwaaaaaaaaaw',
                  id: '11'
                },
                {
                  name:'测试12',
                  id: '12'
                },
                {
                  name:'测试13',
                  id: '13'
                },
                {
                  name:'测试14',
                  id: '14'
                }
              ]
            },
            {
              name: '测试2',
              children:[
                {
                  name:'测试11',
                  id: '11'
                },
                {
                  name:'测试12',
                  id: '12'
                },
                {
                  name:'测试13',
                  id: '13'
                },
                {
                  name:'测试14',
                  id: '14'
                }
              ]
            },
            {
              name: '测试1',
              children:[
                {
                  name:'测试11qwerqerqerqewwwwwwwwwwwwwwwwwwwwrrrrrrrrrrrrrrrrrrrrwwwwwwwwwwwwwwwwwwaaaaaaaaaw',
                  id: '11'
                },
                {
                  name:'测试12',
                  id: '12'
                },
                {
                  name:'测试13',
                  id: '13'
                },
                {
                  name:'测试14',
                  id: '14'
                }
              ]
            },
            {
              name: '测试2',
              children:[
                {
                  name:'测试11',
                  id: '11'
                },
                {
                  name:'测试12',
                  id: '12'
                },
                {
                  name:'测试13',
                  id: '13'
                },
                {
                  name:'测试14',
                  id: '14'
                }
              ]
            },
            {
              name: '测试1',
              children:[
                {
                  name:'测试11qwerqerqerqewwwwwwwwwwwwwwwwwwwwrrrrrrrrrrrrrrrrrrrrwwwwwwwwwwwwwwwwwwaaaaaaaaaw',
                  id: '11'
                },
                {
                  name:'测试12',
                  id: '12'
                },
                {
                  name:'测试13',
                  id: '13'
                },
                {
                  name:'测试14',
                  id: '14'
                }
              ]
            },
            {
              name: '测试2',
              children:[
                {
                  name:'测试11',
                  id: '11'
                },
                {
                  name:'测试12',
                  id: '12'
                },
                {
                  name:'测试13',
                  id: '13'
                },
                {
                  name:'测试14',
                  id: '14'
                }
              ]
            },
            {
              name: '测试1',
              children:[
                {
                  name:'测试11qwerqerqerqewwwwwwwwwwwwwwwwwwwwrrrrrrrrrrrrrrrrrrrrwwwwwwwwwwwwwwwwwwaaaaaaaaaw',
                  id: '11'
                },
                {
                  name:'测试12',
                  id: '12'
                },
                {
                  name:'测试13',
                  id: '13'
                },
                {
                  name:'测试14',
                  id: '14'
                }
              ]
            },
            {
              name: '测试2',
              children:[
                {
                  name:'测试11',
                  id: '11'
                },
                {
                  name:'测试12',
                  id: '12'
                },
                {
                  name:'测试13',
                  id: '13'
                },
                {
                  name:'测试14',
                  id: '14'
                }
              ]
            },
            {
              name: '测试1',
              children:[
                {
                  name:'测试11qwerqerqerqewwwwwwwwwwwwwwwwwwwwrrrrrrrrrrrrrrrrrrrrwwwwwwwwwwwwwwwwwwaaaaaaaaaw',
                  id: '11'
                },
                {
                  name:'测试12',
                  id: '12'
                },
                {
                  name:'测试13',
                  id: '13'
                },
                {
                  name:'测试14',
                  id: '14'
                }
              ]
            },
            {
              name: '测试2',
              children:[
                {
                  name:'测试11',
                  id: '11'
                },
                {
                  name:'测试12',
                  id: '12'
                },
                {
                  name:'测试13',
                  id: '13'
                },
                {
                  name:'测试14',
                  id: '14'
                }
              ]
            },
          ],
          page:{
            allPage: 2,
            nowPage: 2,
            display: 10,
            allPages:[1,2]
          },
          display:[10, 20, 50]
        }
    },
    mounted : function(){

    },
    methods: {
      jumpTo: function (url) {
        this.$router.push({path: url});
      },
      prePage:function(){},
      nextPage: function(){},
      firstPage: function(){},
      endPage: function(){},
    }
  }
</script>

<style scoped>

</style>
