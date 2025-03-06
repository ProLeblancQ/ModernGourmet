<template>
  <footer class="bg-gray-900 text-white py-6 mt-10">
    <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <!-- Informations du restaurant -->
      <div class="text-center md:text-left mb-4 md:mb-0">
        <h2 class="text-xl font-bold">Le Gourmet Moderne</h2>
        <p class="text-gray-400 mt-1">📍 123 Rue du Délice, Paris, France</p>
        <p class="text-gray-400">☎️ 01 23 45 67 89</p>
        <p class="text-gray-400">✉️ contact@gourmetmoderne.com</p>
      </div>

      <!-- Horaires d'ouverture -->
      <div class="text-center md:text-left mb-4 md:mb-0">
        <h3 class="text-lg font-semibold">🕒 Horaires d'ouverture</h3>
        <p class="text-gray-400">Lundi - Vendredi : 12h00 - 14h30 | 19h00 - 23h00</p>
        <p class="text-gray-400">Samedi - Dimanche : 12h00 - 15h00 | 19h00 - 00h00</p>
      </div>

      <!-- Réseaux sociaux -->
      <div class="flex space-x-4 mt-4 md:mt-0">
        <a href="#" class="text-gray-400 hover:text-white text-xl">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="#" class="text-gray-400 hover:text-white text-xl">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="#" class="text-gray-400 hover:text-white text-xl">
          <i class="fab fa-twitter"></i>
        </a>
      </div>
    </div>

    <!-- Copyright -->
    <div class="text-center text-gray-500 text-sm mt-6">
      © 2024 Le Gourmet Moderne - Tous droits réservés
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
