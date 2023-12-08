<template>
  <main>
    <header>
      <nav>
        <div>
          <Link href="/"> Logo </Link>
        </div>
        <ul v-if="user">
          <li>
            <Link href="/login">Connexion</Link>
          </li>
          <li>
            <Link href="/signup">Inscription</Link>
          </li>
        </ul>
        <ul v-else>
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
      <p>2023 © Luckee est développé par Tristan TORNATORE</p>
    </footer>
  </main>
</template>

<script>
import Link from '@inertiajs/inertia-vue3'
</script>
