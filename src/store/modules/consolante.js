// import consolante from '../../api/consolante'
// import * as types from '../mutation-types'
import Vue from 'vue'

// initial state
const state = JSON.parse(window.localStorage.getItem('playtanque_consolante')) ||
  {
    'ready': false,
    'nbTeams': 4,
    'nbPlayers': 3,
    'teams': [],
    'tournaments': []
  }

// getters
const getters = {
  ready: state => state.ready,
  consolante: state => state,
  allTeams: state => state.teams,
  tournaments: state => state.tournaments
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
      team: state.teams[oldTeamIndex],
      begin: oldPlayerIndex,
      end: 1
    })
  },

  initTournament ({ state, commit }) {
    var tournaments = []
    let nbTournament = 2
    for (let i = 0; i < nbTournament; i++) {
      if (typeof tournaments[i] === 'undefined') {
        tournaments[i] = []
      }
      let nbTours = (Math.log(state.nbTeams) / Math.log(2)) / Math.pow(2, i)
      for (let j = 0; j < nbTours; j++) {
        if (typeof tournaments[i][j] === 'undefined') {
          tournaments[i][j] = []
        }
        let nbGames = state.nbTeams / Math.pow(2, j + 1)
        for (let k = 0; k < nbGames; k++) {
          if (typeof tournaments[i][j][k] === 'undefined') {
            tournaments[i][j][k] = {}
          }
        }
      }
    }
    // tour 1
    for (let i = 0; i < state.nbTeams; i++) {
      let j = parseInt(i / 2)
      let obj = {}
      obj[i] = 0
      tournaments[0][0][j] = Object.assign(obj, tournaments[0][0][j])
    }
    commit('setTournaments', tournaments)
  },

  updateGame ({ state, commit, dispatch }, { tournament, round, game, team, value }) {
    commit('updateScore', {
      tournament: tournament,
      round: round,
      game: game,
      team: team,
      value: value
    })

    if (value === 13) { // win game, qualify team
      if (state.tournaments[tournament][round][game][Math.abs(team - 1)] === 13) { // Impossible
        commit('updateScore', {
          tournament: tournament,
          round: round,
          game: game,
          team: Math.abs(team - 1),
          value: 0
        })
        dispatch('disqualify', {
          tournament: tournament,
          round: round + 1,
          team: Math.abs(team - 1)
        })
      }

      commit('win', {
        tournament: tournament,
        round: round,
        game: game,
        team: team
      })
    } else { // lose game, disqualify team
      dispatch('disqualify', {
        tournament: tournament,
        round: round + 1,
        team: team
      })
    }
  },

  disqualify ({ state, commit }, { tournament, round, team }) {
    if (round !== state.tournaments[tournament].length) {
      for (var i = 0; i < state.tournaments[tournament][round].length; i++) {
        if (typeof state.tournaments[tournament][round][i] !== 'undefined' && typeof state.tournaments[tournament][round][i][team] !== 'undefined') {
          commit('removeTeamFromGame', {
            tournament: tournament,
            round: round,
            game: i,
            team: team
          })
        }
      }
    }
  }
}

const mutations = {
  setConsolante (state, {key, value}) {
    state[key] = value
  },

  setTeams (state, teams) {
    state.teams = teams.map((team) => {
      return team.map((player) => {
        return player.id
      })
    })
  },

  setTournaments (state, tournaments) {
    state.tournaments = tournaments
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
      team.splice(begin, end)
    } else {
      team.splice(begin)
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
    for (var i = 0; i < state.nbTeams; i++) {
      tmp[i] = state.teams[i].filter(p => p !== player)
    }
    state.teams = tmp
  },

  movePlayer (state, { team, oldIndex, newIndex }) {
    const movedItem = state.teams[team].splice(oldIndex, 1)[0]
    state.teams[team].splice(newIndex, 0, movedItem)
  },

  updateScore (state, { tournament, round, game, team, value }) {
    state.tournaments[tournament][round][game][team] = value
  },

  updateGame (state, { game, team, value }) {
    game[team] = value
  },

  win (state, { tournament, round, game, team }) {
    if (round + 1 !== state.tournaments[tournament].length) {
      let clone = Object.assign({}, state.tournaments)
      let obj = {}
      obj[team] = 0
      clone[tournament][round + 1][parseInt(game / 2)] = Object.assign({}, clone[tournament][round + 1][parseInt(game / 2)], obj)
      Vue.set(state, 'tournaments', state.tournaments)
    }
  },

  removeTeamFromGame (state, { tournament, round, game, team }) {
    if (typeof state.tournaments[tournament][round][game][Math.abs(team - 1)] !== 'undefined') {
      let obj = {}
      obj[Math.abs(team - 1)] = state.tournaments[tournament][round][game][Math.abs(team - 1)]
      state.tournaments[tournament][round][game] = Object.assign(obj, state.tournaments[tournament][round][game])
    } else {
      state.tournaments[tournament][round][game] = {}
    }
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
