import { defineStore } from 'pinia';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    username: '',
    token: '',
    isLoggedIn: false,
    isAdmin: false,
    userId: null,
  }),

  getters: {
    // Ajouter des getters utiles
    user: (state) => ({
      username: state.username,
      isAdmin: state.isAdmin,
      userId: state.userId
    }),
    
    // Vérifier si le token est expiré
    isTokenExpired: (state) => {
      if (!state.token) return true;
      
      try {
        const decodedToken = jwtDecode(state.token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
      } catch {
        return true;
      }
    }
  },

  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('/api/login', { email, password });
        const { token, username } = response.data;

        // Vérifier si le token est valide
        if (!token) {
          throw new Error('Token invalide');
        }

        // Décoder le token pour obtenir les informations utilisateur
        const decodedToken = jwtDecode(token);
        
        // Sauvegarder les données dans le store
        this.token = token;
        this.username = username || decodedToken.username;
        this.isLoggedIn = true;
        this.isAdmin = Boolean(decodedToken.isAdmin);
        this.userId = decodedToken.userId || decodedToken.sub;
        
        // Sauvegarder le token dans le localStorage
        localStorage.setItem('token', token);
        
        // Configurer axios avec le token pour les futures requêtes
        this.setAxiosAuthHeader(token);

        return true;
      } catch (error) {
        console.error('Login échoué:', error);
        return false;
      }
    },

    loadUserData() {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return false;
      }
      
      try {
        // Vérifier si le token n'est pas expiré
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp < currentTime) {
          this.logout();
          return false;
        }
        
        this.token = token;
        this.username = decodedToken.username;
        this.isLoggedIn = true;
        this.isAdmin = Boolean(decodedToken.isAdmin);
        this.userId = decodedToken.userId || decodedToken.sub;
        
        // Configurer axios avec le token
        this.setAxiosAuthHeader(token);
        
        return true;
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur:', error);
        this.logout();
        return false;
      }
    },

    setAxiosAuthHeader(token) {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
    },

    logout() {
      // Réinitialisation de l'état
      this.token = '';
      this.username = '';
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.userId = null;

      // Suppression du token
      localStorage.removeItem('token');
      
      // Supprimer l'en-tête d'autorisation
      this.setAxiosAuthHeader(null);
    }
  }
});