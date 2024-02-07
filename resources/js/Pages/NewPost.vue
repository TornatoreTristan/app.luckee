<template>
  <div>
    <h1>Créer une publication</h1>
  </div>
  <div class="flex gap-8 flex-col md:flex-row justify-between">
    <div class="bg-neutral-50 rounded-lg border-2 p-6 border-gray-200 md:w-6/12 md:p-16 mb-4">
      <div v-if="$page.props.auth.user.credits === 0" class="flex flex-col gap-4">
        <h2>Oops ! 🤖</h2>
        <p>Il semble que vous ayez consommé tous vos crédits pour aujourd'hui</p>
        <p class="font-bold">
          Nous limitons la génération de publications à 10 / jour / utilisateur
        </p>
        <h3>Pourquoi lukee limite la génération de publications par utilisateur ?</h3>
        <p>
          Ce n'est un secret pour personne. Lukee s'appuie sur l'API d'openAI avec un modèle
          personnalisé pour fonctionner. Le fait de personnaliser le modèle nous permet de limiter
          considérablement les coûts et d'avoir des résultats plus performants et humain que le
          modèle de chatGPT4. Néanmoins, chaque fois que vous générez une publication, OpenAI
          facture le coût de l'appel à son API.
        </p>
        <p>
          Jusqu'à maintenant, nous souhaitions vous offrir en illimité notre outil pour vous
          permettre de le tester tout en nous offrant la possibilité de l'améliorer.
        </p>
        <p>
          Vos retours positifs nous encouragent fortement à continuer le développement de Lukee. Et
          pour le rendre durable et toujours plus performants, nous planchons sur la meilleure
          manière de rentabiliser l'application.
        </p>
        <p>
          En attendant de trouver le modèle le plus pertinent pour vous, nous vous permettons un
          usage entièrement gratuit bien que plus limité sans nous ruiner (et oui ! Vous êtes
          désormais 200 🎉). Nous pensons qu'avec 10 crédits journalier, vous avez la flexibilité de
          continuer votre progression fulgurante de l'algorithme de LinkedIn !
        </p>
        <p class="font-bold">
          Si vous avez des idées pour nous aider à trouver un modèle économique qui vous convienne,
          n'hésitez pas à nous contacter à l'adresse suivante :
          <a href="mailto:tristan@lukee.io">tristan@lukee.io</a>
        </p>
      </div>
      <form v-else @submit.prevent="connectToStream">
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
              <div class="flex flex-wrap gap-2">
                <ToggleButton v-model="modelChoice" value="gpt-3">GPT-3.5</ToggleButton>
                <ToggleButton v-model="modelChoice" value="gpt-4">GPT-4</ToggleButton>
                <ToggleButton v-model="modelChoice" value="luckee-ft">Luckee</ToggleButton>
                <!-- <ToggleButton v-model="modelChoice" value="mixtral8x7b">Mistral AI</ToggleButton> -->
              </div>
            </div>
          </div>
        </div>
        <button class="btn mt-12" :disabled="isLoading">Générer une publication</button>
      </form>
    </div>
    <div class="rounded-lg bg-white border border-gray-200 md:w-6/12 p-6">
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
