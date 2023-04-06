<template>
    <el-container>
        <el-header>
        </el-header>
        <el-aside width="200px"> 
            <el-menu :default-active="menuActivateIndex" mode="vertical"  router>
            <el-menu-item index="1" route="/MainGround"><span @click="changeToYonghu">用户管理</span></el-menu-item>
            <el-menu-item index="2" route="/Tiezi"><span @click="changeToTiezi">帖子管理</span></el-menu-item>
            <el-menu-item index="3" route="/Dangan">档案管理</el-menu-item>
            <el-menu-item index="4" route="/Qiuzhu"><span @click="changeToQiuzhu">求组管理</span></el-menu-item>
            </el-menu>
        </el-aside>
    </el-container>
</template>
<script>

export default ({
    name: "Dangan",
    data(){
        return {
            ManagerUserData:{},
            menuActivateIndex:"3",
        }
    },
    created() {
        this.Token=this.$query;
        this.getinfo();
    },
    methods:{
       
        changeToTiezi(){
            this.$router.push({path:'/Tiezi',query:this.Token})
        },
        changeToYonghu(){
            this.$router.push({path:'/MainGround',query:this.Token})
        },
        changeToQiuzhu(){
            this.$router.push({path:'/Qiuzhu',query:this.Token})
        },
    } 
})
</script>

<style scoped>

</style>