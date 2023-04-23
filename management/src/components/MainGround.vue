<template>
  <el-container>
    <el-header class="el-header"> </el-header>
    <el-container direction="horizontal">
      <el-aside width="200px" class="el-aside">
        <el-menu :default-active="menuActivateIndex" mode="vertical" router>
          <el-menu-item index="1" route="/MainGround">用户管理</el-menu-item>
          <el-menu-item index="2" route="/Tiezi"
            ><span @click="changeToTiezi">帖子管理</span></el-menu-item
          >
          <el-menu-item index="3" route="/Dangan"
            ><span @click="changeToDangan">档案管理</span></el-menu-item
          >
          <el-menu-item index="4" route="/Qiuzhu"
            ><span @click="changeToQiuzhu">求助管理</span></el-menu-item
          >
        </el-menu>
      </el-aside>
      <el-main class="el-main">
        <div>
          <!-- <el-input v-model="input" @clear="getdata" clearable placeholder="请输入内容" ></el-input>
              <el-button @click="SearchUser" style="height: 40px;margin-left:15px" type="primary" round>搜索</el-button> -->
          <div v-for="(item, index) in UserData" :key="index" class="mian1">
            <el-card class="el-card">
              <div>
                <span style="float: left">{{ item.user_name }}</span>
                <el-button
                  @click="ChangeToAdmin(item)"
                  class="button"
                  type="success"
                  >设为管理员</el-button
                >
                <!-- <el-button @click="EditUser(item)" class="button" type="primary"
                  >编辑</el-button
                > -->
                <el-button
                  @click="DeleteUser(item)"
                  class="button"
                  type="danger"
                  >删除</el-button
                >
              </div>
            </el-card>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "MainGround",
  data() {
    return {
      Token: "",
      ManagerUserData: { name: "123" },
      menuActivateIndex: "1",
      //TODO
      UserData: [],
      input: "",
    };
  },
  created() {
    // this.Token = this.$query.Token;
    // this.getinfo();
    this.getdata();
  },
  methods: {
    EditUser(item) {
      this.$router.push({
        path: "/UserEdit",
        query: { Item: item, ManagerToken: this.Token },
      });
    }, //TODO
    DeleteUser(item) {
      this.$axios
        .delete("/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.jwt}`,
          },
          user_id:item.user_id,
        })
        .then((res) => {
          if (res.successcode) {
            //
          }
          this.getdata();
        });
    },
    ChangeToAdmin(item) {
      console.log("change");
      this.$axios.patch("/api/user/update/grant", {
        headers: {
          Authorization: `Bearer ${localStorage.jwt}`,
        },
        user_id: item.user_id,
      });
    },
    SearchUser() {},
    getdata() {
      console.log("getdata");
      //TODO
      this.$axios
        .get("/api/user/table", {
          headers: {
            Authorization: `Bearer ${localStorage.jwt}`,
          },
          params: {
            page: 1,
            limit: 100,
            sort: "created_at",
          },
        })
        .then((response) => {
          this.UserData = response.data.data.users;
        });
    },
    changeToTiezi() {
      this.$router.push({ path: "/Tiezi", query: this.Token });
    },
    changeToDangan() {
      this.$router.push({ path: "/Dangan", query: this.Token });
    },
    changeToQiuzhu() {
      this.$router.push({ path: "/Qiuzhu", query: this.Token });
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
};
</script>

<style scoped>
.el-header {
  height: 100px;
  width: 100%;
  /* background-color: black; */
}
.el-aside {
  /* background-color: aqua; */
}
.el-main {
  float: left;
  /* background-color:rgb(245, 245, 220); */
}
.button {
  float: right;
  margin-bottom: 15px;
}
.el-card {
  background-color: rgb(251, 242, 230);
}
</style>
