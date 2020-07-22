import Vue from 'vue'
import store from "./store";
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.min.css';


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'mdbvue/lib/css/mdb.min.css'

Vue.config.productionTip = false

new Vue({
  store,router,
  render: h => h(App),
}).$mount('#app')

