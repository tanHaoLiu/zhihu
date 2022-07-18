import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import { Lazyload } from 'vant';


// import "./less/index.less";

Vue.use(Lazyload);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
