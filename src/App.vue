<script setup>

import { ref } from 'vue'

const username = ref('')

const createRoom = () => {
  console.log('createRoom')
}

const joinRoom = () => {
  console.log('joinRoom')
}

</script>

<template>
  <header class="container">
    <h1>Voting System</h1>
    <p>Empieza a votar de una forma rápida y sencilla</p>
  </header>
  <main class="container">
    <div class="form">
      <label>Nombre de usuario
        <input v-model="username" type="text" placeholder="Ej. Juan" required />
      </label>
      <div class="grid">
        <button @click="createRoom()" class="primary" type="submit">Crear sala</button>
        <button @click="joinRoom()" class="secondary" type="submit">Unirse a una sala</button>
      </div>
    </div>
  </main>
</template>
