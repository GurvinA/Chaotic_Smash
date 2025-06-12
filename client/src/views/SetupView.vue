<template>
  <div class="setup-wrapper">
    <v-row align="center" justify="end" v-if="isPlayer1">
      <v-spacer/>
      <v-col>
        <v-btn color="chaotic"
          @click="lockIn"
          style="width:150px; height:150px; border-radius: 75px;">
          Lock In
        </v-btn>
      </v-col>
      <v-spacer/>
      <v-col>
        <SelectorDeck
          :selectedCharacters="selectedCharacters"
          :selectedLocations="selectedLocations"
        />
      </v-col>
      <v-spacer/>
      <v-col>
        <Board 
          :role="'player1'"
          v-model:selectedCharacters="selectedCharacters"
          v-model:selectedLocations="selectedLocations" 
        />
      </v-col>
    </v-row>
    <v-row align="center" v-else>
      <v-col cols="6">
        <Board 
          :role="'player2'"
          v-model:selectedCharacters="selectedCharacters"
          v-model:selectedLocations="selectedLocations" 
        />
      </v-col>
      <v-col cols="4">
        <SelectorDeck
          :selectedCharacters="selectedCharacters"
          :selectedLocations="selectedLocations"
        />
      </v-col>
      <v-col cols="2">
        <v-btn color="chaotic"
          @click="lockIn"
          style="width:150px; height:150px; border-radius: 75px;">
          Lock In
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>





<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import { useDeckData } from '@/composables/decks'
import Board from '@/components/Board.vue'
import SelectorDeck from '@/components/SelectorDeck.vue'
import type { Character, Location } from '@/Types';

const store = useGameStore()
const route = useRoute()
const router = useRouter()

defineProps<{
  selectedCharacters: Character[]
  selectedLocations: Location[]
}>()

const { characters, locations } = useDeckData()

const selectedCharacters = ref<Character[]>([])
const selectedLocations = ref<Location[]>([])

let isPlayer1 = route.fullPath.includes('player1')

watch(() => route.fullPath, (newPath) => {
  isPlayer1 = newPath.includes('player1')
})

function lockIn() {
  if (isPlayer1) 
  {
    store.setPlayerData(1, selectedCharacters.value, selectedLocations.value)
    router.push('/setup/player2') 
  }
  else 
  {
    store.setPlayerData(2, selectedCharacters.value, selectedLocations.value)
    router.push('/game')
  }
}


</script>







<style scoped>

.v-row {
  margin: 10px;
  border: 2px solid red;
}

.setup-wrapper {
  width: 100%;
}

</style>
