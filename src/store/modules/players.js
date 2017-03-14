import consolante from '../../api/consolante'
// import * as types from '../mutation-types'

console.log(JSON.parse(window.localStorage.getItem('playtanque_players') !== 'undefined' ? window.localStorage.getItem('playtanque_players') : '[]'))

// initial state
// shape: [{ name, done }]
const state = window.localStorage.getItem('playtanque_players') !== 'undefined' ? JSON.parse(window.localStorage.getItem('playtanque_players')) : {
  all: []
}

// getters
const getters = {
  allPlayers: state => state.all
}

// actions
const actions = {
  getAllPlayers ({ commit }) {
    consolante.getPlayers(teams => {
      commit('setPlayers', { teams })
    })
  }
}

const mutations = {
  setPlayers (state, { teams }) {
    state.all = teams
  },

  addPlayer (state, { name }) {
    state.all.push({
      name,
      done: false
    })
  },

  deletePlayer (state, { player }) {
    state.all.splice(state.all.indexOf(player), 1)
  },

  togglePlayer (state, { player }) {
    player.done = !player.done
  },

  editPlayer (state, { player, value }) {
    player.name = value
  },

  toggleAll (state, { done }) {
    state.all.forEach((player) => {
      player.done = done
    })
  },

  clearCompleted (state) {
    state.all = state.all.filter(player => !player.done)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
