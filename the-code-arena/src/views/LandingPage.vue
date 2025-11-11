<template>
  <div class="home">
    <main>
      <section class="title-hero-section">
        <div class="title-container">
          <h1>
            <div class="title-line">
              THE <span class="code text-center">CODE</span> ARENA
            </div>
          </h1>
        </div>
        <HeroSection />
      </section>
      
      <AboutSection />
      <FeaturesSection />
      <ParticipantsSection />
      <ContactSection />
    </main>

    <FooterSection />
  </div>
</template>

<script setup>
import HeroSection from '@/components/LandingPage/HeroSection.vue'
import AboutSection from '@/components/LandingPage/AboutSection.vue'
import ParticipantsSection from '@/components/LandingPage/ParticipantsSection.vue'
import FeaturesSection from '@/components/LandingPage/FeaturesSection.vue'
import ContactSection from '@/components/LandingPage/ContactSection.vue'
import FooterSection from '@/components/LandingPage/FooterSection.vue'
</script>

<style scoped>
/* Background gradiente para toda a landing page */
.home {
  background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%);
  min-height: 100vh;
  position: relative;
}

.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 30%, rgba(244, 211, 94, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(59, 206, 172, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* ajuste específico css da landing */
.buttons {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

main {
  width: 100%;
  position: relative;
  z-index: 1;
}

/* seção combinada título + hero */
.title-hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 2rem;
}

.title-container h1 {
  text-align: center;
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  font-size: 9rem;
  text-transform: uppercase;
  text-shadow:
    -2px -2px 0 #ff0000,
    2px -2px 0 #ff0000,
    -2px 2px 0 #ff0000,
    2px 2px 0 #ff0000;
  color: #ffffff;
  margin: 0;
  margin-bottom: 2rem;
}

.title-container .title-line {
  display: block;
  text-align: center;
}

.title-container .code {
  color: yellow;
  text-shadow:
    -2px -2px 0 #ff0000,
    2px -2px 0 #ff0000,
    -2px 2px 0 #ff0000,
    2px 2px 0 #ff0000;
  background: transparent;
  padding: 0;
  display: inline;
  border-radius: 0;
}

main {
  width: 100%;
}

/* Responsividade */
@media (max-width: 900px) {
  .title-container h1 {
    font-size: 6rem;
  }
  
  .title-hero-section {
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .title-container h1 {
    font-size: 3.6rem;
  }
  
  .title-hero-section {
    padding: 1rem;
    gap: 1.5rem;
  }
}

</style>
