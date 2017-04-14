// import * as types from './mutation-types'

export const editConsolante = ({ state, commit }, {key, value}) => {
  var i
  if (key === 'nbTeams') {
    var len = state.consolante.teams.length
    var max = value > len ? value : len
    for (i = 0; i < max; i++) {
      if (i >= value) {
        commit('deleteTeam')
      } else if (typeof state.consolante.teams[i] === 'undefined') {
        commit('addTeam')
      }
    }
  } else if (key === 'nbPlayers' && value < state.consolante.nbPlayers) { // Remove extra players
    for (i = 0; i < state.consolante.teams.length; i++) {
      if (state.consolante.teams[i].length > value) {
        commit('removeFromTeam', {
          team: state.consolante.teams[i],
          begin: value
        })
      }
    }
  }
  commit('setConsolante', {
    key: key,
    value: value
  })
}

export const addToTournament = ({ state, commit }, {player, tournament}) => {
  var lastIndex = state[tournament].teams.length - 1
  if (lastIndex === -1) {
    commit('addTeam')
    lastIndex++
  } else {
    for (var i = 0; i < state[tournament].teams.length; i++) {
      if (state[tournament].teams[i].length < state[tournament].nbPlayers) {
        lastIndex = i
        break
      }
      lastIndex = null
    }
  }
  if (lastIndex === null) {
    alert('Concours plein')
  } else {
    commit('addPlayerToTeam', {
      team: lastIndex,
      player: player.id
    })
  }
}

export const removeFromTournament = ({ state, commit }, {player, tournament}) => {
  commit('removePlayer', player.id)
}
