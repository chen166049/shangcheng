import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './http/api'
import Vant from 'vant';
import 'vant/lib/index.css';
import { ImagePreview } from 'vant';
import utils from './utils'




Vue.use(ImagePreview)
Vue.use(Vant);

//挂载在原型对象上
Vue.prototype.$api = api
Vue.prototype.$utils = utils

Vue.config.productionTip = false

Vue.prototype.$details = (id) => {
  router.push({
    path:'/details',
    query:{
      id:id
    }
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
