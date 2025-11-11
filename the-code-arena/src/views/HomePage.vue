<template>
  <div class="home-page">
    <FloatingElements />
    <TopBar />
    
    <!-- Título de boas-vindas -->
    <div class="title-container">
      <h1>Bem-vindo(a)!</h1>
      <p>A Arena é seu refúgio Dev nas maratonas de programação!</p>
    </div>

    <GameCards />
  </div>
</template>

<script setup>
import TopBar from '@/components/HomePage/TopBar.vue'
import FloatingElements from '@/components/HomePage/FloatingElements.vue'
import GameCards from '@/components/HomePage/GameCards.vue'
</script>

<style scoped>
/* Background gradiente para toda a home page */
.home-page {
  background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.home-page::before {
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

.title-container {
  margin-top: 5rem; 
  padding: 2rem 1rem 1rem;
  color: #ffffff;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.title-container h1 {
  font-family: 'VT323', monospace;
  font-size: 5rem;
  text-shadow: 
    -2px -2px 0 #ff0000,
    2px -2px 0 #ff0000,
    -2px 2px 0 #ff0000,
    2px 2px 0 #ff0000;
  color: var(--color-yellow);
  margin-bottom: 0.5rem;
}

.title-container p {
  font-family: 'VT323', monospace;
  font-size: 2rem;
  color: #dcdcdc;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

/* Responsividade */
@media (max-width: 768px) {
  .title-container {
    margin-top: 4rem;
    padding: 1.5rem 1rem 0.5rem;
  }
  
  .title-container h1 {
    font-size: 4rem;
  }
  
  .title-container p {
    font-size: 1.6rem;
  }
}

@media (max-width: 480px) {
  .title-container {
    margin-top: 3.5rem;
    padding: 1rem;
  }
  
  .title-container h1 {
    font-size: 3rem;
  }
  
  .title-container p {
    font-size: 1.4rem;
    line-height: 1.3;
  }
}
</style>