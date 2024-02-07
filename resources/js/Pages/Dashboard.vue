<template>
  <div>
    <h1>Bienvenue {{ user.first_name }} !</h1>
    <hr class="mb-4" />
    <div class="mb-4 flex flex-col md:flex-row items-start gap-4">
      <div class="card--dashboard">
        <h2 class="font-bold text-l my-4">publications enregistrées</h2>
        <p class="font-bold text-xl my-4">{{ posts.length }}</p>
        <Link href="/mes-publications">
          <button class="btn">Voir mon historique de publications</button>
        </Link>
      </div>
      <div
        class="border-slate-200 border w-full md:w-1/3 inline-block text-center rounded-lg p-8 bg-[#f24957] text-white"
      >
        <h2 class="font-bold text-l my-4">Mes crédits disponibles</h2>
        <p class="font-bold text-xl my-4 text-white">{{ user.credits }}</p>
        <Link href="/mes-publications"
          ><button class="btn bg-white text-[#f24957]">Générer une publication</button></Link
        >
      </div>
      <div class="border-slate-200 border rounded-lg p-8 w-full md:w-2/3 bg-white">
        <h2 class="mb-2">Nouvelle mise à jour beta-0.5</h2>
        <h3>Salut {{ user.first_name }} 👋</h3>
        <p class="py-2">
          Nous sommes fiers de pouvoir te compter parmi les membres de Lukee. Nous travaillons tous
          les jours pour améliorer l'outil en fonction de vos retours et suggestions. Alors n'hésite
          vraiment pas à nous envoyer un message ou à ajouter une suggestion sur notre roadmap.
        </p>
        <p class="py-2">
          Nous avons préparé un article pour expliquer toutes nos dernières mise à jour.
        </p>
        <Link href="https://www.lukee.io/changelog/update-beta-0-5" target="_blank">
          Retrouve le rapport des évolutions de la version 0.5 ici</Link
        >
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-4 mt-8">
      <div class="bg-white p-8 md:w-6/12">
        <h2>Publications programmées</h2>
        <hr class="my-4" />
        <div v-if="scheduledPosts.length > 0" v-for="post in scheduledPosts" :key="post.id">
          <div class="p-4 flex justify-between">
            <div class="w-4/6 text-sm">{{ post.title }}</div>
            <div class="text-xs w-2/6 flex flex-col items-end">
              <span>Programmée pour le :</span>
              <DateFormat :date="post.publish_at" />
            </div>
          </div>
        </div>
        <div v-else>
          <p>Vous n'avez aucune publication programmée pour les prochains jours.</p>
          <p>
            Pour programmer une publiations vous pouvez vous rendre sur
            <Link href="/mes-publications">votre historique de publications</Link>
          </p>
        </div>
      </div>
      <div class="bg-white p-8 md:w-6/12">
        <h2>Publications publiées</h2>
        <hr class="my-4" />
        <div v-if="publishedPosts > 0" v-for="post in publishedPosts" :key="post.id">
          <div class="p-4 flex justify-between">
            <div class="w-4/6 text-sm">{{ post.title }}</div>
            <div class="text-xs w-2/6 flex flex-col items-end">
              <span>Publiée le :</span>
              <DateFormat :date="post.publish_at" />
            </div>
          </div>
        </div>
        <div v-else>
          <p>Vous n'avez pas encore publié de posts LinkedIn avec Lukee.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
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
