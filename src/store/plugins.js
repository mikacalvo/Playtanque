import createLogger from '../plugins/logger'

const localStoragePlugin = store => {
  store.subscribe((mutation, { players }) => {
    window.localStorage.setItem('playtanque_players', JSON.stringify(players))
  })

  store.subscribe((mutation, { teams }) => {
    window.localStorage.setItem('playtanque_teams', JSON.stringify(teams))
  })
}

export default process.env.NODE_ENV !== 'production'
  ? [createLogger(), localStoragePlugin]
  : [localStoragePlugin]
