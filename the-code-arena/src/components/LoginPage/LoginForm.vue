<template>
  <div class="login-form-container">
    <div class="form-card">
      <div class="form-header">
        <h2>{{ isLogin ? 'Entrar na Arena' : 'Junte-se à Arena' }}</h2>
        <p class="form-subtitle">
          {{ isLogin ? 'Acesse sua conta e continue sua jornada' : 'Crie sua conta e comece sua aventura' }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <!-- Campos de Login -->
        <div v-if="isLogin" class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="loginData.email" 
            placeholder="Digite seu email"
            required
          />
        </div>

        <div v-if="isLogin" class="form-group">
          <label for="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            v-model="loginData.password" 
            placeholder="Digite sua senha"
            required
          />
        </div>

        <!-- Campos de Cadastro -->
        <div v-if="!isLogin" class="form-group">
          <label for="name">Nome Completo</label>
          <input 
            type="text" 
            id="name" 
            v-model="registerData.name" 
            placeholder="Digite seu nome completo"
            required
          />
        </div>

        <div v-if="!isLogin" class="form-group">
          <label for="register-email">Email</label>
          <input 
            type="email" 
            id="register-email" 
            v-model="registerData.email" 
            placeholder="Digite seu email"
            required
          />
        </div>

        <div v-if="!isLogin" class="form-group">
          <label for="register-password">Senha</label>
          <input 
            type="password" 
            id="register-password" 
            v-model="registerData.password" 
            placeholder="Crie uma senha"
            required
          />
        </div>

        <div v-if="!isLogin" class="form-group">
          <label for="confirm-password">Confirmar Senha</label>
          <input 
            type="password" 
            id="confirm-password" 
            v-model="registerData.confirmPassword" 
            placeholder="Confirme sua senha"
            required
          />
        </div>

        <button type="submit" class="btn-pixel submit-btn">
          {{ isLogin ? 'Entrar' : 'Criar Conta' }}
        </button>
      </form>

      <div class="form-toggle">
        <p v-if="isLogin">
          Não tem uma conta? 
          <button @click="toggleMode" class="toggle-link">Cadastre-se aqui</button>
        </p>
        <p v-else>
          Já tem uma conta? 
          <button @click="toggleMode" class="toggle-link">Faça login aqui</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isLogin = ref(true)

const loginData = reactive({
  email: '',
  password: ''
})

const registerData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  // Limpar dados quando trocar de modo
  loginData.email = ''
  loginData.password = ''
  registerData.name = ''
  registerData.email = ''
  registerData.password = ''
  registerData.confirmPassword = ''
}

const handleSubmit = () => {
  if (isLogin.value) {
    console.log('Login:', loginData)
    // Aqui você implementaria a lógica de login
    // Simulando login bem-sucedido
    setTimeout(() => {
      window.location.href = '/home'
    }, 1000)
  } else {
    if (registerData.password !== registerData.confirmPassword) {
      alert('As senhas não coincidem!')
      return
    }
    console.log('Register:', registerData)
    // Aqui você implementaria a lógica de cadastro
    // Simulando cadastro bem-sucedido
    setTimeout(() => {
      window.location.href = '/home'
    }, 1000)
  }
}
</script>

<style scoped>
.login-form-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.form-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.form-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 20%, rgba(244, 211, 94, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(59, 206, 172, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.form-header h2 {
  font-family: 'VT323', monospace;
  font-size: 2.5rem;
  color: var(--color-blue);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px rgba(59, 183, 206, 0.3);
}

.form-subtitle {
  color: #bfbfbf;
  font-size: 1rem;
  line-height: 1.4;
}

.auth-form {
  position: relative;
  z-index: 1;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: var(--color-yellow);
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input {
  width: 100%;
  padding: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-cyan);
  box-shadow: 0 0 0 3px rgba(59, 206, 172, 0.1);
  background: rgba(255, 255, 255, 0.08);
}

.form-group input::placeholder {
  color: #666;
}

.submit-btn {
  width: 100%;
  margin: 2rem 0 1rem 0;
  font-size: 1.1rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--color-cyan), var(--color-blue));
  border: none;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: linear-gradient(135deg, var(--color-blue), var(--color-cyan));
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(59, 206, 172, 0.3);
}

.form-toggle {
  text-align: center;
  position: relative;
  z-index: 1;
}

.form-toggle p {
  color: #bfbfbf;
  font-size: 0.9rem;
}

.toggle-link {
  background: none;
  border: none;
  color: var(--color-yellow);
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.toggle-link:hover {
  color: var(--color-cyan);
}

/* Responsividade */
@media (max-width: 480px) {
  .login-form-container {
    padding: 1rem;
  }
  
  .form-card {
    padding: 2rem;
  }
  
  .form-header h2 {
    font-size: 2rem;
  }
  
  .form-group input {
    padding: 0.8rem;
  }
}
</style>