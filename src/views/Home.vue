<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc } from "firebase/firestore";
import { collection, doc, addDoc } from "firebase/firestore";
import config from './../../config.js';
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const { updateName, updateUserId, updateRoomId } = userStore

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

const createRoom = async () => {
  try {
    const roomRef = await addDoc(collection(db, 'rooms'), {
      asking: false,
      owner: '',
      votes: [],
    });
    const roomDocRef = doc(db, 'rooms', roomRef.id);
    const usersRef = collection(roomDocRef, 'users');
    const userRef = await addDoc(usersRef, {
      // User data
      name: username.value,
    });
    console.log('User created with ID: ', userRef.id);

    // update roomRef with ownerRef.id 
    await updateDoc(doc(db, "rooms", roomRef.id), {
      owner: userRef.id,
      asking: false,
      votes: [],
    })

    updateUserId(userRef.id)
    updateName(username.value)
    updateRoomId(roomRef.id)

    router.push(`/room/${roomRef.id}`)
    console.log('Room created with ID: ', roomRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const joinRoom = () => {
  console.log('joinRoom')
  updateName(username.value)
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