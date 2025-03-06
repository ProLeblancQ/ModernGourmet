<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const isLoading = ref(false);
const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  try {
    isLoading.value = true;
    errorMsg.value = '';
    
    // Appel à la méthode de login du store
    const success = await authStore.login(email.value, password.value);
    
    if (success) {
      console.log('Connexion réussie. Redirection...');
      
      // Vérifie si l'utilisateur est un admin ou un utilisateur normal
      if (authStore.isAdmin) {
        router.push('/admin-dashboard'); // Redirection vers la page admin si admin
      } else {
        router.push('/'); // Redirection vers la page d'accueil si utilisateur normal
      }
    } else {
      errorMsg.value = "Échec de la connexion. Vérifiez vos identifiants.";
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    errorMsg.value = "Une erreur s'est produite. Veuillez réessayer.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-center"
    style="background-image: url('/restaurant-bg.jpg')"
  >
    <div
      class="bg-white dark:bg-gray-800 shadow-xl rounded-lg px-10 py-8 max-w-md w-full"
    >
      <h1
        class="text-4xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200"
      >
        Bienvenue sur Le Gourmet Moderne
      </h1>

      <!-- Formulaire de connexion -->
      <form @submit.prevent="login" class="space-y-6">
        <!-- Email -->
        <div class="mb-6">
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Adresse Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Entrez votre email"
            class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-600 transition duration-300 ease-in-out"
            required
          />
        </div>

        <!-- Mot de passe -->
        <div class="mb-6">
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Mot de passe</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-600 transition duration-300 ease-in-out"
            required
          />
        </div>

        <!-- Message d'erreur -->
        <div v-if="errorMsg" class="text-red-500 text-sm font-medium">
          {{ errorMsg }}
        </div>

        <!-- Lien vers l'inscription -->
        <div class="flex items-center justify-between mb-6">
          <a
            href="/register"
            class="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Créer un compte</a
          >
          <a
            href="/forgot-password"
            class="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Mot de passe oublié?</a
          >
        </div>

        <!-- Bouton de connexion -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 px-4 bg-indigo-600 text-white font-medium text-lg rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading">Connexion en cours...</span>
          <span v-else>Se connecter</span>
        </button>
      </form>
    </div>
  </div>
</template>