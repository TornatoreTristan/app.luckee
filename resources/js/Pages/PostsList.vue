<template>
  <div>
    <h1>Historique de mes publications</h1>
    <div class="flex flex-col md:flex-row gap-4">
      <div class="md:w-1/4">
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
      <div class="md:w-2/4 bg-white p-8">
        <div v-if="selectedPost" :key="selectedPost.id">
          <p class="whitespace-pre-line">{{ selectedPost.content }}</p>
          <hr class="mt-8" />
          <div class="bg-slate-100 px-8 py-4 mt-4 rounded-xl">
            <h3>Prompt utilisée</h3>
            <p class="whitespace-pre-line">{{ selectedPost.prompt }}</p>
            <h3>Concept</h3>
            <p class="whitespace-pre-line">
              {{ selectedPost.idea }}
            </p>
            <h3>Tonalité</h3>
            <p>
              {{ selectedPost.tone }}
            </p>
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
      <div class="bg-white p-4 md:w-1/4">
        <h2>Paramètres</h2>
        <div v-if="selectedPost">
          <button
            v-if="selectedPost.status != 'published'"
            @click="showConfirmationModal = true"
            class="btn-secondary"
          >
            Publier sur LinkedIn maintenant
          </button>
          <Validation
            :show="showConfirmationModal"
            title="Confirmation"
            message="Êtes-vous sûr de vouloir publier ce post sur LinkedIn ?"
            @confirm="publishToLinkedIn(selectedPost.id)"
            @update:show="showConfirmationModal = $event"
          />
          <div>
            <div v-if="selectedPost.publish_at === null">
              <button class="btn" @click="openModal">Programmer la publication</button>
            </div>
            <div v-if="selectedPost.status === 'published'">
              <p
                class="bg-emerald-100 py-2 rounded text-center font-bold text-emerald-600 border-2 border-emerald-600"
              >
                Publication publiée
              </p>
            </div>
            <div
              v-if="selectedPost.publish_at != null && selectedPost.status != 'published'"
              class="p-2 border-2 bg-slate-100"
            >
              <p class="font-bold">Publication programmée le :</p>
              <p class="mt-2">
                <DateFormat :date="selectedPost.publish_at" />
              </p>
              <button class="btn mt-4" @click="openModal">Modifier la date</button>
              <button @click="deleteScheduleDate(selectedPost.id)">
                Supprimer la programmation
              </button>
            </div>
            <SchedulePost
              :selected-post-id="selectedPost ? selectedPost.id : null"
              :show="showSchedulePostModal"
              @close="closeModal"
              @update="handlePostUpdate"
            />
          </div>
          <button @click="deletePost(selectedPost.id)" class="btn-danger">
            Supprimer la publication
          </button>
        </div>
        <div v-else>
          <p>Sélectionnez un post</p>
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
import SchedulePost from './../Components/Modals/SchedulePost.vue'
import Validation from './../Components/Modals/Validation.vue'

const { props } = usePage()
const posts = ref(props.value.posts)
const selectedPost = ref(null)
const showSchedulePostModal = ref(false)
const showConfirmationModal = ref(false)

const openModal = () => {
  showSchedulePostModal.value = true
}

const closeModal = () => {
  showSchedulePostModal.value = false
}

const selectPost = (post) => {
  selectedPost.value = post
}

const handlePostUpdate = (updatedPost, status) => {
  const index = posts.value.findIndex((post) => post.id === updatedPost.id)
  if (index !== -1) {
    posts.value[index].publish_at = updatedPost.publishDate
    posts.value[index].status = updatedPost.status
    if (selectedPost.value && selectedPost.value.id === updatedPost.id) {
      selectedPost.value.publish_at = updatedPost.publishDate
    }
  }
}

const deleteScheduleDate = (id) => {
  fetch(`/posts/${id}/schedule`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]'),
    },
    body: JSON.stringify({
      publishDate: null,
      status: 'draft',
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        handlePostUpdate(selectedPost.value, 'draft')
      }
    })
}

const deletePost = (id) => {
  if (!id) {
    return
  }
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

const publishToLinkedIn = (id) => {
  if (!id) {
    return
  }
  fetch(`/posts/${id}/publish`, {
    method: 'POST',
    headers: {
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]'),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        handlePostUpdate(selectedPost.value, 'published')
      }
    })
  showConfirmationModal.value = false
}
</script>
