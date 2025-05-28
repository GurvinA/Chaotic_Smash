<template>
    <v-container class="fill-height" justify="center" align="center">
      <v-row>
        <v-col cols="12" class="text-center">
          <h2>Online Lobby</h2>
          <v-text-field v-model="roomCode" label="Enter Room Code" maxlength="4" class="ma-2" />
          <v-btn color="primary" class="ma-2" @click="joinLobby">Join Lobby</v-btn>
          <v-divider class="my-4"></v-divider>
          <v-btn color="secondary" class="ma-2" @click="createLobby">Create New Lobby</v-btn>
          <p v-if="generatedCode">Your Code: <strong>{{ generatedCode }}</strong></p>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default {
    setup() {
      const router = useRouter()
      const roomCode = ref('')
      const generatedCode = ref('')
  
      function joinLobby() {
        if (roomCode.value.length === 4) {
          router.push('/setup')
        }
      }
  
      function createLobby() {
        const code = Math.random().toString(36).substring(2, 6).toUpperCase()
        generatedCode.value = code
        // Normally, you'd notify the server here
      }
  
      return { roomCode, joinLobby, generatedCode, createLobby }
    }
  }
  </script>
  