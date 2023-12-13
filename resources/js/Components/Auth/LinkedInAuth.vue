<template>
  <button
    @click="loginWithLinkedIn"
    class="border border-1 border-gray-300 p-3 rounded bg-[#0e76a8] text-white font-bold text-xs w-full"
  >
    Me connecter avec LinkedIn
  </button>
</template>

<script setup>
const loginWithLinkedIn = () => {
  window.location.href = '/linkedin/redirect'
}
</script>
