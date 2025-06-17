<template>
    <v-container fluid>
      <v-row class="ml-11">
        <v-col class="text-center">
          <p>Player 1 Board</p>
          <Board 
            :role="'player1'"
            v-model:selectedCharacters="gameStore.player1.characters"
            v-model:selectedLocations="gameStore.player1.locations" 
          />
        </v-col>
        <v-col class="text-center">
          <p>Player 2 Board</p>
          <Board 
            :role="'player2'"
            v-model:selectedCharacters="gameStore.player2.characters"
            v-model:selectedLocations="gameStore.player2.locations" 
          />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
    import { useGameStore } from '@/stores/gameStore'
    import Board from '@/components/Board.vue'

    const gameStore = useGameStore()
    console.log(gameStore.player1.characters)
    console.log(gameStore.player1.locations)
    console.log(gameStore.player2.characters)
    console.log(gameStore.player2.locations)

  </script>
  