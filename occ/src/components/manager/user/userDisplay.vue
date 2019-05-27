<template>
    <div class="publicFrom">
        <div class="publicTitle">查看角色</div>
        <div class="public_Display">
            <el-form label-position="left" ref="user"class="add_Edit" :model="user":inline="true"
                     label-width="120px">
                <el-form-item label="昵称">
                    <el-input v-model="user.name" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="user.account" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="user.phone" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="user.email" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="user.sex" disabled="disabled"></el-input>
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
        name: 'userDisplay',
        data(){
            return {
                user: {},
            }
        },
        mounted: function(){
            this.getInfoById(this.$route.params.userId);
        },
        methods:{
            reBack: function(){
                this.$router.go(-1);
            },
            getInfoById: function(userId){

                this.$store.commit("showLoading");
                this.$axios.get('/occ/user/detail',{
                    params:{id: userId}
                }).then(res =>{
                        const data = res.data;
                        this.user = data.data;
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
