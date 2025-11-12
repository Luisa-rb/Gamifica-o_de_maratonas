<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Botão de fechar -->
      <button class="close-btn" @click="closeModal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- Conteúdo da medalha -->
      <div class="medal-detail">
        <div class="medal-header">
          <div class="medal-icon-large">
            <span v-if="medal.unlocked">{{ medal.icon }}</span>
            <span v-else class="locked-icon">🔒</span>
          </div>
          
          <div class="medal-title-section">
            <h2>{{ medal.name }}</h2>
            <div :class="['rarity-badge', medal.rarity]">
              {{ getRarityText(medal.rarity) }}
            </div>
          </div>
        </div>

        <div class="medal-description">
          <p>{{ medal.description }}</p>
        </div>

        <div class="medal-stats">
          <div class="stat-item">
            <span class="stat-label">Categoria:</span>
            <span class="stat-value">{{ getCategoryName(medal.category) }}</span>
          </div>
          
          <div class="stat-item" v-if="medal.eventDate">
            <span class="stat-label">Data do Evento:</span>
            <span class="stat-value">{{ medal.eventDate }}</span>
          </div>
          
          <div class="stat-item" v-if="medal.unlocked && !medal.eventDate">
            <span class="stat-label">Conquistada em:</span>
            <span class="stat-value">{{ formatDate(medal.unlockedAt) }}</span>
          </div>
          
          <div class="stat-item" v-if="!medal.unlocked && !medal.futureEvent">
            <span class="stat-label">Requisito:</span>
            <span class="stat-value requirement">{{ medal.requirement }}</span>
          </div>
          
          <div class="stat-item" v-if="medal.futureEvent">
            <span class="stat-label">Status:</span>
            <span class="stat-value future-event">Evento Futuro</span>
          </div>
        </div>

        <!-- Informações extras para medalhas desbloqueadas -->
        <div v-if="medal.unlocked" class="medal-achievement">
          <div class="achievement-header">
            <h3>🎉 Conquista Desbloqueada!</h3>
          </div>
          <p class="achievement-text">
            Parabéns! Você demonstrou excelência em {{ getCategoryName(medal.category).toLowerCase() }} 
            e conquistou esta medalha {{ getRarityText(medal.rarity).toLowerCase() }}.
          </p>
        </div>

        <!-- Dicas para medalhas bloqueadas -->
        <div v-else class="medal-tips">
          <div class="tips-header">
            <h3>💡 Como conquistar</h3>
          </div>
          <div class="tips-content">
            <p v-if="medal.category === 'contest'">
              <span v-if="medal.futureEvent">
                📅 Evento futuro: Fique atento às datas de inscrição e prepare-se para participar!
              </span>
              <span v-else>
                Dica: Mantenha-se ativo nas plataformas de programação competitiva para não perder os eventos.
              </span>
            </p>
            <p v-else-if="medal.category === 'special'">
              Dica: Conquistas especiais vêm com dedicação constante e participação ativa na comunidade.
            </p>
            <p v-else>
              Dica: Continue praticando e participando das competições para desbloquear esta conquista!
            </p>
          </div>
        </div>

        <!-- Progresso (se aplicável) -->
        <div v-if="!medal.unlocked && hasProgress(medal)" class="progress-section">
          <h4>Progresso</h4>
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: getProgressPercentage(medal) + '%' }"
            ></div>
          </div>
          <span class="progress-text">{{ getProgressText(medal) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  medal: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const categories = {
  'contest': 'Competições',
  'special': 'Especiais'
}

function closeModal() {
  emit('close')
}

function getCategoryName(categoryId) {
  return categories[categoryId] || categoryId
}

function getRarityText(rarity) {
  const rarityMap = {
    common: 'Comum',
    rare: 'Raro',
    epic: 'Épico',
    legendary: 'Lendário'
  }
  return rarityMap[rarity] || rarity
}

function formatDate(date) {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

function hasProgress(medal) {
  return medal.requirement && medal.requirement.includes('/')
}

function getProgressPercentage(medal) {
  if (!hasProgress(medal)) return 0
  
  const match = medal.requirement.match(/\((\d+)\/(\d+)\)/)
  if (match) {
    const current = parseInt(match[1])
    const total = parseInt(match[2])
    return (current / total) * 100
  }
  return 0
}

function getProgressText(medal) {
  const match = medal.requirement.match(/\((\d+)\/(\d+)\)/)
  if (match) {
    return `${match[1]} de ${match[2]}`
  }
  return ''
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: rgba(26, 10, 46, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
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

.medal-detail {
  color: #ffffff;
}

.medal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.medal-icon-large {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.locked-icon {
  color: #666;
  filter: grayscale(100%);
}

.medal-title-section h2 {
  color: var(--color-yellow);
  font-size: 2rem;
  margin: 0 0 1rem 0;
  font-weight: bold;
}

.medal-description {
  text-align: center;
  margin-bottom: 2rem;
}

.medal-description p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #dcdcdc;
  margin: 0;
}

.medal-stats {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.stat-item:last-child {
  margin-bottom: 0;
}

.stat-label {
  color: #999;
  font-size: 0.9rem;
}

.stat-value {
  color: var(--color-cyan);
  font-weight: 500;
}

.stat-value.requirement {
  color: #ccc;
  font-style: italic;
}

.stat-value.future-event {
  color: var(--color-yellow);
  font-weight: bold;
}

.rarity-badge {
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.rarity-badge.common {
  background: rgba(108, 117, 125, 0.3);
  color: #adb5bd;
  border: 1px solid rgba(108, 117, 125, 0.5);
}

.rarity-badge.rare {
  background: rgba(0, 123, 255, 0.3);
  color: #007bff;
  border: 1px solid rgba(0, 123, 255, 0.5);
}

.rarity-badge.epic {
  background: rgba(111, 66, 193, 0.3);
  color: #9c27b0;
  border: 1px solid rgba(111, 66, 193, 0.5);
}

.rarity-badge.legendary {
  background: rgba(255, 193, 7, 0.3);
  color: #ffc107;
  border: 1px solid rgba(255, 193, 7, 0.5);
}

.medal-achievement {
  background: rgba(59, 206, 172, 0.1);
  border: 1px solid rgba(59, 206, 172, 0.3);
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

.medal-tips {
  background: rgba(244, 211, 94, 0.1);
  border: 1px solid rgba(244, 211, 94, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
}

.tips-header h3 {
  color: var(--color-yellow);
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
}

.tips-content p {
  color: #dcdcdc;
  line-height: 1.6;
  margin: 0;
}

.progress-section {
  margin-top: 1.5rem;
}

.progress-section h4 {
  color: var(--color-cyan);
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.progress-bar {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  height: 8px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  background: linear-gradient(90deg, var(--color-cyan), var(--color-blue));
  height: 100%;
  border-radius: 10px;
  transition: width 0.3s ease;
}

.progress-text {
  color: #dcdcdc;
  font-size: 0.9rem;
}

/* Responsividade */
@media (max-width: 600px) {
  .modal-content {
    padding: 1.5rem;
    margin: 1rem;
  }
  
  .medal-icon-large {
    font-size: 3rem;
  }
  
  .medal-title-section h2 {
    font-size: 1.5rem;
  }
  
  .stat-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
}
</style>