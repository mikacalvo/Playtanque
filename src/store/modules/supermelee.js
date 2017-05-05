var threshold = 0
var thresholdTeams = 0
var thresholdMatchs = 0

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
  getFromUniqueness: state => () => {
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
              threshold++
              return false
            }
          }
          if (equipes[i][j].length < 3) {
            threshold++
            return false
          }
        }
      }
      return equipes
    }
    while (ret === false && threshold < state.players[0].length * 100) {
      ret = get()
    }
    return ret
  },
  uniqueMatchs: state => (teams) => {
    console.log('uniqueMatchs', thresholdMatchs)
    var cumul = []
    var matchs = []
    var tmpEquipes = teams.slice(0)
    var numeroMatch = 0
    var advExist = true
    var seuilTour = 0
    var equipeIndex = 0
    var i, l, k, tmpCumul, key
    for (i = 0; i < state.nbRounds; i++) {
      matchs[i] = []
      numeroMatch = 0
      matchs[i][numeroMatch] = []
      matchs[i][numeroMatch].push(tmpEquipes[i][0])
      // console.log("ajout adversaire", i, numeroMatch, tmpEquipes[i][0])
      tmpEquipes[i].splice(0, 1)
      advExist = false
      getters.shuffle(tmpEquipes[i])
      equipeIndex = 0
      while (tmpEquipes[i].length > 0) {
        if (typeof matchs[i][numeroMatch] === 'undefined') { // La première équipe peut être n'importe laquelle
          matchs[i][numeroMatch] = []
          matchs[i][numeroMatch].push(tmpEquipes[i][equipeIndex])
          // console.log("ajout adversaire", i, numeroMatch, tmpEquipes[i][equipeIndex])
          tmpEquipes[i].splice(equipeIndex, 1)
          advExist = true
        } else { // Pour la deuxième
          for (l = 0; l < 3; l++) { // on teste pour les 3 joueurs qu'ils ne sont pas déjà tombés sur les adversaires de l'autre équipe (paire)
            for (k = 0; k <= i; k++) { // On regarde les tours d'avant et l'actuel
              if (
                threshold < 20 &&
                typeof cumul[tmpEquipes[i][equipeIndex][l]] !== 'undefined' &&
                typeof cumul[tmpEquipes[i][equipeIndex][l]]['against'][k] !== 'undefined'
              ) {
                tmpCumul = (cumul[tmpEquipes[i][equipeIndex][l]]['against'][k].indexOf(matchs[i][numeroMatch][0][0]) !== -1) ? 1 : 0
                tmpCumul += (cumul[tmpEquipes[i][equipeIndex][l]]['against'][k].indexOf(matchs[i][numeroMatch][0][1]) !== -1) ? 1 : 0
                tmpCumul += (cumul[tmpEquipes[i][equipeIndex][l]]['against'][k].indexOf(matchs[i][numeroMatch][0][2]) !== -1) ? 1 : 0
                if (tmpCumul > Math.floor(state.nbRounds / 2)) {
                  advExist = true
                  break
                }
              }
            }
            if (advExist) {
              equipeIndex++
              if (equipeIndex >= tmpEquipes[i].length) { // On n'a pas trouvé de combinaison
                if (seuilTour++ < 20) {
                  // on réessaye en remélangeant les équipes pour ce tour
                  tmpEquipes[i] = teams[i].slice(0)
                  matchs[i] = []
                  matchs[i][numeroMatch] = []
                  matchs[i][numeroMatch].push(tmpEquipes[i][0])
                  tmpEquipes[i].splice(0, 1)
                  // On remet à zéro les adversaires de ce tour
                  for (key in cumul) {
                    if (cumul.hasOwnProperty(key)) {
                      cumul[key]['against'][i] = []
                    }
                  }
                  numeroMatch = 0
                  getters.shuffle(tmpEquipes[i])
                  equipeIndex = 0
                } else {
                  // Au bout d'un moment on recommence tout le processus
                  return thresholdMatchs++ < 20 ? getters.uniqueMatchs(teams) : false
                }
              }
              break
            }
          }
        }
        if (advExist === false) {
          matchs[i][numeroMatch].push(tmpEquipes[i][equipeIndex])
          for (l = 0; l < 3; l++) {
            if (typeof cumul[tmpEquipes[i][equipeIndex][l]] === 'undefined') {
              cumul[tmpEquipes[i][equipeIndex][l]] = []
              cumul[tmpEquipes[i][equipeIndex][l]]['against'] = []
            }
            cumul[tmpEquipes[i][equipeIndex][l]]['against'][i] = matchs[i][numeroMatch][0]
            if (typeof cumul[matchs[i][numeroMatch][0][l]] === 'undefined') {
              cumul[matchs[i][numeroMatch][0][l]] = []
              cumul[matchs[i][numeroMatch][0][l]]['against'] = []
            }
            cumul[matchs[i][numeroMatch][0][l]]['against'][i] = matchs[i][numeroMatch][1]
          }
          numeroMatch++
          tmpEquipes[i].splice(equipeIndex, 1)
          equipeIndex = 0
        } else {
          advExist = false
        }
      }
    }
    return matchs
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
          commit('deleteGroup')
        } else if (typeof state.players[i] === 'undefined') {
          commit('addGroup')
        }
      }
    }
    commit('setSupermelee', [key, value])
  },

  changePlayerGroup ({ state, commit }, [oldGroupIndex, oldPlayerIndex, newGroupIndex, newPlayerIndex]) {
    commit('addPlayerToGroup', {
      group: state.players[newGroupIndex],
      player: state.players[oldGroupIndex][oldPlayerIndex],
      index: newPlayerIndex
    })
    commit('removePlayerFromGroup', {
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
    commit('setSupermeleePlayers', a)
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

    commit('addUniqueness', tmp)
  },

  initSupermelee ({ state, commit, getters, dispatch }) {
    console.log('initSupermelee')
    thresholdTeams = 0
    var equipes = getters.getFromUniqueness()
    console.log(equipes)
    while (equipes === false && thresholdTeams < state.players[0].length) {
      threshold = 0
      equipes = getters.uniqueTeams(thresholdTeams++)
      console.log('equipes trouvées avec un seuil ' + (thresholdTeams - 1), equipes)
    }
    if (thresholdTeams === 1) {
      dispatch('saveUniqueness', equipes)
    }
    // var matchs = getters.getUniqueMatchs(equipes)
    // if (matchs) {
    //   // paintMatchs(matchs)
    //   thresholdMatchs = 0
    //   threshold = 0
    // } else {
    //   thresholdMatchs = 0
    //   threshold++
    //   dispatch('setConcours')
    // }
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

  setSupermeleePlayers (state, players) {
    state.players = players
  },

  addPlayerToSupermelee (state, player) {
    state.players[0].push(player)
  },

  addGroup (state) {
    state.players.push([])
  },

  deleteGroup (state, index) {
    if (index >= 0) {
      state.players.splice(index, 1)
    } else {
      state.players.splice(-1, 1)
    }
  },

  addPlayerToGroup (state, { group, player, index }) {
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

  removePlayerFromGroup (state, { group, begin, end }) {
    if (typeof end !== 'undefined') {
      group.splice(begin, end)
    } else {
      group.splice(begin)
    }
  },

  supermeleeMovePlayer (state, [group, oldIndex, newIndex]) {
    const movedItem = state.players[group].splice(oldIndex, 1)[0]
    state.players[group].splice(newIndex, 0, movedItem)
  },

  addUniqueness (state, value) {
    state.uniqueness.push({
      nb: state.players[0].length * state.nbGroups,
      combinations: value
    })
  },

  setTournament (state, tournament) {
    state.tournament = tournament
  },

  updateSupermeleeGame (state, { game, value }) {
    Object.assign(game, {score: value})
  },

  win (state, { tournament, round, game, teamId }) {
    state.tournaments[tournament][round][parseInt(game / 2)].push({team: teamId, score: 0})
  },

  lose (state, { tournament, round, game, teamId }) {
    state.tournaments[tournament][round][parseInt(game / 2)].push({team: teamId, score: 0})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
