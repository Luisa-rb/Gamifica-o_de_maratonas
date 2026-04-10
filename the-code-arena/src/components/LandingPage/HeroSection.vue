<template>
  <section id="hero" class="hero">
    <div class="hero-inner">
      <h2 class="hero-title">Bem-vindo(a)!</h2>
      <h3 class="hero-sub">Em breve, a Arena será seu refúgio nas maratonas de programação. Enquanto isso, escaneei seu
        bottom e veja a mágica acontecer!</h3>
      <div class="ar-button" v-if="!mostrarEscolha">
        <button @click="mostrarEscolha = true" class="btn-pixel btn-ar">
          Escanear Botton
        </button>
      </div>

      <div v-else class="ar-choice-panel">
        <p class="choice-title">Escolha onde abrir a Arena</p>
        <div class="ar-button">
          <button @click="irParaAR('ar-desktop')" class="btn-pixel btn-ar choice-button">
            Computador
          </button>
          <button @click="irParaAR('ar-mobile')" class="btn-pixel btn-ar choice-button secondary">
            Celular
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const mostrarEscolha = ref(false);

const irParaAR = (routeName) => {
  router.push({ name: routeName });
};
</script>

<style scoped>
.hero {
  width: 100%;
  padding: 4rem 1.25rem;
  display: flex;
  justify-content: center;
}

.hero-inner {
  max-width: 1000px;
  text-align: center;
}

.hero-title {
  font-family: "VT323", monospace;
  font-size: 3.7rem;
  color: var(--color-yellow);
  margin-bottom: 0.5rem;
}

.hero-sub {
  color: #dcdcdc;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
}

.ar-button {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.ar-choice-panel {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
}

.choice-title {
  color: #fff;
  font-family: "VT323", monospace;
  font-size: 1.7rem;
  margin-bottom: 0.75rem;
}

.btn-pixel {
  font-size: 1.5rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border: none;
  text-decoration: none;
  display: inline-block;
}

.btn-ar {
  background-color: var(--color-yellow);
  color: #1e0635;
}

.choice-button {
  min-width: 180px;
}

.choice-button.secondary {
  background-color: #3bceac;
}

@media(min-width:768px) {
  .hero-title {
    font-size: 4rem
  }

  .choice-title {
    font-size: 2rem;
  }
}
</style>