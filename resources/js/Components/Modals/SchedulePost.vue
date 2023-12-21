<template>
  <div
    v-if="show"
    class="absolute bg-black p-8 w-full h-full top-0 left-0 bg-opacity-60 flex justify-center items-center"
  >
    <div class="modal-content bg-white relative p-8 rounded-lg">
      <button
        @click="closeModal"
        class="close absolute right-6 border border-gray-800 p-2 rounded-full w-6 h-6 flex justify-center items-center"
      >
        &times;
      </button>
      <div class="mt-12 text-center flex flex-col justify-center items-center">
        <h2 class="mb-8">On la publie quand cette publication ?</h2>
        <VDatePicker v-model="date" mode="dateTime" is24hr />
        <button @click="updateScheduleDate" class="btn mt-8">Programmer la publication</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'v-calendar/style.css'
import { ref, defineProps, defineEmits } from 'vue'
import VCalendar from 'v-calendar'

const props = defineProps(['show', 'selectedPostId'])
const emit = defineEmits(['close'])

const date = ref(new Date())

const closeModal = () => {
  emit('close')
}

const updateScheduleDate = () => {
  if (props.selectedPostId) {
    fetch(`/posts/${props.selectedPostId}/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]'),
      },
      body: JSON.stringify({
        publishDate: date.value,
        status: 'scheduled',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          emit('update', { id: props.selectedPostId, publishDate: date.value, status: 'scheduled' })
          closeModal()
        }
      })
  }
}
</script>
