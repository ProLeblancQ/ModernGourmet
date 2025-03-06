<template>
  <div>
    <!-- Section d'accueil avec l'image de fond -->
    <div class="relative min-h-screen bg-cover bg-center" style="background-image: url('/restaurant-bg.jpg')">
      <div class="bg-black bg-opacity-50 min-h-screen flex flex-col items-center justify-center text-white p-8">
        <h1 class="text-4xl font-bold mb-4 text-center">Bienvenue au Gourmet Moderne</h1>
        <p class="text-lg text-center max-w-2xl mb-6">
          Découvrez une expérience culinaire unique dans un cadre élégant et moderne.
          Réservez votre table dès maintenant et savourez nos plats raffinés.
        </p>

        <!-- Bouton pour réserver une table -->
        <button 
          @click="handleReservationClick"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg text-lg"
        >
          Réserver une Table
        </button>
      </div>
    </div>

    <!-- Section des menus -->
    <div class="bg-black-100 py-12">
      <h2 class="text-3xl font-bold text-center text-white mb-8">Nos Menus</h2>

      <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Menu Gourmand -->
        <div class="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 class="text-2xl font-semibold text-gray-800 mb-4">Menu Gourmand</h3>
          <p class="text-gray-600 mb-4">Une sélection de plats savoureux pour une expérience gourmande.</p>
          <ul class="text-gray-500 mb-4 text-sm">
            <li>🥗 Entrée : Salade de chèvre chaud ou Velouté de potiron</li>
            <li>🍖 Plat : Magret de canard sauce miel ou Filet de saumon grillé</li>
            <li>🍰 Dessert : Tarte au citron meringuée ou Fondant au chocolat</li>
          </ul>
          <span class="text-lg font-bold text-red-500">29,99€</span>
        </div>

        <!-- Menu Découverte -->
        <div class="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 class="text-2xl font-semibold text-gray-800 mb-4">Menu Découverte</h3>
          <p class="text-gray-600 mb-4">Un voyage gustatif à travers nos meilleures spécialités.</p>
          <ul class="text-gray-500 mb-4 text-sm">
            <li>🍤 Entrée : Carpaccio de Saint-Jacques ou Foie gras maison</li>
            <li>🥩 Plat : Filet de bœuf aux morilles ou Risotto aux truffes</li>
            <li>🍮 Dessert : Crème brûlée vanille ou Mousse au chocolat</li>
          </ul>
          <span class="text-lg font-bold text-red-500">39,99€</span>
        </div>

        <!-- Menu Prestige -->
        <div class="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 class="text-2xl font-semibold text-gray-800 mb-4">Menu Prestige</h3>
          <p class="text-gray-600 mb-4">Une expérience gastronomique exceptionnelle avec des produits d'exception.</p>
          <ul class="text-gray-500 mb-4 text-sm">
            <li>🍣 Entrée : Tartare de langouste ou Caviar d'Aquitaine</li>
            <li>🥂 Plat : Homard rôti au beurre blanc ou Chateaubriand sauce foie gras</li>
            <li>🍧 Dessert : Assiette de fromages affinés ou Soufflé au Grand Marnier</li>
          </ul>
          <span class="text-lg font-bold text-red-500">49,99€</span>
        </div>
      </div>
    </div>

     <!-- Section Carrousel d'Avis Utilisateurs -->
     <div class="bg-black-100 py-12">
      <h2 class="text-3xl font-bold text-center text-white mb-8">Avis des Clients</h2>

      <!-- Swiper Carousel -->
      <div class="container mx-auto px-4">
        <Swiper
          :slides-per-view="1"
          :space-between="50"
          :loop="true"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false
          }"
          :modules="[Autoplay, Pagination]"
          class="mySwiper"
        >
          <SwiperSlide v-for="review in reviews" :key="review.id">
            <div class="bg-white shadow-lg p-6 rounded-lg text-center max-w-xl mx-auto">
              <p class="text-lg text-gray-800 mb-4 italic">"{{ review.comment }}"</p>
              <span class="font-semibold text-gray-700">{{ review.name }}</span>
            </div>
          </SwiperSlide>
        </Swiper>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'

const router = useRouter()

// Reviews data
const reviews = ref([
  {
    id: 1,
    name: 'Jean Dujardin',
    comment: 'Une expérience incroyable, des plats raffinés et un service impeccable. Je reviendrai sans hésiter!'
  },
  {
    id: 2,
    name: 'Sophie Marceau',
    comment: 'Un repas délicieux dans une ambiance chaleureuse. Tout était parfait!'
  },
  {
    id: 3,
    name: 'Jason Statham',
    comment: 'Un des meilleurs restaurants où j\'ai mangé! Le menu découverte est un vrai régal!'
  },
  {
    id: 4,
    name: 'Arthur Pendragon',
    comment: 'Deception total, il n\'y avait pas de rat dans ma soupe!'
  }
])

// Existing authentication method
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null
}

const handleReservationClick = () => {
  if (isAuthenticated()) {
    router.push('/add_appointment')
  } else {
    router.push('/login')
  }
}
</script>
