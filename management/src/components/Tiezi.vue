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
                <el-card class="box-card" v-for="post in postDatas">
                    <div slot="header" class="clearfix">
                        <span>{{ post.postTitle }}</span>
                        <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
                        <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
                    </div>
                    <div>
                        {{ post.postContent.postText }}
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
            ManagerUserData: {},
            menuActivateIndex: "2",

            postDatas: [
                {
                    postTitle: "帖子标题1",
                    postContent: {
                        postText: "帖子内容1",
                        postImages: {}
                    }
                },
                {
                    postTitle: "帖子标题2",
                    postContent: {
                        postText: "帖子内容2",
                        postImages: {}
                    }
                }
            ]
        }
    },
    created() {
        this.Token = this.$query;
        this.getinfo();
    },
    methods: {

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
            this.$axios.post("token-get-info-url",
                JSON.stringify(this.Token)).then((response) => {
                    this.ManagerUserData = response.data.user;
                });
        },
    }
})
</script>

<style scoped></style>