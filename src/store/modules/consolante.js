// import consolante from '../../api/consolante'
// import * as types from '../mutation-types'

// initial state
// const state =
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
  consolante: state => state,
  consolanteReady: state => state.ready,
  findTeam: state => (tournament, round, teamId) => {
    for (let i = state.tournaments[tournament][round].length - 1; i >= 0; i--) {
      if (typeof state.tournaments[tournament][round][i] !== 'undefined') {
        for (let j = state.tournaments[tournament][round][i].length - 1; j >= 0; j--) {
          if (state.tournaments[tournament][round][i][j].team === teamId) {
            return {
              game: i,
              index: j
            }
          }
        }
      }
    }
    return false
  }
}

// actions
const actions = {
  editConsolante ({ state, commit }, [key, value]) {
    var i
    if (key === 'nbTeams') {
      var len = state.consolante.teams.length
      var max = value > len ? value : len
      for (i = 0; i < max; i++) {
        if (i >= value) {
          commit('deleteConsolanteTeam')
        } else if (typeof state.consolante.teams[i] === 'undefined') {
          commit('addConsolanteTeam')
        }
      }
    } else if (key === 'nbPlayers' && value < state.consolante.nbPlayers) { // Remove extra players
      for (i = 0; i < state.consolante.teams.length; i++) {
        if (state.consolante.teams[i].length > value) {
          commit('removeFromConsolanteTeam', {
            team: state.consolante.teams[i],
            begin: value
          })
        }
      }
    }
    commit('setConsolante', [key, value])
  },

  addToConsolante ({ state, commit }, player) {
    var lastIndex = state.teams.length - 1
    if (lastIndex === -1) {
      commit('addConsolanteTeam')
      lastIndex++
    } else {
      for (var i = 0; i < state.teams.length; i++) {
        if (state.teams[i].length < state.nbPlayers) {
          lastIndex = i
          break
        }
        lastIndex = null
      }
    }
    if (lastIndex === null) {
      alert('Concours plein')
    } else {
      commit('addPlayerToConsolanteTeam', {
        team: lastIndex,
        player: player.id
      })
    }
  },

  changeConsolantePlayerTeam ({ state, commit }, oldTeamIndex, oldPlayerIndex, newTeamIndex, newPlayerIndex) {
    commit('addPlayerToConsolanteTeam', {
      team: newTeamIndex,
      player: state.teams[oldTeamIndex][oldPlayerIndex],
      index: newPlayerIndex
    })
    commit('removeFromConsolanteTeam', {
      team: state.teams[oldTeamIndex],
      begin: oldPlayerIndex,
      end: 1
    })
  },

  shuffleConsolante ({ state, commit }) {
    var a = state.teams.slice(0)
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]]
    }
    commit('setConsolante', ['teams', a])
  },

  initTournament ({ state, commit }) {
    var tournaments = []
    let nbTournament = 2
    for (let i = 0; i < nbTournament; i++) {
      if (typeof tournaments[i] === 'undefined') {
        tournaments[i] = [] // rounds
      }
      let nbRounds = (Math.log(state.nbTeams) / Math.log(2)) - i
      for (let j = 0; j < nbRounds; j++) {
        if (typeof tournaments[i][j] === 'undefined') {
          tournaments[i][j] = [] // games
        }
        let nbGames = state.nbTeams / Math.pow(2, j + i + 1)
        for (let k = 0; k < nbGames; k++) {
          if (typeof tournaments[i][j][k] === 'undefined') {
            tournaments[i][j][k] = []
          }
        }
      }
    }
    // tour 1
    for (let i = 0; i < state.nbTeams; i++) {
      let j = parseInt(i / 2)
      tournaments[0][0][j][i % 2] = {team: i, score: 0}
    }
    commit('setConsolante', ['tournaments', tournaments])
  },

  updateConsolanteGame ({ state, commit, dispatch }, { tournament, round, game, index, value }) {
    commit('updateConsolanteGame', {
      game: state.tournaments[tournament][round][game][index],
      value: value
    })

    if (value === 13) { // win game, qualify team
      if (state.tournaments[tournament][round][game][Math.abs(index - 1)].score === 13) { // the other can't win too
        commit('updateConsolanteGame', {
          game: state.tournaments[tournament][round][game][Math.abs(index - 1)],
          value: 0
        })
        dispatch('disqualify', {
          tournament: tournament,
          round: round + 1,
          teamId: state.tournaments[tournament][round][game][Math.abs(index - 1)].team
        })
      }

      dispatch('qualify', {
        tournament: tournament,
        round: round + 1,
        game: game,
        teamId: state.tournaments[tournament][round][game][index].team
      })

      if (round === 0 && typeof state.tournaments[tournament + 1] !== 'undefined') {
        // remove team from next tournament
        dispatch('disqualify', {
          tournament: tournament + 1,
          round: round,
          teamId: state.tournaments[tournament][round][game][index].team
        })
        // send losing team to next tournament
        dispatch('qualify', {
          tournament: tournament + 1,
          round: round,
          game: game,
          teamId: state.tournaments[tournament][round][game][Math.abs(index - 1)].team
        })
      }
    } else { // lose game, disqualify team
      dispatch('disqualify', {
        tournament: tournament,
        round: round + 1,
        teamId: state.tournaments[tournament][round][game][index].team
      })
    }
  },

  qualify ({ state, commit, getters }, { tournament, round, game, teamId }) {
    console.log('qualify')
    if (
      round !== state.tournaments[tournament].length && // if not final round
      getters.findTeam(tournament, round, teamId) === false // if not already qualified
    ) { // then qualify
      commit('winConsolanteGame', {
        tournament: tournament,
        round: round,
        game: game,
        teamId: teamId
      })
    }
  },

  disqualify ({ state, commit, getters }, { tournament, round, teamId }) {
    if (round !== state.tournaments[tournament].length) {
      let ret = getters.findTeam(tournament, round, teamId)
      if (ret !== false) {
        commit('removeTeamFromConsolanteGame', {
          tournament: tournament,
          round: round,
          game: ret.game,
          index: ret.index
        })
      }
    }
  }
}

const mutations = {
  setConsolante (state, [key, value]) {
    state[key] = value
  },

  addConsolanteTeam (state) {
    state.teams.push([])
  },

  deleteConsolanteTeam (state, index) {
    if (index >= 0) {
      state.teams.splice(index, 1)
    } else {
      state.teams.splice(-1, 1)
    }
  },

  removeFromConsolanteTeam (state, { team, begin, end }) {
    if (typeof end !== 'undefined') {
      team.splice(begin, end)
    } else {
      team.splice(begin)
    }
  },

  addPlayerToConsolanteTeam (state, { team, player, index }) {
    if (index >= 0) {
      state.teams[team].splice(index, 0, player)
    } else {
      state.teams[team].push(player)
    }
  },

  removeConsolantePlayer (state, player) {
    var tmp = []
    for (var i = 0; i < state.nbTeams; i++) {
      tmp[i] = state.teams[i].filter(p => p !== player)
    }
    state.teams = tmp
  },

  moveConsolantePlayer (state, [team, oldIndex, newIndex]) {
    const movedItem = state.teams[team].splice(oldIndex, 1)[0]
    state.teams[team].splice(newIndex, 0, movedItem)
  },

  updateConsolanteGame (state, { game, value }) {
    Object.assign(game, {score: value})
  },

  winConsolanteGame (state, { tournament, round, game, teamId }) {
    state.tournaments[tournament][round][parseInt(game / 2)].push({team: teamId, score: 0})
  },

  removeTeamFromConsolanteGame (state, { tournament, round, game, index }) { // disqualify
    state.tournaments[tournament][round][game].splice(index, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
