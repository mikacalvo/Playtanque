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
// const state =
const state = JSON.parse(window.localStorage.getItem('playtanque_players')) ||
  {
    all: [
      { 'id': 1, 'name': 'Jean-Paul', 'done': false },
      { 'id': 2, 'name': 'Lola', 'done': false },
      { 'id': 3, 'name': 'Sbicca', 'done': false },
      { 'id': 4, 'name': 'Capoccetti', 'done': false },
      { 'id': 5, 'name': 'Capelatti', 'done': false },
      { 'id': 6, 'name': 'Christophe Michel', 'done': false },
      { 'id': 7, 'name': 'Anthony', 'done': false },
      { 'id': 8, 'name': 'Bruno', 'done': false },
      { 'id': 9, 'name': 'Florent', 'done': false },
      { 'id': 10, 'name': 'Jordan', 'done': false },
      { 'id': 11, 'name': 'Paul', 'done': false },
      { 'id': 12, 'name': 'Robert', 'done': false },
      { 'id': 13, 'name': 'Rico', 'done': false },
      { 'id': 14, 'name': 'Mika', 'done': false },
      { 'id': 15, 'name': 'Josette', 'done': false },
      { 'id': 16, 'name': 'Coco', 'done': false },
      { 'id': 17, 'name': 'Katia', 'done': false },
      { 'id': 18, 'name': 'Tarzan', 'done': false },
      { 'id': 19, 'name': 'Victor', 'done': false },
      { 'id': 20, 'name': 'Henri', 'done': false },
      { 'id': 21, 'name': 'Yves', 'done': false },
      { 'id': 22, 'name': 'Jean-Yves', 'done': false },
      { 'id': 23, 'name': 'Gilles', 'done': false },
      { 'id': 24, 'name': 'Alexandre', 'done': false },
      { 'id': 25, 'name': 'Samson', 'done': false },
      { 'id': 26, 'name': 'Erik', 'done': false },
      { 'id': 27, 'name': 'Benjamin', 'done': false },
      { 'id': 28, 'name': 'Joelle', 'done': false },
      { 'id': 29, 'name': 'Nicolas', 'done': false },
      { 'id': 30, 'name': 'Christophe', 'done': false },
      { 'id': 31, 'name': 'Stéphane', 'done': false },
      { 'id': 32, 'name': 'Gérard', 'done': false },
      { 'id': 33, 'name': 'Jean-Marc', 'done': false },
      { 'id': 34, 'name': 'Marc', 'done': false }
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
      id: state.all.length + 1,
      name: text,
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
