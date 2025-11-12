<template>
  <main class="events-container">
    <!-- Filtros de tipo de evento -->
    <div class="filter-section">
      <button 
        v-for="filter in filters" 
        :key="filter.id"
        @click="activeFilter = filter.id"
        :class="['filter-btn', { active: activeFilter === filter.id }]"
      >
        {{ filter.icon }} {{ filter.name }}
      </button>
    </div>

    <!-- Grid de eventos -->
    <div class="events-grid">
      <div 
        v-for="event in filteredEvents" 
        :key="event.id"
        :class="['event-card', { past: event.status === 'past', upcoming: event.status === 'upcoming' }]"
      >
        <div class="event-icon">{{ event.icon }}</div>
        
        <div class="event-info">
          <h3>{{ event.name }}</h3>
          <p class="event-description">{{ event.description }}</p>
          
          <div class="event-meta">
            <div class="event-date">
              <span class="date-icon">📅</span>
              {{ event.date }}
            </div>
            <div class="event-location" v-if="event.location">
              <span class="location-icon">📍</span>
              {{ event.location }}
            </div>
            <div class="event-type">
              <span class="type-badge" :class="event.type">{{ getTypeName(event.type) }}</span>
            </div>
          </div>
          
          <div v-if="event.status === 'past' && event.results" class="event-results">
            <div class="result-item">
              <span class="result-label">Participantes:</span>
              <span class="result-value">{{ event.results.participants }}</span>
            </div>
            <div class="result-item" v-if="event.results.yourPosition">
              <span class="result-label">Sua posição:</span>
              <span class="result-value">{{ event.results.yourPosition }}º</span>
            </div>
          </div>
          
          <div v-if="event.status === 'upcoming'" class="event-countdown">
            <span class="countdown-label">Em:</span>
            <span class="countdown-value">{{ getTimeUntilEvent(event.date) }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('all')

const filters = ref([
  { id: 'all', name: 'Todos', icon: '📅' },
  { id: 'upcoming', name: 'Próximos', icon: '🔜' },
  { id: 'past', name: 'Anteriores', icon: '📚' }
])

const events = ref([
  // Eventos passados
  {
    id: 1,
    name: 'ICPC Regional Brasília 2024',
    description: 'Maratona de Programação ICPC Regional - Etapa Brasília',
    icon: '🏆',
    date: '14/09/2024',
    location: 'UnB - Brasília, DF',
    type: 'contest',
    status: 'past',
    results: {
      participants: 156,
      yourPosition: 12
    }
  },
  {
    id: 2,
    name: 'Codeforces Round #912',
    description: 'Competição online Codeforces Division 2',
    icon: '💙',
    date: '05/10/2024',
    location: 'Online',
    type: 'online',
    status: 'past',
    results: {
      participants: 8234
    }
  },
  {
    id: 3,
    name: 'AtCoder Beginner Contest 325',
    description: 'Contest semanal AtCoder para iniciantes',
    icon: '🇯🇵',
    date: '28/10/2024',
    location: 'Online',
    type: 'online',
    status: 'past',
    results: {
      participants: 12456,
      yourPosition: 486
    }
  },
  {
    id: 4,
    name: 'Maratona SBC 2024',
    description: 'Maratona de Programação da Sociedade Brasileira de Computação',
    icon: '🧠',
    date: '02/11/2024',
    location: 'PUC-Rio - Rio de Janeiro, RJ',
    type: 'contest',
    status: 'past',
    results: {
      participants: 89,
      yourPosition: 8
    }
  },
  
  // Eventos futuros
  {
    id: 5,
    name: 'Codeforces Round #920',
    description: 'Competição online Codeforces Division 2',
    icon: '💙',
    date: '25/11/2025',
    location: 'Online',
    type: 'online',
    status: 'upcoming'
  },
  {
    id: 6,
    name: 'Maratona UnB 2026',
    description: 'Competição interna da Universidade de Brasília',
    icon: '🎓',
    date: '15/03/2026',
    location: 'UnB - Brasília, DF',
    type: 'contest',
    status: 'upcoming'
  },
  {
    id: 7,
    name: 'ICPC Regional Brasília 2026',
    description: 'Maratona de Programação ICPC Regional - Etapa Brasília',
    icon: '🏆',
    date: '12/09/2026',
    location: 'UnB - Brasília, DF',
    type: 'contest',
    status: 'upcoming'
  },
  {
    id: 8,
    name: 'AtCoder Beginner Contest 350',
    description: 'Contest semanal AtCoder para iniciantes',
    icon: '🇯🇵',
    date: '30/11/2025',
    location: 'Online',
    type: 'online',
    status: 'upcoming'
  },
  {
    id: 9,
    name: 'Google Code Jam 2026',
    description: 'Competição mundial de programação do Google',
    icon: '🔍',
    date: '20/04/2026',
    location: 'Online',
    type: 'online',
    status: 'upcoming'
  }
])

const filteredEvents = computed(() => {
  if (activeFilter.value === 'all') {
    return events.value
  }
  return events.value.filter(event => event.status === activeFilter.value)
})

function getTypeName(type) {
  const typeMap = {
    contest: 'Presencial',
    online: 'Online',
    workshop: 'Workshop'
  }
  return typeMap[type] || type
}

function getTimeUntilEvent(dateString) {
  // Converte data DD/MM/YYYY para formato correto
  const [day, month, year] = dateString.split('/')
  const eventDate = new Date(year, month - 1, day) // month-1 porque mês no JS é 0-indexado
  const now = new Date()
  
  // Remove as horas para comparar apenas datas
  eventDate.setHours(0, 0, 0, 0)
  now.setHours(0, 0, 0, 0)
  
  const diffTime = eventDate - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'Evento passou'
  if (diffDays === 0) return 'Hoje!'
  if (diffDays === 1) return '1 dia'
  if (diffDays < 30) return `${diffDays} dias`
  
  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths === 1) return '1 mês'
  return `${diffMonths} meses`
}
</script>

<style scoped>
.events-container {
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

/* Grid de eventos */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 1.5rem;
}

.event-card {
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

.event-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-cyan);
  box-shadow: 0 15px 30px rgba(59, 206, 172, 0.2);
}

.event-card.past {
  opacity: 0.85;
}

.event-card.upcoming {
  border-color: rgba(255, 193, 7, 0.3);
}

.event-card.upcoming:hover {
  border-color: var(--color-yellow);
  box-shadow: 0 15px 30px rgba(255, 193, 7, 0.2);
}

.event-icon {
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

.event-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.event-info h3 {
  color: var(--color-yellow);
  font-size: 1.3rem;
  margin: 0;
  font-weight: bold;
}

.event-description {
  color: #dcdcdc;
  line-height: 1.5;
  margin: 0;
  font-size: 0.95rem;
}

.event-meta {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0.5rem 0;
}

.event-date,
.event-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #bbb;
  font-size: 0.9rem;
}

.date-icon,
.location-icon {
  font-size: 0.8rem;
}

.event-type {
  margin-top: 0.3rem;
}

.type-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.type-badge.contest {
  background: rgba(111, 66, 193, 0.3);
  color: #9c27b0;
  border: 1px solid rgba(111, 66, 193, 0.5);
}

.type-badge.online {
  background: rgba(0, 123, 255, 0.3);
  color: #007bff;
  border: 1px solid rgba(0, 123, 255, 0.5);
}

.event-results {
  display: flex;
  gap: 1rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-top: 0.5rem;
}

.result-item {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.result-label {
  color: #999;
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
}

.result-value {
  color: var(--color-cyan);
  font-weight: bold;
  font-size: 0.9rem;
}

.event-countdown {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem;
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 8px;
  margin-top: 0.5rem;
}

.countdown-label {
  color: #ddd;
  font-size: 0.9rem;
}

.countdown-value {
  color: var(--color-yellow);
  font-weight: bold;
  font-size: 0.9rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .events-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .event-card {
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
  .event-card {
    flex-direction: column;
    text-align: center;
  }
  
  .event-icon {
    min-width: auto;
    margin-bottom: 0.5rem;
  }
  
  .event-results {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>