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
        <BattleModal/>
        <v-col class="text-center">
          <p>Player 2</p>
          <MatchBoard 
            :role="'player2'"
            v-model:selectedCharacters="gameStore.player2.characters"
            v-model:selectedLocations="gameStore.player2.locations" 
          />
        </v-col>
      </v-row>
      <v-dialog v-model="dialogVisible" max-width="400">
        <v-card>
          <v-card-title class="text-h5">Game Over</v-card-title>
          <v-card-text>
            Player {{ gameStore.winner }} wins!
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="restartGame">Play Again</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- <v-btn @click="logGameStoreState">log</v-btn>
      <v-btn @click="gameStore.toggleTurn">turn</v-btn> -->
    </v-container>
  </template>
  
  <script setup lang="ts">
    import { ref, watch } from 'vue'
    import { useGameStore } from '@/stores/gameStore'
    import { useRouter } from 'vue-router'
    import MatchBoard from '@/components/MatchBoard.vue'
    import BattleModal from '@/components/BattleModal.vue'

    const router = useRouter()
    const gameStore = useGameStore()
    const dialogVisible = ref(false)

    watch(() => gameStore.gameOver, (val) => {
      if (val) {
        dialogVisible.value = true
      }
    })

    function restartGame() {
      gameStore.reset()
      dialogVisible.value = false
      router.push('/') 
    }

    function logGameStoreState() {
      console.log('Player 1 Characters:', gameStore.player1.characters)
      console.log('Player 1 Locations:', gameStore.player1.locations)
      console.log('Player 2 Characters:', gameStore.player2.characters)
      console.log('Player 2 Locations:', gameStore.player2.locations)
      console.log('Turn: ', gameStore.turn)
      console.log('Game Over: ', gameStore.gameOver)
      console.log("Winner: ", gameStore.winner)
    }

  </script>
  