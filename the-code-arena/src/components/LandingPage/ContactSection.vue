<template>
  <section id="contact" class="contact">
    <div class="container">
      <h3>Contato</h3>
      <p>Interessado em participar ou patrocinar? Envie uma mensagem.</p>
      <form @submit.prevent="onSubmit" class="contact-form">
        <input v-model="name" placeholder="Seu nome" />
        <input v-model="email" placeholder="Seu e-mail" />
        <textarea v-model="message" placeholder="Mensagem" rows="4"></textarea>
        <button type="submit" class="btn-pixel">Enviar</button>
      </form>
      <p class="note">*ainda não sei o que colocar aqui e temos que conectar com o banco de dados depois.</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const email = ref('')
const message = ref('')

function onSubmit(){
  alert(`Obrigado, ${name.value || 'participante'}! Mensagem recebida.`)
  name.value=''
  email.value=''
  message.value=''
}
</script>

<style scoped>
.contact{padding:3rem 1rem}
.container{max-width:700px;margin:0 auto}
.contact-form{display:flex;flex-direction:column;gap:0.5rem;margin-top:1rem}
.contact-form input, .contact-form textarea{padding:0.6rem;border-radius:6px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);color:inherit}
.note{font-size:0.85rem;color:#bfbfbf;margin-top:0.5rem}
</style>
