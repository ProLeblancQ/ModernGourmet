import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '@/views/Register.vue';
import AddAppointment from '@/views/AddAppointment.vue';
import ListAppointment from '@/views/ListAppointment.vue';
import welcome from '@/views/welcome.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: welcome,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/add_appointment',
      component: AddAppointment,
    },
    {
      path: '/list_appointment',
      component: ListAppointment,
    }

  ],
})

export default router
