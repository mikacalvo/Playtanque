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
  all: JSON.parse(window.localStorage.getItem('playtanque_players')) || [
    {'id': 1, 'name': 'Jean-Paul', 'done': false},
    {'id': 2, 'name': 'Lola', 'done': false},
    {'id': 3, 'name': 'Sbicca', 'done': false},
    {'id': 4, 'name': 'Capoccetti', 'done': false},
    {'id': 5, 'name': 'Capelatti', 'done': false},
    {'id': 6, 'name': 'Christophe Michel', 'done': false},
    {'id': 7, 'name': 'Anthony', 'done': false},
    {'id': 8, 'name': 'Bruno', 'done': false},
    {'id': 9, 'name': 'Florent', 'done': false},
    {'id': 10, 'name': 'Jordan', 'done': false},
    {'id': 11, 'name': 'Paul', 'done': false},
    {'id': 12, 'name': 'Robert', 'done': false},
    {'id': 13, 'name': 'Rico', 'done': false},
    {'id': 14, 'name': 'Mika', 'done': false}
  ]
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
