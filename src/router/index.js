import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import DashboardComponent from '../components/DashboardComponent.vue'
import CheckIn from '../components/CheckIn.vue'
import Journal from '../components/Journal.vue'
import Statistics from '../components/Statistics.vue'
import Breath from '../components/Breath.vue'
import Forum from '../components/Forum.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth'
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardComponent,
      children: [
        {
          path: '/checkin',
          component: CheckIn
        },
        {
          path: '/journal',
          component: Journal
        },
        {
          path: '/statistics',
          component: Statistics
        },
        {
          path: '/breathe',
          component: Breath
        },
        {
          path: '/forum',
          component: Forum
        }
      ]
    }
  ]
})

export default router
