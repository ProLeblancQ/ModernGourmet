<template>
  <div class="container mx-auto px-4 py-8">
    <vue-cal 
      class="vuecal--minimal-theme h-[600px]"
      locale="fr"
      :events="combinedEvents"
      view="week"
      :disable-views="['month', 'day', 'year', 'years']"
      @event-click="showEventDetails"
      :time="true"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import axios from "axios";

const appointments = ref([]);

const restaurantHours = {
  closed: [0], // Lundi fermé
  openLunch: { start: { hour: 12, minute: 0 }, end: { hour: 14, minute: 30 } },
  openDinner: { start: { hour: 19, minute: 0 }, end: { hour: 23, minute: 0 } },
};

const combinedEvents = computed(() => {
  const unavailableSlots = generateUnavailableSlots();
  return [...unavailableSlots, ...appointments.value];
});

const generateUnavailableSlots = () => {
  const unavailableEvents = [];
  const now = new Date();
  const oneYearFromNow = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

  for (let d = new Date(now); d < oneYearFromNow; d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    
    // Si fermé le lundi
    if (restaurantHours.closed.includes(day)) continue;

    // Créneaux fermés
    const closedSlots = [
      {
        title: 'Fermé',
        start: new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0),
        end: new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0),
        class: 'vuecal__event--disabled'
      },
      {
        title: 'Fermé',
        start: new Date(d.getFullYear(), d.getMonth(), d.getDate(), 14, 30),
        end: new Date(d.getFullYear(), d.getMonth(), d.getDate(), 19, 0),
        class: 'vuecal__event--disabled'
      },
      {
        title: 'Fermé',
        start: new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 0),
        end: new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 0, 0),
        class: 'vuecal__event--disabled'
      }
    ];

    unavailableEvents.push(...closedSlots);
  }

  return unavailableEvents;
};

const fetchAppointments = async () => {
  try {
    const response = await axios.get("http://localhost:3000/appointment/user", {
      withCredentials: true
    });
    appointments.value = response.data.map((appt) => ({
      title: appt.title || 'Rendez-vous',
      start: new Date(appt.startDate),
      end: new Date(appt.endDate),
      _eid: appt._id
    }));
  } catch (error) {
    console.error("Erreur lors du chargement des rendez-vous", error);
  }
};

onMounted(fetchAppointments);
</script>

<style scoped>
/* Forcing higher specificity to override vue-cal styles */
.vuecal .vuecal__event--disabled {
  background-color: #e74c3c !important; /* Rouge vif */
  color: #ffffff !important; /* Texte blanc */
  opacity: 1 !important; /* Aucune transparence */
  cursor: not-allowed !important;
  font-weight: bold !important;
}

.vuecal .vuecal__event {
  background-color: #2ecc71 !important; /* Vert vif pour les événements */
  color: #ffffff !important; /* Texte blanc */
  font-weight: bold !important;
  border-radius: 5px !important;
}

.vuecal .vuecal__header {
  background-color: #34495e !important; /* Gris foncé pour l'en-tête */
  color: #ffffff !important; /* Texte blanc pour l'en-tête */
  font-size: 1.2rem !important;
  padding: 1rem !important;
}

.vuecal .vuecal__day {
  background-color: #ecf0f1 !important; /* Fond clair */
  color: #2c3e50 !important; /* Texte sombre pour les jours */
  font-size: 1rem !important;
}

.vuecal .vuecal__day.vuecal__day--selected {
  background-color: #2980b9 !important; /* Bleu foncé pour la sélection */
  color: #ffffff !important; /* Texte blanc */
}

.vuecal .vuecal__today {
  background-color: #f39c12 !important; /* Jaune pour aujourd'hui */
  color: #ffffff !important;
}

.vuecal .vuecal__day--saturday, .vuecal .vuecal__day--sunday {
  background-color: #f7f7f7 !important; /* Fond clair pour le week-end */
  color: #e74c3c !important; /* Rouge pour le week-end */
}

.vuecal .vuecal__day--saturday:hover, .vuecal .vuecal__day--sunday:hover {
  background-color: #f39c12 !important; /* Jaune au survol pour le week-end */
}

.vuecal .vuecal__event-details {
  background-color: #34495e !important; /* Fond gris foncé pour les détails */
  color: #ffffff !important; /* Texte blanc pour les détails */
  border-radius: 4px !important;
  padding: 10px !important;
  font-size: 0.9rem !important;
}

.vuecal .vuecal__event-time {
  font-size: 0.8rem !important;
  font-weight: bold !important;
}
</style>
