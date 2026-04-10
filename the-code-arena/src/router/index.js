import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import ARView from '../views/ARView.vue'
import ARMobileView from '../views/ARMobileView.vue'

const routes = [
    {
        path: '/',
        name: 'landing',
        component: LandingPage
    },
    {
        path: '/ar',
        name: 'ar-desktop',
        component: ARView
    },
    {
        path: '/ar/mobile',
        name: 'ar-mobile',
        component: ARMobileView
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return { top: 0, left: 0 }
    }
})

export default router
