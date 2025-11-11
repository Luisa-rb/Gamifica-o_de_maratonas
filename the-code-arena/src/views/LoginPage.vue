<template>
  <div class="login-page">
    <header class="page-header">
      <router-link to="/" class="home-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </router-link>
      
      <div class="header-content">
        <router-link to="/" class="logo-link">
          <h1 class="page-title">
            THE <span class="code">CODE</span> ARENA
          </h1>
        </router-link>
      </div>
    </header>

    <main class="login-main">
      <LoginForm />
    </main>
  </div>
</template>

<script setup>
import LoginForm from '@/components/LoginPage/LoginForm.vue'
</script>

<style scoped>
/* Background gradiente para toda a página de login */
.login-page {
  background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%);
  min-height: 100vh;
  position: relative;
}

.login-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 30%, rgba(244, 211, 94, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(59, 206, 172, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.page-header {
  position: relative;
  z-index: 2;
  padding: 1rem 1rem;
  text-align: center;
}

.home-icon {
  position: absolute;
  top: 2rem;
  left: 2rem;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.home-icon:hover {
  background: rgba(59, 167, 206, 0.2);
  border-color: var(--color-blue);
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(59, 167, 206, 0.3);
}

.home-icon svg {
  width: 24px;
  height: 24px;
  color: #ffffff;
  transition: color 0.3s ease;
}

.home-icon:hover svg {
  color: var(--color-blue);
}

.logo-link {
  text-decoration: none;
  display: inline-block;
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
}

.page-title {
  font-family: 'VT323', monospace;
  font-size: 3rem;
  text-transform: uppercase;
  text-shadow:
    -2px -2px 0 #ff0000,
    2px -2px 0 #ff0000,
    -2px 2px 0 #ff0000,
    2px 2px 0 #ff0000;
  color: #ffffff;
  margin: 0;
}

.page-title .code {
  color: yellow;
  text-shadow:
    -2px -2px 0 #ff0000,
    2px -2px 0 #ff0000,
    -2px 2px 0 #ff0000,
    2px 2px 0 #ff0000;
}

.login-main {
  position: relative;
  z-index: 2;
  padding-bottom: 2rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .page-header {
    padding: 1.5rem 1rem;
  }
  
  .home-icon {
    top: 1.5rem;
    left: 1.5rem;
    width: 45px;
    height: 45px;
  }
  
  .home-icon svg {
    width: 22px;
    height: 22px;
  }
  
  .page-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 1rem;
  }
  
  .home-icon {
    top: 1rem;
    left: 1rem;
    width: 40px;
    height: 40px;
  }
  
  .home-icon svg {
    width: 20px;
    height: 20px;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>