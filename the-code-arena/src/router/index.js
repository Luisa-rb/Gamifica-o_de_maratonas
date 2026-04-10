import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import ARView from '../views/ARView.vue'

const routes = [
    {
        path: '/',
        name: 'landing',
        component: LandingPage
    },
    {
        path: '/ar',
        name: 'ar', //referencia a rota para uma nova "página", que é o ARView.vue
        component: ARView
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
