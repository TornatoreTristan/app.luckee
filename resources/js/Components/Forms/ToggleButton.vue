<template>
  <button
    type="button"
    @click="toggle"
    :class="isChecked ? 'bg-emerald-400 text-white' : 'text-black'"
    class="cursor-pointer px-4 py-2 border border-gray-300 rounded text-xs"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: String,
  value: String,
})

const emits = defineEmits(['update:modelValue'])

const isChecked = computed(() => {
  return props.modelValue === props.value
})

const toggle = () => {
  emits('update:modelValue', isChecked.value ? '' : props.value)
}
</script>
