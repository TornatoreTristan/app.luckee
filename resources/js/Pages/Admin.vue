<template>
  <h1>Tableau de bord admin</h1>
  <div class="flex gap-4 items-start mb-8">
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
  </div>
  <table class="table-auto w-full">
    <thead>
      <tr class="text-left">
        <th>Utilisateur</th>
        <th>Email</th>
        <th>Crédits</th>
        <th>Date d'inscription</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody class="text-sm">
      <tr v-for="user in users" :key="user.id">
        <td class="flex gap-2 items-center">
          <img :src="user.avatar" alt="image utilisateur" class="rounded-full w-12" />
          {{ user.first_name }} {{ user.last_name }}
          <a :href="`https://www.linkedin.com/in/${user.linkedin_id}`">
            <img src="/linkedin.svg" width="15" alt="logo linkedin" class="cursor-pointer" />
          </a>
        </td>
        <td>{{ user.email }}</td>
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
</template>

<script setup>
import DateFormat from '../Components/Utils/DateFormat.vue'
import { ref } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'

const { users, posts } = usePage().props.value
</script>
