import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    username: null,
    token: null
  }),
  actions: {
    // Load user data from localStorage on app startup
    loadUserData() {
      const token = localStorage.getItem('token')
      const username = localStorage.getItem('username')
      
      if (token && username) {
        this.isLoggedIn = true
        this.username = username
        this.token = token
      }
    },

    // Login action
    async login(email, password) {
      try {
        const response = await axios.post(
          "http://localhost:3000/user/login",
          { email, password },
          { withCredentials: true }
        )

        if (response.data && response.data.token && response.data.username) {
          // Update store state
          this.isLoggedIn = true
          this.username = response.data.username
          this.token = response.data.token

          // Persist in localStorage
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', response.data.username)

          return true
        }
        return false
      } catch (error) {
        console.error("Login error:", error)
        return false
      }
    },

    // Logout action
    logout() {
      this.isLoggedIn = false
      this.username = null
      this.token = null
      
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    }
  }
})