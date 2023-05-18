<template>
    <el-container>
        <el-header class="el-header">
            <Navigator />
        </el-header>
        <el-container>
            <el-aside width="200px" class="el-aside">
                <el-menu :default-active="menuActivateIndex" mode="vertical" router>
                    <el-menu-item index="1" route="/MainGround"><i class="el-icon-user"></i>用户管理</el-menu-item>
                    <el-menu-item index="2" route="/Tiezi"><i class="el-icon-edit"></i>帖子管理</el-menu-item>
                    <el-menu-item index="3" route="/Dangan"><i class="el-icon-menu"></i>档案管理</el-menu-item>
                    <el-menu-item index="4" route="/Qiuzhu"><i class="el-icon-help"></i>求助管理</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="el-main">
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="未审核帖子" name="1">
                        <div class="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                            <PostItem v-for="post in unCheckedPosts" :post-data="post"   @post-click="checkPost(post)" @post-delete="deletePost(post)" />
                        </div>

                        <!-- <el-card class="box-card" v-for="post in unCheckedPosts">
                            <div slot="header" class="clearfix">
                                <span>{{ post.title }}</span>
                                <el-button style="float: right" type="primary" @click="checkPost(post)">审核</el-button>
                                <el-button style="float: right" type="danger" @click="deletePost(post)">删除</el-button>
                            </div>
                            <div>
                                {{ post.content }}
                            </div>

                            <div
                                v-if="post.pics != None && post.pics.length != 0 && (post.pics.length != 1 || post.pics[0].length != 0)">
                                <div class="block" style="display: inline-block;" v-for="img in post.pics">
                                    <el-image style="width: 100px; height: 100px" :src="img"></el-image>
                                </div>
                            </div>
                        </el-card> -->
                    </el-collapse-item>
                    <el-collapse-item title="已审核帖子" name="2">
                        <div class="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                            <PostItem v-for="post in checkedPosts" :post-data="post"  @post-click="editPost(post)" @post-delete="deletePost(post)"/>
                        </div>
                        
                        <!-- <el-card class="box-card" v-for="post in checkedPosts">
                            <div slot="header" class="clearfix">
                                <span>{{ post.title }}</span>
                                <el-button style="float: right" type="primary" @click="editPost(post)">编辑</el-button>
                                <el-button style="float: right" type="danger" @click="deletePost(post)">删除</el-button>
                            </div>
                            <div>
                                {{ post.content }}
                            </div>
                            <div
                                v-if="post.pics != None && post.pics.length != 0 && (post.pics.length != 1 || post.pics[0].length != 0)">
                                <div class="block" style="display: inline-block; margin: 10 10 10 10;"
                                    v-for="img in post.pics">
                                    <el-image style="width: 100px; height: 100px" :src="img"></el-image>
                                </div>
                            </div>

                        </el-card> -->
                    </el-collapse-item>
                </el-collapse>

            </el-main>
        </el-container>

    </el-container>
</template>
<script>
import Navigator from './Navigator.vue'
import PostItem from './PostItem.vue'
export default ({
    name: "Tiezi",
    components: {
        Navigator,
        PostItem
    },
    data() {
        return {
            curAuthorData:{},
            Token: "",
            ManagerUserData: {
                // user_name: "123" 
            },
            menuActivateIndex: "2",

            //TODO: to be modified
            postDatas: [
                // {
                //     post_id: 1,
                //     title: "帖子标题1",
                //     content: "帖子内容1",
                //     pics: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
                //     postTime: "",
                //     status: "0"

                // },
                // {
                //     post_id: 2,
                //     title: "帖子标题2",
                //     content: "帖子内容2",
                //     pics: [],
                //     postTime: "",
                //     status: "2"
                // }
            ],
            activeNames: ["1", "2"]
        }
    },
    computed: {
        checkedPosts() {
            return this.postDatas.filter(post => post.status == 2)
        },
        unCheckedPosts() {
            return this.postDatas.filter(post => post.status == 0)
        },
    },
    created() {
        // this.Token = this.$query;
        console.log('create')
        this.getinfo();
        this.getPosts();
        this.getPosts();
        // this.$nextTick(getPosts());
    },
    methods: {
        
        editPost(item) {
            this.$router.push({ path: '/PostEdit', query: { Item: item, ManagerToken: this.Token } });
            console.log(item)
        },
        checkPost(item) {
            this.$router.push({ path: '/PostCheck', query: { Item: item, ManagerToken: this.Token } });
        },
        deletePost(post) {
            this.$axios.delete("/api/post", {
                data: {
                    post_id: post.post_id,
                    user_id: Number(localStorage.user_id)//?
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.jwt}`
                }
            }).then((response) => {

            }).catch((response) => {

            }).then(() => {
                this.getPosts();
            });
        },
        getPosts() {
            this.$axios.get("/api/post/table", {
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
                this.postDatas = response.data.data.posts;
            }).catch((response) => {

            });
        },
        getinfo() {
            this.$axios
                .get("/api/user/info", {
                    headers: {
                        Authorization: `Bearer ${localStorage.jwt}`,
                    },
                })
                .then((response) => {
                    this.ManagerUserData = response.data.data.user;
                });
        },
    }
})
</script>

<style scoped></style>