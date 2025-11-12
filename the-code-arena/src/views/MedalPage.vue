<template>
  <div class="medal-page">
    <FloatingElements />
    <TopBar />
    
    <!-- Título da página -->
    <div class="title-container">
      <h1>🏆 Suas Medalhas</h1>
      <p>Conquistas desbloqueadas nas maratonas de programação</p>
    </div>

    <MedalGrid />
  </div>
</template>

<script setup>
import TopBar from '@/components/HomePage/TopBar.vue'
import FloatingElements from '@/components/HomePage/FloatingElements.vue'
import MedalGrid from '@/components/MedalPage/MedalGrid.vue'
</script>

<style scoped>
/* Background gradiente para toda a medal page */
.medal-page {
  background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.medal-page::before {
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
  margin-top: 3.5rem; 
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
  font-size: 3.5rem;
  text-shadow: 
    -2px -2px 0 #ff0000,
    2px -2px 0 #ff0000,
    -2px 2px 0 #ff0000,
    2px 2px 0 #ff0000;
  color: var(--color-yellow);
  margin-bottom: 0.5rem;
}

.title-container p {
  font-family: 'Inter', 'Roboto', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #dcdcdc;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  letter-spacing: 0.5px;
}

/* Responsividade */
@media (max-width: 768px) {
  .title-container {
    margin-top: 4rem;
    padding: 1.5rem 1rem 0.5rem;
  }
  
  .title-container h1 {
    font-size: 3rem;
  }
  
  .title-container p {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .title-container {
    margin-top: 3.5rem;
    padding: 1rem;
  }
  
  .title-container h1 {
    font-size: 2.5rem;
  }
  
  .title-container p {
    font-size: 1rem;
    line-height: 1.3;
  }
}
</style>