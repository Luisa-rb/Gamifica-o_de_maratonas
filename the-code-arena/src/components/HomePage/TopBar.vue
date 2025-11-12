<template>
  <header class="topbar">
    <router-link :to="homeRoute" class="icon-button" title="Home">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </router-link>

    <div class="right-icons">
      <router-link to="/" class="icon-button exit-button" title="Sair">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="exit-text">Sair</span>
      </router-link>
      <button class="icon-button" title="Menu" @click="toggleMenu">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="icon-button profile" title="Perfil">
        <div class="profile-avatar">
          <span>{{ userInitials }}</span>
        </div>
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Mock user data - substituir por dados reais do usuário logado
const user = {
  name: 'João Silva'
}

const userInitials = computed(() => {
  return user.name.split(' ').map(n => n[0]).join('').toUpperCase()
})

// Determina para onde o botão home deve levar
const homeRoute = computed(() => {
  // Se estiver na home, não redireciona (ou pode ir para landing)
  if (route.path === '/home') {
    return '/home'
  }
  // Se estiver em qualquer outra página, volta para home
  return '/home'
})

const toggleMenu = () => {
  // Implementar lógica do menu
  console.log('Menu clicked')
}
</script>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 100;
}

.icon-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  color: #ffffff;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  backdrop-filter: blur(10px);
}

.icon-button:hover {
  background: rgba(244, 211, 94, 0.2);
  border-color: var(--color-yellow);
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(244, 211, 94, 0.3);
}

.icon-button svg {
  width: 24px;
  height: 24px;
}

.right-icons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.exit-button {
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
}

.exit-button:hover {
  background: rgba(220, 53, 69, 0.2);
  border-color: #dc3545;
  box-shadow: 0 5px 15px rgba(220, 53, 69, 0.3);
}

.exit-text {
  font-size: 0.85rem;
  font-weight: 500;
}

.profile-avatar {
  width: 32px;
  height: 32px;
  border: 1px solid rgba(59, 183, 206, 0.5);
  border-radius: 8px;
  background: rgba(59, 183, 206, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 0.9rem;
}

.icon-button.profile {
  padding: 0.25rem;
}

/* Responsividade */
@media (max-width: 600px) {
  .exit-text {
    display: none;
  }
  
  .exit-button {
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .topbar {
    padding: 0.5rem 0.75rem;
  }
  
  .icon-button svg {
    width: 20px;
    height: 20px;
  }
  
  .profile-avatar {
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
  }
}
</style>