<template>
    <div class="publicFrom">
        <div class="publicTitle">查看角色</div>
        <div class="public_Display">
            <el-form label-position="left" ref="role"class="add_Edit" :model="role":inline="true"
                     label-width="120px">
                <el-form-item label="角色名称">
                    <el-input v-model="role.name" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="角色key">
                    <el-input v-model="role.rolekey" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="组织机构Id">
                    <el-input v-model="role.orgid" disabled="disabled"></el-input>
                </el-form-item>
                <div class="form_Bt">
                    <el-form-item>
                        <el-button type="primary" @click="reBack">确定</el-button>
                        <el-button @click="reBack">取消</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'roleDisplay',
        data(){
            return {
                role: {},
            }
        },
        mounted: function(){
        },
        methods:{
            reBack: function(){
                this.$router.go(-1);
            },
            getInfoById: function(roleId){
                return ; //便于修改

                this.$store.commit("showLoading");
                this.$axios.get('/occ/role/detail',{
                    params:{id: roleId}
                }).then(res =>{
                        const data = res.data;
                        this.role = data.data;
                        this.$store.commit("hideLoading");

                }).catch(err => {
                    this.$store.commit("hideLoading");
                    this.$message({
                        showClose: true,
                        message: err,
                        type: 'error'
                    });
                 })
            },
        }
    }
</script>

<style scoped>

</style>
