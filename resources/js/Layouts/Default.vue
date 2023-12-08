<template>
  <main>
    <header class="py-8">
      <nav class="flex items-center justify-between">
        <div class="flex items-center">
          <Link href="/">Logo</Link>
        </div>
        <ul v-if="!$page.props.auth.isLoggedIn" class="flex items-center">
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
            <Link href="/logout">Déconnexion</Link>
          </li>
        </ul>
      </nav>
    </header>
    <slot></slot>
    <footer>
      <p class="text-slate-400">2023 © Luckee est développé par Tristan TORNATORE</p>
    </footer>
  </main>
</template>

<script>
import { Link } from '@inertiajs/inertia-vue3'
export default {
  components: {
    Link,
  },
  computed: {
    auth() {
      return this.$page.props.auth || { isLoggedIn: false }
    },
  },
}
</script>
