<template>
  <section id="participants" class="participants">
    <div class="container">
      <h2>Os Três Mosqueteiros</h2>
      <p>Conheça quem começou esse projeto.</p>
      <div class="cards">
        <div class="card" v-for="p in sample" :key="p.id">
          <div class="avatar">{{ p.initials }}</div>
          <div class="meta">
            <strong>{{ p.name }}</strong>
            <span class="role">{{ p.role }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const sample = ref([
  { id: 1, name: 'Daniel de Paula Porto', role: 'Orientador', initials: 'DP' },
  { id: 2, name: 'Ricardo Fortes', role: 'Estudante', initials: 'RF' },
  { id: 3, name: 'Luísa Barros', role: 'Estudante', initials: 'LB' },
])
</script>

<style scoped>
.participants{padding:3rem 1rem}
.container{max-width:1000px;margin:0 auto;text-align:center}
.cards{display:flex;gap:1rem;flex-wrap:wrap;margin-top:1rem;justify-content:center}
.card{background:rgba(255,255,255,0.03);padding:1rem;border-radius:10px;display:flex;align-items:center;gap:0.75rem;min-width:220px}
.avatar{width:56px;height:56px;border-radius:8px;background:var(--color-blue);display:flex;align-items:center;justify-content:center;font-weight:700}
.meta strong{display:block}
.role{font-size:0.85rem;color:#bfbfbf}
</style>
