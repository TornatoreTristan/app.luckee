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
        <div v-else class="flex justify-center items-center gap-8">
          <div class="relative" ref="menuRef">
            <button
              @click="handleNav"
              class="rounded-full bg-slate-200 flex justify-center items-center w-14 h-14 relative border border-slate-400 hover:shadow-md"
            >
              TT
            </button>
            <ul
              v-if="isMenuIsVisible"
              class="absolute bg-white p-6 -translate-x-1/2 left-1/2 w-[200px] top-16 text-xs flex flex-col gap-4 rounded-lg"
            >
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/profile">Compte</Link>
              </li>
              <li>
                <button
                  class="bg-red-100 py-2 px-4 rounded text-red-600 w-full font-bold mt-4"
                  @click="logout"
                >
                  Déconnexion
                </button>
              </li>
            </ul>
          </div>
        </div>
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
import { ref, onMounted, onUnmounted } from 'vue'

let isMenuIsVisible = ref(false)
const menuRef = ref(null)

const handleNav = () => {
  isMenuIsVisible.value = !isMenuIsVisible.value
}

const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    isMenuIsVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})

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
