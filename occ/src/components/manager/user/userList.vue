<template>
  <div class="publicList">
    <div class="publicTitle">用户管理</div>
    <div class="publicListTable">
      <div class="publicList_Head">
        <div class="publicList_Head_Bt">
          <el-button @click="jumpTo('/manager/userForm/add')" style="background-color: lightblue" v-if="hasPermission('user_add')">邀请</el-button>
            <el-button @click="displayInfo" style="background-color: #ccc">刷新</el-button>
          <!--<el-button @click="deleteAll" style="background-color: #ff000096" v-if="" v-if="hasPermission('user_delete')">批量删除</el-button>-->
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
        <el-table-column prop="account" :label="titles[1].name" sortable></el-table-column>
        <el-table-column prop="phone" :label="titles[2].name" sortable></el-table-column>
        <el-table-column prop="email" :label="titles[3].name" sortable></el-table-column>
        <el-table-column prop="sex" :label="titles[4].name" sortable></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="dis(scope.row.id)" type="text" size="mid" v-if="hasPermission('user_display')">查看</el-button>
            <el-button type="text" size="mid" @click="edit(scope.row.id)" v-if="hasPermission('user_edit')">分配角色</el-button>
            <!--<el-button @click="del(scope.row.id)" type="text" size="mid" v-if="hasPermission('user_delete')">删除</el-button>-->
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
  export default{
    name: 'userList',
    data(){
      return {
        findList:[
          {
            name: '昵称',
            tip: 'name'
          },
          {
            name: '账号',
            tip: 'account'
          },
          {
            name: '手机号码',
            tip: 'phone'
          },
          {
            name: '邮箱',
            tip: 'email'
          },
          {
            name: '性别',
            tip: 'sex'
          },
          {
            name: '角色id',
            tip: 'id'
          },
        ],
        findKey: '',
        findVal: '',
        titles:[
          {
            name: '昵称',
            tip: 'name'
          },
          {
            name: '账号',
            tip: 'account'
          },
          {
            name: '手机号码',
            tip: 'phone'
          },
          {
            name: '邮箱',
            tip: 'email'
          },
          {
            name: '性别',
            tip: 'sex'
          },
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
        this.$axios.get('/occ/user/listByKey',{
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
      edit: function(id){
        this.$router.push('/manager/userForm/edit/' + id);
      },
      dis: function(id){
        this.$router.push('/manager/userDisplay/' + id);
      },
      hasPermission(permission){
        return this.rolePers.indexOf(permission) > -1;
      }
    }
}
</script>

<style scoped>

</style>
