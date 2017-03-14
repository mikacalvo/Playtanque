import consolante from '../../api/consolante'
// import * as types from '../mutation-types'

console.log(JSON.parse(window.localStorage.getItem('playtanque_teams') !== 'undefined' ? window.localStorage.getItem('playtanque_teams') : '[]'))

// initial state
// shape: [{ name, players }]
const state = window.localStorage.getItem('playtanque_teams') !== 'undefined' ? JSON.parse(window.localStorage.getItem('playtanque_teams')) : {
  all: [],
  consolante: [],
  melee: [],
  points: []
}

// getters
const getters = {
  allTeams: state => state.all
}

// actions
const actions = {
  getAllTeams ({ commit }) {
    consolante.getTeams(teams => {
      commit('setTeams', { teams })
    })
  }
}

const mutations = {
  setTeams (state, { teams }) {
    state.all = teams
  },

  addTeam (state, { name }) {
    state.all.push({
      name,
      players: []
    })
  },

  deleteTeam (state, { team }) {
    state.all.splice(state.all.indexOf(team), 1)
  },

  editTeam (state, { team, value }) {
    team.name = value
  },

  addPlayerToTeam (state, { team, player }) {
    const myTeam = state.all.find(t => t.name === team.name)
    myTeam.push(player)
  },

  removePlayer (state, { team, player }) {
    team.players.splice(team.players.indexOf(player), 1)
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
