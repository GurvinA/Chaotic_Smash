<template>
  <div class="setup-wrapper">
    <v-row align="center" justify="end" v-if="isPlayer1">
      <v-spacer/>
      <v-col>
        <v-btn color="buttons"
          @click="insertions"
          style="width:150px; height:150px; border-radius: 75px;">
          Insert
        </v-btn>
        <div style="height: 16px;"></div>
        <v-btn color="buttons"
          @click="lockIn"
          style="width:150px; height:150px; border-radius: 75px;">
          Lock In
        </v-btn>
      </v-col>
      <v-spacer/>
      <v-col>
        <SelectorDeck
          v-model:selectedCharacters="selectedCharacters"
          v-model:selectedLocations="selectedLocations"
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
          v-model:selectedCharacters="selectedCharacters"
          v-model:selectedLocations="selectedLocations"
        />
      </v-col>
      <v-col cols="2">
        <v-btn color="buttons"
          @click="insertions"
          style="width:150px; height:150px; border-radius: 75px;">
          Insert
        </v-btn>
        <div style="height: 16px;"></div>
        <v-btn color="buttons"
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

const selectedCharacters = ref<(Character | null)[]>([null, null, null, null, null, null])

const selectedLocations = ref<Location[]>([])

let isPlayer1 = route.fullPath.includes('player1')

watch(() => route.fullPath, (newPath) => {
  isPlayer1 = newPath.includes('player1')
})

function lockIn() {
  if (isPlayer1) 
  {
    if (selectedCharacters.value.every(c => c !== null) && selectedLocations.value.length === 6)
    {
      store.setPlayerData(1, selectedCharacters.value, selectedLocations.value)
      router.push('/setup/player2') 
      selectedCharacters.value = []
      selectedLocations.value = []
    }
    
  }
  else 
  {
    if (selectedCharacters.value.every(c => c !== null) && selectedLocations.value.length === 6)
    {
      store.setPlayerData(2, selectedCharacters.value, selectedLocations.value)
      router.push('/game')
      selectedCharacters.value = []
      selectedLocations.value = []
    }
  }
}

function insertions() {

  selectedCharacters.value[0] = characters[9]
  selectedCharacters.value[1] = characters[12]
  selectedCharacters.value[2] = characters[17]
  selectedCharacters.value[3] = characters[4]
  selectedCharacters.value[4] = characters[26]
  selectedCharacters.value[5] = characters[23]

  selectedLocations.value[0] = locations[3]
  selectedLocations.value[1] = locations[13]
  selectedLocations.value[2] = locations[23]
  selectedLocations.value[3] = locations[5]
  selectedLocations.value[4] = locations[9]
  selectedLocations.value[5] = locations[12]

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
