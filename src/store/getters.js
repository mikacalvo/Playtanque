export const consolanteTeams = state => {
  return state.consolante.teams
}

export const teamPlayers = (state, getters) => (players) => {
  return players.map((id) => {
    return getters.getPlayerById(id)
  })
}

export const getPlayerById = (state, getters) => (id) => {
  return getters.allPlayers.find(x => x.id === id)
}
