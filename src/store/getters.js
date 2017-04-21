export const consolanteTeams = state => {
  return state.consolante.teams.map((team) => {
    return team.map((player) => {
      return state.players.all.find(x => x.id === player)
    })
  })
}

export const supermeleePlayers = state => {
  return state.supermelee.players.map((group) => {
    return group.map((player) => {
      return state.players.all.find(x => x.id === player)
    })
  })
}

export const teamPlayers = (state, getters) => (players) => {
  return players.map((id) => {
    return getters.getPlayerById(id)
  })
}

export const getPlayerById = (state) => (id) => {
  return state.players.all.find(x => x.id === id)
}
