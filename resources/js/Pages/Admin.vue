<template>
  <h1>Tableau de bord admin</h1>
  <div class="md:flex gap-4 items-start mb-8">
    <div
      class="bg-white p-8 border-2 border-slate-200 rounded-xl flex flex-col justify-center items-center"
    >
      <p>
        <span class="text-xl">{{ users.length }}</span>
      </p>
      <p class="font-bold">Utilisateurs</p>
    </div>
    <div
      class="bg-white p-8 border-2 border-slate-200 rounded-xl flex flex-col justify-center items-center"
    >
      <p>
        <span class="text-xl">{{ posts.length }}</span>
      </p>
      <p class="font-bold">Publications générées</p>
    </div>
    <div
      class="bg-white p-8 border-2 border-slate-200 rounded-xl flex flex-col justify-center items-center"
    >
      <p>
        <span class="text-xl">{{ Math.round(posts.length * 0.025) }} €</span>
      </p>
      <p class="font-bold">Coût estimé (openAI)</p>
    </div>
  </div>
  <table class="table-auto w-full">
    <thead>
      <tr class="text-left">
        <th>Utilisateur</th>
        <th>Email</th>
        <th>Posts crées</th>
        <th>Crédits</th>
        <th>Date d'inscription</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody class="text-sm">
      <tr v-for="user in paginatedUsers" :key="user.id">
        <td class="flex gap-2 items-center">
          <img :src="user.avatar" alt="image utilisateur" class="rounded-full w-12" />
          {{ user.first_name }} {{ user.last_name }}
          <a :href="`https://www.linkedin.com/in/${user.linkedin_id}`">
            <img src="/linkedin.svg" width="15" alt="logo linkedin" class="cursor-pointer" />
          </a>
        </td>
        <td>{{ user.email }}</td>
        <td>{{ countPostByUser(user.id) }}</td>
        <td>{{ user.credits }}</td>
        <td><DateFormat :date="user.created_at" /></td>
        <td class="text-center">
          <button @click="deleteUser(user.id)">
            <img src="/poubelle-de-recyclage.svg" width="15" alt="icon poubelle" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex justify-center mt-4">
    <button @click="prevPage" :disabled="currentPage <= 1">Précédent</button>
    <span class="px-4">{{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage >= totalPages">Suivant</button>
  </div>
</template>

<script setup>
import DateFormat from '../Components/Utils/DateFormat.vue'
import { computed, ref } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'

const currentPage = ref(1)
const usersPerPage = 10

const { users, posts } = usePage().props.value

const countPostByUser = (userId) => {
  return posts.filter((post) => post.user_id === userId).length
}

const totalPages = computed(() => {
  return Math.ceil(users.length / usersPerPage)
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * usersPerPage
  const end = start + usersPerPage
  return users.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>
