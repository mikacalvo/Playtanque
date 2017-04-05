export const consolanteTeams = state => {
  return state.consolante.teams
}

export const teamPlayers = (state, getters) => (players) => {
  return players.map((id) => {
    return getters.getPlayerById(id)
  })
}

export const getPlayerById = (state) => (id) => {
  return state.players.all.find(x => x.id === id)
}
