<template>
    <v-container fluid class="fill-height">
      <v-row>
        <v-col cols="12" class="text-center">
          <h2>Game Board</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="text-center">
          <p>Player 1 Board</p>
          <Board 
            :role="'player1'"
            :selectedCharacters="gameStore.player1.characters"
            :selectedLocations="gameStore.player1.locations" 
          />
        </v-col>
        <v-col cols="6" class="text-center">
          <p>Player 2 Board</p>
          <Board 
            :role="'player2'"
            :selectedCharacters="gameStore.player2.characters"
            :selectedLocations="gameStore.player2.locations" 
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
  