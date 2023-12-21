<template>
  <span>{{ formatedDate }}</span>
</template>

<script setup>
import { defineProps, onMounted, computed } from 'vue'

const props = defineProps({
  date: String,
})

const formatedDate = computed(() => {
  return new Date(props.date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
})
</script>
