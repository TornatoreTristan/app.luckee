<template>
  <div>
    <h1>Dashboard</h1>
    <hr class="mb-4" />
    <div>
      <p>Bienvenue sur votre dashboard {{ user.first_name + ' ' + user.last_name }}</p>
    </div>
    <div class="flex gap-4 mt-8">
      <div class="bg-white p-8 w-6/12">
        <h2>Publications publiées</h2>
        <hr class="my-4" />
        <div v-for="post in publishedPosts" :key="post.id">
          <div class="p-4 flex justify-between">
            <div class="w-4/6 text-sm">{{ post.title }}</div>
            <div class="text-xs w-2/6 flex flex-col items-end">
              <span>Publiée le :</span>
              <DateFormat :date="post.publish_at" />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white p-8 w-6/12">
        <h2>Publications programmées</h2>
        <hr class="my-4" />
        <div v-for="post in scheduledPosts" :key="post.id">
          <div class="p-4 flex justify-between">
            <div class="w-4/6 text-sm">{{ post.title }}</div>
            <div class="text-xs w-2/6 flex flex-col items-end">
              <span>Programmée pour le :</span>
              <DateFormat :date="post.publish_at" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'
import DateFormat from '../Components/Utils/DateFormat.vue'

const { props } = usePage()
const user = ref(props.value.user)
const posts = ref(props.value.posts)

// Posts Publiés
const publishedPosts = computed(() => {
  return posts.value.filter((post) => post.status === 'published')
})

// Posts Programmés
const scheduledPosts = computed(() => {
  return posts.value.filter((post) => post.status === 'scheduled')
})
</script>
