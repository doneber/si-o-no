<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const username = ref('')

const createRoom = () => {
  console.log('createRoom')
  router.push('/room')
}

const joinRoom = () => {
  console.log('joinRoom')
}

</script>
<template>
  <div class="form">
    <label>Nombre de usuario
      <input v-model="username" type="text" placeholder="Ej. Juan" required />
    </label>
    <div class="grid">
      <button @click="createRoom()" class="primary" type="submit">Crear sala</button>
      <button @click="joinRoom()" class="secondary" type="submit">Unirse a una sala</button>
    </div>
  </div>
</template>