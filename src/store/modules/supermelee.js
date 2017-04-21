// initial state
// const state =
const state = JSON.parse(window.localStorage.getItem('playtanque_supermelee')) ||
  {
    'ready': false,
    'nbGroups': 3,
    'nbRounds': 4,
    'players': [
      [], [], []
    ],
    'tournament': []
  }

// getters
const getters = {
  supermelee: state => state,
  supermeleeReady: state => state.ready,
  supermeleeTournament: state => state.tournament
}

// actions
const actions = {
  editSupermelee ({ state, commit }, [key, value]) {
    let i
    if (key === 'nbGroups') {
      let len = state.players.length
      let max = value > len ? value : len
      for (i = 0; i < max; i++) {
        if (i >= value) {
          commit('deleteGroup')
        } else if (typeof state.players[i] === 'undefined') {
          commit('addGroup')
        }
      }
    }
    commit('setSupermelee', [key, value])
  },

  changePlayerGroup ({ state, commit }, [oldGroupIndex, oldPlayerIndex, newGroupIndex, newPlayerIndex]) {
    commit('addPlayerToGroup', {
      group: state.players[newGroupIndex],
      player: state.players[oldGroupIndex][oldPlayerIndex],
      index: newPlayerIndex
    })
    commit('removePlayerFromGroup', {
      group: state.players[oldGroupIndex],
      begin: oldPlayerIndex,
      end: 1
    })
  },

  shuffle ({ state, commit }) {
    var a = state.players.slice(0)
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]]
    }
    commit('setPlayers', a)
  },

  initTournament ({ state, commit }) {
    var tournament = []
    let nbTournament = 2
    for (let i = 0; i < nbTournament; i++) {
      if (typeof tournament[i] === 'undefined') {
        tournament[i] = [] // rounds
      }
      for (let j = 0; j < state.nbRounds; j++) {
        if (typeof tournament[i][j] === 'undefined') {
          tournament[i][j] = [] // games
        }
        let nbGames = parseInt(state.players.length / state.teamSize)
        for (let k = 0; k < nbGames; k++) {
          if (typeof tournament[i][j][k] === 'undefined') {
            tournament[i][j][k] = {team: k, score: 0}
          }
        }
      }
    }
    commit('setTournament', tournament)
  },

  updateGame ({ state, commit, dispatch }, { tournament, round, game, index, value }) {
    commit('updateGame', {
      game: state.tournaments[tournament][round][game][index],
      value: value
    })

    if (value === 13) { // win game, qualify team
      if (state.tournaments[tournament][round][game][Math.abs(index - 1)].score === 13) { // the other can't win too
        commit('updateGame', {
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
  }
}

const mutations = {
  setSupermelee (state, [key, value]) {
    state[key] = value
  },

  setPlayers (state, players) {
    state.players = players
  },

  addPlayer (state, player) {
    state.players[0].push(player)
  },

  addGroup (state) {
    state.players.push([])
  },

  deleteGroup (state, index) {
    if (index >= 0) {
      state.players.splice(index, 1)
    } else {
      state.players.splice(-1, 1)
    }
  },

  addPlayerToGroup (state, { group, player, index }) {
    if (index >= 0) {
      group.splice(index, 0, player)
    } else {
      group.push(player)
    }
  },

  removePlayer (state, player) {
    var tmp = state.players.slice(0)
    tmp = tmp.map((group) => {
      return group.filter(p => p !== player)
    })
    state.players = tmp
  },

  removePlayerFromGroup (state, { group, begin, end }) {
    if (typeof end !== 'undefined') {
      group.splice(begin, end)
    } else {
      group.splice(begin)
    }
  },

  supermeleeMovePlayer (state, [group, oldIndex, newIndex]) {
    const movedItem = state.players[group].splice(oldIndex, 1)[0]
    state.players[group].splice(newIndex, 0, movedItem)
  },

  setTournament (state, tournament) {
    state.tournament = tournament
  },

  updateGame (state, { game, value }) {
    Object.assign(game, {score: value})
  },

  win (state, { tournament, round, game, teamId }) {
    state.tournaments[tournament][round][parseInt(game / 2)].push({team: teamId, score: 0})
  },

  lose (state, { tournament, round, game, teamId }) {
    state.tournaments[tournament][round][parseInt(game / 2)].push({team: teamId, score: 0})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
