// import * as types from './mutation-types'

export const editConsolante = ({ state, commit }, {key, value}) => {
  var i
  if (key === 'nbTeams') {
    var len = state['consolante'].teams.length
    var max = value > len ? value : len
    for (i = max; i >= 0; i--) {
      if (i >= value) {
        commit('deleteTeam', i)
      } else if (typeof state['consolante'].teams[i] === 'undefined') {
        commit('addTeam', i)
      }
    }
  } else if (key === 'nbPlayers' && value < state['consolante'].nbPlayers) { // Remove extra players
    for (i = 0; i < state['consolante'].teams.length; i++) {
      if (state['consolante'].teams[i].length > value) {
        commit('removeFromTeam', {
          team: state['consolante'].teams[i],
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

export const addToConcours = ({ state, commit }, {player, concours}) => {
  var lastIndex = state[concours].teams.length - 1
  if (lastIndex === -1) {
    commit('addTeam', '')
    lastIndex++
  } else {
    for (var i = 0; i < state[concours].teams.length; i++) {
      if (state[concours].teams[i].length < state[concours].nbPlayers) {
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
      team: state[concours].teams[lastIndex],
      player: player
    })
  }
}

export const removeFromConcours = ({ state, commit }, {player, concours}) => {
  commit('removePlayer', player)
}

export const movePlayer = ({ state, commit }, {player, index, concours}) => {
  commit('removePlayer', player)
  commit('addPlayerToTeam', {
    team: state[concours].teams[index],
    player: player
  })
}
