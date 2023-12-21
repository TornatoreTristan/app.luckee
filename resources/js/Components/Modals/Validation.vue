<template>
  <div
    v-if="show"
    class="absolute bg-black p-8 w-full h-full top-0 left-0 bg-opacity-60 flex justify-center items-center"
  >
    <div class="modal-content bg-white relative p-8 rounded-lg">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="my-4">
        <button class="btn" @click="confirm">Confirmer</button>
        <button class="btn-secondary" @click="cancel">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: Boolean,
  title: String,
  message: String,
})

const emits = defineEmits(['update:show', 'confirm'])

const show = ref(props.show)

watch(
  () => props.show,
  (newValue) => {
    show.value = newValue
  }
)

const confirm = () => {
  emits('confirm')
  emits('update:show', false)
}

const cancel = () => {
  emits('update:show', false)
}
</script>
