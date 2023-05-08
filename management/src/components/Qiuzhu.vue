<template>
  <el-container>
    <el-header> 
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
      <el-aside width="200px">
        <el-menu :default-active="menuActivateIndex" mode="vertical" router>
          <el-menu-item index="1" route="/MainGround"
            ><span @click="changeToYonghu"><i class="el-icon-user"></i>用户管理</span></el-menu-item
          >
          <el-menu-item index="2" route="/Tiezi"
            ><span @click="changeToTiezi"><i class="el-icon-edit"></i>帖子管理</span></el-menu-item
          >
          <el-menu-item index="3" route="/Dangan"
            ><span @click="changeToDangan"><i class="el-icon-menu"></i>档案管理</span></el-menu-item
          >
          <el-menu-item index="4" route="/Qiuzhu"><i class="el-icon-help"></i>求助管理</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="求助信息" name="1">
            <el-card class="box-card" v-for="post in checkedPosts">
              <div class="clearfix">
                <span>{{ post.title }}</span>
                <el-button
                  style="float: right"
                  type="primary"
                  @click="viewHelpPost(post)"
                  >查看</el-button
                >
                <el-button
                  style="float: right"
                  type="danger"
                  @click="deletePost(post)"
                  >删除</el-button
                >
              </div>
              <el-dialog
                title="默认标题"
                :visible.sync="dialogVisible"
                width="70%"
                show-close
              >
                <span slot="title">{{ activeHelpPost.title }}</span>
                <div>{{ activeHelpPost.content }}</div>
                <div
                  style="display: inline-block"
                  v-for="img in activeHelpPost.pics"
                >
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="img"
                  ></el-image>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="checkFinish(activeHelpPost)"
                    >审核完成</el-button
                  >
                  <el-button @click="dialogVisible = false">关闭</el-button>
                </span>

                <el-divider></el-divider>

                <el-form ref="form" :model="helpForm" label-width="80px">
                  <el-form-item>
                    <el-col :span="16" :offset="2">
                      <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入回复"
                        v-model="helpForm.comment"
                      ></el-input>
                    </el-col>
                    <el-col :span="4">
                      <el-button
                        type="primary"
                        @click="sendComment(activeHelpPost)"
                        >发送回复</el-button
                      >
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
export default {
  name: "Qiuzhu",
  data() {
    return {
      ManagerUserData: { user_name: "123" },
      menuActivateIndex: "4",
      activeNames: ["1"],
      dialogVisible: false,
      helpPosts: [
        // {
        //     post_id:1,
        //     title: "求助标题1",
        //     content: "求助内容1",
        //     pics: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
        //     postTime: "",
        //     status: "0"

        // },
        // {
        //     post_id:2,
        //     title: "求助标题2",
        //     content: "求助内容2",
        //     pics: [],
        //     postTime: "",
        //     status: "0"
        // }
      ],
      activeHelpPost: "",
      helpForm: {
        comment: "",
        helpPostStatus: "",
      },
    };
  },
  created() {
    this.Token = this.$query;
    this.getHelpPosts();
  },
  computed:{
    checkedPosts() {
            return this.helpPosts.filter(post => post.status == 0)
        }
  },
  methods: {
    sendComment(activeHelpPost) {
      console.log("1");
      this.$axios
        .post(
          "/api/post/comment",
          {
            post_id: activeHelpPost.post_id,
            author_id: Number(localStorage.user_id),
            content: this.helpForm.comment,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.jwt}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.code);
        });
    },
    checkFinish(activeHelpPost) {
      this.$axios
        .patch(
          "/api/post/audit",
          {
            post_id: activeHelpPost.post_id,
            user_id: Number(localStorage.user_id),
            opt: 2,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.jwt}`,
            },
          }
        )
        .then((response) => {
            this.getHelpPosts();
          console.log(response.data.code);
        });
    },
    updateStatus(val) {
      alert(val);
    },
    viewHelpPost(post) {
      this.dialogVisible = true;
      this.activeHelpPost = post;
    },
    deletePost(item) {},
    changeToTiezi() {
      this.$router.push({ path: "/Tiezi", query: this.Token });
    },
    changeToDangan() {
      this.$router.push({ path: "/Dangan", query: this.Token });
    },
    changeToYonghu() {
      this.$router.push({ path: "/MainGround", query: this.Token });
    },
    getHelpPosts() {
      this.$axios
        .get("/api/post/help", {
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
          console.log(response.data);
          this.helpPosts = response.data.data.posts;
        })
        .catch((response) => {});
    },
  },
};
</script>

<style scoped></style>