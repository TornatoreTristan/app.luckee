<template>
  <div>
    <h1>Créer une publication</h1>
  </div>
  <div class="block-auth">
    <form @submit.prevent="getOpenAIResponse">
      <div class="input-auth">
        <label for="subject">Vous pensez à un sujet ? </label>
        <input v-model="prompt" type="text" id="subject" name="subject" />
      </div>
      <button class="btn">Écrire une publication</button>
    </form>
  </div>
  <div v-if="openAIResponse && openAIResponse.choices && openAIResponse.choices.length > 0">
    <p>Réponse d'OpenAI: {{ openAIResponse.choices[0].text }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const prompt = ref('')
    const openAIResponse = ref('')

    const getOpenAIResponse = async () => {
      console.log(prompt.value)
      try {
        const response = await fetch('/openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: prompt.value }),
        })

        if (!response.ok) {
          throw new Error('Erreur réseau')
        }

        const data = await response.json()
        openAIResponse.value = data
      } catch (error) {
        console.error(error)
      }
    }

    return {
      prompt,
      openAIResponse,
      getOpenAIResponse,
    }
  },
}
</script>
