<script setup>
import { ref } from 'vue';
import axios from 'axios';

const description = ref('');
const startDate = ref('');
const endDate = ref('');

const add = async () => {
    const token = localStorage.getItem('token');

    if (new Date(startDate.value) >= new Date(endDate.value)) {
        alert("Start date should be less than end date");
        return false;
    }

    try {
        const response = await axios.post('http://localhost:3000/appointment/create', {
            description: description.value,
            startDate: startDate.value,
            endDate: endDate.value,
        }, {
            headers: {
                Authorization: token
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center" style="background-image: url('/restaurant-bg.jpg')">
    <div class="bg-white dark:bg-gray-800 shadow-xl rounded-lg px-10 py-8 max-w-md w-full">
      <h1 class="text-4xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">Créer un Rendez-vous</h1>

      <!-- Formulaire pour créer un rendez-vous -->
      <form @submit.prevent="add" class="space-y-6">
        
        <!-- Description -->
        <div class="mb-6">
          <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
          <input v-model="description" type="text" id="description" placeholder="Entrez la description du rendez-vous"
                 class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-600 transition duration-300 ease-in-out" required>
        </div>

        <!-- Date de début -->
        <div class="mb-6">
          <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date de début</label>
          <input v-model="startDate" type="datetime-local" id="startDate" 
                 class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-600 transition duration-300 ease-in-out" required>
        </div>

        <!-- Date de fin -->
        <div class="mb-6">
          <label for="endDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date de fin</label>
          <input v-model="endDate" type="datetime-local" id="endDate" 
                 class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-600 transition duration-300 ease-in-out" required>
        </div>

        <!-- Bouton de soumission -->
        <button type="submit" 
                class="w-full py-3 px-4 bg-indigo-600 text-white font-medium text-lg rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105">
          Créer le rendez-vous
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Image de fond fixe */
body {
  background-image: url('/restaurant-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  margin: 0;
}

/* Animation d'apparition pour le titre */
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

/* Effets sur le formulaire au focus */
input:focus, button:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(99, 102, 241, 1);
}

/* Effet d'agrandissement au survol du bouton */
button:hover {
  transform: scale(1.05);
}
</style>
