<template>
  <main class="medal-container">
    <!-- Filtros de categoria -->
    <div class="filter-section">
      <button 
        v-for="category in categories" 
        :key="category.id"
        @click="activeFilter = category.id"
        :class="['filter-btn', { active: activeFilter === category.id }]"
      >
        {{ category.icon }} {{ category.name }}
      </button>
    </div>

    <!-- Grid de medalhas -->
    <div class="medals-grid">
      <div 
        v-for="medal in filteredMedals" 
        :key="medal.id"
        :class="['medal-card', { locked: !medal.unlocked }]"
      >
        <div class="medal-icon">
          <span v-if="medal.unlocked">{{ medal.icon }}</span>
          <span v-else class="locked-icon">🔒</span>
        </div>
        
        <div class="medal-info">
          <h3>{{ medal.name }}</h3>
          <p class="medal-description">{{ medal.description }}</p>
          
          <div class="medal-meta">
            <span class="medal-category">{{ getCategoryName(medal.category) }}</span>
            <span v-if="medal.unlocked" class="medal-date">
              <span v-if="medal.eventDate">{{ medal.eventDate }}</span>
              <span v-else>Conquistada em {{ formatDate(medal.unlockedAt) }}</span>
            </span>
            <span v-else class="medal-requirement">
              <span v-if="medal.eventDate" class="future-event">📅 {{ medal.eventDate }}</span>
              <span v-else>{{ medal.requirement }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('all')

const categories = ref([
  { id: 'all', name: 'Todas', icon: '🏆' },
  { id: 'contest', name: 'Competições', icon: '🥇' },
  { id: 'special', name: 'Especiais', icon: '⭐' }
])

const medals = ref([
  // Medalhas de eventos passados (desbloqueadas) >> por enquanto não temos dados 
  {
    id: 1,
    name: 'ICPC Regional 2024',
    description: 'Participou da Maratona de Programação ICPC Regional 2024',
    icon: '🥉',
    category: 'contest',
    rarity: 'epic',
    unlocked: true,
    unlockedAt: new Date('2024-09-14'),
    requirement: 'Participar da ICPC Regional 2024',
    eventDate: '14/09/2024'
  },
  {
    id: 2,
    name: 'Codeforces Round #912',
    description: 'Competiu no Codeforces Round #912 (Div. 2)',
    icon: '💙',
    category: 'contest',
    rarity: 'common',
    unlocked: true,
    unlockedAt: new Date('2024-10-05'),
    requirement: 'Participar do Codeforces Round #912',
    eventDate: '05/10/2024'
  },

  {
    id: 4,
    name: 'AtCoder Beginner Contest',
    description: 'Participou de um AtCoder Beginner Contest',
    icon: '🇯🇵',
    category: 'contest',
    rarity: 'rare',
    unlocked: true,
    unlockedAt: new Date('2024-10-28'),
    requirement: 'Participar de um ABC',
    eventDate: '28/10/2024'
  },
  
  // Medalhas de eventos futuros (bloqueadas) >> por enquanto não temos dados
  {
    id: 5,
    name: 'ICPC World Finals 2025',
    description: 'Classificação para a Final Mundial ICPC 2025',
    icon: '🏆',
    category: 'contest',
    rarity: 'legendary',
    unlocked: false,
    requirement: 'Classificar-se para a Final Mundial',
    eventDate: '15/04/2025',
    futureEvent: true
  },
  {
    id: 6,
    name: 'Maratona UnB 2025',
    description: 'Participação na Maratona de Programação da UnB 2025',
    icon: '�',
    category: 'contest',
    rarity: 'rare',
    unlocked: false,
    requirement: 'Evento agendado para 2025',
    eventDate: '22/03/2025',
    futureEvent: true
  },
  {
    id: 7,
    name: 'Google Code Jam 2025',
    description: 'Participação no Google Code Jam 2025',
    icon: '🔍',
    category: 'contest',
    rarity: 'epic',
    unlocked: false,
    requirement: 'Evento ainda não iniciado',
    eventDate: '12/05/2025',
    futureEvent: true
  },
  {
    id: 8,
    name: 'Meta Hacker Cup 2025',
    description: 'Competição no Meta Hacker Cup 2025',
    icon: '👥',
    category: 'contest',
    rarity: 'epic',
    unlocked: false,
    requirement: 'Inscrições abrem em Janeiro/2025',
    eventDate: '18/07/2025',
    futureEvent: true
  },

  {
    id: 9,
    name: 'Veterano da Arena',
    description: 'Completar 1 ano ativo nas competições',
    icon: '🎖️',
    category: 'special',
    rarity: 'rare',
    unlocked: false,
    requirement: 'Tempo ativo: 8 meses (8/12)'
  }
])

const filteredMedals = computed(() => {
  if (activeFilter.value === 'all') {
    return medals.value
  }
  return medals.value.filter(medal => medal.category === activeFilter.value)
})

function getCategoryName(categoryId) {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category ? category.name : ''
}

function formatDate(date) {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>

<style scoped>
.medal-container {
  margin: 2rem auto;
  max-width: 1200px;
  width: 90%;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
}

/* Filtros */
.filter-section {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 0.8rem 1.5rem;
  color: #dcdcdc;
  font-family: 'Inter', 'Roboto', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: var(--color-cyan);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: rgba(59, 206, 172, 0.2);
  border-color: var(--color-cyan);
  color: var(--color-cyan);
}

/* Grid de medalhas */
.medals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.medal-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  gap: 1rem;
}

.medal-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-cyan);
  box-shadow: 0 15px 30px rgba(59, 206, 172, 0.2);
}

.medal-card.locked {
  opacity: 0.6;
}

.medal-card.locked:hover {
  border-color: #666;
  box-shadow: 0 15px 30px rgba(255, 255, 255, 0.1);
}

.medal-icon {
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

.locked-icon {
  color: #666;
  filter: grayscale(100%);
}

.medal-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.medal-info h3 {
  color: var(--color-yellow);
  font-size: 1.3rem;
  margin: 0;
  font-weight: bold;
}

.medal-description {
  color: #dcdcdc;
  line-height: 1.5;
  margin: 0;
  font-size: 0.95rem;
}

.medal-meta {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 0.5rem;
}

.medal-category {
  color: var(--color-cyan);
  font-size: 0.85rem;
  font-weight: 500;
}

.medal-date {
  color: #999;
  font-size: 0.8rem;
}

.medal-requirement {
  color: #ccc;
  font-size: 0.8rem;
  font-style: italic;
}

.future-event {
  color: var(--color-cyan);
  font-style: normal;
  font-weight: 500;
}

/* Responsividade */
@media (max-width: 768px) {
  .medals-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .medal-card {
    padding: 1.2rem;
  }
  
  .filter-section {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .medal-card {
    flex-direction: column;
    text-align: center;
  }
  
  .medal-icon {
    min-width: auto;
    margin-bottom: 0.5rem;
  }
}
</style>