<template>
  <div class="bg-decor">
    <div class="starfield"></div>
    
    <!-- Ícones flutuantes -->
    <div class="pixel-icon pixel-heart">❤️</div>
    <div class="pixel-icon pixel-coin">🪙</div>
    <div class="pixel-icon pixel-joystick">🕹️</div>
    <div class="pixel-icon pixel-star">⭐</div>
    <div class="pixel-icon pixel-diamond">💎</div>
    <div class="pixel-icon pixel-gem">💍</div>
    <div class="pixel-icon pixel-crown">👑</div>
    <div class="pixel-icon pixel-shield">🛡️</div>
    <div class="pixel-icon pixel-sword">⚔️</div>
    <div class="pixel-icon pixel-key">🗝️</div>
    <div class="pixel-icon pixel-crystal">🔮</div>
    <div class="pixel-icon pixel-trophy">🏆</div>
    <div class="pixel-icon pixel-potion">🧪</div>
    <div class="pixel-icon pixel-orb">🔴</div>
    <div class="pixel-icon pixel-coin2">🟡</div>
    <div class="pixel-icon pixel-star2">✨</div>
    <div class="pixel-icon pixel-gem2">💚</div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.bg-decor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.starfield {
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
}

.starfield::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #fff, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, #fff, transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 160px 30px, #fff, transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: sparkle 20s linear infinite;
}

@keyframes sparkle {
  0% { transform: translateY(0px); }
  100% { transform: translateY(-100px); }
}

.pixel-icon {
  position: absolute;
  font-size: 2rem;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
  user-select: none;
}

/* Posicionamento dos ícones */
.pixel-heart { top: 10%; left: 5%; animation-delay: 0s; }
.pixel-coin { top: 20%; right: 10%; animation-delay: 1s; }
.pixel-joystick { top: 30%; left: 15%; animation-delay: 2s; }
.pixel-star { top: 40%; right: 20%; animation-delay: 3s; }
.pixel-diamond { top: 50%; left: 10%; animation-delay: 4s; }
.pixel-gem { top: 60%; right: 15%; animation-delay: 5s; }
.pixel-crown { top: 70%; left: 20%; animation-delay: 0.5s; }
.pixel-shield { top: 80%; right: 25%; animation-delay: 1.5s; }
.pixel-sword { top: 15%; left: 80%; animation-delay: 2.5s; }
.pixel-key { top: 25%; right: 70%; animation-delay: 3.5s; }
.pixel-crystal { top: 35%; left: 75%; animation-delay: 4.5s; }
.pixel-trophy { top: 45%; right: 80%; animation-delay: 5.5s; }
.pixel-potion { top: 55%; left: 85%; animation-delay: 0.8s; }
.pixel-orb { top: 65%; right: 85%; animation-delay: 1.8s; }
.pixel-coin2 { top: 75%; left: 70%; animation-delay: 2.8s; }
.pixel-star2 { top: 85%; right: 75%; animation-delay: 3.8s; }
.pixel-gem2 { top: 5%; left: 50%; animation-delay: 4.8s; }

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
    opacity: 0.1;
  }
  50% { 
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.2;
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .pixel-icon {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .pixel-icon {
    font-size: 1.2rem;
  }
}
</style>