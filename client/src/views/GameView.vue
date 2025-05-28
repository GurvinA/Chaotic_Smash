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
          <!-- Later: <GameBoard :player="1" /> -->
        </v-col>
        <v-col cols="6" class="text-center">
          <p>Player 2 Board</p>
          <!-- Later: <GameBoard :player="2" /> -->
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  export default {
    name: 'GameView'
  }
  </script>
  