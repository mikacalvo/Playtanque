/**
 * Mocking client-server processing
 */
const _players = [
  {'id': 1, 'name': 'Jean-Paul', 'done': false},
  {'id': 2, 'name': 'Lola', 'done': false},
  {'id': 3, 'name': 'Sbicca', 'done': false},
  {'id': 4, 'name': 'Capoccetti', 'done': false},
  {'id': 5, 'name': 'Capelatti', 'done': false},
  {'id': 6, 'name': 'Christophe Michel', 'done': false},
  {'id': 7, 'name': 'Anthony', 'done': false},
  {'id': 8, 'name': 'Bruno', 'done': false},
  {'id': 9, 'name': 'Florent', 'done': false},
  {'id': 10, 'name': 'Jordan', 'done': false},
  {'id': 11, 'name': 'Paul', 'done': false},
  {'id': 12, 'name': 'Robert', 'done': false},
  {'id': 13, 'name': 'Rico', 'done': false},
  {'id': 14, 'name': 'Mika', 'done': false}
]

export default {
  getPlayers (cb) {
    setTimeout(() => cb(_players), 100)
  }
}
