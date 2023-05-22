<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import config from './../../config.js';
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const { name, userId, roomId } = userStore

const answer = ref(false)
const showAskModal = ref(false)
const showQuestionModal = ref(false)

const firebaseConfig = config.firebaseConfig
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// get param from url
const { params } = useRoute()
const codeRoom = ref(params.codeRoom)
const roomData = ref({})

const unsub = onSnapshot(doc(db, "rooms", codeRoom.value), (doc) => {
  // data is updated in real time
  roomData.value = doc.data()
  showQuestionModal.value = doc.data().asking
});
// 

const roomDocRef = await doc(db, 'rooms', codeRoom.value);
const roomDocSnap = await getDoc(roomDocRef);

const isTheOwner = userId == roomDocSnap.data().owner

const finishAsking = async () => {
  console.log('finishAsking')
  await updateDoc(doc(db, "rooms", codeRoom.value), {
    asking: false,
  })
}

const ask = async () => {
  await updateDoc(doc(db, "rooms", codeRoom.value), {
    asking: true,
  })
  closeAskDialog()
}

const sendAnswer = (value) => {
  answer.value = value
  console.log(answer.value)
  closeQuestionDialog()
}

const openAskDialog = () => {
  showAskModal.value = true
}
const closeAskDialog = () => {
  showAskModal.value = false
}
const closeQuestionDialog = () => {
  showQuestionModal.value = false
}

</script>

<template>
  <div class="people-container">
    <section class="grid">
      <!-- show user from local storage -->
      <div class="user">
        <div class="user__name">Usuario: {{ name }}</div>
        <div class="user__room">Sala: {{ roomId }}</div>
      </div>
      <div v-if="isTheOwner">
        <button @click="openAskDialog" :disabled="roomData.asking" class="">
          {{ roomData.asking ? 'Preguntando...' : 'Preguntar' }}
        </button>
        <button @click="finishAsking" :disabled="!roomData.asking" class="outline small">Finalizar</button>
      </div>
    </section>
    <svg class="people" width="80%" viewBox="0 0 724 375" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle id="person0" cx="362" cy="25" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person1" cx="25" cy="58" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person2" cx="82" cy="58" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person3" cx="139" cy="58" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person4" cx="196" cy="58" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person5" cx="528" cy="58" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person6" cx="585" cy="58" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person7" cx="642" cy="58" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person8" cx="699" cy="58" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person9" cx="66" cy="134" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person10" cx="126" cy="129" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person11" cx="186" cy="123" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person12" cx="246" cy="117" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person13" cx="476" cy="117" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person14" cx="535" cy="123" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person15" cx="595" cy="129" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person16" cx="655" cy="135" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person17" cx="106" cy="205" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person18" cx="174" cy="192" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person19" cx="240" cy="182" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person20" cx="318" cy="161" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person21" cx="411" cy="161" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person22" cx="487" cy="182" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person23" cx="553" cy="192" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person24" cx="622" cy="204" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person25" cx="165" cy="264" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person26" cx="240" cy="247" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person27" cx="320" cy="224" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person28" cx="408" cy="224" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person29" cx="487" cy="247" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person30" cx="564" cy="264" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person31" cx="246" cy="314" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person32" cx="321" cy="287" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person33" cx="405" cy="287" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person34" cx="487" cy="314" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person35" cx="325" cy="350" r="24.5" fill="transparent" stroke="#CCCCCC" />
      <circle id="person36" cx="404" cy="350" r="24.5" fill="transparent" stroke="#CCCCCC" />
    </svg>
  </div>

  <dialog :open="showAskModal">
    <article>
      <a @click="closeAskDialog" aria-label="Close" class="close"></a>
      <p>¿Preguntar <strong>SI</strong> o <strong>NO</strong> a los participantes?</p>
      <footer>
        <a @click="closeAskDialog" href="#" role="button" class="secondary">
          Cancelar
        </a>
        <a @click="ask" href="#" role="button">
          Preguntar
        </a>
      </footer>
    </article>
  </dialog>
  <dialog :open="showQuestionModal">
    <article style="width: 100%;">
      <header>
        <span>El anfitrión esta preguntando <strong>SI</strong> o <strong>NO</strong></span>
        <a @click="closeQuestionDialog" aria-label="Close" class="close"></a>
      </header>
      <div class="grid">
        <button @click="sendAnswer(true)">
          Si
        </button>
        <button @click="sendAnswer(false)">
          No
        </button>
      </div>
    </article>
  </dialog>
</template>
<style scoped>
.people-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  height: 100%;
  padding-top: 1rem;
}

.people {
  margin: 2rem auto 4rem;
}
</style>
