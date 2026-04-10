<template>
  <section id="hero" class="hero">
    <div class="hero-inner">
      <h2 class="hero-title">Bem-vindo(a)!</h2>
      <h3 class="hero-sub">Em breve, a Arena será seu refúgio nas maratonas de programação. Enquanto isso, escaneei seu bottom e veja a mágica acontecer!</h3>
      <div class="ar-button">
        <button @click="irParaAR" class="btn-pixel btn-ar">
          Escanear Botton
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const irParaAR = () => {
  router.push({ name: 'ar' });
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
  flex-wrap: wrap; /* Garante que os botões quebrem linha no celular */
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

@media(min-width:768px) {
  .hero-title {
    font-size: 4rem
  }
}
</style>