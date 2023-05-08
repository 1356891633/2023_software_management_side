<template>
  <el-container>
    <el-header class="el-header"> 
      <div>
      <span  class="el-icon-lock" @click="logout()">
        退出登录
      </span>
      <el-divider direction="vertical"></el-divider>
      <span class="el-icon-hello">
        账户: {{ ManagerUserData.user_name }} , 您好
      </span>
      <img src="/src/assets/school.png" alt="" />
      <el-divider direction="vertical"></el-divider>
    </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="el-aside">
        <el-menu :default-active="menuActivateIndex" mode="vertical" router>
          <el-menu-item index="1" route="/MainGround"
            ><span @click="changeToYonghu"><i class="el-icon-user"></i>用户管理</span></el-menu-item
          >
          <el-menu-item index="2" route="/Tiezi"
            ><span @click="changeToTiezi"><i class="el-icon-edit"></i>帖子管理</span></el-menu-item
          >
          <el-menu-item index="3" route="/Dangan"><i class="el-icon-menu"></i>档案管理</el-menu-item>
          <el-menu-item index="4" route="/Qiuzhu"
            ><span @click="changeToQiuzhu"><i class="el-icon-help"></i>求助管理</span></el-menu-item
          >
        </el-menu>
      </el-aside>
      <el-main>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="流浪动物档案" name="1">
            <el-card>
              <el-button type="success" @click="createVisible = true"
                >创建档案</el-button
              >
            </el-card>

            <el-dialog
              title="创建新档案"
              :visible.sync="createVisible"
              width="70%"
              @closed="resetForm('createForm')"
            >
              <el-form ref="createForm" :model="createForm" label-width="80px">
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
                  <el-input
                    v-model="createForm.content"
                    type="textarea"
                    :rows="10"
                    autosize
                  ></el-input>
                </el-form-item>
                <el-form-item label="动物状态" prop="animal_status">
                  <el-radio-group v-model="createForm.animal_status">
                    <el-radio label="0" border>未领养</el-radio>
                    <el-radio label="1" border>已领养</el-radio>
                  </el-radio-group>
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
                  <el-button type="success" @click="createArchive()"
                    >创建</el-button
                  >
                  <el-button @click="createVisible = false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>

            <el-card class="box-card" v-for="archive in animalArchives">
              <div class="clearfix">
                <span>{{ archive.animal_name }}</span>
                <el-button
                  style="float: right"
                  type="primary"
                  @click="openEditArchive(archive)"
                  >详情</el-button
                >
                <el-button
                  style="float: right"
                  type="danger"
                  @click="deleteArchive(archive)"
                  >删除</el-button
                >
              </div>
            </el-card>

            <el-dialog title="动物档案" :visible.sync="editVisible" width="70%">
              <div>
                <p>动物名字:{{ activeArchive.animal_name }}</p>
                <p>性别:{{ animalSex(activeArchive.animal_sex) }}</p>
                <p>动物介绍:{{ activeArchive.content }}</p>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取消</el-button>
                <el-button type="primary" @click="innerEditVisible = true"
                  >编辑</el-button
                >
              </span>
              <el-dialog
                title="编辑信息"
                :visible.sync="innerEditVisible"
                width="65%"
                append-to-body="true"
              >
                <el-form ref="editForm" label-width="80px">
                  <el-form-item label="动物姓名" prop="name">
                    <el-input v-model="createForm.animal_name"></el-input>
                  </el-form-item>
                  <el-form-item label="动物性别" prop="sex">
                    <el-radio-group v-model="createForm.animal_sex">
                      <el-radio :label="0">雄性</el-radio>
                      <el-radio :label="1">雌性</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="动物描述" prop="content">
                    <el-input
                      v-model="createForm.content"
                      type="textarea"
                      :rows="10"
                      autosize
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="动物状态" prop="status">
                    <el-radio-group v-model="createForm.animal_status">
                      <el-radio :label="0" border>未领养</el-radio>
                      <el-radio :label="1" border>已领养</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      @click="editArchive(activeArchive)"
                      >完成编辑</el-button
                    >
                    <el-button @click="innerEditVisible = false"
                      >取消</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-dialog>
            </el-dialog>
          </el-collapse-item>
          <el-collapse-item title="流浪动物领养申请" name="2">
            <el-card class="box-card" v-for="req in animalAdoptRequests">
              <div class="clearfix">
                <span
                  >有关申请领养
                  {{ getAnimalName(req.animal_id) }}
                  
                  状态 ：{{ curReqStatus(req.status) }}
                </span>
                <el-button
                  style="float: right"
                  type="primary"
                  @click="viewRequest(req)"
                  >详情</el-button
                >
              </div>
            </el-card>
            <el-dialog
              title="动物领养申请"
              :visible.sync="viewReqVisible"
              width="70%"
              @open="getReqInfo()"
            >
              <el-row>
                <el-col :span="12">
                  <div>
                    <p>领养人信息:</p>
                    <p>用户名:{{ reqUser.user_name }}</p>
                    <p>真实姓名:{{ reqUser.real_name }}</p>
                    <p>电话号码:{{ reqUser.phone_number }}</p>
                    <p>邮箱:{{ reqUser.email }}</p>
                    <p>是否是管理员:{{ reqUser.is_admin }}</p>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div>
                    <p>领养动物信息:</p>
                    <p>动物名字:{{ reqAnimal.animal_name }}</p>
                    <p>性别:{{ reqAnimal.animal_sex }}</p>
                    <p>动物介绍:{{ reqAnimal.animal_content }}</p>
                  </div>
                </el-col>
              </el-row>

              <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="processReq(false)"
                  >拒绝</el-button
                >
                <el-button type="primary" @click="processReq(true)"
                  >通过</el-button
                >
              </span>
            </el-dialog>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "Dangan",
  data() {
    return {
      ManagerUserData: { user_name: "123" },
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
      },
      reqUser: "",
      reqAnimal: "",
      activeReq: "",
    };
  },
  created() {
    this.getAnimalArchive();
    this.getReq();
  },
  computed: {
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
            if(status === 2) {
                return "拒绝"
            } else if(status === 1) {
                return "通过"
            } else {
                return "未处理"
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
      console.log(temp_archive);
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
    getReqInfo() {},
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
      });
      
    },
    openEditArchive(archive) {
      this.activeArchive = archive;
      this.editVisible = true;
    },
    editArchive(activeArchive) {
      this.$axios
        .post(
          "/api/animal/update",
          {
            animal_id: activeArchive.animal_id,
            animai_sex: this.createForm.animal_sex,
            content: this.createForm.content,
            animal_name: this.createForm.animal_name,
            animal_status: this.createForm.animal_status,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.jwt}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.code);
          this.innerEditVisible = false;
          this.editVisible = false;
          this.getAnimalArchive();
        });
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
      this.$axios
        .post(
          "/api/animal",
          {
            animal_sex: Number(this.createForm.animal_sex),
            content: this.createForm.content,
            animal_name: this.createForm.animal_name,
            animal_status: Number(this.createForm.animal_status),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.jwt}`,
            },
          }
        )
        .then((response) => {
          this.getAnimalArchive();
          console.log(response.data);
        })
        .catch();

      this.createVisible = false;
    },
    resetForm(formRef) {
      // this.$refs[formRef].resetFields()
    },
    viewRequest(req) {
      this.viewReqVisible = true;

      this.activeReq = req;

      let idx = this.animalArchives.findIndex(
        (archive) => Number(archive.animal_id) == Number(req.animal_id)
      );
      let temp_archive = this.animalArchives[idx];

      this.reqAnimal = temp_archive;
      console.log("thatReq");
      console.log(req);
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
          let thatUser = tempUserList[userIdx];
          console.log("thatUser");
          console.log(thatUser);
          this.reqUser = thatUser;
        });
    },

    changeToTiezi() {
      this.$router.push({ path: "/Tiezi", query: this.Token });
    },
    changeToYonghu() {
      this.$router.push({ path: "/MainGround", query: this.Token });
    },
    changeToQiuzhu() {
      this.$router.push({ path: "/Qiuzhu", query: this.Token });
    },
    getinfo() {},
  },
};
</script>

<style scoped></style>
