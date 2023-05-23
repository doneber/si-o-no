<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/userStore'
import { storeToRefs } from 'pinia'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import config from '../config.js';

const router = useRouter();
const isInRoom = ref(false)
const userStore = useUserStore()
const { name, roomId } = storeToRefs(userStore)

const goOut = () => {
  const userStore = useUserStore()
  const { updateName, updateUserId, updateRoomId } = userStore
  updateUserId('')
  updateName('')
  updateRoomId('')
  router.replace('/')
}

onMounted(async () => {
  const firebaseConfig = config.firebaseConfig
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const { currentRoute } = await router;
  const { path } = await currentRoute.value;
  const isValidRoomId = async (idRoom) => {
    if (idRoom) {
      const roomDocRef = await doc(db, 'rooms', idRoom)
      const roomDocSnap = await getDoc(roomDocRef)
      isInRoom.value = roomDocSnap.exists() ? true : false
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
console.log({roomId});
</script>

<template>
  <nav class="container">
    <ul>
      <li class="app-title"><strong>Voting System</strong></li>
    </ul>
    <ul>
      <li v-if="roomId">
        <button @click="goOut" class="btn-out">
          <svg width="24" fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Salir</title> <path d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v4h4v-4q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408v-4h-4v4zM0 18.016h8v4l8-6.016-8-5.984v4h-8v4z"></path> </g></svg>
        </button>
      </li>
    </ul>
  </nav>
  <main class="container">
    <suspense>
      <router-view />
    </suspense>
  </main>
</template>
<style scoped>
.app-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
}
.btn-out {
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  margin: 0;
}

</style>