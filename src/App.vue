<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/userStore'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import config from '../config.js';

onMounted(async () => {
  const userStore = useUserStore()
  const { name, roomId } = userStore

  const firebaseConfig = config.firebaseConfig
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const router = await useRouter();
  const { currentRoute } = await router;
  const { path } = await currentRoute.value;
  const isValidRoomId = async (idRoom) => {
    if (idRoom) {
      const roomDocRef = await doc(db, 'rooms', idRoom)
      const roomDocSnap = await getDoc(roomDocRef)
      return roomDocSnap.exists() ? true : false
    }
    return false
  }

  if (path === '/') {
    if (await isValidRoomId(roomId)) {
      router.replace(`/room/${roomId}`);
    } else {
      router.replace('/');
    }
  } else if (path === '/join') {
    if (await isValidRoomId(roomId)) {
      router.replace(`/room/${roomId}`);
    } else {
      router.replace('/');
    }
  } else if (path.startsWith('/room/')) {
    if (!name || await !isValidRoomId(roomId)) {
      router.replace('/');
    }
  }
})
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
