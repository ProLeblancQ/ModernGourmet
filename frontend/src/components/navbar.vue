<template>
  <nav class="bg-gray-800 p-4 text-white">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="text-xl font-bold hover:text-gray-300">
        Le Gourmet Moderne
      </RouterLink>
      <ul class="flex space-x-4">
        <li v-if="authStore.isLoggedIn">
          <span class="text-sm text-gray-300">Bonjour, {{ authStore.username }} !</span>
        </li>

        <li v-if="authStore.isLoggedIn">
          <RouterLink to="/login" @click="logout" class="hover:text-gray-300">Déconnexion</RouterLink>
        </li>

        <li v-if="!authStore.isLoggedIn">
          <RouterLink to="/login" class="hover:text-gray-300">Connexion</RouterLink>
        </li>
        <li v-if="!authStore.isLoggedIn">
          <RouterLink to="/register" class="hover:text-gray-300">Inscription</RouterLink>
        </li>

        <li v-if="authStore.isLoggedIn">
          <RouterLink to="/add_appointment" class="hover:text-gray-300">Réserver</RouterLink>
        </li>
        <li v-if="authStore.isLoggedIn">
          <RouterLink to="/list_appointment" class="hover:text-gray-300">Mes Réservations</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// Charger les données utilisateur depuis le store (au montage du composant)
authStore.loadUserData()

// Déconnexion
const logout = () => {
  authStore.logout() // Réinitialiser l'état de l'utilisateur
  router.push('/login') // Rediriger vers la page de connexion
}
</script>
