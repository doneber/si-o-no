<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { initializeApp } from "firebase/app";
import { getFirestore, setDoc } from "firebase/firestore";
import { collection, doc, addDoc } from "firebase/firestore";
import config from './../../config.js';

const firebaseConfig = config.firebaseConfig

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const router = useRouter()
const username = ref('')
const action = ref('')

const goToRoom = () => {
  if (action.value === 'createRoom') {
    createRoom()
  } else if (action.value === 'joinRoom') {
    joinRoom()
  }
}

const createRoom = () => {
  console.log('createRoom')
  router.push('/room')
}

const joinRoom = () => {
  console.log('joinRoom')
  router.push('/join')
}

</script>
<template>
  <form @submit.prevent="goToRoom" class="form">
    <label>Nombre de usuario
      <input v-model="username" type="text" placeholder="Ej. Juan" required />
    </label>
    <div class="grid">
      <button @click="action = 'createRoom'" class="primary" type="submit">Crear sala</button>
      <button @click="action = 'joinRoom'" class="secondary" type="submit">Unirse a una sala</button>
    </div>
  </form>
</template>