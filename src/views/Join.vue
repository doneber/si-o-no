<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const codeRoom = ref('')

const joinRoom = () => {
  console.log('joining to the room')
  router.push('/room')
}

</script>
<template>
  <form @submit.prevent="joinRoom()" class="form">
    <label>Código de la sala
      <input v-model="codeRoom" type="text" placeholder="Ej. 1417510" required />
    </label>
    <div class="grid">
      <button class="primary" type="submit">Unirse</button>
    </div>
  </form>
</template>