<template>
  <h1>Tableau de bord admin</h1>
  <table class="table-auto w-full">
    <thead>
      <tr class="text-left">
        <th>Prénom</th>
        <th>Nom</th>
        <th>Email</th>
        <th>Crédits</th>
        <th>Date d'inscription</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody class="text-sm">
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.first_name }}</td>
        <td>{{ user.last_name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.credits }}</td>
        <td><DateFormat :date="user.created_at" /></td>
        <td>
          <button @click="editUser(user.id)">Modifier</button>
          <button @click="deleteUser(user.id)">Supprimer</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import DateFormat from '../Components/Utils/DateFormat.vue'
import { ref } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'

const { users } = usePage().props.value
</script>
