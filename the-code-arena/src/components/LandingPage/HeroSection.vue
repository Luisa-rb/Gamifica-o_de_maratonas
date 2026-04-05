<template>
  <section id="hero" class="hero">
    <div class="hero-inner">
      <h2 class="hero-title">Bem-vindo(a)!</h2>
      <p class="hero-sub">A Arena é seu refugio nas maratonas de programacao. Seja parte dessa comunidade!</p>
      <div class="login-button">
        <button @click="irParaAR" class="btn-pixel btn-ra">
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
  font-size: 3.2rem;
  color: var(--color-yellow);
  margin-bottom: 0.5rem;
}

.hero-sub {
  color: #dcdcdc;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.login-button {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap; /* Garante que os botões quebrem linha no celular */
}

.btn-pixel {
  font-size: 1rem;
  padding: 12px 24px;
  cursor: pointer;
  border: none;
  text-decoration: none;
  display: inline-block;
}

.btn-ra {
  background-color: var(--color-yellow);
  color: #000;
}

@media(min-width:768px) {
  .hero-title {
    font-size: 4rem
  }
}
</style>