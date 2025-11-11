<template>
  <section id="about" class="about">
    <div class="container">
      <h3>Sobre o projeto</h3>
      
      <div class="project-intro">
        <p>
          <strong>The Code Arena</strong> é uma plataforma web gamificada desenvolvida para incentivar a participação de estudantes de Computação nas competições de programação da UnB, especialmente entre calouros e iniciantes. Observa-se que muitos alunos recém-ingressos não participam das maratonas de programação por diversos motivos, como desconhecimento sobre o funcionamento das competições, insegurança em relação ao nível técnico exigido ou falta de motivação.

          Com isso em mente, criamos uma experiência interativa que combina elementos digitais e físicos, utilizando estratégias de gamificação para tornar as competições mais atrativas e envolventes. Acreditamos que essa abordagem pode fortalecer o senso de pertencimento à comunidade acadêmica, desenvolver habilidades valorizadas pelo mercado e enriquecer o currículo dos participantes com experiências relevantes e reconhecidas.
        </p>
      </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <h5>🏆 Rankings e Estatísticas</h5>
            <p>Visualize sua evolução, histórico de participação e compare seu desempenho com outros competidores.</p>
          </div>
          
          <div class="feature-card">
            <h5>🎖️ Sistema de Conquistas</h5>
            <p>Badges, níveis e conquistas que reconhecem seu progresso e estimulam a participação contínua.</p>
          </div>
          
          <div class="feature-card">
            <h5>📱 Objetos Físicos Interativos</h5>
            <p>Chaveiros com QR Codes e NFC que conectam o mundo físico à plataforma digital de forma criativa.</p>
          </div>
          
          <div class="feature-card">
            <h5>👥 Comunidade Ativa</h5>
            <p>Conecte-se com outros participantes, mentores e amantes da computação em um ambiente colaborativo.</p>
          </div>
        </div>

        <h3>Objetivos do Projeto</h3>
        <ul class="objectives-list">
          <li>Aumentar a participação de alunos nas competições de programação da UnB</li>
          <li>Desenvolver uma plataforma web completa com rankings e estatísticas personalizadas</li>
          <li>Criar elementos visuais gamificados para engajar os participantes</li>
          <li>Produzir objetos físicos interativos como parte da experiência</li>
          <li>Avaliar o impacto da gamificação na motivação dos estudantes</li>
        </ul>

    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.about {
  padding: 4rem 1rem;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.about h3 {
  color: var(--color-cyan);
  font-size: 2.5rem;
  margin-bottom: 2rem;
  margin-top: 1.5rem;
  text-align: center;
}

.about h4 {
  color: var(--color-yellow);
  font-size: 1.5rem;
  margin: 2rem 0 1rem 0;
  text-align: center;
}

.about h5 {
  color: var(--color-pink);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.about p {
  color: #dcdcdc;
  margin-bottom: 1rem;
  line-height: 1.6;
  text-align: left;
}

.project-intro {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.project-intro p {
  text-align: center;
  font-size: 1.1rem;
}

.problem-section, .solution-section, .objectives-section, .impact-section {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-cyan);
}

.feature-card p {
  text-align: center;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.objectives-list {
  list-style: none;
  padding: 0;
  text-align: left;
}

.objectives-list li {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  border-left: 4px solid var(--color-cyan);
  color: #dcdcdc;
}

.objectives-list li::before {
  content: "✓ ";
  color: var(--color-cyan);
  font-weight: bold;
  margin-right: 0.5rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .about {
    padding: 2rem 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .about h3 {
    font-size: 2rem;
  }
  
  .about h4 {
    font-size: 1.3rem;
  }
}
</style>
