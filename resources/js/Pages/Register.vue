<template>
  <div class="flex flex-col justify-center items-center">
    <h1>S'inscrire</h1>
    <div class="block-auth">
      <!-- <CredentialAuthSignup /> -->
      <div class="my-4">
        <h2 class="text-center">Connectez-vous avec votre compte LinkedIn</h2>
        <hr class="my-2" />
        <LinkedInAuth />
      </div>
      <div class="my-4 w-full text-center">
        <hr class="my-4" />
        <p>Vous avez déjà un compte ? <Link href="/login">Connectez-vous</Link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/inertia-vue3'
import LinkedInAuth from './../Components/Auth/LinkedInAuth.vue'
import CredentialAuthSignup from './../Components/Auth/CredentialAuthSignup.vue'
</script>
