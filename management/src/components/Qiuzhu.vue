<template>
    <el-container>
        <el-header>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu :default-active="menuActivateIndex" mode="vertical" router>
                    <el-menu-item index="1" route="/MainGround"><span @click="changeToYonghu">用户管理</span></el-menu-item>
                    <el-menu-item index="2" route="/Tiezi"><span @click="changeToTiezi">帖子管理</span></el-menu-item>
                    <el-menu-item index="3" route="/Dangan"><span @click="changeToDangan">档案管理</span></el-menu-item>
                    <el-menu-item index="4" route="/Qiuzhu">求助管理</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="求助信息" name="1">
                        <el-card class="box-card" v-for="post in helpPosts">
                            <div class="clearfix">
                                <span>{{ post.title }}</span>
                                <el-button style="float: right" type="primary" @click="viewHelpPost(post)">查看</el-button>
                                <el-button style="float: right" type="danger" @click="deletePost(post)">删除</el-button>
                            </div>
                            <el-dialog title="默认标题" :visible.sync="dialogVisible" width="70%"
                                show-close>
                                <span slot="title">{{ activeHelpPost.title }}</span>
                                <div>{{ activeHelpPost.content }}</div>
                                <div style="display: inline-block;" v-for="img in activeHelpPost.pics">
                                    <el-image style="width: 100px; height: 100px" :src="img"></el-image>
                                </div>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">关闭</el-button>
                                </span>

                                <el-divider></el-divider>

                                <el-form ref="form" :model="helpForm" label-width="80px">

                                    <el-form-item>
                                        <el-col :span="16" :offset="2">
                                            <el-input type="textarea" autosize placeholder="请输入回复"></el-input>
                                        </el-col>
                                        <el-col :span="4">
                                            <el-button type="primary" @click="sendComment()">发送回复</el-button>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-col :span="8" :offset="8">
                                        <el-radio-group v-model="helpForm.helpPostStatus" @change="updateStatus">
                                            <el-radio-button label="1">状态1</el-radio-button>
                                            <el-radio-button label="2">状态2</el-radio-button>
                                            <el-radio-button label="3">状态3</el-radio-button>
                                        </el-radio-group>
                                        </el-col>
                                    </el-form-item>
                                </el-form>
                            </el-dialog>
                        </el-card>
                    </el-collapse-item>
                </el-collapse>
            </el-main>
        </el-container>

    </el-container>
</template>
<script>

export default ({
    name: "Qiuzhu",
    data() {
        return {
            ManagerUserData: {},
            menuActivateIndex: "4",
            activeNames: ["1"],
            dialogVisible: false,
            helpPosts: [
                {
                    title: "帖子标题1",
                    content: "帖子内容1",
                    pics: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
                    postTime: "",
                    status: "1"

                },
                {
                    title: "帖子标题2",
                    content: "帖子内容2",
                    pics: [],
                    postTime: "",
                    status: "1"
                }
            ],
            activeHelpPost: "",
            helpForm: {
                comment: "",
                helpPostStatus: ""
            }
        }
    },
    created() {
        this.Token = this.$query;
        this.getHelpPosts();
    },
    methods: {
        sendComment() {

        },
        updateStatus(val) {
            alert(val)
        },
        viewHelpPost(post) {
            this.dialogVisible = true
            this.activeHelpPost = post
        },
        deletePost(item) {

        },
        changeToTiezi() {
            this.$router.push({ path: '/Tiezi', query: this.Token })
        },
        changeToDangan() {
            this.$router.push({ path: '/Dangan', query: this.Token })
        },
        changeToYonghu() {
            this.$router.push({ path: '/MainGround', query: this.Token })
        },
        getHelpPosts() {
            this.$axios.get("/api/post/help", {
                params: {
                    page: 1,
                    limit: 100,
                    sort: "created_at"
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.jwt}`
                }
            }).then((response) => {
                console.log(response.data)
                this.helpPosts = response.data.data.posts;
            }).catch((response) => {

            });
        }
    }
})
</script>

<style scoped></style>