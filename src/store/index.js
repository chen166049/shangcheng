import Vue from 'vue'
import api from '../http/api'
import Vuex from 'vuex'

Vue.use(Vuex)


//状态共享  所有的组件都可以使用的数据  公共的数据
export default new Vuex.Store({
  //共享的数据
  state: {
    name: 'jack',
    badges: 0
  },
  //改变state的值
  mutations: {
    getgetCard(state) {
      api.getCard().then(res => {
        if(res.code===200){
          state.badges = res.shopList.length
          console.log(state.badges,'微标')
        }else{
          state.badges = 0
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
