<template>
    <el-container >
        <el-header class="el-header">
        </el-header>
        <el-container direction="horizontal">
            <el-aside width="200px" class="el-aside"> 
            <el-menu :default-active="menuActivateIndex" mode="vertical"  router>
            <el-menu-item index="1" route="/MainGround">用户管理</el-menu-item>
            <el-menu-item index="2" route="/Tiezi"><span @click="changeToTiezi">帖子管理</span></el-menu-item>
            <el-menu-item index="3" route="/Dangan"><span @click="changeToDangan">档案管理</span></el-menu-item>
            <el-menu-item index="4" route="/Qiuzhu"><span @click="changeToQiuzhu">求助管理</span></el-menu-item>
            </el-menu>
        </el-aside>
        <el-main class="el-main">
            <div>
              <!-- <el-input v-model="input" @clear="getdata" clearable placeholder="请输入内容" ></el-input>
              <el-button @click="SearchUser" style="height: 40px;margin-left:15px" type="primary" round>搜索</el-button> -->
              <div
                v-for="(item, index) in UserData"
                :key="index"
                class="mian1"
              >
                <el-card class ="el-card">
                    <div >
                        // show some
                    <span @click="EditUser(item)">编辑</span>
                    <span @click="DeleteUser(item)">删除</span>
                    </div>
                </el-card>
              </div>
              
            </div>
        </el-main>
        </el-container>
    </el-container>
</template>
<script>

export default ({
    name: "MainGround",
    data(){
        return {
            Token:"",
            ManagerUserData:{name:"123"},
            menuActivateIndex:"1",
            UserData:[],
            input:"",

        }
    },
    created() {
        this.Token=this.$query;
        this.getinfo();
    },
    methods:{
        EditUser(item){
            this.$router.push({path:'/UserEdit',query:{Item:item,ManagerToken:this.Token}});
        },
        DeleteUser(item){
            this.$axios.post('delete_item_url',item).then(res=>
            {
                if(res.successcode){
                    //
                }
                this.getdata();
            }
            );
        },
        SearchUser(){

        },
        getdata(){  //得到用户信息
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
.el-header{
    height: 100px;
    width :100%;
    background-color: black;
}
.el-aside{
    background-color: aqua;
}
.el-main {
    float:left;
    background-color: bisque;
}
</style>