<template>
  <div class="publicList">
    <div class="publicTitle">模块管理</div>
    <!--<div class="publicListTable">
      <table>
        <tr>
          <th v-for="i in titles">{{i.name}}</th>
          <th class="tableBt">操作</th>
        </tr>
        <tr v-for="e in datas.list">
          &lt;!&ndash;<th v-for="(item, index) in e">{{item[titles[index].name]}}</th>&ndash;&gt;
          <th v-for="item in titles">{{e[item.key]}}</th>
          <th class="tableBt">
            <span >查看</span>
          <span>修改</span>
            <span @click="del">删除</span>
            &lt;!&ndash;<span>备用</span>&ndash;&gt;
          </th>
        </tr>
      </table>
      <div class="publicListTable_Page">
        <button v-bind:class="[datas.isFirstPage ? 'btGray' : 'btBlack']" @click="firstPage"><<</button>
        <button v-bind:class="[datas.isFirstPage ? 'btGray' : 'btBlack']" @click="prePage"><</button>
        <select v-model="datas.pageNum" @change="displayInfo">
          <option v-for="i in datas.navigatepageNums">{{i}}</option>
        </select>
        <button v-bind:class="[datas.isLastPage ? 'btGray' : 'btBlack']" @click="nextPage">></button>
        <button v-bind:class="[datas.isLastPage ? 'btGray' : 'btBlack']" @click="endPage">>></button>
        <span>每页显示条数</span>
        <select v-model:value="display" @change="displayInfo">
          <option v-for="i in displays">{{i}}</option>
        </select>
        <span>总共<em class="red">{{datas.total}}</em>行</span>
      </div>
    </div>-->
    <div class="publicListTable">
      <div class="publicList_Head">
        <div class="publicList_Head_Bt">
          <el-button @click="jumpTo('/manager/moduleForm/add')" style="background-color: lightblue" v-if="hasPermission('module_add')">新增</el-button>
          <el-button @click="displayInfo" style="background-color: #ccc">刷新</el-button>
          <el-button @click="deleteAll" style="background-color: #ff000096" v-if="hasPermission('module_delete')">批量删除</el-button>
        </div>
        <div class="publicList_Head_Find">
          <el-input v-model="findVal" class="findInput"></el-input>
          <el-select v-model="findKey" placeholder="请选择查找类别" style="float: right">
            <el-option v-for="i in findList" :label="i.name" :key="i.tip" :value="i.tip"></el-option>
          </el-select>
          <!--<button @click="displayInfo">查询</button>-->
        </div>
      </div>
      <el-table :data="datas.list" ref="table">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="name" :label="titles[0].name" sortable></el-table-column>
        <el-table-column prop="modulekey" :label="titles[1].name" sortable></el-table-column>
        <el-table-column prop="url" :label="titles[2].name" sortable></el-table-column>
        <el-table-column prop="issystem" :label="titles[3].name" sortable></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="dis(scope.row.id)" type="text" size="mid" v-if="hasPermission('module_display')">查看</el-button>
            <el-button type="text" size="mid" @click="edit(scope.row.id)" v-if="hasPermission('module_edit')">编辑</el-button>
            <el-button @click="del(scope.row.id)" type="text" size="mid" v-if="hasPermission('module_delete')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="publicListTable_Page">
        <el-pagination
          @size-change="displayChange"
          @current-change="sizeChange"
          @prev-click="prePage"
          @next-click="nextPage"
          :current-page="datas.pageNum"
          :page-sizes="displays"
          :page-size="display"
          layout="total, sizes, prev, pager, next, jumper"
          :total="datas.total">
        </el-pagination>
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
            },
            {
              name: '模块ID',
              tip: 'id'
            },
            {
              name: '模块key',
              tip: 'moduleKey'
            },
            {
              name: '模块路由',
              tip: 'url'
            },
          ],
          findKey: '',
          findVal: '',
          page:{
            allPage: 1,
            nowPage: 1,
            display: 3,
            allPages:[1]
          },
          titles:[
            {
              name: '模块名称',
              key: 'name'
            },
            {
              name: '模块Key',
              key: 'modulekey'
            },
            {
              name: '模块路由',
              key: 'url'
            },
            {
              name: '是否系统模块',
              key: 'issystem'
            }
          ],
          datas:{
            pageNum: 1,
          },
          displays:[10, 20, 50],
          display: 10,
        }
    },
    watch:{
      findVal(value){
        this.displayInfo();
      },
      findKey(value){
        this.displayInfo();
      }
    },
    mounted : function(){
      this.displayInfo();
    },
    computed:{
      rolePers: function () {
        return this.$store.getters.userInfo.permissions;
      },
    },
    created: function(){
      this.findKey = this.findList[0].tip;
    },
    methods: {
      jumpTo: function (url) {
        this.$router.push({path: url});
      },
      prePage:function(){
        if(!this.datas.isFirstPage){
          this.datas.pageNum--;
          this.displayInfo();
        }
      },
      nextPage: function(){
        if(!this.datas.isLastPage){
          this.datas.pageNum++;
          this.displayInfo();
        }
      },
      sizeChange: function(val){
        this.datas.pageNum = val;
        this.displayInfo();
      },
      displayChange: function(val){
        this.display = val;
        this.displayInfo()
      },
      displayInfo: function(){
        this.$store.commit('showLoading');
        this.$axios.get('/occ/module/listByKey',{
            params:{page: this.datas.pageNum, size: this.display, key: this.findKey, value: this.findVal}
        }).then(res =>{
            const data = res.data;
            console.log(data.data)
            this.datas = data.data;
          this.$store.commit('hideLoading');
        }).catch(err =>{
          this.$store.commit('hideLoading');
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        });
      },
      del: function(moduleId){
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('showLoading');

          this.$axios.get('/occ/module/delete',{
            params:{id: moduleId}
          }).then(res =>{
            this.$store.commit('hideLoading');
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.displayInfo();
          }).catch(err =>{
            this.$store.commit('hideLoading');
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteAll: function(){
        if(this.$refs.table.store.states.selection.length == 0){
          this.$message({
            type: 'info',
            message: '请选择删除的内容！'
          });
          return;
        }

        this.$confirm('此操作将永久删除所选数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const sel = this.$refs.table.store.states.selection;
          let arr = new Array();
          sel.forEach(row =>{
              arr.push(row);
          });
          this.$store.commit('showLoading');

          this.$axios.post('/occ/module/deleteBatch',arr).then(res =>{
            this.$store.commit('hideLoading');
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.displayInfo();
          }).catch(err =>{
            this.$store.commit('hideLoading');
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      edit: function(id){
          this.$router.push('/manager/moduleForm/edit/' + id);
      },
      dis: function(id){
        this.$router.push('/manager/moduleDisplay/' + id);
      },
      hasPermission(permission){
          return this.rolePers.indexOf(permission) > -1;
      }
    }
  }
</script>

<style scoped>

</style>
