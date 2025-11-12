<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Botão de fechar -->
      <button class="close-btn" @click="closeModal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- Conteúdo da equipe -->
      <div class="team-detail">
        <div class="team-header">
          <div class="team-icon-large">{{ team.icon }}</div>
          <div class="team-title-section">
            <h2>{{ team.name }}</h2>
            <p class="team-competition">{{ team.competition }}</p>
            <div :class="['status-badge', team.status]">
              {{ getStatusText(team.status) }}
            </div>
          </div>
        </div>

        <div class="team-info-grid">
          <div class="info-section">
            <h3>📅 Data da Competição</h3>
            <p>{{ team.date }}</p>
          </div>
          
          <div class="info-section" v-if="team.results">
            <h3>🏆 Resultados</h3>
            <div class="results-detail">
              <div class="result-stat">
                <span class="stat-number">{{ team.results.position }}º</span>
                <span class="stat-label">Posição Final</span>
              </div>
              <div class="result-stat">
                <span class="stat-number">{{ team.results.problemsSolved }}/{{ team.results.totalProblems }}</span>
                <span class="stat-label">Problemas Resolvidos</span>
              </div>
            </div>
          </div>
        </div>

        <div class="members-section">
          <h3>👥 Integrantes da Equipe</h3>
          <div class="members-detailed-list">
            <div 
              v-for="member in team.members" 
              :key="member.id"
              :class="['member-card', { placeholder: member.name === 'A definir' }]"
            >
              <div class="member-avatar-large">{{ member.avatar }}</div>
              <div class="member-details">
                <h4>{{ member.name }}</h4>
                <p class="member-role">{{ member.role }}</p>
                <div v-if="member.name !== 'A definir'" class="member-stats">
                  <span v-if="member.name === 'Você'" class="member-badge you">Você</span>
                  <span v-else class="member-badge teammate">Companheiro</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Seção especial para diferentes status -->
        <div v-if="team.status === 'completed'" class="achievement-section">
          <div class="achievement-header">
            <h3>🎉 Competição Concluída!</h3>
          </div>
          <p class="achievement-text">
            Parabéns pela participação na {{ team.competition }}! 
            A equipe {{ team.name }} demonstrou excelente trabalho em equipe 
            e espírito competitivo.
          </p>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  team: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}

function getStatusText(status) {
  const statusMap = {
    completed: 'Concluída'
  }
  return statusMap[status] || status
}


</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: rgba(26, 10, 46, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  padding: 1.2rem;
  max-width: 480px;
  width: 100%;
  max-height: 75vh;
  overflow-y: auto;
  position: relative;
  backdrop-filter: blur(20px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dcdcdc;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: var(--color-cyan);
}

.team-detail {
  color: #ffffff;
}

.team-header {
  text-align: center;
  margin-bottom: 1.2rem;
}

.team-icon-large {
  font-size: 2.5rem;
  margin-bottom: 0.6rem;
}

.team-title-section h2 {
  color: var(--color-yellow);
  font-size: 1.6rem;
  margin: 0 0 0.3rem 0;
  font-weight: bold;
}

.team-competition {
  color: var(--color-cyan);
  font-size: 0.95rem;
  margin: 0 0 0.6rem 0;
  font-weight: 500;
}

.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.completed {
  background: rgba(40, 167, 69, 0.3);
  color: #28a745;
  border: 1px solid rgba(40, 167, 69, 0.5);
}





.team-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.8rem;
  margin-bottom: 1.2rem;
}

.info-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 0.8rem;
}

.info-section h3 {
  color: var(--color-cyan);
  font-size: 1rem;
  margin: 0 0 0.6rem 0;
}

.info-section p {
  color: #dcdcdc;
  margin: 0;
  line-height: 1.5;
}

.results-detail {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}

.result-stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-yellow);
  margin-bottom: 0.3rem;
}

.stat-label {
  font-size: 0.85rem;
  color: #999;
}

.members-section {
  margin-bottom: 1.2rem;
}

.members-section h3 {
  color: var(--color-yellow);
  font-size: 1.1rem;
  margin: 0 0 0.8rem 0;
}

.members-detailed-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.6rem;
}

.member-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.8rem;
  text-align: center;
  transition: all 0.3s ease;
}

.member-card:hover {
  border-color: var(--color-cyan);
  transform: translateY(-2px);
}

.member-card.placeholder {
  border-style: dashed;
  opacity: 0.6;
}

.member-avatar-large {
  font-size: 2rem;
  margin-bottom: 0.6rem;
}

.member-details h4 {
  color: #ffffff;
  font-size: 0.9rem;
  margin: 0 0 0.3rem 0;
}

.member-role {
  color: #bbb;
  font-size: 0.8rem;
  margin: 0 0 0.6rem 0;
}

.member-stats {
  display: flex;
  justify-content: center;
}

.member-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.member-badge.you {
  background: rgba(244, 211, 94, 0.3);
  color: var(--color-yellow);
  border: 1px solid rgba(244, 211, 94, 0.5);
}

.member-badge.teammate {
  background: rgba(59, 206, 172, 0.3);
  color: var(--color-cyan);
  border: 1px solid rgba(59, 206, 172, 0.5);
}

.achievement-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}

.achievement-header h3 {
  color: var(--color-cyan);
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
}

.achievement-text {
  color: #dcdcdc;
  line-height: 1.6;
  margin: 0;
}

/* Responsividade */
@media (max-width: 600px) {
  .modal-content {
    padding: 1rem;
    margin: 0.5rem;
    max-width: 95vw;
    max-height: 80vh;
  }
  
  .team-icon-large {
    font-size: 2rem;
  }
  
  .team-title-section h2 {
    font-size: 1.3rem;
  }
  
  .team-info-grid {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
  
  .members-detailed-list {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .results-detail {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>