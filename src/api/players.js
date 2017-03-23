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

export default {
  getPlayers (cb) {
    setTimeout(() => cb(_players), 100)
  }
}
