<template>
    <v-container fluid>
      <v-row class="ml-11">
        <v-col class="text-center">
          <p>Player 1</p>
          <MatchBoard 
            :role="'player1'"
            v-model:selectedCharacters="gameStore.player1.characters"
            v-model:selectedLocations="gameStore.player1.locations" 
          />
        </v-col>
        <v-col class="text-center">
          <p>Player 2</p>
          <MatchBoard 
            :role="'player2'"
            v-model:selectedCharacters="gameStore.player2.characters"
            v-model:selectedLocations="gameStore.player2.locations" 
          />
        </v-col>
      </v-row>
      <v-btn @click="logGameStoreState">log</v-btn>
      <v-btn @click="gameStore.toggleTurn">turn</v-btn>
    </v-container>
  </template>
  
  <script setup lang="ts">
    import { useGameStore } from '@/stores/gameStore'
    import MatchBoard from '@/components/MatchBoard.vue'

    const gameStore = useGameStore()

    function logGameStoreState() {
      console.log('Player 1 Characters:', gameStore.player1.characters)
      console.log('Player 1 Locations:', gameStore.player1.locations)
      console.log('Player 2 Characters:', gameStore.player2.characters)
      console.log('Player 2 Locations:', gameStore.player2.locations)
      console.log('Turn: ', gameStore.turn)
    }

  </script>
  