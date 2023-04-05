<template>
    <el-container>
        <el-header>
        </el-header>
        <el-aside width="200px"> 
            <el-menu :default-active="menuActivateIndex" mode="vertical" @select="handleMenuSelect" router>
            <el-menu-item index="1" route="/MainGround">用户管理</el-menu-item>
            <el-menu-item index="2" route="/Tiezi"><span @click="changeToTiezi">帖子管理</span></el-menu-item>
            <el-menu-item index="3" route="/Dangan"><span @click="changeToDangan">档案管理</span></el-menu-item>
            <el-menu-item index="3" route="/Qiuzhu"><span @click="changeToQiuzhu">求组管理</span></el-menu-item>
            </el-menu>
        </el-aside>
    </el-container>
</template>
<script>

export default ({
    name: "MainGround",
    data(){
        return {
            Token:"",
            ManagerUserData:{},
            menuActivateIndex:1,
            UserData:[],
        }
    },
    created() {
        this.Token=this.$route.query;
        this.getinfo;
    },
    methods:{
        getinfo(){
        this.$axios.post("token-get-info-url",
            JSON.stringify(this.Token)).then((response) => {
                this.ManagerUserData=response.data.user;
        });
        },
        getdata(){  //
            this.$axios.post("get-user-info-url").then(response =>{
                this.UserData=response; //
            });
        },
        changeToTiezi(){
            this.$router.push({path:'/Tiezi',query:this.Token})
        },
        changeToDangan(){
            this.$router.push({path:'/Dangan',query:this.Token})
        },
        changeToQiuzhu(){
            this.$router.push({path:'/Qiuzhu',query:this.Token})
        },
    } 
})
</script>

<style scoped>

</style>