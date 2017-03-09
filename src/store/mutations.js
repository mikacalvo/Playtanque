export const STORAGE_KEY = 'playtanque-vuejs'

export const state = {
  joueurs: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
}

export const mutations = {
  addjoueur (state, { text }) {
    state.joueurs.push({
      text,
      done: false
    })
  },

  deleteJoueur (state, { joueur }) {
    state.joueurs.splice(state.joueurs.indexOf(joueur), 1)
  },

  toggleJoueur (state, { joueur }) {
    joueur.done = !joueur.done
  },

  editJoueur (state, { joueur, value }) {
    joueur.text = value
  },

  toggleAll (state, { done }) {
    state.joueurs.forEach((joueur) => {
      joueur.done = done
    })
  },

  clearCompleted (state) {
    state.joueurs = state.joueurs.filter(joueur => !joueur.done)
  }
}
