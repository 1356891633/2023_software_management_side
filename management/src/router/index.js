import Vue from 'vue'
import Router from 'vue-router'
import LoginRegister from '../components/LoginRegister.vue'
import MainGround from '../components/MainGround.vue'
import Tiezi from '../components/Tiezi.vue'
import Dangan from '../components/Dangan.vue'
import Qiuzhu from '../components/Qiuzhu.vue'
import UserEdit from '../components/UserEdit.vue'
import PostEdit from '../components/PostEdit.vue'
Vue.use(Router)
export default new Router({
  routes:[
    {
      path: '/',
      component:LoginRegister
    },
    {
      path: '/MainGround',
      component:MainGround
    },
    {
      path: '/Tiezi',
      component:Tiezi
    },
    {
      path: '/Dangan',
      component:Dangan
    },
    {
      path: '/Qiuzhu',
      component:Qiuzhu
    },
    {
      path: '/UserEdit',
      component:UserEdit
    },
    {
      path:'/PostEdit',
      name:"PostEdit",
      component:PostEdit
    },
  ]
})
