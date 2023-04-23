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
                <el-page-header @back="goBack" content="postData.title"></el-page-header>
                <span>{{psotData.content}}</span>
                <div v-for="img in postData.pics">
                    <el-image style="width: 100px; height: 100px" :src="img"></el-image>
                </div>
                
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
                    title: "帖子标题1",

                    content: "帖子内容1",
                    pics: []

                },
            }
        },
        created() {
            this.Token = this.$query;
            this.getinfo();
        },
        methods: {
            onSubmit() {

            },
            editPost(item) {
                this.$router.push({ path: '/PostEdit', query: { Item: item, ManagerToken: this.Token } });
            },
            deletePost() {

            },
            changeToTiezi() {
                this.$router.push({ path: '/Tiezi', query: this.Token })
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
                        this.ManagerUserData = response.data.user;
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
                    console.log(this.postData)

                },
                immediate: true,
                deep: true
            }
        },
    })
</script>

<style scoped></style>