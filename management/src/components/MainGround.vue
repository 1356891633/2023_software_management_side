<template>
  <el-container>
    <el-header class="el-header">
      <Navigator />
    </el-header>
    <el-container direction="horizontal">
      <el-aside width="200px" class="el-aside">
        <el-menu :default-active="menuActivateIndex" mode="vertical" router>
          <el-menu-item index="1" route="/MainGround"><i class="el-icon-user"></i>用户管理</el-menu-item>
          <el-menu-item index="2" route="/Tiezi"><i class="el-icon-edit"></i>帖子管理</el-menu-item>
          <el-menu-item index="3" route="/Dangan"><i class="el-icon-menu"></i>档案管理</el-menu-item>
          <el-menu-item index="4" route="/Qiuzhu"><i class="el-icon-help"></i>求助管理</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="el-main">
        <div>
          <!-- <el-input v-model="input" @clear="getdata" clearable placeholder="请输入内容" ></el-input>
              <el-button @click="SearchUser" style="height: 40px;margin-left:15px" type="primary" round>搜索</el-button> -->
          <div v-for="(item, index) in UserData" :key="index" class="mian1">
            <el-card class="el-card">
              <div>
                <p style="float: left; margin-left: 10px;">用户名：{{ item.user_name }}</p>
                <p style="float: left; margin-left: 10px;">电话号码：{{ item.phone_number }}</p>
                <p style="float: left; margin-left: 10px;">邮箱：{{ item.email }}</p>
                <el-button v-if="item.is_admin!==1" @click="ChangeToAdmin(item)" class="button" type="success" size="small"
                  icon="el-icon-edit">设为管理员</el-button>
                <!-- <el-button @click="EditUser(item)" class="button" type="primary"
                  >编辑</el-button
                > -->
                <el-button @click="DeleteUser(item)" class="button" type="danger" size="small"
                  icon="el-icon-delete">删除</el-button>
              </div>
            </el-card>
          </div>
        </div>
        
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Navigator from './Navigator.vue'
export default {
  name: "MainGround",
  components: {
    Navigator
  },
  data() {
    return {
      Token: "",
      ManagerUserData: {
        // user_name: "123" 
      },
      menuActivateIndex: "1",
      //TODO
      UserData: [
        // {
        //   user_name:12132343,
        //   phone_number:1233434,
        //   datetime:123234234
        // },
        // {
        //   user_name:12132343,
        //   phone_number:1233434,
        //   datetime:123234234
        // },
        // {
        //   user_name:12132343,
        //   phone_number:1233434,
        //   datetime:123234234
        // },
        // {
        //   user_name:12132343,
        //   phone_number:1233434,
        //   datetime:123234234
        // },
        // {
        //   user_name:12132343,
        //   phone_number:1233434,
        //   datetime:123234234
        // },
        // {
        //   user_name:12132343,
        //   phone_number:1233434,
        //   datetime:123234234
        // },
        // {
        //   user_name:12132343,
        //   phone_number:1233434,
        //   datetime:123234234
        // },
        // {
        //   user_name:12132343,
        //   phone_number:1233434,
        //   datetime:123234234
        // },
        // {
        //   user_name:12132343,
        //   phone_number:1233434,
        //   datetime:123234234
        // },
        // {
        //   user_name:12132343,
        //   phone_number:1233434,
        //   datetime:123234234
        // },
      ],
      input: "",
    };
  },
  created() {
    // this.Token = this.$query.Token;
    this.getinfo();
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
          data: {
            user_id: item.user_id,
          },
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
      this.$axios.post(
        "api/user/update/grant",
        {
          user_id: item.user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.jwt}`,
          },
        }
      ).then((response)=>{
        this.getdata();
      });
      
    },
    SearchUser() { },
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
  height: 300px;
  width: 100%;
  background-color: rgb(235, 226, 212);
}

.el-aside {
  /* background-color: aqua; */
}

.el-main {
  float: left;
  /* background-color:rgb(245, 245, 220); */
}

.button {
  float: left;
  /* size:small; */
  /* margin-left: 20px; */

}

.el-card {
  float: left;
  margin-left: 20px;
  height: 300px;
  width: 240px;
  background-color: rgb(251, 242, 230);
  margin-top: 5px;
}

.el-header span {
  float: right;
  margin-right: 30px;
  margin-top: 20px;
  font-size: medium;
}

.el-card :hover {}

.titleimg {
  display: flex;
}

.titleimg>img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}
</style>
