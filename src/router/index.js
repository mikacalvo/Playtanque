import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Players from '../components/Players'
import Consolante from '../components/Consolante'
import ConsolanteParametrage from '../components/ConsolanteParametrage'
import ConsolanteTeams from '../components/ConsolanteTeams'
import NotFoundComponent from '../components/NotFoundComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/joueurs',
      name: 'Joueurs',
      component: Players
    },
    {
      path: '/consolante',
      name: 'Consolante',
      component: Consolante
    },
    {
      path: '/consolante/parametrage',
      component: ConsolanteParametrage
    },
    {
      path: '/consolante/equipes',
      component: ConsolanteTeams
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
