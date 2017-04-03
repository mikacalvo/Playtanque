import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import players from './modules/players'
import consolante from './modules/consolante'
import plugins from './plugins'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    players,
    consolante
  },
  strict: debug,
  plugins
})
