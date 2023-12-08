<template>
  <main>
    <header class="py-8">
      <nav class="flex items-center justify-between">
        <div class="flex items-center">
          <Link href="/">Logo</Link>
        </div>
        <ul v-if="!$page.props.auth.isLoggedIn" class="flex items-center gap-8">
          <li>
            <Link href="/login">Connexion</Link>
          </li>
          <li>
            <Link href="/signup">Inscription</Link>
          </li>
        </ul>
        <ul v-else class="flex justify-center items-center gap-8">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <button @click="logout">Déconnexion</button>
          </li>
        </ul>
      </nav>
    </header>
    <div class="container-content">
      <slot></slot>
    </div>
    <footer class="py-8">
      <p class="text-slate-400 text-xs text-center">
        2023 © Luckee est développé par Tristan TORNATORE
      </p>
    </footer>
  </main>
</template>

<script setup>
import { Link } from '@inertiajs/inertia-vue3'

const logout = async () => {
  try {
    const response = await fetch('/logout', {
      method: 'POST',
    })
    if (!response.ok) {
      throw new Error('Problème lors de la déconnexion')
    }
    // TODO: Comprendre pourquoi je ne peux pas utiliser router.push ici
    if (response.ok) {
      window.location.href = '/login'
    }
  } catch (err) {
    console.error(err)
  }
}
</script>
