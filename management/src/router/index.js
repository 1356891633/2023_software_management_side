import Vue from 'vue'
import Router from 'vue-router'
import LoginRegister from '../components/LoginRegister.vue'
import MainGround from '../components/MainGround.vue'
import Tiezi from '../components/Tiezi.vue'
import Dangan from '../components/Dangan.vue'
import Qiuzhu from '../components/Qiuzhu.vue'
import UserEdit from '../components/UserEdit.vue'
import PostEdit from '../components/PostEdit.vue'
import PostCheck from '../components/PostCheck.vue'
import PostItem from '../components/PostItem.vue'

Vue.use(Router)
export default new Router({
  routes:[
    {
      path: '/',
      component:LoginRegister
    },
    {
      path: '/MainGround',
      meta: { 
        auth: true
      },
      component:MainGround
    },
    {
      path: '/Tiezi',
      meta: { 
        auth: true
      },
      component:Tiezi
    },
    {
      path: '/Dangan',
      meta: { 
        auth: true
      },
      component:Dangan
    },
    {
      path: '/Qiuzhu',
      meta: { 
        auth: true
      },
      component:Qiuzhu
    },
    {
      path: '/UserEdit',
      meta: { 
        auth: true
      },
      component:UserEdit
    },
    {
      path:'/PostEdit',
      name:"PostEdit",
      meta: { 
        auth: true
      },
      component:PostEdit
    },
    {
      path:'/PostCheck',
      meta: { 
        auth: true
      },
      component:PostCheck
    }
  ]
})
