<template>
    <el-container>
        <el-header>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu :default-active="menuActivateIndex" mode="vertical" router>
                    <el-menu-item index="1" route="/MainGround"><span @click="changeToYonghu">用户管理</span></el-menu-item>
                    <el-menu-item index="2" route="/Tiezi"><span @click="changeToTiezi">帖子管理</span></el-menu-item>
                    <el-menu-item index="3" route="/Dangan">档案管理</el-menu-item>
                    <el-menu-item index="4" route="/Qiuzhu"><span @click="changeToQiuzhu">求助管理</span></el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="流浪动物档案" name="1">
                        <el-card>
                            <el-button type="success" @click="createVisible = true">创建档案</el-button>
                        </el-card>

                        <el-dialog title="创建新档案" :visible.sync="createVisible" width="70%" @close="resetForm('createForm')">
                            <el-form ref="createForm" :model="createForm" label-width="80px">
                                <el-form-item label="动物姓名" prop="name">
                                    <el-input v-model="createForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="动物性别" prop="sex">
                                    <el-radio-group v-model="createForm.sex">
                                        <el-radio label="雄性" border></el-radio>
                                        <el-radio label="雌性" border></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="动物描述" prop=content>
                                    <el-input v-model="createForm.content" type="textarea" :rows="10" autosize></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="图片">
                                    <div style="display: inline-block;" v-for="img in postData.pics">
                                        <el-image style="width: 100px; height: 100px" :src="img"></el-image>
                                    </div>
                                </el-form-item> -->

                                <!-- <el-form-item label="图片上传">
                                    <el-upload class="img-upload" drag multiple action="upload addr">
                                        TODO 上传地址

                                        <i class=" el-icon-upload"></i>
                                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                                </el-form-item> -->
                                <el-form-item>
                                    <el-button type="success" @click="createArchive()">创建</el-button>
                                    <el-button @click="createVisible = false">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </el-dialog>

                        <el-card class="box-card" v-for="archive in animalArchives">
                            <div class="clearfix">
                                <span>{{ archive.name }}</span>
                                <el-button style="float: right" type="primary"
                                    @click="openEditArchive(archive)">详情</el-button>
                                <el-button style="float: right" type="danger" @click="deleteArchive(archive)">删除</el-button>
                            </div>
                        </el-card>

                        <el-dialog title="动物档案" :visible.sync="editVisible" width="70%">
                            <div>
                                <p>动物名字:{{ activeArchive.name }}</p>
                                <p> 性别:{{ activeArchive.sex }}</p>
                                <p> 动物介绍:{{ activeArchive.content }}</p>
                            </div>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="editVisible = false">取消</el-button>
                                <el-button type="primary" @click="innerEditVisible = true">编辑</el-button>
                            </span>
                            <el-dialog title="编辑信息" :visible.sync="innerEditVisible" width="65%" append-to-body=true>
                                <el-form ref="editForm" :model="activeArchive" label-width="80px">
                                    <el-form-item label="动物姓名" prop="name">
                                        <el-input v-model="createForm.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="动物性别" prop="sex">
                                        <el-radio-group v-model="createForm.sex">
                                            <el-radio :label="雄性" border>雄性</el-radio>
                                            <el-radio :label="雌性" border>雌性</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="动物描述" prop=content>
                                        <el-input v-model="createForm.content" type="textarea" :rows="10"
                                            autosize></el-input>
                                    </el-form-item>
                                    <!-- <el-form-item label="图片">
                                    <div style="display: inline-block;" v-for="img in postData.pics">
                                        <el-image style="width: 100px; height: 100px" :src="img"></el-image>
                                    </div>
                                </el-form-item> -->

                                    <!-- <el-form-item label="图片上传">
                                    <el-upload class="img-upload" drag multiple action="upload addr">
                                        TODO 上传地址

                                        <i class=" el-icon-upload"></i>
                                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                                </el-form-item> -->
                                    <el-form-item>
                                        <el-button type="primary" @click="editArchive()">编辑</el-button>
                                        <el-button @click="innerEditVisible = false">取消</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-dialog>
                        </el-dialog>

                    </el-collapse-item>
                    <el-collapse-item title="流浪动物领养申请" name="2">
                        <el-card class="box-card" v-for="req in animalAdoptRequests">
                            <div class="clearfix">
                                <span>{{ req.user_id }} 于{{ req.app_time }} 申请领养 {{ req.animal_id }} </span>
                                <el-button style="float: right" type="primary" @click="viewRequest(req)">详情</el-button>
                            </div>
                        </el-card>
                        <el-dialog title="动物领养申请" :visible.sync="viewReqVisible" width="70%" @open="getReqInfo(req)">
                            <el-row>
                                <el-col :span="12">
                                    <div>
                                        <p>领养人信息:</p>
                                        <p>用户名:{{ reqUser.user_name }}</p>
                                        <p> 真实姓名:{{ reqUser.real_name }}</p>
                                        <p> 电话号码:{{ reqUser.phone_number }}</p>
                                        <p> 邮箱:{{ reqUser.email }}</p>
                                        <p> 是否是管理员:{{ reqUser.is_admin }}</p>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div>
                                        <p>领养动物信息:</p>
                                        <p>动物名字:{{ reqAnimal.animal_name }}</p>
                                        <p> 性别:{{ reqAnimal.animal_sex }}</p>
                                        <p> 动物介绍:{{ reqAnimal.animal_content }}</p>
                                    </div>
                                </el-col>
                            </el-row>


                            <span slot="footer" class="dialog-footer">
                                <el-button type="danger" @click="refuseReq()">拒绝</el-button>
                                <el-button type="primary" @click="passReq()">通过</el-button>
                            </span>
                        </el-dialog>
                    </el-collapse-item>
                </el-collapse>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>

export default ({
    name: "Dangan",
    data() {
        return {
            ManagerUserData: {},
            menuActivateIndex: "3",
            activeNames: ["1", "2"],
            createVisible: false,
            editVisible: false,
            innerEditVisible: false,
            viewReqVisible: false,
            activeArchive: "",
            animalArchives: [
                {
                    id: "1",
                    name: "动物名字1",
                    sex: "雄性",
                    status: "0",
                    content: "动物描述1",
                },
                {
                    id: "2",
                    name: "动物名字2",
                    sex: "雌性",
                    status: "1",
                    content: "动物描述2",
                }
            ],
            animalAdoptRequests: [
                {
                    animal_id: "1",
                    user_id: "1",
                    app_time: "2020-01-01",
                    app_content: "申请内容"
                }
            ],
            createForm: {
                sex: "",
                content: "",
                name: "",
                status: ""
            },
            reqUser: "",
            reqAnimal: "",
        }
    },
    created() {
        this.Token = this.$query;
        this.getinfo();
    },
    methods: {
        getReqInfo() {

        },
        refuseReq() {
            this.viewReqVisible = false;
        },
        passReq() {
            this.viewReqVisible = false;
        },
        openEditArchive(archive) {
            this.activeArchive = archive;
            this.editVisible = true;
        },
        editArchive(item) {
            this.editVisible = false;
        },
        deleteArchive() {
            this.$axios.delete('/api/')

        },
        createArchive() {
            this.createVisible = false;
        },
        resetForm(formRef) {
            this.$refs[formRef].resetFields();
        },
        viewRequest() {
            this.viewReqVisible = true;
        }
        ,
        changeToTiezi() {
            this.$router.push({ path: '/Tiezi', query: this.Token })
        },
        changeToYonghu() {
            this.$router.push({ path: '/MainGround', query: this.Token })
        },
        changeToQiuzhu() {
            this.$router.push({ path: '/Qiuzhu', query: this.Token })
        },
        getinfo() {

        }
    },
    mounted() {
    }
})
</script>

<style scoped></style>