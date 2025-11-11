import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/LoginPage.vue'

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
