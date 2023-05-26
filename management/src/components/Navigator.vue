<template>
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
</template>

<script>
export default {
  data() {
    return {
      ManagerUserData: { 
      },
    };
  },
  created() {
    this.getinfo();
    this.getdata();
  },
  methods: {
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
    logout() {
      localStorage.clear();
      this.$router.push({
        path: "/",
      });
    }
  },
};
</script>
