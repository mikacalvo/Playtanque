const STORAGE_KEY = 'playtanque_players'

import playersapi from '../../api/players'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

// initial state
// shape: {
//   'id': int,
//   'name': string,
//   'done': bool
// }
const state = {
  all: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
}

const getters = {
  allPlayers: state => state.all
}

const actions = {
  getAllPlayers ({ commit }) {
    playersapi.getPlayers(players => {
      commit('setPlayers', { players })
    })
  }
}

const mutations = {
  setPlayers (state, { players }) {
    state.all = players
  },

  addPlayer (state, { text }) {
    state.all.push({
      text,
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
    player.text = value
  },

  toggleAll (state, { done }) {
    state.all.forEach((player) => {
      player.done = done
    })
  },

  clearCompleted (state) {
    state.all = state.players.filter(player => !player.done)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
