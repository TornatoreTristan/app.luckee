<template>
  <div>
    <h1>Créer une publication</h1>
  </div>
  <div class="flex gap-8 justify-between">
    <div class="bg-neutral-50 rounded-lg border-2 border-gray-200 w-6/12 p-16 mb-4">
      <form @submit.prevent="connectToStream">
        <div class="input-auth">
          <label for="subject">Vous pensez à un sujet ? </label>
          <input v-model="prompt" type="text" id="subject" name="subject" />
        </div>
        <div class="input-auth">
          <label for="idea">Détaillez votre idée</label>
          <textarea v-model="idea" type="textarea" id="idea" name="idea" />
        </div>
        <div>
          <hr class="my-4" />
          <div>
            <div>
              <h4>Pronom</h4>
              <div class="flex gap-2">
                <ToggleButton v-model="pronomChoice" value="tutoiement">Tutoiement</ToggleButton>
                <ToggleButton v-model="pronomChoice" value="vouvoiement">Vouvoiement</ToggleButton>
              </div>
            </div>
            <div>
              <h4>Tonalité</h4>
              <div class="flex flex-wrap gap-2">
                <ToggleButton v-model="tone" value="normal">Standard</ToggleButton>
                <ToggleButton v-model="tone" value="pedagogique">Pédagogique</ToggleButton>
                <ToggleButton v-model="tone" value="Humour">Humour</ToggleButton>
                <ToggleButton v-model="tone" value="coup de gueule">Coup de gueule</ToggleButton>
                <ToggleButton v-model="tone" value="Build in public">Build in public</ToggleButton>
                <ToggleButton v-model="tone" value="Personnel">Personnel</ToggleButton>
              </div>
            </div>
            <div class="mt-4">
              <h4>Model</h4>
              <p class="text-[12px] text-gray-400 mb-4">
                Le model d'entraînemnt utilisé par l'IA. Luckee est un modèle entraîné par nos soins
                sur plus de 400 publications linkedIn soigneusement choisies.
              </p>
              <div class="flex gap-2">
                <ToggleButton v-model="modelChoice" value="gpt-3">GPT-3.5</ToggleButton>
                <ToggleButton v-model="modelChoice" value="gpt-4">GPT-4</ToggleButton>
                <ToggleButton v-model="modelChoice" value="luckee-ft">Luckee</ToggleButton>
                <ToggleButton v-model="modelChoice" value="Mistral">MistralAI</ToggleButton>
              </div>
            </div>
          </div>
        </div>
        <button class="btn mt-12" :disabled="isLoading">Générer une publication</button>
      </form>
    </div>
    <div class="rounded-lg bg-white border border-gray-200 w-6/12 p-6">
      <div class="flex gap-4 items-center">
        <div
          class="bg-gray-600 rounded-full border border-gray-200 w-[60px] h-[60px] flex justify-center items-center text-white"
        >
          <img
            v-if="$page.props.auth.user.avatar"
            :src="$page.props.auth.user.avatar"
            :alt="$page.props.auth.user.first_name + ' ' + $page.props.auth.user.last_name"
            class="rounded-full"
          />
          <span v-else>{{
            $page.props.auth.user.first_name[0] + ' ' + $page.props.auth.user.last_name[0]
          }}</span>
        </div>
        <div>
          <h2>
            {{
              !$page.props.auth.user
                ? 'Anonyme'
                : $page.props.auth.user.first_name + ' ' + $page.props.auth.user.last_name
            }}
            <span class="text-gray-400 text-xs">● 1er</span>
          </h2>
          <p class="text-sm text-gray-400">Ceci est ta super baseline</p>
        </div>
      </div>
      <div class="mt-6">
        <p v-if="generatedText" class="whitespace-pre-line text-xs">
          {{ generatedText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ToggleButton from './../Components/Forms/ToggleButton.vue'

const prompt = ref('')
const idea = ref('')
const generatedText = ref('')
const tone = ref('normal')
const pronomChoice = ref('tutoiement')
const modelChoice = ref('luckee-ft')
const isLoading = ref(false)

const connectToStream = async () => {
  isLoading.value = true
  const eventSource = new EventSource(
    `/openai?prompt=${prompt.value}&pronom=${pronomChoice.value}&model=${modelChoice.value}&tone=${tone.value}&idea=${idea.value}`
  )
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)

    // Vérifiez si le statut 'completed' a été envoyé
    if (data.status && data.status === 'completed') {
      isLoading.value = false
      eventSource.close()
    } else {
      // Traitement normal des données
      generatedText.value = data
    }
  }
}
</script>
