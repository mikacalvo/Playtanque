// import consolante from '../../api/consolante'
// import * as types from '../mutation-types'

// initial state
const state = JSON.parse(window.localStorage.getItem('playtanque_consolante')) ||
  {
    'nbTeams': 24,
    'nbPlayers': 3,
    'teams': []
  }

// getters
const getters = {
  state: state => state,
  allTeams: state => state.teams
}

// actions
const actions = {
}

const mutations = {
  setConsolante (state, {key, value}) {
    state[key] = value
  },

  setTeams (state, teams) {
    state.teams = teams
  },

  addTeam (state, index) {
    if (index >= 0) {
      state.teams[index] = []
    } else {
      state.teams.push([])
    }
  },

  deleteTeam (state, index) {
    state.teams.splice(index, 1)
  },

  editTeam (state, { team, value }) {
    team.name = value
  },

  addPlayerToTeam (state, { team, player }) {
    team.push(player.id)
  },

  removePlayer (state, player) {
    var tmp = []
    for (var i = 0; i < state.teams.length; i++) {
      tmp[i] = state.teams[i].filter(p => p !== player.id)
    }
    state.teams = tmp
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
