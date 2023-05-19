<script setup>
import { ref } from 'vue'

const question = ref('')
const answer = ref(false)
const questionAsking = ref('')
const showAskModal = ref(false)
const showQuestionModal = ref(false)

const clear = () => {
  question.value = ''
}

const ask = () => {
  console.log(question.value)
  // set questionAsking value to question.value and add a ? at the end in case it doesn't have one
  questionAsking.value = (question.value.endsWith('¿') ? '' : '¿') + question.value + (question.value.endsWith('?') ? '' : '?')
  showQuestionModal.value = true
  clear()
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
  <section class="grid">
    <button @click="openAskDialog" class="">Preguntar</button>
    <button @click="clear" class="outline small">Limpiar</button>
  </section>
  <dialog :open="showAskModal">
    <article>
      <a @click="closeAskDialog" aria-label="Close" class="close"></a>
      <label>
        <span>Pregunta</span>
        <textarea v-model="question" rows="3" cols="30" placeholder="Ej. ¿Esta de acuerdo?"></textarea>
      </label>
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
        <span>Pregunta</span>
        <a @click="closeQuestionDialog" aria-label="Close" class="close"></a>
      </header>
      <p>{{ questionAsking }}</p>
      <footer>
        <div class="grid">
          <button @click="sendAnswer(true)">
            Si
          </button>
          <button @click="sendAnswer(false)">
            No
          </button>
        </div>
      </footer>
    </article>
  </dialog>
</template>
