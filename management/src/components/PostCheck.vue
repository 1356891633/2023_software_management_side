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
                <h>{{ postData.title }}</h>
                <el-divider></el-divider>
                <p>{{ postData.content }}</p>
                <div v-if="postData.pics != None && postData.pics.length != 0 && (postData.pics.length != 1 || postData.pics[0].length != 0)">
                    <div v-for="img in postData.pics">
                        <el-image style="width: 100px; height: 100px" :src="img"></el-image>
                    </div>
                </div>
                
                <el-form ref="form" :model="postData" label-width="80px">
                    <!-- <el-form-item label="帖子标题">
                        <el-input v-model="postData.title" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="帖子内容">
                        <el-input v-model="postData.content" type="textarea" :rows="10" autosize></el-input>
                    </el-form-item>
                   


                    <el-form-item label="图片上传">
                        <el-upload class="img-upload" drag multiple action="upload addr">
                            

                            <i class=" el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="auditPost(true)">通过</el-button>
                        <el-button type="danger" @click="auditPost(false)">拒绝</el-button>
                        <el-button @click="changeToTiezi">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>

    </el-container>
</template>
<script>
import Navigator from './Navigator.vue'
export default ({
    name: "Tiezi",
    components: {
        Navigator
    },
    data() {
        return {
            isEdit: this.$route.query.item,
            Token: "",
            ManagerUserData: {
                // user_name: "123" 
            },
            menuActivateIndex: "2",

            //TODO: to be modified
            postData: {},
        }
    },
    created() {
        this.Token = this.$query;
        this.getinfo();
    },
    methods: {
        auditPost(passFlag) {
            let auditData = {
                user_id: Number(localStorage.user_id),
                post_id: this.postData.post_id,
                opt: ""
            }
            let n_content = "";
            if (passFlag) {
                auditData.opt = 1;
                n_content="已通过审核";
            } else {
                auditData.opt = 0;
                n_content="未通过审核";
            }

            this.$axios.post('/api/post/audit', auditData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.jwt}`
                }
            }
            ).then((response) => {
                this.changeToTiezi()
                this.$axios.post("/api/notice",{
                    user_id:auditData.user_id,
                    title:`${this.postData.title} 帖子审核结果通知`,
                    content:`您的帖子《${this.postData.title}》（id：${this.postData.post_id}）${n_content}`,
                    },{
                        headers: {
                            Authorization: `Bearer ${localStorage.jwt}`,
                        },
                    })
            }).catch(

            ).then(

            );

        },
        editPost(item) {
            this.$router.push({ path: '/PostEdit', query: { Item: item, ManagerToken: this.Token } });
        },
        changeToTiezi() {
            this.$router.push({ path: '/Tiezi', query: this.Token })
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