import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Players from '../components/Players'
import Consolante from '../components/Consolante'
import Supermelee from '../components/Supermelee'
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
      path: '/supermelee',
      name: 'Supermelee',
      component: Supermelee
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
