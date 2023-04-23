<template>
    <div class="base">
      <!-- 注册登录界面 -->
      <div class="loginAndRegister">
        <!--登录表单-->
        <div class="loginArea">
          <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear>
  
            <div v-show="isShow">
              <div class="title">
                登录
              </div>
  
              <el-form ref="loginUser"
                       label-position="top"
                       :model="loginUser"
                       status-icon  
                       :rules="loginRules">
                <el-form-item label="学号" prop="user_id">
                  <el-input class="input-info" v-model="loginUser.user_id" placeholder="请输入学号"
                            prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="user_password">
                  <el-input class="input-info" show-password v-model="loginUser.user_password" placeholder="请输入密码"
                            prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
  
                <el-button type="success" style="width: 100% ;margin-top: 16px" round @click="userLogin">登录
                </el-button>
  
              </el-form>
            </div>
          </transition>
  
        </div>
        <!-- 找回密码 -->
        <div class="FindCodeArea">
          <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear>
            <div v-show="!isShow">
              <div class="title">
                找回密码
              </div>
            </div>
  
  
          </transition>
        </div>
        <!-- 信息展示界面 -->
  
        <div id="aaa" class="showInfo"
             :style="{
               borderTopRightRadius:styleObj.bordertoprightradius,
               borderBottomRightRadius:styleObj.borderbottomrightradius,
               borderTopLeftRadius:styleObj.bordertopleftradius,
               borderBottomLeftRadius:styleObj.borderbottomleftradius,
               right:styleObj.rightDis
              }"
             ref="showInfoView">
  
          <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
          >
  
            <div v-show="isShow"
                 style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%;height: 100%">
  
              <div style="flex: 2;display: flex;align-items: center;font-size: 22px;color: #FFFFFF;font-weight: bold">
                欢迎登入流浪动物平台管理端
              </div>
  
              <div style="flex: 2">
                <el-button type="success" style="background-color:#257B5E;border: 1px solid #ffffff;" round
                           @click="changeToFind">忘记密码？点击找回
                </el-button>
              </div>
            </div>
          </transition>
  
  
          <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear
          >
  
            <div v-show="!isShow"
                 style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%;height: 100%">
              <div style="flex: 2;display: flex;align-items: center;font-size: 22px;color: #FFFFFF;font-weight: bold">
                欢迎找回
              </div>
  
              <div style="flex: 2">
                <el-button type="success" style="background-color:#257B5E;border: 1px solid #ffffff;" round
                           @click="changeToLogin">成功找回？点击登录
                </el-button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  
</template>
  
  <script>
  export default {
  
    name: 'Login',
    data() {
      return {
        loginUser: {
          user_id: "",
          user_password: ""
        },
        loginRules: {
          user_id: [{
            required: true, message: '用户名不能为空', trigger: 'blur'
          }],
          user_password: [{
            required: true, message: '密码不能为空', trigger: 'blur'
          }]
        },
        styleObj: {
          bordertoprightradius: '15px',
          borderbottomrightradius: '15px',
          bordertopleftradius: '0px',
          borderbottomleftradius: '0px',
          rightDis: '0px'
        },
        isShow: true,
        Token:"",
        ManagerUserData:{},
      }
    }
    ,
    created() {
      // this.loadInfoOfAdmin();
    },
    methods: {
      getinfo(){
        this.$axios.post("/user/info",
            JSON.stringify(this.Token)).then((response) => {
                this.ManagerUserData=response.data.data.user;
                localStorage.user_id = response.data.data.user;//?
        });
        },
      changeToFind() {
        this.styleObj.bordertoprightradius = '0px'
        this.styleObj.borderbottomrightradius = '0px'
        this.styleObj.bordertopleftradius = '15px'
        this.styleObj.borderbottomleftradius = '15px'
        this.styleObj.rightDis = '50%'
        this.isShow = !this.isShow
      }
      ,
      changeToLogin() {
        this.styleObj.bordertoprightradius = '15px'
        this.styleObj.borderbottomrightradius = '15px'
        this.styleObj.bordertopleftradius = '0px'
        this.styleObj.borderbottomleftradius = '0px'
        this.styleObj.rightDis = '0px'
        this.isShow = !this.isShow
      }
      ,

      userLogin() {
        this.$refs["loginUser"].validate((valid) => {
          if (valid) {
            console.log("111");
            this.$axios.post("/api/user/login", JSON.stringify({phone_number:this.loginUser.user_id,password:this.loginUser.user_password})).then(response => {
              if (response.data.code==200) {
                this.$message({
                  message: "登录成功！",
                  type: "success"
                });
                this.Token=response.data.data.token;
                localStorage.jwt = response.data.data.token;
                this.getinfo();
                console.log("jump")
                setTimeout(() => {
                  this.$router.push({path:'/MainGround',query:this.Token});
                }, 500);
              } else {  //error message
                
              }
            }).catch(response => {
              console.log(response)
              console.log("222")
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
      ,
    },
  
  
  }
  </script>
  
  <style>
  /* @import '../images/css/Login.css' */
  .base {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/loginimg.png");
    background-size: 100%;
  }
  
  .loginAndRegister {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  
  .loginArea {
    background-color: rgba(255, 255, 255, 0.8);
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    height: 400px;
    width: 350px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }
  
  .FindCodeArea {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    height: 400px;
    width: 350px;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .showInfo {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    position: absolute;
    height: 400px;
    width: 350px;
    z-index: 2;
    top: 0;
    right: 0;
    background-image: url("../assets/loginimg2.png");
    background-size: 90%;
  }
  
  .showInfo:hover {
    background-size: 100%;
    background-position: -50px -50px;
  }
  
  .title {
    border-bottom: 1px solid #257B5E;
    color: #257B5E;
    font-weight: bold;
    font-size: 24px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 25px 0;
    width: 300px;
  }
  
  #aaa {
    transition: 0.3s linear;
  }
  
  .pwdArea input {
    outline: none;
    height: 30%;
    border-radius: 13px;
    padding-left: 10px;
    font-size: 12px;
    border: 1px solid gray;
  }
  
  .pwdArea input:focus {
    border: 2px solid #409EFF;
  }
  
  .registerForm input {
    outline: none;
    height: 30%;
    border-radius: 13px;
    padding-left: 10px;
    font-size: 12px;
    border: 1px solid gray;
  }
  
  .registerForm input:focus {
    border: 2px solid #257B5E;
  }
  </style>
  