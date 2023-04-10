<template>
    <el-container>
        <el-header class="el-header">
        </el-header>
        <el-container>
            <el-aside width="200px" class="el-aside">
                <el-menu :default-active="menuActivateIndex" mode="vertical" router>
                    <el-menu-item index="1" route="/MainGround"><span @click="changeToYonghu">用户管理</span></el-menu-item>
                    <el-menu-item index="2" route="/Tiezi">帖子管理</el-menu-item>
                    <el-menu-item index="3" route="/Dangan"><span @click="changeToDangan">档案管理</span></el-menu-item>
                    <el-menu-item index="4" route="/Qiuzhu"><span @click="changeToQiuzhu">求助管理</span></el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="el-main">
                <div></div>
                <el-card class="box-card" v-for="post in postDatas">
                    <div slot="header" class="clearfix">
                        <span>{{ post.postTitle }}</span>
                        <el-button style="float: right" type="primary" @click="editPost(post)">编辑</el-button>
                        <el-button style="float: right" type="danger" @click="deletePost(post)">删除</el-button>
                    </div>
                    <div>
                        {{ post.postText }}
                    </div>
                </el-card>
            </el-main>
        </el-container>

    </el-container>
</template>
<script>

export default ({
    name: "Tiezi",
    data() {
        return {
            Token: "",
            ManagerUserData: { name: "123" },
            menuActivateIndex: "2",
            
            //TODO: to be modified
            postDatas: [
                {
                    postTitle: "帖子标题1",
                    postText: "帖子内容1",
                    postImages: {},
                    postTime:""
                    
                },
                {
                    postTitle: "帖子标题2",
                    postText: "帖子内容2",
                    postImages: {},
                    postTime:""
                }
            ]
        }
    },
    created() {
        this.Token = this.$query;
        this.getinfo();
    },
    methods: {
        editPost(item) {
            this.$router.push({path:'/PostEdit',query:{Item:item,ManagerToken:this.Token}});
            console.log(item)
        },
        deletePost() {

        },
        changeToYonghu() {
            this.$router.push({ path: '/MainGround', query: this.Token })
        },
        changeToDangan() {
            this.$router.push({ path: '/Dangan', query: this.Token })
        },
        changeToQiuzhu() {
            this.$router.push({ path: '/Qiuzhu', query: this.Token })
        },
        getinfo() {
            this.$axios.get("/api/post/table",
                JSON.stringify(this.Token)).then((response) => {
                    this.ManagerUserData = response.data.user;
                });
        },
    }
})
</script>

<style scoped></style>