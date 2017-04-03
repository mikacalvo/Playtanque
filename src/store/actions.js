// import * as types from './mutation-types'

export const editConsolante = ({ state, commit }, {key, value}) => {
  console.log('setConsolante', key, value)
  commit('setConsolante', {
    key: key,
    value: value
  })
  if (key === 'nbTeams') {
    var len = state['consolante'].teams.length
    var max = value > len ? value : len
    for (var i = max; i >= 0; i--) {
      if (i >= value) {
        commit('deleteTeam', i)
      } else if (typeof state['consolante'].teams[i] === 'undefined') {
        commit('addTeam', i)
      }
    }
  }
}

export const toggleFromConcours = ({ state, dispatch }, {player, concours}) => {
  if (player.playing) {
    dispatch('removeFromConcours', {
      player: player,
      concours: concours
    })
  } else {
    dispatch('addToConcours', {
      player: player,
      concours: concours
    })
  }
}

export const addToConcours = ({ state, commit }, {player, concours}) => {
  console.log('addToConcours')
  var lastIndex = state[concours].teams.length - 1
  if (lastIndex === -1) {
    commit('addTeam', '')
    lastIndex++
  } else {
    for (var i = 0; i < state[concours].teams.length; i++) {
      if (state[concours].teams[i].length < 3) {
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
    commit('togglePlaying', player)
  }
}

export const removeFromConcours = ({ state, commit }, {player, concours}) => {
  console.log('removeFromConcours')
  console.log(player)
  commit('removePlayer', player)
  commit('togglePlaying', player)
}
