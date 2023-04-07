<template>
    <el-container>
        <el-header>
        </el-header>
        <el-aside width="200px"> 
            <el-menu :default-active="menuActivateIndex" mode="vertical"  router>
            <el-menu-item index="1" route="/MainGround"><span @click="changeToYonghu">用户管理</span></el-menu-item>
            <el-menu-item index="2" route="/Tiezi">帖子管理</el-menu-item>
            <el-menu-item index="3" route="/Dangan"><span @click="changeToDangan">档案管理</span></el-menu-item>
            <el-menu-item index="4" route="/Qiuzhu"><span @click="changeToQiuzhu">求助管理</span></el-menu-item>
            </el-menu>
        </el-aside>
    </el-container>
</template>
<script>

export default ({
    name: "Tiezi",
    data(){
        return {
            ManagerUserData:{},
            menuActivateIndex:"2",
        }
    },
    created() {
        this.Token=this.$query;
        this.getinfo();
    },
    methods:{
       
        changeToYonghu(){
            this.$router.push({path:'/MainGround',query:this.Token})
        },
        changeToDangan(){
            this.$router.push({path:'/Dangan',query:this.Token})
        },
        changeToQiuzhu(){
            this.$router.push({path:'/Qiuzhu',query:this.Token})
        },
        getinfo(){
        this.$axios.post("token-get-info-url",
            JSON.stringify(this.Token)).then((response) => {
                this.ManagerUserData=response.data.user;
        });
        },
    } 
})
</script>

<style scoped>

</style>