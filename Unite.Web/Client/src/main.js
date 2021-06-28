import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import router from './router'
import store from './store'
import './quasar'

import USpinner from './components/common/workflow/Spinner.vue';

Vue.config.productionTip = false
Vue.use(VueCookies)

Vue.component('u-spinner', USpinner);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
