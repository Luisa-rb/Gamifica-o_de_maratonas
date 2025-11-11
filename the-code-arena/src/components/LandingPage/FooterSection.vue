<template>
  <footer class="site-footer">
    <div class="container">
      <div class="left">© {{ year }} The Code Arena — Desenvolvido pelos Três Mosqueteiros</div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer{padding:2rem 1rem;margin-top:2rem;border-top:1px solid rgba(255,255,255,0.03)}
.container{max-width:1000px;margin:0 auto;text-align:center}
.site-footer a{color:#bfbfbf;margin-left:0.75rem}
</style>
