import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './css/global.css'
import "./css/tailwindcss.css"
import "./css/preflight.css"
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.use(ElementUI)
// axios.defaults.baseURL='/api'
Vue.config.productionTip = false
router.beforeEach((to,from,next) => {
  if(to.matched.some(res => res.meta.auth)) {
    let jwt = localStorage.jwt;
    if(jwt){
      next()
    } else {
      next({
        path:'/',
        redirect:'/MainGround'
      })
    }
  } else {
    next();
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
