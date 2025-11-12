<template>
  <main class="card-container">
    <div class="grid">
      <component
        v-for="(card, index) in gameCards" 
        :key="card.id"
        :is="card.disabled ? 'div' : 'router-link'"
        :to="card.disabled ? undefined : card.route" 
        class="feature"
        :class="[`feature-${index + 1}`, { disabled: card.disabled }]"
      >
        <div class="feature-icon">{{ card.icon }}</div>
        <div v-if="card.disabled" class="lock-icon">🔒</div>
        <h4>{{ card.title }}</h4>
        <p>{{ card.desc }}</p>
      </component>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const gameCards = ref([
  {
    id: 1,
    title: 'Rankings',
    icon: '🏆',
    desc: 'Em manutenção. Em breve disponível.',
    route: '/rankings',
    disabled: true
  },
  {
    id: 2,
    title: 'Medalhas',
    icon: '🎖️',
    desc: 'Visualize suas conquistas e participações.',
    route: '/medals'
  },
  {
    id: 3,
    title: 'Equipes',
    icon: '👥',
    desc: 'Gerencie suas equipes e histórico de participações.',
    route: '/teams'
  },
  {
    id: 4,
    title: 'Eventos',
    icon: '🗓️',
    desc: 'Próximas competições e histórico de participações.',
    route: '/events'
  },
])
</script>

<style scoped>
.card-container {
  margin: 4rem auto 2rem;
  max-width: 1000px;
  width: 90%;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.feature {
  background: rgba(255, 255, 255, 0.08);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  transition: all 0.3s ease;
  text-align: center;
  backdrop-filter: blur(10px);
  text-decoration: none;
  color: inherit;
}

.feature:hover {
  transform: translateY(-8px);
  border-color: var(--color-cyan);
  box-shadow: 0 20px 40px rgba(59, 206, 172, 0.2);
}

.feature.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(100%);
}

.feature.disabled:hover {
  transform: none;
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: none;
}

.lock-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.2rem;
  color: #666;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 0.8rem;
  display: block;
}

.feature h4 {
  color: var(--color-yellow);
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  font-weight: bold;
}

.feature p {
  color: #dcdcdc;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

/* Cores específicas para cada feature */
.feature-1:hover:not(.disabled) {
  border-color: var(--color-yellow);
  box-shadow: 0 20px 40px rgba(244, 211, 94, 0.2);
}

.feature-2:hover {
  border-color: var(--color-pink);
  box-shadow: 0 20px 40px rgba(216, 17, 89, 0.2);
}

.feature-3:hover {
  border-color: var(--color-blue);
  box-shadow: 0 20px 40px rgba(59, 183, 206, 0.2);
}

.feature-4:hover {
  border-color: var(--color-cyan);
  box-shadow: 0 20px 40px rgba(59, 206, 172, 0.2);
}

/* Responsividade */
@media (max-width: 768px) {
  .card-container {
    margin: 3rem auto 2rem;
  }
  
  .grid {
    max-width: 500px;
    gap: 1.2rem;
  }
  
  .feature {
    padding: 1.2rem;
  }
}

@media (max-width: 480px) {
  .card-container {
    margin: 2.5rem auto 2rem;
  }
  
  .grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    max-width: 300px;
    gap: 1rem;
  }
  
  .feature {
    padding: 1.2rem;
  }
}
</style>