<template>
  <div>
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
</template>

<script setup></script>
