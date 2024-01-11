<template>
  <main>
    <header class="py-8">
      <nav class="flex items-center justify-between">
        <div class="flex items-end gap-3">
          <Link href="/">
            <img src="/logo-lukee.svg" alt="luckee logo" width="60px" height="50px" />
          </Link>
          <div
            class="px-2 flex justify-center items-center bg-emerald-100 text-emerald-600 rounded-lg text-xs font-bold"
          >
            beta-0.4
          </div>
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
          <div>
            <Link
              class="flex gap-3 bg-blue-100 rounded-lg py-3 px-4"
              href="https://lukee.canny.io/"
            >
              <img src="map.svg" width="15" alt="" /> Roadmap
            </Link>
          </div>
          <div class="relative flex gap-4 items-center" ref="menuRef">
            <Link href="/nouvelle-publication">
              <button class="btn">Créer une nouvelle publication</button>
            </Link>
            <div class="relative">
              <button
                @click="handleNav"
                class="rounded-full bg-slate-200 flex justify-center items-center w-14 h-14 relative border border-slate-400 hover:shadow-md"
              >
                <img
                  v-if="$page.props.auth.user.avatar"
                  :src="$page.props.auth.user.avatar"
                  alt="Image de l'utilisatieur"
                  class="rounded-full"
                />
                <span v-else>{{
                  $page.props.auth.user.first_name[0] + ' ' + $page.props.auth.user.last_name[0]
                }}</span>
              </button>
              <ul
                v-if="isMenuIsVisible"
                class="absolute bg-white p-6 -translate-x-1/2 left-1/2 w-[200px] top-16 text-xs flex flex-col gap-4 rounded-lg"
              >
                <li v-show="$page.props.auth.user.role === 'admin'">
                  <Link @click="handleNav" href="/admin">Panel d'aministration</Link>
                </li>
                <li>
                  <Link @click="handleNav" href="/">Dashboard</Link>
                </li>
                <li>
                  <Link @click="handleNav" href="/mes-publications">Mes publications</Link>
                </li>
                <li>
                  <Link @click="handleNav" href="/profile">Compte</Link>
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
        </div>
      </nav>
    </header>
    <div class="container-content">
      <slot></slot>
    </div>
    <footer class="container-content py-8">
      <hr class="my-4" />
      <div class="flex flex-col md:flex-row items-center md:items-start justify-between">
        <div class="w-full flex justify-center flex-col items-center lg:block md:w-6/12">
          <img src="/icon-luckee.svg" class="mb-8" alt="icon luckee" width="50px" height="50px" />
          <p class="text-xs mb-1">© Tristan TORNATORE & Kélian LALLOUÉ</p>
          <p class="text-xs">Tous droits réservés</p>
        </div>
        <div class="3/12">
          <h3>Luckee</h3>
          <ul class="text-xs flex flex-col gap-1">
            <Link class="text-gray-600 border-none font-sans" href="/support"
              ><li>Support</li></Link
            >
            <Link class="text-gray-600 border-none font-sans" href="/legal"><li>Légal</li></Link>
          </ul>
        </div>
        <div class="3/12">
          <h3>Social</h3>
          <ul class="text-xs flex flex-col gap-1">
            <li>LinkedIn</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
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
