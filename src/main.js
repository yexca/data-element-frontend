import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// i18n
import i18n from '@/lang';

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  el: '#app',
  i18n,
  render: h => h(App)
}).$mount('#app')
