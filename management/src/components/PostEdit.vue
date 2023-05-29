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
                <el-form ref="form" :model="postData" :rules="rules" label-width="80px">
                    <el-form-item label="帖子标题" prop="title">
                        <el-input v-model="postData.title" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="帖子内容" prop="content">
                        <el-input v-model="postData.content" type="textarea" :rows="10" autosize></el-input>
                    </el-form-item>

                    <div v-if="postData.pics != None && postData.pics.length != 0 && (postData.pics.length != 1 || postData.pics[0].length != 0)">
                        <el-form-item label="图片" prop="pics">
                            <div style="display: inline-block;" v-for="img in postData.pics">
                                <el-image style="width: 100px; height: 100px" :src="img"></el-image>
                            </div>
                        </el-form-item>
                    </div>
                    

                    <el-form-item label="图片上传">
                        <el-upload class="img-upload" drag multiple action :file-list="picUrls" :http-request="uploadPic"
                            :on-remove="handleRemove" :before-upload="beforeUpload">
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
import Navigator from './Navigator.vue'
export default ({
    name: "Tiezi",
    components: {
        Navigator
    },
    data() {
        return {
            fileSize: 500,//图片大小限制500k
            fileType: ["png", "jpg"],//允许的图片格式
            isEdit: this.$route.query.item,
            Token: "",
            ManagerUserData: {
                // user_name: "123" 
            },
            menuActivateIndex: "2",

            //TODO: to be modified
            postData: {
            },
            rules:{
                title:[
                    {
                        required: true, message:'标题不能为空', trigger: 'blur'
                    },
                    {
                        max: 255, message:"标题过长", trigger: 'blur'
                    },
                ],
                content:[
                    {
                        required: true, message:'请输入内容', trigger: 'blur'
                    },
                    {
                        max: 255, message:"内容过长", trigger: 'blur'
                    },
                ]
            },
            picUrls: []
        }
    },
    created() {
        this.Token = this.$query;
        this.getinfo();
    },
    methods: {
        onSubmit() {
            this.$refs["form"].validate((valid) => {
                if(valid) {
                    let updateData = {
                        user_id: Number(localStorage.user_id),
                        post_id: this.postData.post_id,
                        title: this.postData.title,
                        content: this.postData.content,
                        pics: this.picUrls //TODO:
                    }
                    this.$axios.post('/api/post/update', updateData, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.jwt}`
                        }
                    }).then((response) => {

                    }).catch().then(
                        this.changeToTiezi()
                    );
                } else {
                    
                }
            })
            
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
        beforeUpload(file) {
            // if(file.type == "" || file.type == null || file.type == undefined) {
            //     return false;
            // }
            const FileExt = file.name.replace(/.+\./, "");

            const isLt500K = (file.size / 1024) < 500

            if (!isLt500K) {
                this.$message({
                    message: '上传文件大小不能超过500k!',
                    type: 'error'
                });
                return false;
            }

            console.log(FileExt)
            if (!this.fileType.includes(FileExt)) {
                this.$message({
                    message: '上传文件格式不正确!',
                    type: 'error'
                });
                return false;
            }
            return true;
        },
        uploadPic(item) {
            let formDatas = new FormData();
            formDatas.append('pic', item.file);
            formDatas.append('opt', 0);
            this.$axios.post("/api/pic/upload", formDatas, {
                headers: {
                    'Authorization': `Bearer ${localStorage.jwt}`,
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => {
                // console.log(response)
                let curUrl = response.data.path;
                this.picUrls.append(curUrl)
                this.postData.pics.push(curUrl)
            })
        },
        handleRemove() {
            console.log(this.picUrls)
        }
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