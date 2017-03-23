const STORAGE_KEY = 'playtanque_players'

import playersapi from '../../api/players'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

const state = {
  players: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
}

const getters = {
  allPlayers: state => state.players
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
    state.players = players
  },

  addPlayer (state, { text }) {
    state.players.push({
      text,
      done: false
    })
  },

  deletePlayer (state, { player }) {
    state.players.splice(state.players.indexOf(player), 1)
  },

  togglePlayer (state, { player }) {
    player.done = !player.done
  },

  editPlayer (state, { player, value }) {
    player.text = value
  },

  toggleAll (state, { done }) {
    state.players.forEach((player) => {
      player.done = done
    })
  },

  clearCompleted (state) {
    state.players = state.players.filter(player => !player.done)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
