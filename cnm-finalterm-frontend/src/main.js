import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import EventBus from './EventBus'

Vue.use(BootstrapVue);
Vue.config.productionTip = false
Vue.prototype.$bus = EventBus

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')