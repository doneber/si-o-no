<script setup>
import { ref } from 'vue'

const question = ref('')
const showAskModal = ref(false)

const clear = () => {
  question.value = ''
}

const ask = () => {
  console.log(question.value)
  clear()
  closeAskDialog()
}

const openAskDialog = () => {
  showAskModal.value = true
}
const closeAskDialog = () => {
  showAskModal.value = false
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
</template>
