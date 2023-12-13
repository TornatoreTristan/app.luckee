<template>
  <div>
    <h1>Créer une publication</h1>
  </div>
  <div class="flex gap-8 justify-between">
    <div class="bg-neutral-50 bg-opacity-20 rounded-lg border-2 border-gray-200 w-6/12 p-16 mb-4">
      <form @submit.prevent="connectToStream">
        <div class="input-auth">
          <label for="subject">Vous pensez à un sujet ? </label>
          <input v-model="prompt" type="text" id="subject" name="subject" />
        </div>
        <button class="btn">Écrire une publication</button>
      </form>
    </div>
    <div class="rounded-lg bg-white border border-gray-200 w-6/12 p-6">
      <div class="flex gap-4 items-center">
        <div
          class="bg-gray-600 rounded-full border border-gray-200 w-[60px] h-[60px] flex justify-center items-center text-white"
        >
          TT
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
        <p v-if="generatedText" class="whitespace-pre-line">
          {{ generatedText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const prompt = ref('')
const generatedText = ref('')
const connectToStream = async () => {
  const eventSource = new EventSource(`/openai?prompt=${prompt.value}`)
  eventSource.onmessage = (event) => {
    const text = JSON.parse(event.data)
    generatedText.value += text
  }
}
</script>
