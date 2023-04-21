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
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="未审核帖子" name="1">
                        <el-card class="box-card" v-for="post in unCheckedPosts">
                            <div slot="header" class="clearfix">
                                <span>{{ post.postTitle }}</span>
                                <el-button style="float: right" type="primary" @click="checkPost(post)">审核</el-button>
                                <el-button style="float: right" type="danger" @click="deletePost(post)">删除</el-button>
                            </div>
                            <div>
                                {{ post.postText }}
                            </div>

                            <div class="block" style="display: inline-block;"
                                v-for="img in post.postImages">
                                <el-image style="width: 100px; height: 100px" :src="img"></el-image>
                            </div>
                        </el-card>
                    </el-collapse-item>
                    <el-collapse-item title="已审核帖子" name="2">
                        <el-card class="box-card" v-for="post in checkedPosts">
                            <div slot="header" class="clearfix">
                                <span>{{ post.postTitle }}</span>
                                <el-button style="float: right" type="primary" @click="editPost(post)">编辑</el-button>
                                <el-button style="float: right" type="danger" @click="deletePost(post)">删除</el-button>
                            </div>
                            <div>
                                {{ post.postText }}
                            </div>

                            <div class="block" style="display: inline-block; margin: 10 10 10 10;"
                                v-for="img in post.postImages">
                                <el-image style="width: 100px; height: 100px" :src="img"></el-image>
                            </div>
                        </el-card>
                    </el-collapse-item>
                </el-collapse>

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
                    postImages: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
                    postTime: "",
                    status: "0"

                },
                {
                    postTitle: "帖子标题2",
                    postText: "帖子内容2",
                    postImages: [],
                    postTime: "",
                    status: "1"
                }
            ],
            activeNames:["1","2"]
        }
    },
    computed: {
        checkedPosts() {
            return this.postDatas.filter(post => post.status == 1)
        },
        unCheckedPosts() {
            return this.postDatas.filter(post => post.status == 0)
        },
    },
    created() {
        this.Token = this.$query;
        this.getinfo();
    },
    methods: {
        editPost(item) {
            this.$router.push({ path: '/PostEdit', query: { Item: item, ManagerToken: this.Token } });
            console.log(item)
        },
        checkPost(item) {
            this.$router.push({ path: '/PostCheck', query: { Item: item, ManagerToken: this.Token } });
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