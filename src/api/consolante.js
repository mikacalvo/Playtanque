/**
 * Mocking client-server processing
 */
const _players = [
  {'name': 'Mika', 'done': false},
  {'name': 'Jean-Paul', 'done': false},
  {'name': 'Lola', 'done': false},
  {'name': 'Sbicca', 'done': false},
  {'name': 'Capoccetti', 'done': false},
  {'name': 'Capelatti', 'done': false},
  {'name': 'Christophe Michel', 'done': false},
  {'name': 'Anthony', 'done': false},
  {'name': 'Bruno', 'done': false},
  {'name': 'Florent', 'done': false},
  {'name': 'Jordan', 'done': false},
  {'name': 'Paul', 'done': false},
  {'name': 'Robert', 'done': false},
  {'name': 'Rico', 'done': false}
]

const _teams = [
  {'name': 'équipe 1', 'players': [{'name': 'Mika'}]},
  {'name': 'équipe 2', 'players': []},
  {'name': 'équipe 3', 'players': []}
]

export default {
  getPlayers (cb) {
    setTimeout(() => cb(_players), 100)
  },

  getTeams (cb) {
    setTimeout(() => cb(_teams), 100)
  },

  win (cb) {
    setTimeout(() => cb(_teams), 100)
  },

  lose (teams, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}
