<template>
  <div class="flex justify-center items-center text-center md:text-left flex-col">
    <h1>Connexion à votre compte</h1>
    <div class="block-auth">
      <!-- <CredentialAuthLogin /> -->
      <div class="my-4">
        <h2 class="text-center">Connectez-vous avec votre compte LinkedIn</h2>
        <hr class="my-2" />
        <LinkedInAuth />
      </div>
      <div class="my-4 w-full text-center">
        <hr class="my-4" />
        <p>Pas encore de compte ? <Link href="/signup">Créer un compte</Link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/inertia-vue3'
import LinkedInAuth from './../Components/Auth/LinkedInAuth.vue'
import CredentialAuthLogin from './../Components/Auth/CredentialAuthLogin.vue'
</script>
