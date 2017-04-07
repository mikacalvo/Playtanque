// import consolante from '../../api/consolante'
// import * as types from '../mutation-types'

// initial state
const state = JSON.parse(window.localStorage.getItem('playtanque_consolante')) ||
  {
    'nbTeams': 4,
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
  changePlayerTeam ({ state, commit }, { oldTeamIndex, oldPlayerIndex, newTeamIndex, newPlayerIndex }) {
    commit('addPlayerToTeam', {
      team: newTeamIndex,
      player: state.teams[oldTeamIndex][oldPlayerIndex],
      index: newPlayerIndex
    })
    commit('removeFromTeam', {
      team: oldTeamIndex,
      begin: oldPlayerIndex,
      end: 1
    })
  }
}

const mutations = {
  setConsolante (state, {key, value}) {
    state[key] = value
  },

  setTeams (state, teams) {
    state.teams = teams
  },

  addTeam (state) {
    state.teams.push([])
  },

  deleteTeam (state, index) {
    if (index >= 0) {
      state.teams.splice(index, 1)
    } else {
      state.teams.splice(-1, 1)
    }
  },

  removeFromTeam (state, { team, begin, end }) {
    if (typeof end !== 'undefined') {
      state.teams[team].splice(begin, end)
    } else {
      state.teams[team].splice(begin)
    }
  },

  addPlayerToTeam (state, { team, player, index }) {
    if (index >= 0) {
      state.teams[team].splice(index, 0, player)
    } else {
      state.teams[team].push(player)
    }
  },

  removePlayer (state, player) {
    var tmp = []
    for (var i = 0; i < state.teams.length; i++) {
      tmp[i] = state.teams[i].filter(p => p !== player)
    }
    state.teams = tmp
  },

  movePlayer (state, { team, oldIndex, newIndex }) {
    const movedItem = state.teams[team].splice(oldIndex, 1)[0]
    state.teams[team].splice(newIndex, 0, movedItem)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
