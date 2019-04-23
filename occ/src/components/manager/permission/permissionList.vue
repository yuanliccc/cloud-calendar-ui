<template>
  <div class="publicList">
    <div class="publicTitle">权限点管理</div>
    <div class="publicListTable">
      <div class="publicList_Head">
        <div class="publicList_Head_Bt">
          <el-button @click="jumpTo('/manager/permissionForm/add')" style="background-color: lightblue" v-if="hasPermission('permission_add')">新增</el-button>
            <el-button @click="displayInfo" style="background-color: #ccc">刷新</el-button>
          <el-button @click="deleteAll" style="background-color: #ff000096" v-if="hasPermission('permission_delete')">批量删除</el-button>
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
        <el-table-column prop="identify" :label="titles[1].name" sortable></el-table-column>
        <el-table-column prop="perexplain" :label="titles[2].name" sortable></el-table-column>
        <el-table-column prop="moduleid" :label="titles[3].name" sortable>
          <template slot-scope="scope">
            <el-select v-model="scope.row.moduleid" disabled="disabled">
              <el-option v-for="i in modules" :value="i.id" :key="i.id" :label="i.name"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="dis(scope.row.id)" type="text" size="mid" v-if="hasPermission('permission_display')">查看</el-button>
            <el-button type="text" size="mid" @click="edit(scope.row.id)" v-if="hasPermission('permission_edit')">编辑</el-button>
            <el-button @click="del(scope.row.id)" type="text" size="mid" v-if="hasPermission('permission_delete')">删除</el-button>
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
          :pager-count="5"
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
    name: 'permissionList',
    data(){
      return {
        findList:[
          {
            name: '名称',
            tip: 'name'
          },
          {
            name: '唯一标识',
            tip: 'identify'
          },
          {
            name: '描述',
            tip: 'perexplain'
          },
          {
            name: '对应模块',
            tip: 'moduleid'
          },
          {
            name: '权限点id',
            tip: 'id'
          },
        ],
        findKey: '',
        findVal: '',
        titles:[
          {
            name: '名称',
            tip: 'name'
          },
          {
            name: '唯一标识',
            tip: 'identify'
          },
          {
            name: '描述',
            tip: 'perexplain'
          },
          {
            name: '对应模块',
            tip: 'moduleid'
          },
        ],
        datas:{
          pageNum: 1,
        },
        modules:[],
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
      this.getAllModule();
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
        this.$axios.get('/occ/permission/listByKey',{
            params:{page: this.datas.pageNum, size: this.display, key: this.findKey, value: this.findVal}
        }).then(res =>{
          const data = res.data;
          //console.log(data.data)
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
      del: function(permissionId){
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('showLoading');

          this.$axios.get('/occ/permission/delete',{
            params:{id: permissionId}
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
          this.$axios.post('/occ/permission/deleteBatch',arr).then(res =>{
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
        this.$router.push('/manager/permissionForm/edit/' + id);
      },
      dis: function(id){
        this.$router.push('/manager/permissionDisplay/' + id);
      },
      hasPermission(permission){
        return this.rolePers.indexOf(permission) > -1;
      },
      getAllModule: function(){
        this.$store.commit('showLoading');
        this.$axios.get('/occ/module/getAllModule').then(res =>{
          this.$store.commit('hideLoading');
          const data = res.data;
          this.modules = data.data;
        }).catch(err =>{
          this.$store.commit('showLoading');
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          });
        });
      }
    }
}
</script>

<style scoped>

</style>
