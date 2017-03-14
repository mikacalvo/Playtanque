export const concoursTeams = state => {
  return state.teams.all.map(({ teamName, players }) => {
    return players.length > 0 ? players.map((teamPlayer) => {
      const player = state.players.all.find(p => p.name === teamPlayer.name)
      if (player) {
        return {
          name: player.name
        }
      }
    }) : players
  })
}
