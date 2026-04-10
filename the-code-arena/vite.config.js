import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/Gamificacao_de_maratonas/',

  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Configuração para o vue, que diz: se tag começar com a-, não tente compilar como componente Vue"
          isCustomElement: (tag) => tag.startsWith('a-')
        }
      }
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})