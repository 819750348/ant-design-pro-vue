import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import approval from './modules/approval'
import knowledge from './modules/knowledge'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    approval,
    knowledge
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
