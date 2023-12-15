<template>
  <div>
    <h1>Historique de mes publications</h1>
    <div class="flex gap-4">
      <div class="w-1/4">
        <div class="flex flex-col gap-1">
          <div
            v-for="post in posts"
            :key="post.id"
            class="py-2 cursor-pointer bg-white p-4 flex justify-between items-center"
            @click="selectPost(post)"
          >
            <p class="text-xs w-8/12">{{ post.title }}</p>
            <p class="text-xs text-gray-300">
              <DateFormat :date="post.created_at" />
            </p>
          </div>
        </div>
      </div>
      <div class="w-2/4 bg-white p-8">
        <div v-if="selectedPost">
          <p class="whitespace-pre-line">{{ selectedPost.content }}</p>
        </div>
        <div v-else>
          <p>Sélectionnez une publication pour afficher son contenu.</p>
        </div>
      </div>
      <div class="bg-white p-4 w-1/4">
        <h2>Paramètres</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'
import DateFormat from './../Components/Utils/DateFormat.vue'

const { props } = usePage()
const posts = ref(props.value.posts)
const selectedPost = ref(null)

const selectPost = (post) => {
  selectedPost.value = post
}
</script>
