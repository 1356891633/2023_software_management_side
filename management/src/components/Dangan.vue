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
      <el-main>
        <el-collapse v-model="activeNames">

            <div class="bg-white py-6 sm:py-8 lg:py-12">
              <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div class="mb-6 flex items-end justify-between gap-4">
                  <h2 class="text-2xl font-bold text-gray-800 lg:text-3xl">流浪动物档案</h2>

                  <a @click="createVisible = true"
                    class="cursor-pointer inline-block rounded-lg border bg-green-500 px-4 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-green-700 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base">创建档案</a>
                </div>
                <div class="grid gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                  <ArchiveItem v-for="archive in animalArchives" :archive-data="archive" @archive-click="openEditArchive(archive)" @archive-delete="deleteArchive(archive)"/>
                </div>
              </div>
            </div>
                <!-- <el-card>
                  <el-button type="success" @click="createVisible = true">创建档案</el-button>
                </el-card> -->

                <el-dialog title="创建新档案" :visible.sync="createVisible" width="70%" @closed="resetForm('createForm')">
                  <el-form ref="createForm" :model="createForm" :rules="createRules" label-width="80px">
                    <el-form-item label="动物姓名" prop="animal_name">
                      <el-input v-model="createForm.animal_name"></el-input>
                    </el-form-item>
                    <el-form-item label="动物性别" prop="animal_sex">
                      <el-radio-group v-model="createForm.animal_sex">
                        <el-radio label="0" border>雄性</el-radio>
                        <el-radio label="1" border>雌性</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="动物描述" prop="content">
                      <el-input v-model="createForm.content" type="textarea" :rows="10" autosize></el-input>
                    </el-form-item>
                    <el-form-item label="动物状态" prop="animal_status">
                      <el-radio-group v-model="createForm.animal_status">
                        <el-radio label="0" border>未领养</el-radio>
                        <el-radio label="1" border>已领养</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="动物种类" prop="animal_type">
                      <el-input v-model="createForm.animal_type"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="图片">
                                    <div style="display: inline-block;" v-for="img in postData.pics">
                                        <el-image style="width: 100px; height: 100px" :src="img"></el-image>
                                    </div>
                                </el-form-item> -->

                    <el-form-item label="图片上传" prop="pics">
                      <el-upload class="img-upload" drag multiple action :file-list="createForm.pics"
                        :http-request="uploadPic" :on-remove="handleRemove" :before-upload="beforeUpload">
                        <i class=" el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="success" @click="createArchive()">创建</el-button>
                      <el-button @click="createVisible = false">取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>

                <!-- <el-card class="box-card" v-for="archive in animalArchives">
                  <div class="clearfix">
                    <span>{{ archive.animal_name }}</span>
                    <el-button style="float: right" type="primary" @click="openEditArchive(archive)">详情</el-button>
                    <el-button style="float: right" type="danger" @click="deleteArchive(archive)">删除</el-button>
                  </div>
                </el-card> -->

                <el-dialog title="动物档案" :visible.sync="editVisible" width="70%">
                  <div>
                    <p>动物名字:{{ activeArchive.animal_name }}</p>
                    <p>性别:{{ animalSex(activeArchive.animal_sex) }}</p>
                    <p>动物介绍:{{ activeArchive.content }}</p>
                    <p>动物种类：{{ activeArchive.animal_type }}</p>
                    <div v-for="pic in activeArchive.pics">
                      <el-image :src="pic"></el-image>
                    </div>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取消</el-button>
                    <el-button type="primary" @click="openInnerEdit()">编辑</el-button>
                  </span>
                  <el-dialog title="编辑信息" :visible.sync="innerEditVisible" width="65%" append-to-body="true">
                    <el-form ref="editForm" :rules="editRules" label-width="80px" :model="editForm">
                      <!-- {{ editForm }} -->
                      <el-form-item label="动物姓名" prop="animal_name">
                        <el-input v-model="editForm.animal_name"></el-input>
                      </el-form-item>
                      <el-form-item label="动物性别" prop="animal_sex">
                        <el-radio-group v-model="editForm.animal_sex">
                          <el-radio :label="0">雄性</el-radio>
                          <el-radio :label="1">雌性</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="动物描述" prop="content">
                        <el-input v-model="editForm.content" type="textarea" :rows="10" autosize></el-input>
                      </el-form-item>
                      <el-form-item label="动物状态" prop="status">
                        <el-radio-group v-model="editForm.status">
                          <el-radio :label="0" border>未领养</el-radio>
                          <el-radio :label="1" border>已领养</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="动物种类" prop="animal_type">
                        <el-input v-model="editForm.animal_type"></el-input>
                      </el-form-item>
                      <el-form-item label="图片上传">
                        <el-upload class="img-upload" drag multiple action :file-list="editForm.pics"
                          :http-request="uploadPic" :on-remove="handleRemove" :before-upload="beforeUpload">
                          <i class=" el-icon-upload"></i>
                          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="editArchive(activeArchive)">完成编辑</el-button>
                        <el-button @click="innerEditVisible = false">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </el-dialog>


          <el-collapse-item title="流浪动物领养申请" name="2">
            <el-card class="box-card" v-for="req in uncheckedAnimalAdoptRequests">
              <div class="clearfix">
                <span>有关申请领养
                  {{ getAnimalName(req.animal_id) }}

                  状态 ：{{ curReqStatus(req.status) }}
                </span>
                <el-button style="float: right" type="primary" @click="viewRequest(req)">详情</el-button>
              </div>
            </el-card>
            <el-dialog title="动物领养申请" :visible.sync="viewReqVisible" width="70%" @closed="handleClose()">
              <el-row>
                <el-col :span="12">
                  <div>
                    <p>领养人信息:</p>
                    <p>用户名:{{ reqUser.user_name }}</p>
                    <!-- <p>真实姓名:{{ reqUser.real_name }}</p> -->
                    <p>电话号码:{{ reqUser.phone_number }}</p>
                    <p>邮箱:{{ reqUser.email }}</p>
                    <p>是否是管理员:{{ isAdmin(reqUser.is_admin )}}</p>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div>
                    <p>领养动物信息:</p>
                    <p>动物名字:{{ reqAnimal.animal_name }}</p>
                    <p>性别:{{ animalSex(reqAnimal.animal_sex) }}</p>
                    <p>动物介绍:{{ reqAnimal.content }}</p>
                    <p>动物种类：{{ reqAnimal.animal_type }} </p>
                  </div>
                </el-col>
              </el-row>

              <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="processReq(false)">拒绝</el-button>
                <el-button type="primary" @click="processReq(true)">通过</el-button>
              </span>
            </el-dialog>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import ArchiveItem from './ArchiveItem'
import Navigator from './Navigator.vue'
</script>

<script>

export default {
  name: "Dangan",
  data() {
    return {
      fileSize: 500,//图片大小限制500k
      fileType: ["png", "jpg"],//允许的图片格式
      ManagerUserData: {
        // user_name: "123" 
      },
      menuActivateIndex: "3",
      activeNames: ["1", "2"],
      createVisible: false,
      editVisible: false,
      innerEditVisible: false,
      viewReqVisible: false,
      activeArchive: "",
      animalArchives: [
        // {
        //   animal_id:"1",
        //   animal_name:"动物1",
        //   animal_sex:1,
        //   animal_status:1,
        //   pics:['/animal/preview.png']
        //   content:"动物描述"
        // }
      ],
      animalAdoptRequests: [
        // {
        //   animal_id:"1",
        //   user_id:"1",
        //   adopot_id:"1",
        // }
      ],
      createForm: {
        animal_sex: "",
        content: "",
        animal_name: "",
        animal_status: "",
        animal_type: "",
        pics: []
      },
      createRules:{
        animal_name:[
          {required: true, message:'动物姓名不能为空', trigger: 'blur'},
          {max: 255, message:'姓名过长', trigger:'blur'}
        ],
        animal_type:[
          {required: true, message:'动物种类不能为空', trigger: 'blur'},
          {max: 255, message:'姓名过长', trigger:'blur'}
        ],
        content:[
          {required: true, message:'动物描述不能为空', trigger: 'blur'},
          {max: 255, message:'姓名过长', trigger:'blur'}
        ],
        pics:[
          {required: true, message:'请上传动物图片'}
        ],
        animal_sex:[
          {required: true, message:'请选择动物性别', trigger: 'blur'},
        ],
        animal_status:[
          {required: true, message:'请选择动物状态', trigger: 'blur'},
        ],
      },
      editForm:{},
      editRules:{
        animal_name:[
          {required: true, message:'动物姓名不能为空', trigger: 'blur'},
          {max: 255, message:'姓名过长', trigger:'blur'}
        ],
        animal_type:[
          {required: true, message:'动物种类不能为空', trigger: 'blur'},
          {max: 255, message:'姓名过长', trigger:'blur'}
        ],
        content:[
          {required: true, message:'动物描述不能为空', trigger: 'blur'},
          {max: 255, message:'姓名过长', trigger:'blur'}
        ],
        pics:[
          {required: false, message:'请上传动物图片'}
        ],
        animal_sex:[
          {required: true, message:'请选择动物性别', trigger: 'blur'},
        ],
        animal_status:[
          {required: true, message:'请选择动物状态', trigger: 'blur'},
        ],
      },
      reqUser: {
      },
      reqAnimal: "",
      activeReq: "",
    };
  },
  created() {
    this.getinfo();
    this.getAnimalArchive();
    this.getReq();
  },
  computed: {
    uncheckedAnimalAdoptRequests() {
      return this.animalAdoptRequests.filter(req => req.status === 0);
    },
    animalSex() {
      return (sexType) => {
        if (sexType == 0) {
          return "雄性";
        } else {
          return "雌性";
        }
      };
    },
    curReqStatus() {
      return (status) => {
        if (status === 2) {
          return "拒绝"
        } else if (status === 1) {
          return "通过"
        } else {
          return "未处理"
        }
      }
    },
    isAdmin() {
      return (is_admin) => {
        if(is_admin === 1) {
          return "是";
        }  else { 
          return "否";
        }
      }
    }
    // curAnimalName() {
    //     return (animal_id) => {
    //         console.log(this.animalArchives.filter(archive => archive.animal_id === animal_id).at(0))
    //         return this.animalArchives.filter(archive => archive.animal_id === animal_id).at(0)
    //     }
    // }
  },
  methods: {
    getAnimalName(cur_animal_id) {
      // console.log(this.animalArchives)
      let idx = this.animalArchives.findIndex(
        (archive) => Number(archive.animal_id) == Number(cur_animal_id)
      );
      let temp_archive = this.animalArchives[idx];
      // console.log(temp_archive);
      if (temp_archive) {
        return temp_archive.animal_name;
      }
      return temp_archive;
    },
    getAnimalArchive() {
      this.$axios
        .get("/api/animal/table", {
          params: {
            page: 1,
            limit: 100,
            sort: "created_at",
          },
          headers: {
            Authorization: `Bearer ${localStorage.jwt}`,
          },
        })
        .then((response) => {
          // console.log(response.data.data);
          this.animalArchives = response.data.data.animals;
        })
        .catch()
        .then();
    },
    getReq() {
      this.$axios
        .get("/api/animal/adopt/table", {
          params: {
            page: 1,
            limit: 100,
            sort: "created_at",
          },
          headers: {
            Authorization: `Bearer ${localStorage.jwt}`,
          },
        })
        .then((response) => {
          this.animalAdoptRequests = response.data.data.adopts;
        });
    },
    processReq(passFlag) {
      // TODO
      this.viewReqVisible = false;
      let tempReqData = {
        adopt_id: this.activeReq.adopt_id,
        user_id: this.reqUser.user_id,
        status: "",
      };
      if (passFlag) {
        tempReqData.status = 1;
      } else {
        tempReqData.status = 2;
      }
      this.$axios.post("/api/animal/adopt/update", tempReqData, {
        headers: {
          Authorization: `Bearer ${localStorage.jwt}`,
        },
      }).then(() => {
        this.getReq();
        let n_content="";
        if (passFlag) {
          n_content="领养申请通过";
        } else {
          n_content="领养申请未通过";
        }
        this.$axios.post("/api/notice",{
          user_id:this.reqUser.user_id,
          title:"领养申请审核结果通知",
          content:n_content,
        },{
          headers: {
            Authorization: `Bearer ${localStorage.jwt}`,
          },
        })
      });

    },
    openEditArchive(archive) {
      this.activeArchive = archive;
      this.editVisible = true;
    },
    openInnerEdit() {
      this.innerEditVisible = true
      this.editForm = JSON.parse(JSON.stringify(this.activeArchive))
      
      // console.log(this.editForm)
    },
    editArchive(activeArchive) {
      this.$refs['editForm'].validate((valid)=> {
        if(valid){
          this.$axios
          .post(
            "/api/animal/update",
            {
              animal_id: activeArchive.animal_id,
              animal_sex: this.editForm.animal_sex,
              content: this.editForm.content,
              animal_name: this.editForm.animal_name,
              animal_status: this.editForm.status,
              animal_type: this.editForm.animal_type,
              pics: this.editForm.pics
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.jwt}`,
              },
            }
          )
          .then((response) => {
            // console.log(response.data.code);
            this.innerEditVisible = false;
            this.editVisible = false;
            this.getAnimalArchive();
          });
        } else {

        }
      })
      
    },
    deleteArchive(animal_archive) {
      this.$axios
        .delete("/api/animal", {
          headers: {
            Authorization: `Bearer ${localStorage.jwt}`,
          },
          data: {
            animal_id: animal_archive.animal_id,
          },
        })
        .then((response) => {
          this.getAnimalArchive();
        })
        .catch();
    },
    createArchive() {
      this.$refs['createForm'].validate((valid)=> {
        if(valid) {
          this.$axios
          .post(
            "/api/animal",
            {
              animal_sex: Number(this.createForm.animal_sex),
              content: this.createForm.content,
              animal_name: this.createForm.animal_name,
              animal_status: Number(this.createForm.animal_status),
              animal_type: this.createForm.animal_type,
              pics: this.createForm.pics
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.jwt}`,
              },
            }
          )
          .then((response) => {
            this.getAnimalArchive();
            // console.log(response.data);
          })
          .catch();

        this.createVisible = false;
        } else {

        }
      })

    },
    resetForm(formRef) {
      this.$refs[formRef].resetFields()
    },
    viewRequest(req) {
      this.viewReqVisible = true;

      this.activeReq = req;

      let idx = this.animalArchives.findIndex(
        (archive) => Number(archive.animal_id) == Number(req.animal_id)
      );
      let temp_archive = this.animalArchives[idx];

      this.reqAnimal = temp_archive;
      this.$axios
        .get("/api/user/table", {
          params: {
            page: 1,
            limit: 100,
            sort: "created_at",
          },
          headers: {
            Authorization: `Bearer ${localStorage.jwt}`,
          },
        })
        .then((response) => {
          let tempUserList = response.data.data.users;
          let userIdx = tempUserList.findIndex(
            (user) => Number(user.user_id) === Number(req.user_id)
          );
          if(tempUserList[userIdx] != undefined) {
            let thatUser = tempUserList[userIdx];
            this.reqUser = thatUser;
          } 
          
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

      // console.log(FileExt)
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
      formDatas.append('opt', 1);
      // console.log(formDatas)
      this.$axios.post("/api/pic/upload", formDatas, {
        headers: {
          'Authorization': `Bearer ${localStorage.jwt}`,
          "Content-Type": "multipart/form-data"
        }
      }).then(response => {
        // console.log(this.createForm.pics)
        let curUrl = response.data.path;
        this.createForm.pics.push(curUrl)
      })
    },
    handleRemove() {
      console.log(this.picUrls)
    },
    handleClose() {
      this.reqUser = {
              user_name:"",
              real_name:"",
              phone_number:"",
              email:"",
              is_admin:"",
            }
    }
  },
};
</script>

<style scoped></style>
