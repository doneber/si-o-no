<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc } from "firebase/firestore";
import config from './../../config.js';
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const { name } = userStore
const { updateUserId, updateRoomId } = userStore

const router = useRouter()
const codeRoom = ref('')

const firebaseConfig = config.firebaseConfig
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const joinRoom = async () => {
  console.log('joining to the room')

  const roomDocRef = await doc(db, 'rooms', codeRoom.value);
  const usersRef = collection(roomDocRef, 'users');
  const userRef = await addDoc(usersRef, {
    name: name,
  });

  updateUserId(userRef.id)
  updateRoomId(codeRoom.value)

  router.push(`/room/${codeRoom.value}`)
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
