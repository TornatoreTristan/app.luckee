<template>
  <div>
    <h1>Historique de mes publications</h1>
    <div class="flex gap-4">
      <div class="w-1/4">
        <div class="flex flex-col gap-1" v-if="posts.length > 0">
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
        <div class="flex flex-col gap-1" v-else>
          <div class="cursor-pointer bg-white p-8">
            <h3>Oops !</h3>
            <p class="mb-4">On dirait qu'il n'y a rien à afficher encore.</p>
            <Link href="/nouvelle-publication">Créer votre première publication</Link>
          </div>
        </div>
      </div>
      <div class="w-2/4 bg-white p-8">
        <div v-if="selectedPost" :key="selectedPost.id">
          <p class="whitespace-pre-line">{{ selectedPost.content }}</p>
          <hr class="mt-8" />
          <div>
            <h3>Prompt utilisée</h3>
            <p class="whitespace-pre-line">{{ selectedPost.prompt }}</p>
            <h3>Model</h3>
            <p class="p-2 font-bold bg-emerald-100 text-emeral-500 w-auto rounded-lg inline-block">
              {{ selectedPost.model }}
            </p>
          </div>
        </div>
        <div v-else>
          <p>Sélectionnez une publication pour afficher son contenu.</p>
        </div>
      </div>
      <div class="bg-white p-4 w-1/4">
        <h2>Paramètres</h2>
        <div>
          <button class="btn-secondary">Publier sur LinkedIn maintenant</button>
          <button class="btn-secondary">Programmer la publication</button>
          <button @click="deletePost(selectedPost.id)" class="btn-danger">
            Supprimer la publication
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePage } from '@inertiajs/inertia-vue3'
import DateFormat from './../Components/Utils/DateFormat.vue'
import { Link } from '@inertiajs/inertia-vue3'

const { props } = usePage()
const posts = ref(props.value.posts)
const selectedPost = ref(null)

const selectPost = (post) => {
  selectedPost.value = post
}

const deletePost = (id) => {
  if (!id) {
    console.log('Aucun post sélectionné')
    return
  }
  // Suppression du post
  fetch(`/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]'),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        posts.value = posts.value.filter((post) => post.id !== id)
        selectedPost.value = null
      }
    })
}
</script>
