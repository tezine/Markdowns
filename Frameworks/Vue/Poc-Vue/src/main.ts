import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './codes/Routes'
import store from './store/Store'
import vuetify from './plugins/vuetify';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

