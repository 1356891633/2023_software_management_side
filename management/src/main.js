import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './css/global.css'
Vue.use(ElementUI)

Vue.config.productionTip = false
axios.default.baseURL="http://114.116.211.146:8080"
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
