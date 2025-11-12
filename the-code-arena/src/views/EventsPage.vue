<template>
  <div class="events-page">
    <!-- Elementos flutuantes de fundo -->
    <FloatingElements />
    
    <!-- Topbar -->
    <TopBar />
    
    <!-- Título da página -->
    <div class="page-header">
      <h1>📅 Eventos</h1>
      <p>Acompanhe as competições de programação</p>
    </div>
    
    <!-- Grid de eventos -->
    <EventsGrid />
  </div>
</template>

<script setup>
import FloatingElements from '@/components/HomePage/FloatingElements.vue'
import TopBar from '@/components/HomePage/TopBar.vue'
import EventsGrid from '@/components/EventsPage/EventsGrid.vue'
</script>

<style scoped>
.events-page {
  background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.events-page::before {
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

.page-header h1 {
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

.page-header p {
  font-family: 'Inter', 'Roboto', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #dcdcdc;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  letter-spacing: 0.5px;
}

/* Responsividade */
@media (max-width: 768px) {
  .page-header {
    margin-top: 4rem;
    padding: 1.5rem 1rem 0.5rem;
  }
  
  .page-header h1 {
    font-size: 3rem;
  }
  
  .page-header p {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .page-header {
    margin-top: 3.5rem;
    padding: 1rem;
  }
  
  .page-header h1 {
    font-size: 2.5rem;
  }
  
  .page-header p {
    font-size: 1rem;
  }
}
</style>