<template>
    <el-container >
        <el-header class="el-header">
        </el-header>
        <el-container direction="horizontal">
            <el-aside width="200px" class="el-aside"> 
            <el-menu :default-active="menuActivateIndex" mode="vertical"  router>
            <el-menu-item index="1" route="/MainGround">用户管理</el-menu-item>
            <el-menu-item index="2" route="/Tiezi"><span @click="changeToTiezi">帖子管理</span></el-menu-item>
            <el-menu-item index="3" route="/Dangan"><span @click="changeToDangan">档案管理</span></el-menu-item>
            <el-menu-item index="4" route="/Qiuzhu"><span @click="changeToQiuzhu">求组管理</span></el-menu-item>
            </el-menu>
        </el-aside>
        <el-main class="el-main">
            <el-button style="width: 360px" @click="addtitle" type="primary">编辑用户信息</el-button>
            <el-button style="height: 40px" type="primary" @click="fan" size="small">返回</el-button>
            <el-dialog
                title="编辑用户信息"
                :visible.sync="dialogVisible"
                width="80%"
                :before-close="handleClose"
            >
            <el-input style="margin-bottom:20px" v-model="username" placeholder="请输入用户名"></el-input>
            <el-input style="margin-bottom:20px" v-model="real_name" placeholder="请输入真实姓名"></el-input>
            <el-input style="margin-bottom:20px" v-model="phone_number" placeholder="请输入手机号码"></el-input>
            <el-input style="margin-bottom:20px" v-model="email" placeholder="请输入电子邮件"></el-input>
            <el-input style="margin-bottom:20px" v-model="is_admin" placeholder="请输入是否是管理员"></el-input>
            <span slot="footer" >
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="edit">确 定</el-button>
            </span>
            </el-dialog>
        </el-main>
        </el-container>
    </el-container>
</template>
<script>

  export default {
    data () {
      return {
        Token:"",
        ManagerUserData:{},
        menuActivateIndex:"1",
        toplist:{},
        dialogVisible:false,

        username:"",
        real_name:"",
        phone_number:"",
        email:"",
        is_admin:"",
      };
    },
    methods: {
        fan(){
            this.$router.push("/MainGround");
        },
        edit() {
            let data = {
            "token":this.Token,
            "user_id":this.toplist.user_id,
            "username": this.username,
            "real_name": this.real_name,
            "phone_number": this.phone_number,
            "email": this.email,
            "is_admin": this.is_admin,
            };
            this.$axios.post("edit_info_url", JSON.stringify(data)).then((response) => {
            this.dialogVisible = false
            //gengxin toplist////need change
            this.toplist=response.data;
            });
        },
        addtitle() {
            this.dialogVisible = true;
        },
        getinfo(){
            this.$axios.post("token-get-info-url",
                JSON.stringify(this.Token)).then((response) => {
                    this.ManagerUserData=response.data.user;
            });
        },
        changeToTiezi(){
            this.$router.push({path:'/Tiezi',query:this.Token})
        },
        changeToDangan(){
            this.$router.push({path:'/Dangan',query:this.Token})
        },
        changeToQiuzhu(){
            this.$router.push({path:'/Qiuzhu',query:this.Token})
        },
    },

    watch: {
     $route: {
      handler: function (val, oldVal) {
        console.log(val, oldVal)
        this.Token=this.$route.query.ManagerToken;
        this.toplist = this.$route.query.Item;
        this.getinfo();
        console.log(this.toplist)

      },
      immediate: true,
      deep: true
    }
  },

  }

</script>
<style lang='' scoped>

</style>