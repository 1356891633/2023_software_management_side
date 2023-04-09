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
                <el-form ref="form" :model="postData" label-width="80px">
                    <el-form-item label="帖子标题">
                        <el-input v-model="postData.postTitle" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item></el-form-item>
                    <el-form-item v-if="isEdit">
                        编辑
                    </el-form-item>
                    <el-form-item v-else>
                        修改
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>

    </el-container>
</template>
<script>


export default ({
    name: "Tiezi",
    data() {
        return {
            isEdit: this.$route.query.item,
            Token: "",
            ManagerUserData: { name: "123" },
            menuActivateIndex: "2",

            //TODO: to be modified
            postData: {
                postTitle: "帖子标题1",
                postContent: {
                    postText: "帖子内容1",
                    postImages: {}
                }
            },
        }
    },
    created() {
        this.Token = this.$query;
        this.getinfo();
    },
    methods: {
        editPost(item) {
            this.$router.push({ path: '/PostEdit', query: { Item: item, ManagerToken: this.Token } });
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
            this.$axios.post("token-get-info-url",
                JSON.stringify(this.Token)).then((response) => {
                    this.ManagerUserData = response.data.post;
                });
        },
    },
    watch: {
        $route: {
            handler: function (val, oldVal) {
                console.log(val, oldVal)
                this.Token = this.$route.query.ManagerToken;
                this.postData = this.$route.query.Item;
                this.getinfo();
                console.log(this.toplist)

            },
            immediate: true,
            deep: true
        }
    },
})
</script>

<style scoped></style>