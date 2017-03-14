import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Consolante from '../components/Consolante'
import ConcoursParametrage from '../components/ConcoursParametrage'
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
      path: '/consolante',
      name: 'Consolante',
      component: Consolante
    },
    {
      path: '/concours/parametrage',
      component: ConcoursParametrage
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
