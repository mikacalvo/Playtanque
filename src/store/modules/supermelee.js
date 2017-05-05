var threshold = 0
var thresholdTeams = 0
var thresholdGames = 0

// initial state
// const state =
const state = JSON.parse(window.localStorage.getItem('playtanque_supermelee')) ||
  {
    'ready': false,
    'nbGroups': 3,
    'nbRounds': 4,
    'players': [
      [], [], []
    ],
    'tournament': [],
    'uniqueness': [{'nb': 12, 'teams': [[[2, 8, 4], [1, 9, 5], [0, 10, 6], [3, 11, 7]], [[2, 9, 6], [1, 8, 7], [0, 11, 4], [3, 10, 5]], [[0, 8, 5], [3, 9, 4], [1, 11, 6], [2, 10, 7]], [[2, 11, 5], [3, 8, 6], [1, 10, 4], [0, 9, 7]]]}, {'nb': 18, 'teams': [[[0, 12, 6], [5, 13, 7], [1, 14, 8], [4, 15, 9], [3, 16, 10], [2, 17, 11]], [[1, 12, 7], [3, 13, 6], [2, 14, 9], [5, 15, 8], [0, 16, 11], [4, 17, 10]], [[2, 12, 8], [4, 13, 11], [0, 14, 7], [5, 16, 6], [1, 15, 10], [3, 17, 9]], [[1, 13, 9], [2, 15, 6], [5, 12, 10], [3, 14, 11], [4, 16, 7], [0, 17, 8]]]}, {'nb': 21, 'teams': [[[1, 14, 7], [4, 15, 8], [2, 16, 9], [6, 17, 10], [0, 18, 11], [3, 19, 12], [5, 20, 13]], [[3, 14, 8], [5, 15, 7], [4, 16, 10], [6, 18, 9], [2, 17, 11], [0, 19, 13], [1, 20, 12]], [[2, 14, 10], [0, 15, 9], [5, 16, 8], [6, 19, 7], [4, 17, 12], [1, 18, 13], [3, 20, 11]], [[1, 15, 10], [5, 14, 9], [0, 16, 7], [4, 19, 11], [3, 17, 13], [6, 20, 8], [2, 18, 12]]]}, {'nb': 24, 'teams': [[[7, 16, 8], [6, 17, 9], [0, 18, 10], [4, 19, 11], [1, 20, 12], [2, 21, 13], [3, 22, 14], [5, 23, 15]], [[2, 16, 9], [7, 17, 10], [6, 18, 8], [1, 19, 13], [4, 20, 14], [5, 21, 11], [3, 23, 12], [0, 22, 15]], [[7, 18, 9], [6, 16, 10], [1, 17, 8], [5, 19, 12], [0, 20, 11], [3, 21, 15], [4, 22, 13], [2, 23, 14]], [[7, 19, 14], [4, 16, 12], [3, 17, 11], [1, 18, 15], [5, 20, 8], [2, 22, 10], [0, 21, 9], [6, 23, 13]]]}]
  }

// getters
const getters = {
  supermelee: state => state,
  supermeleeReady: state => state.ready,
  supermeleeTournament: state => state.tournament,
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
    if (uniqueComb.length > 0) {
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
    return false
    // let correspondances = []
    // for (let group of state.players) {
    //   for (let player of group) {
    //     correspondances.push(player)
    //   }
    // }
    // let nbplayers = state.players[0].length * state.nbGroups
    // let uniqueComb = state.uniqueness.filter(function (obj) {
    //   return obj.nb === nbplayers
    // })
    // if (uniqueComb.length > 0) {
    //   return uniqueComb[0].teams.map((round) => {
    //     return round.map((team) => {
    //       return team.map((player) => {
    //         return correspondances[player]
    //       })
    //     })
    //   })
    // } else {
    //   return false
    // }
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
          // console.log(players[i] + ' joue déjà sur ce tour ' + usedRound.slice(0))
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
                // console.log(players[i] + ' joue déjà plus de ' + tolerance + ' fois avec joueur ' + players[j])
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
        // console.log('tour ' + i)
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
              // console.log('joueurs ' + JSON.stringify(comb[k]) + ' ajoutés à team ' + j + ' avec joueur ' + tmp[j])
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

    var matchs = []
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
          // console.log('team ' + teamIndex + ' joue déjà sur ce tour')
          return true
        }
      }
      return false
    }

    function testPlayingAgainst (players) {
      console.log('testPlayingAgainst ' + tolerance)
      for (let i = 0; i < players.length; i++) {
        for (let j = players.length - 1; j >= 0; j--) {
          if (j !== i) {
            console.log(countIndexesOf(playingAgainst[players[i]], players[j]) + '>' + tolerance)
            if (countIndexesOf(playingAgainst[players[i]], players[j]) > tolerance) {
              // console.log(players[i] + ' joue déjà ' + (tolerance + 1) + ' fois contre joueur ' + players[j])
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
        console.log('numeroMatch ' + numeroMatch)
        if (typeof roundGames[numeroMatch] === 'undefined') { // La première équipe peut être n'importe laquelle non déjà utilisée
          while (isUsed(matchs.concat(roundGames), equipeIndex)) {
            equipeIndex++
          }
          if (equipeIndex < teams.length) {
            roundGames[numeroMatch] = []
            roundGames[numeroMatch].push(equipeIndex)
            // console.log('ajout equipe ' + equipeIndex, teams[equipeIndex])
          }
        } else { // Pour la deuxième, on reteste tout le monde
          opponentIndex = 0
          while (opponentIndex < teams.length) {
            if (!isUsed(matchs.concat(roundGames), opponentIndex)) {
              if (!testPlayingAgainst(teams[opponentIndex])) {
                // console.log('ajout adversaire ' + opponentIndex, teams[opponentIndex])
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
      matchs = []
      playingAgainst = []
      for (var t = 0; t < state.players.length; t++) {
        for (var tt = 0; tt < state.players[t].length; tt++) {
          playingAgainst[state.players[t][tt]] = []
        }
      }
      for (roundIterator = 0; roundIterator < state.nbRounds; roundIterator++) {
        console.log('TOUR ' + roundIterator)
        matchs[roundIterator] = []
        res = false
        while (res === false && thresholdRound < 5) { // state.players[0].length * 100
          getters.shuffle(tmpEquipes[roundIterator])
          res = getValidRound(tmpEquipes[roundIterator])
          thresholdRound++
        }
        if (res) {
          matchs[roundIterator] = res
        } else {
          return false
        }
      }
      return matchs
    }
    while (ret === false && threshold < 5) { // state.players[0].length * 100
      ret = get()
      threshold++
    }
    console.log(playingAgainst)
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

  saveUniqueness ({ commit }, equipes) {
    let correspondances = []
    for (let group of state.players) {
      for (let player of group) {
        correspondances.push(player)
      }
    }
    let tmp = equipes.map((round) => {
      return round.map((team) => {
        return team.map((player) => {
          return parseInt(Object.keys(correspondances).find(key => correspondances[key] === player))
        })
      })
    })

    commit('addSupermeleeUniqueness', tmp)
  },

  initSupermelee ({ state, commit, getters, dispatch }) {
    console.log('initSupermelee')
    thresholdTeams = 0
    var equipes = getters.getTeamsFromUniqueness()
    console.log(equipes)
    while (equipes === false && thresholdTeams < state.players[0].length) {
      threshold = 0
      equipes = getters.uniqueTeams(thresholdTeams++)
      console.log('equipes trouvées avec un seuil ' + (thresholdTeams - 1), equipes)
    }
    if (thresholdTeams === 1) {
      dispatch('saveUniqueness', equipes)
    }
    thresholdGames = 0
    var games = getters.getGamesFromUniqueness()
    while (games === false && thresholdGames < 2) {
      threshold = 0
      console.log('TOLERANCE ' + thresholdGames)
      games = getters.uniqueGames(equipes, thresholdGames++)
    }
    console.log(games)
  },

  updateSupermeleeGame ({ state, commit, dispatch }, { tournament, round, game, index, value }) {
    commit('updateSupermeleeGame', {
      game: state.tournaments[tournament][round][game][index],
      value: value
    })

    if (value === 13) { // win game, qualify team
      if (state.tournaments[tournament][round][game][Math.abs(index - 1)].score === 13) { // the other can't win too
        commit('updateSupermeleeGame', {
          game: state.tournaments[tournament][round][game][Math.abs(index - 1)],
          value: 0
        })
        dispatch('disqualify', {
          tournament: tournament,
          round: round + 1,
          teamId: state.tournaments[tournament][round][game][Math.abs(index - 1)].team
        })
      }

      dispatch('qualify', {
        tournament: tournament,
        round: round + 1,
        game: game,
        teamId: state.tournaments[tournament][round][game][index].team
      })

      if (round === 0 && typeof state.tournaments[tournament + 1] !== 'undefined') {
        // remove team from next tournament
        dispatch('disqualify', {
          tournament: tournament + 1,
          round: round,
          teamId: state.tournaments[tournament][round][game][index].team
        })
        // send losing team to next tournament
        dispatch('qualify', {
          tournament: tournament + 1,
          round: round,
          game: game,
          teamId: state.tournaments[tournament][round][game][Math.abs(index - 1)].team
        })
      }
    } else { // lose game, disqualify team
      dispatch('disqualify', {
        tournament: tournament,
        round: round + 1,
        teamId: state.tournaments[tournament][round][game][index].team
      })
    }
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

  addSupermeleeUniqueness (state, value) {
    state.uniqueness.push({
      nb: state.players[0].length * state.nbGroups,
      combinations: value
    })
  },

  updateSupermeleeGame (state, { game, value }) {
    Object.assign(game, {score: value})
  },

  winSupermeleeGame (state, { tournament, round, game, teamId }) {
    state.tournaments[tournament][round][parseInt(game / 2)].push({team: teamId, score: 0})
  },

  loseSupermeleeGame (state, { tournament, round, game, teamId }) {
    state.tournaments[tournament][round][parseInt(game / 2)].push({team: teamId, score: 0})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
