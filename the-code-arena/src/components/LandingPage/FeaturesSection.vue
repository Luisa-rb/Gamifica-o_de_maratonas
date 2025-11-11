<template>
  <section id="features" class="features">
    <div class="container">
      <div class="section-header">
        <h2>O que tem na Arena? ⚔️</h2>
        <p class="section-subtitle">Descubra algumas das funcionalidades que tornam sua experiência única</p>
      </div>
      
      <div class="grid">
        <div class="feature" v-for="(f, index) in features" :key="f.title" :class="`feature-${index + 1}`">
          <div class="feature-icon">{{ f.icon }}</div>
          <h4>{{ f.title }}</h4>
          <p>{{ f.desc }}</p>
          <div class="feature-accent"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  { 
    icon: '🗓️', 
    title: 'Próximos Eventos', 
    desc: 'Saiba quais são as próximas competições e maratonas.' 
  },
  { 
    icon: '🏆', 
    title: 'Ranking', 
    desc: 'Acompanhe sua evolução em tempo real.' 
  },
  { 
    icon: '🎖️', 
    title: 'Medalhas', 
    desc: 'Visualize suas conquistas em realidade aumentada.' 
  },
]
</script>

<style scoped>
.features {
  padding: 5rem 1rem;
  position: relative;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 3rem;
  color: var(--color-cyan);
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(59, 206, 172, 0.5);
}

.section-subtitle {
  font-size: 1.2rem;
  color: #bfbfbf;
  font-style: italic;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature {
  background: rgba(255, 255, 255, 0.08);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  transition: all 0.3s ease;
  text-align: center;
  backdrop-filter: blur(10px);
}

.feature:hover {
  transform: translateY(-8px);
  border-color: var(--color-cyan);
  box-shadow: 0 20px 40px rgba(59, 206, 172, 0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.feature h4 {
  color: var(--color-yellow);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.feature p {
  color: #dcdcdc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature:hover .feature-accent {
  opacity: 1;
}

/* Cores específicas para cada feature */
.feature-1:hover {
  border-color: var(--color-blue);
  box-shadow: 0 20px 40px rgba(59, 183, 206, 0.2);
}

.feature-1 .feature-accent {
  background: linear-gradient(90deg, var(--color-blue), var(--color-cyan));
}

.feature-2:hover {
  border-color: var(--color-yellow);
  box-shadow: 0 20px 40px rgba(244, 211, 94, 0.2);
}

.feature-2 .feature-accent {
  background: linear-gradient(90deg, var(--color-yellow), var(--color-red));
}

.feature-3:hover {
  border-color: var(--color-pink);
  box-shadow: 0 20px 40px rgba(216, 17, 89, 0.2);
}

.feature-3 .feature-accent {
  background: linear-gradient(90deg, var(--color-pink), var(--color-yellow));
}

/* Responsividade */
@media (max-width: 768px) {
  .features {
    padding: 3rem 1rem;
  }
  
  .section-header h2 {
    font-size: 2.2rem;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature {
    padding: 1.5rem;
  }
}
</style>
