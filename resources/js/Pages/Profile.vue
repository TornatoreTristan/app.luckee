<template>
  <div>
    <h1>Votre profil</h1>
    <hr class="mb-4" />
  </div>
  <div class="flex items-center gap-4">
    <div class="bg-slate-200 rounded-full w-16 h-16 flex justify-center items-center font-bold">
      {{ userInitials }}
    </div>
    <div>
      <h2>{{ user.first_name + ' ' + user.last_name }}</h2>
      <p class="text-slate-600">{{ user.email }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    user: Object,
  },
  computed: {
    userInitials() {
      const firstNameInitial = this.user.first_name
        ? this.user.first_name.charAt(0).toUpperCase()
        : ''
      const lastNameInitial = this.user.last_name ? this.user.last_name.charAt(0).toUpperCase() : ''
      return `${firstNameInitial}${lastNameInitial}`
    },
  },
}
</script>
