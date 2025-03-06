<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const username = ref('');
const router = useRouter();

const register = async () => {
    try {
        const response = await axios.post('http://localhost:3000/user/register', {
            email: email.value,
            password: password.value,
            username: username.value
        });

        if (response) {
            console.log("Inscription réussie. Redirection...");
            router.push("/login");
        }
    } catch (error) {
        console.error(error);
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

      <form @submit.prevent="register" class="space-y-6">
        <div class="mb-6">
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Adresse Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Entrez votre email"
            class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-600 transition duration-300 ease-in-out"
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="username"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Nom d'utilisateur</label>
          <input
            v-model="username"
            type="text"
            id="username"
            placeholder="Choisissez un nom d'utilisateur"
            class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-600 transition duration-300 ease-in-out"
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Mot de passe</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-600 transition duration-300 ease-in-out"
            required
          />
        </div>

        <div class="flex items-center justify-between mb-6">
          <a
            href="/login"
            class="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >Vous avez déjà un compte ? Se connecter</a>
        </div>

        <button
          type="submit"
          class="w-full py-3 px-4 bg-indigo-600 text-white font-medium text-lg rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          S'inscrire
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
body {
  background-image: url("/restaurant-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  margin: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

h1 {
  animation: fadeIn 1s ease-out;
}

input:focus,
button:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(99, 102, 241, 1);
}

button:hover {
  transform: scale(1.05);
}
</style>
