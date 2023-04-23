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
                        <el-input v-model="postData.title" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="帖子内容">
                        <el-input v-model="postData.content" type="textarea" :rows="10" autosize></el-input>
                    </el-form-item>
                    <el-form-item label="图片">
                        <div style="display: inline-block;" v-for="img in postData.pics">
                            <el-image style="width: 100px; height: 100px" :src="img"></el-image>
                        </div>
                    </el-form-item>
                    
                    <el-form-item label="图片上传">
                        <el-upload class="img-upload" drag multiple action="upload addr">
                            <!-- TODO 上传地址 -->

                                <i class=" el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                        <el-button @click="changeToTiezi">取消</el-button>
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
                title: "帖子标题1",

                content: "帖子内容1",
                pics: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                            ]

            },
        }
    },
    created() {
        this.Token = this.$query;
        this.getinfo();
    },
    methods: {
        onSubmit() {
            this.$axios.post('/api/post/update',{

            }).then((response) => {

            }).catch(

            ).then(

            );
        },
        editPost(item) {
            this.$router.push({ path: '/PostEdit', query: { Item: item, ManagerToken: this.Token } });
        },
        deletePost() {

        },
        changeToTiezi(){
            this.$router.push({path:'/Tiezi',query:this.Token})
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