<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const name = ref('');
const date = ref('');
const time = ref('');
const peopleCount = ref(1);
const minDate = ref('');
const successMessage = ref('');

const availableTimes = ref([
  "12:00", "12:30", "13:00", "13:30", "14:00",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
]);

onMounted(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) {
        name.value = storedName;
    }

    // Définir la date minimale (aujourd'hui)
    const today = new Date();
    minDate.value = today.toISOString().split('T')[0];
});

const bookTable = async () => {
    const token = localStorage.getItem('token');

    if (!name.value || !date.value || !time.value || !peopleCount.value) {
        alert("Tous les champs sont obligatoires");
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/reservation/create', {
            name: name.value,
            date: date.value,
            time: time.value,
            peopleCount: peopleCount.value,
        }, {
            headers: {
                Authorization: token
            }
        });

        console.log("Réservation confirmée :", response.data);
        successMessage.value = "✅ Votre réservation a été confirmée avec succès ! 🎉";
    } catch (error) {
        console.error("Erreur lors de la réservation :", error);
        successMessage.value = "❌ Une erreur est survenue lors de la réservation. Veuillez réessayer.";
    }

    // Faire disparaître le message après 5 secondes
    setTimeout(() => {
        successMessage.value = '';
    }, 5000);
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center" style="background-image: url('/restaurant-bg.jpg')">
    <div class="bg-white dark:bg-gray-800 shadow-xl rounded-lg px-10 py-8 max-w-md w-full">
      <h1 class="text-4xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">Réserver une table</h1>

      <form @submit.prevent="bookTable" class="space-y-6">
        
        <div class="mb-6">
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom</label>
          <input v-model="name" type="text" id="name" placeholder="Entrez votre nom"
                 class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-600 transition duration-300 ease-in-out" required readonly>
        </div>

        <div class="mb-6">
          <label for="date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
          <input v-model="date" type="date" id="date" :min="minDate"
                 class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-600 transition duration-300 ease-in-out" required>
        </div>

        <div class="mb-6">
          <label for="time" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Heure</label>
          <select v-model="time" id="time" 
                  class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-600 transition duration-300 ease-in-out" required>
            <option disabled value="">Sélectionnez une heure</option>
            <option v-for="hour in availableTimes" :key="hour" :value="hour">{{ hour }}</option>
          </select>
        </div>

        <div class="mb-6">
          <label for="peopleCount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de personnes</label>
          <select v-model="peopleCount" id="peopleCount"
                  class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-600 transition duration-300 ease-in-out" required>
            <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>

        <button type="submit" 
                class="w-full py-3 px-4 bg-indigo-600 text-white font-medium text-lg rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105">
          Réserver
        </button>

        <!-- Message de confirmation -->
        <transition name="fade">
          <p v-if="successMessage" class="text-center mt-4 p-2 rounded-md text-white" 
             :class="successMessage.includes('succès') ? 'bg-green-500' : 'bg-red-500'">
            {{ successMessage }}
          </p>
        </transition>

      </form>
    </div>
  </div>
</template>

<style scoped>
/* Animation d'apparition et de disparition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

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
input:focus, select:focus, button:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(99, 102, 241, 1);
}

/* Effet d'agrandissement au survol du bouton */
button:hover {
  transform: scale(1.05);
}
</style>
