import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import GameView from '../views/GameView.vue'
import SetupView from '../views/SetupView.vue'
import LobbyView from '../views/LobbyView.vue'

import type { RouteRecordRaw } from 'vue-router'

export const routes: readonly RouteRecordRaw[] = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/game',
      name: 'game',
      component: GameView,
    },
    {
      path: '/setup/player1',
      name: 'SetupPlayer1',
      component: SetupView
    },
    {
      path: '/setup/player2',
      name: 'SetupPlayer2',
      component: SetupView
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: LobbyView,
    },
]
