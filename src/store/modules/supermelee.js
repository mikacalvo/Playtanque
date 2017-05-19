var threshold = 0
var thresholdTeams = 0
var thresholdGames = 0

// initial state
// const state =
const state = JSON.parse(window.localStorage.getItem('playtanque_supermelee')) ||
  {
    'ready': false,
    'loading': false,
    'nbGroups': 3,
    'nbRounds': 4,
    'players': [
      [], [], []
    ],
    'tournament': [],
    'uniqueness': [{'nb': 24, 'teams': [[[5, 19, 11], [4, 17, 9], [2, 18, 10], [7, 21, 13], [0, 16, 8], [6, 23, 15], [1, 20, 12], [3, 22, 14]], [[4, 18, 8], [7, 19, 12], [3, 23, 13], [5, 22, 15], [0, 21, 14], [6, 20, 11], [1, 17, 10], [2, 16, 9]], [[2, 21, 12], [6, 16, 10], [3, 17, 8], [5, 18, 9], [4, 23, 14], [0, 20, 15], [1, 19, 13], [7, 22, 11]], [[0, 23, 9], [1, 21, 15], [2, 22, 13], [3, 16, 11], [4, 19, 10], [6, 18, 12], [7, 17, 14], [5, 20, 8]]], 'games': [[[0, 1], [2, 3], [4, 5], [6, 7]], [[0, 1], [2, 3], [4, 5], [6, 7]], [[0, 2], [1, 4], [3, 6], [5, 7]], [[0, 1], [2, 3], [4, 6], [5, 7]]]}]
  }

// getters
const getters = {
  supermelee: state => state,
  supermeleeReady: state => state.ready,
  supermeleeNbGroups: state => state.nbGroups,
  supermeleeLoading: state => state.loading,
  supermeleeTournament: state => state.tournament,
  supermeleeTeams: state => state.tournament.teams,
  supermeleeResults: state => state.tournament.teams,
  combinations: () => {
    var indices = []
    var lengths = []
    var joueurs = []
    var i
    var j
    for (i = state.players.length - 1; i >= 1; i--) {
      joueurs.push(state.players[i].slice(0))
    }
    for (i = 0; i < joueurs.length; i++) {
      indices[i] = 0
      lengths[i] = joueurs[i].length
    }
    var combinaisons = []
    while (indices[0] < lengths[0]) {
      var row = []
      for (i = 0; i < indices.length; i++) {
        row.push(joueurs[i][indices[i]])
      }
      combinaisons.push(row)
      /* Cycle the indexes */
      for (j = indices.length - 1; j >= 0; j--) {
        indices[j]++
        if (indices[j] >= lengths[j] && j !== 0) {
          indices[j] = 0
        } else {
          break
        }
      }
    }
    return combinaisons
  },
  getTeamsFromUniqueness: state => () => {
    let correspondances = []
    for (let group of state.players) {
      for (let player of group) {
        correspondances.push(player)
      }
    }
    let nbplayers = state.players[0].length * state.nbGroups
    let uniqueComb = state.uniqueness.filter(function (obj) {
      return obj.nb === nbplayers
    })
    if (uniqueComb.length > 0 && typeof uniqueComb[0].teams !== 'undefined') {
      return uniqueComb[0].teams.map((round) => {
        return round.map((team) => {
          return team.map((player) => {
            return correspondances[player]
          })
        })
      })
    } else {
      return false
    }
  },
  getGamesFromUniqueness: state => () => {
    let nbplayers = state.players[0].length * state.nbGroups
    let uniqueComb = state.uniqueness.filter(function (obj) {
      return obj.nb === nbplayers
    })
    return uniqueComb.length > 0 && typeof uniqueComb[0].games !== 'undefined' ? uniqueComb[0].games : false
  },
  uniqueTeams: state => (tolerance) => {
    var ret = false
    var equipes = []
    var playingWith = []

    function countIndexesOf (arr, player) {
      let index = arr.indexOf(player)
      let counter = 0
      while (index >= 0) {
        index = arr.indexOf(player, index + 1)
        counter++
      }
      return counter
    }

    function isUsed (usedRound, players) {
      for (let i = 0; i < players.length; i++) {
        if (usedRound.indexOf(players[i]) !== -1) {
          return true
        }
      }
      return false
    }

    function addUsed (usedRound, players) {
      for (let i = 0; i < players.length; i++) {
        usedRound.push(players[i])
      }
    }

    function teamExists (players) {
      let exists
      for (let i = 0; i < equipes.length; i++) {
        for (let j = equipes[i].length - 1; j >= 0; j--) {
          exists = true
          for (let k = 0; k < players.length; k++) {
            if (equipes[i][j].indexOf(players[k]) === -1) {
              exists = false
            }
          }
          if (exists === true) {
            return true
          }
        }
      }
      return false
    }

    function testPlayingWith (players) {
      for (let i = 0; i < players.length; i++) {
        for (let j = players.length - 1; j >= 0; j--) {
          if (j !== i) {
            if (playingWith[players[i]].indexOf(players[j]) !== -1) {
              if (countIndexesOf(playingWith[players[i]], players[j]) > tolerance) {
                return true
              }
            }
          }
        }
      }
      return false
    }

    function addPlayingWith (players) {
      for (let i = 0; i < players.length; i++) {
        for (let j = players.length - 1; j >= 0; j--) {
          playingWith[players[i]].push(players[j])
        }
      }
    }

    function addToTeam (team, players) {
      for (let i = 0; i < players.length; i++) {
        team.push(players[i])
      }
    }

    function get () {
      var used = []
      var nbPlayerByGroup = state.players[0].length
      var tmp = state.players[0].slice(0)
      var comb = getters.combinations()
      var i
      var j
      var k
      for (var t = 0; t < state.players.length; t++) {
        for (var tt = 0; tt < state.players[t].length; tt++) {
          playingWith[state.players[t][tt]] = []
        }
      }
      for (i = 0; i < state.nbRounds; i++) {
        equipes[i] = []
        used[i] = [] // joueurs déjà utilisés pour ce tour.
        getters.shuffle(tmp)
        for (j = 0; j < nbPlayerByGroup; j++) {
          equipes[i][j] = []
          equipes[i][j].push(tmp[j])
        }
        for (j = 0; j < nbPlayerByGroup; j++) { // pour chaque tireur
          for (k = 0; k < comb.length; k++) {
            if (
              isUsed(used[i], comb[k]) === false &&
              teamExists([tmp[j]].concat(comb[k])) === false &&
              testPlayingWith([tmp[j]].concat(comb[k])) === false
            ) {
              addToTeam(equipes[i][j], comb[k])
              addPlayingWith([tmp[j]].concat(comb[k]))
              addUsed(used[i], comb[k])
              break
            } else if (typeof comb[k + 1] === 'undefined') {
              return false
            }
          }
          if (equipes[i][j].length < 3) {
            return false
          }
        }
      }
      return equipes
    }
    while (ret === false && threshold < state.players[0].length * 100) {
      ret = get()
      threshold++
    }
    return ret
  },
  uniqueGames: state => (teams, tolerance) => {
    var ret = false
    var res = false

    var games = []
    var playingAgainst = []
    var tmpEquipes = teams.slice(0)
    var roundIterator
    var thresholdRound = 0

    function countIndexesOf (arr, player) {
      let index = arr.indexOf(player)
      let counter = 0
      while (index >= 0) {
        index = arr.indexOf(player, index + 1)
        counter++
      }
      return counter
    }

    function isUsed (rounds, teamIndex) {
      for (let i = 0; i < rounds.length; i++) {
        if (rounds[i].indexOf(teamIndex) !== -1) {
          return true
        }
      }
      return false
    }

    function testPlayingAgainst (players) {
      for (let i = 0; i < players.length; i++) {
        for (let j = players.length - 1; j >= 0; j--) {
          if (j !== i) {
            if (countIndexesOf(playingAgainst[players[i]], players[j]) > tolerance) {
              return true
            }
          }
        }
      }
      return false
    }

    function addPlayingAgainst (players, opponents) {
      for (let i = 0; i < opponents.length; i++) {
        for (let j = players.length - 1; j >= 0; j--) {
          playingAgainst[players[i]].push(opponents[j])
          playingAgainst[opponents[j]].push(players[i])
        }
      }
    }

    function getValidRound (teams) {
      let opponentIndex
      let roundGames = []
      let numeroMatch = 0
      let equipeIndex = 0
      while (equipeIndex < teams.length) {
        equipeIndex = 0
        if (typeof roundGames[numeroMatch] === 'undefined') { // La première équipe peut être n'importe laquelle non déjà utilisée
          while (isUsed(games.concat(roundGames), equipeIndex)) {
            equipeIndex++
          }
          if (equipeIndex < teams.length) {
            roundGames[numeroMatch] = []
            roundGames[numeroMatch].push(equipeIndex)
          }
        } else { // Pour la deuxième, on reteste tout le monde
          opponentIndex = 0
          while (opponentIndex < teams.length) {
            if (!isUsed(games.concat(roundGames), opponentIndex)) {
              if (!testPlayingAgainst(teams[opponentIndex])) {
                roundGames[numeroMatch].push(opponentIndex)
                addPlayingAgainst(teams[roundGames[numeroMatch][0]], teams[opponentIndex])
                numeroMatch++
                break
              }
            }
            opponentIndex++
          }
          if (opponentIndex === teams.length) { // Si on n'a pas trouvé une paire, il faut tester de nouvelles combinaisons
            return false
          }
        }
      }
      return roundGames
    }

    function get () {
      games = []
      playingAgainst = []
      for (var t = 0; t < state.players.length; t++) {
        for (var tt = 0; tt < state.players[t].length; tt++) {
          playingAgainst[state.players[t][tt]] = []
        }
      }
      for (roundIterator = 0; roundIterator < state.nbRounds; roundIterator++) {
        games[roundIterator] = []
        res = false
        while (res === false && thresholdRound < 5) { // state.players[0].length * 100
          getters.shuffle(tmpEquipes[roundIterator])
          res = getValidRound(tmpEquipes[roundIterator])
          thresholdRound++
        }
        if (res) {
          games[roundIterator] = res
        } else {
          return false
        }
      }
      return games
    }
    while (ret === false && threshold < 20) { // state.players[0].length * 100
      ret = get()
      threshold++
    }
    return ret
  },
  shuffle (a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]]
    }
  }
}

// actions
const actions = {
  editSupermelee ({ state, commit }, [key, value]) {
    let i
    if (key === 'nbGroups') {
      let len = state.players.length
      let max = value > len ? value : len
      for (i = 0; i < max; i++) {
        if (i >= value) {
          commit('deleteSupermeleeGroup')
        } else if (typeof state.players[i] === 'undefined') {
          commit('addSupermeleeGroup')
        }
      }
    }
    commit('setSupermelee', [key, value])
  },

  changeSupermeleePlayerGroup ({ state, commit }, [oldGroupIndex, oldPlayerIndex, newGroupIndex, newPlayerIndex]) {
    commit('addPlayerToSupermeleeGroup', {
      group: state.players[newGroupIndex],
      player: state.players[oldGroupIndex][oldPlayerIndex],
      index: newPlayerIndex
    })
    commit('removePlayerFromSupermeleeGroup', {
      group: state.players[oldGroupIndex],
      begin: oldPlayerIndex,
      end: 1
    })
  },

  shuffleSupermelee ({ state, commit, dispatch }) {
    let a = state.players.slice(0)
    for (let i = a.length - 1; i >= 0; i--) {
      for (let j = a[i].length; j; j--) {
        let k = Math.floor(Math.random() * j);
        [a[i][j - 1], a[i][k]] = [a[i][k], a[i][j - 1]]
      }
    }
    commit('setSupermelee', ['players', a])
  },

  saveUniqueness ({ commit }, [teams, games]) {
    let correspondances = []
    for (let group of state.players) {
      for (let player of group) {
        correspondances.push(player)
      }
    }
    let tmpTeams = teams.map((round) => {
      return round.map((team) => {
        return team.map((player) => {
          return parseInt(Object.keys(correspondances).find(key => correspondances[key] === player))
        })
      })
    })
    commit('addSupermeleeUniqueness', [tmpTeams, games])
  },

  initSupermelee ({ state, commit, getters, dispatch }) {
    let uniquenessThreshold = 0
    var teams = getters.getTeamsFromUniqueness()
    var games = getters.getGamesFromUniqueness()
    if (teams === false || games === false) {
      while (uniquenessThreshold < 2000) {
        teams = false
        games = false
        thresholdTeams = 0
        while (teams === false && thresholdTeams < state.players[0].length) {
          threshold = 0
          teams = getters.uniqueTeams(thresholdTeams++)
        }
        thresholdGames = 0
        while (games === false && thresholdGames < 2) {
          threshold = 0
          games = getters.uniqueGames(teams, thresholdGames++)
        }
        if (thresholdTeams === 1 && thresholdGames === 1) {
          dispatch('saveUniqueness', [teams, games])
          break
        } else {
          uniquenessThreshold++
        }
      }
    }
    commit('setSupermelee', ['tournament', {
      teams: teams,
      games: games.map((round) => {
        return round.map((game) => {
          return [
            {
              team: game[0],
              score: 0
            },
            {
              team: game[1],
              score: 0
            }
          ]
        })
      })
    }])
    commit('setSupermelee', ['loading', false])
  },

  updateSupermeleeGame ({ state, commit, dispatch }, { round, game, index, value }) {
    commit('updateSupermeleeGame', {
      game: state.tournament.games[round][game][index],
      value: value
    })
  }
}

const mutations = {
  setSupermelee (state, [key, value]) {
    state[key] = value
  },

  addPlayerToSupermelee (state, player) {
    state.players[0].push(player)
  },

  addSupermeleeGroup (state) {
    state.players.push([])
  },

  deleteSupermeleeGroup (state, index) {
    if (index >= 0) {
      state.players.splice(index, 1)
    } else {
      state.players.splice(-1, 1)
    }
  },

  addPlayerToSupermeleeGroup (state, { group, player, index }) {
    if (index >= 0) {
      group.splice(index, 0, player)
    } else {
      group.push(player)
    }
  },

  removePlayerFromSupermelee (state, player) {
    var tmp = state.players.slice(0)
    tmp = tmp.map((group) => {
      return group.filter(p => p !== player)
    })
    state.players = tmp
  },

  removePlayerFromSupermeleeGroup (state, { group, begin, end }) {
    if (typeof end !== 'undefined') {
      group.splice(begin, end)
    } else {
      group.splice(begin)
    }
  },

  moveSupermeleePlayer (state, [group, oldIndex, newIndex]) {
    const movedItem = state.players[group].splice(oldIndex, 1)[0]
    state.players[group].splice(newIndex, 0, movedItem)
  },

  addSupermeleeUniqueness (state, [teams, games]) {
    state.uniqueness.push({
      nb: state.players[0].length * state.nbGroups,
      teams: teams,
      games: games
    })
  },

  updateSupermeleeGame (state, { game, value }) {
    Object.assign(game, {score: value})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
