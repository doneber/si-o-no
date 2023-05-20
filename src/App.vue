<script setup>
import Home from './views/Home.vue'
</script>

<template>
  <header class="container main-header">
    <h1>Voting System</h1>
  </header>
  <main class="container">
    <suspense>
      <router-view />
    </suspense>
  </main>
</template>
