<template>
  <div>
    <span class="el-icon-bell cursor-pointer hover:bg-grey" @click="drawer = true">
      通知
    </span>
    <span class="el-icon-lock cursor-pointer hover:bg-grey" @click="logout()">
      退出登录
    </span>
    
    <el-divider direction="vertical"></el-divider>
    <span class="el-icon-hello">
      账户: {{ ManagerUserData.user_name }} , 您好
    </span>
    <img src="/src/assets/school.png" alt="" />
    <el-divider direction="vertical"></el-divider>
    <el-drawer title="通知" :visible.sync="drawer" @opened="openedNotice()" :before-close="handleClose">
      <div v-for="(notice,idx) in curUserNotices">
        {{ notice.content }}
        <!-- <el-button type="success" icon="el-icon-check" circle @click="readNotice(idx)"></el-button> -->
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ManagerUserData: {
      },
      drawer: false,
      notices:[]
    };
  },
  computed:{
    curUserNotices() {
      return this.notices.filter(notice => notice.user_id === this.ManagerUserData.usur_id);
    }
  },
  created() {
    this.getinfo();
    this.getdata();
  },
  methods: {
    readNotice() {

    },
    openedNotice() {
      this.$axios.get("/api/notice/table",{
        headers:{
          Authorization: `Bearer ${localStorage.jwt}`,
        },
        params:{
          page: 1,
          limit: 100,
          sort: "created_at"
        }
      }).then((response)=>{
        console.log(response);
        this.notices = response.data.data.notices;
      })
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
    logout() {
      localStorage.clear();
      this.$router.push({
        path: "/",
      });
    }
  },
};
</script>
