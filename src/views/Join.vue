<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc } from "firebase/firestore";
import config from './../../config.js';

const router = useRouter()
const codeRoom = ref('')

const firebaseConfig = config.firebaseConfig
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const joinRoom = async () => {
  console.log('joining to the room')
  
  // get user data saved in local storage
  const user = ref(JSON.parse(localStorage.getItem('user')))

  const roomDocRef = await doc(db, 'rooms', codeRoom.value);
  const usersRef = collection(roomDocRef, 'users');
  const userRef = await addDoc(usersRef, {
    name: user.value.name,
  });
  // save data of ownerRef in localstorage
  localStorage.setItem('user', JSON.stringify(
    {
      id: userRef.id,
      name: user.value.name,
      roomId: codeRoom.value,
    }
  ))

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