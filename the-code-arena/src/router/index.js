import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'
import MedalPage from '../views/MedalPage.vue'
import TeamsPage from '../views/TeamsPage.vue'

const routes = [
    {
        path: '/',
        name: 'landing',
        component: LandingPage
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/home',
        name: 'home',
        component: HomePage
    },
    {
        path: '/medals',
        name: 'medals',
        component: MedalPage
    },
    {
        path: '/teams',
        name: 'teams',
        component: TeamsPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
