<template>
  <main class="teams-container">
    <div class="teams-list">
      <!-- Cabeçalho da lista -->
      <div class="teams-header">
        <div class="header-icon"></div>
        <div class="header-name">Equipe</div>
        <div class="header-competition">Competição</div>
        <div class="header-date">Data</div>
      </div>
      
      <!-- Lista de equipes -->
      <div 
        v-for="team in userTeams" 
        :key="team.id"
        class="team-row"
        @click="openTeamDetail(team)"
      >
        <div class="team-icon">{{ team.icon }}</div>
        <div class="team-name">{{ team.name }}</div>
        <div class="team-competition">{{ team.competition }}</div>
        <div class="team-date">{{ team.date }}</div>
      </div>
    </div>

    <!-- Modal de detalhes da equipe -->
    <TeamModal 
      v-if="selectedTeam" 
      :team="selectedTeam" 
      @close="closeTeamDetail"
    />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import TeamModal from './TeamModal.vue'

const selectedTeam = ref(null)

const userTeams = ref([
  {
    id: 1,
    name: 'CodeWarriors',
    competition: 'ICPC Regional Brasília 2024',
    date: '14/09/2024',
    icon: '⚔️',
    status: 'completed',
    members: [
      {
        id: 1,
        name: 'Você',
        role: 'Líder da Equipe',
        avatar: '👨‍💻'
      },
      {
        id: 2,
        name: 'Ana Silva',
        role: 'Especialista em Grafos',
        avatar: '👩‍💻'
      },
      {
        id: 3,
        name: 'Carlos Santos',
        role: 'Expert em Matemática',
        avatar: '👨‍🔬'
      }
    ],
    results: {
      position: 12,
      problemsSolved: 6,
      totalProblems: 13
    }
  },
  {
    id: 2,
    name: 'AlgoMasters',
    competition: 'Maratona SBC 2024',
    date: '02/11/2024',
    icon: '🧠',
    status: 'completed',
    members: [
      {
        id: 1,
        name: 'Você',
        role: 'Implementador Principal',
        avatar: '👨‍💻'
      },
      {
        id: 4,
        name: 'Maria Oliveira',
        role: 'Estrategista',
        avatar: '👩‍🎓'
      },
      {
        id: 5,
        name: 'João Costa',
        role: 'Debugger Expert',
        avatar: '👨‍🔧'
      }
    ],
    results: {
      position: 8,
      problemsSolved: 7,
      totalProblems: 12
    }
  }
])

function openTeamDetail(team) {
  selectedTeam.value = team
}

function closeTeamDetail() {
  selectedTeam.value = null
}
</script>

<style scoped>
.teams-container {
  margin: 2rem auto;
  max-width: 1000px;
  width: 90%;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
}

.teams-list {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.teams-header {
  display: grid;
  grid-template-columns: 60px 1fr 2fr 120px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(59, 206, 172, 0.1);
  border-bottom: 1px solid rgba(59, 206, 172, 0.3);
  align-items: center;
}

.teams-header div {
  color: var(--color-cyan);
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.header-date {
  text-align: right;
}

.team-row {
  display: grid;
  grid-template-columns: 60px 1fr 2fr 120px;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  align-items: center;
}

.team-row:last-child {
  border-bottom: none;
}

.team-row:hover {
  background: rgba(59, 206, 172, 0.1);
  border-color: var(--color-cyan);
}

.team-icon {
  font-size: 2rem;
  text-align: center;
}

.team-name {
  color: var(--color-yellow);
  font-size: 1.1rem;
  font-weight: bold;
}

.team-competition {
  color: var(--color-cyan);
  font-size: 0.95rem;
  font-weight: 500;
}

.team-date {
  color: #999;
  font-size: 0.9rem;
  text-align: right;
}

/* Responsividade */
@media (max-width: 768px) {
  .teams-header {
    grid-template-columns: 50px 1fr;
    gap: 0.8rem;
    padding: 0.8rem 1rem;
  }
  
  .teams-header .header-competition,
  .teams-header .header-date {
    display: none;
  }
  
  .team-row {
    grid-template-columns: 50px 1fr;
    gap: 0.8rem;
    padding: 1rem;
  }
  
  .team-competition,
  .team-date {
    display: none;
  }
  
  .team-name {
    font-size: 1rem;
  }
  
  .team-icon {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .teams-container {
    width: 95%;
    padding: 0 0.5rem;
  }
  
  .team-row {
    padding: 0.8rem;
  }
}
</style>