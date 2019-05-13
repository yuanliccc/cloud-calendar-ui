<template>
  <div class="publicList">
    <div class="publicTitle">事件管理</div>
    <div class="publicListTable">
      <div class="publicList_Head">
        <div class="publicList_Head_Bt">
          <el-button @click="jumpTo('/manager/eventForm/add')" style="background-color: lightblue" v-if="hasPermission('event_add')">新增</el-button>
            <el-button @click="displayInfo" style="background-color: #ccc">刷新</el-button>
          <el-button @click="deleteAll" style="background-color: #ff000096" v-if="hasPermission('event_delete')">批量删除</el-button>
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
        <el-table-column prop="title" :label="titles[0].name" sortable></el-table-column>
        <el-table-column prop="content" :label="titles[1].name" sortable></el-table-column>
        <el-table-column prop="starttime" :label="titles[2].name" sortable>
          <template slot-scope="scope">
            {{scope.row.starttime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="endtime" :label="titles[3].name" sortable>
          <template slot-scope="scope">
            {{scope.row.endtime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="type" :label="titles[4].name" sortable></el-table-column>
        <el-table-column prop="level" :label="titles[5].name" sortable></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="dis(scope.row.id)" type="text" size="mid" v-if="hasPermission('event_display')">查看</el-button>
            <el-button type="text" size="mid" @click="edit(scope.row.id)" v-if="hasPermission('event_edit')">编辑</el-button>
            <el-button @click="del(scope.row.id)" type="text" size="mid" v-if="hasPermission('event_delete')">删除</el-button>
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
          :pager-count="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="datas.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '../../../assets/lib/common'
  export default{
    name: 'eventList',
    data(){
      return {
        findList:[
          {
            name: '标题',
            tip: 'title'
          },
          {
            name: '内容',
            tip: 'content'
          },
          {
            name: '开始时间',
            tip: 'starttime'
          },
          {
            name: '结束时间',
            tip: 'endtime'
          },
          {
            name: '类型',
            tip: 'type'
          },
          {
            name: '优先级',
            tip: 'level'
          },
          {
            name: '事件id',
            tip: 'id'
          },
        ],
        findKey: '',
        findVal: '',
        titles:[
          {
            name: '标题',
            tip: 'title'
          },
          {
            name: '内容',
            tip: 'content'
          },
          {
            name: '开始时间',
            tip: 'starttime'
          },
          {
            name: '结束时间',
            tip: 'endtime'
          },
          {
            name: '类型',
            tip: 'type'
          },
          {
            name: '优先级',
            tip: 'level'
          },
        ],
        datas:{
        pageNum: 1,
      },
        displays:[10, 20, 50],
        display: 10,
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
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
        this.$axios.get('/occ/event/listByKey',{
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
      del: function(eventId){
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('showLoading');

          this.$axios.get('/occ/event/delete',{
            params:{id: eventId}
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
          this.$axios.post('/occ/event/deleteBatch',arr).then(res =>{
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
        this.$router.push('/manager/eventForm/edit/' + id);
      },
      dis: function(id){
        this.$router.push('/manager/eventDisplay/' + id);
      },
      hasPermission(permission){
        return this.rolePers.indexOf(permission) > -1;
      }
    }
}
</script>

<style scoped>

</style>
