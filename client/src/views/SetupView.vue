<template>
  <div class="setup-wrapper">

  

    <v-row>
      <v-col>
        <Board v-model:selectedCharacters="selectedCharacters":selectedLocations="selectedLocations" />
      </v-col>
      <v-col>
        <SelectorDeck/>
      </v-col>
      
    </v-row>


  

  <v-row>
    <h3>Select Your Characters</h3>
    <v-row>
      <v-col
        v-for="char in characters"
        :key="char"
        cols="2"
        class="text-center"
      >
        <v-btn
          :color="selectedCharacters.includes(char) ? 'primary' : 'grey'"
          draggable="true"
          @dragstart="handleDragStart($event, char)"
          @dragend="handleDragEnd"
          block
        >
          {{ char }}
        </v-btn>
      </v-col>
    </v-row>
  </v-row>

  <v-row>
    <v-col cols="12">
      <h3>Select Your Locations</h3>
      <v-row>
        <v-col
          v-for="stage in locations"
          :key="stage"
          cols="3"
          class="text-center"
        >
          <v-btn
            :color="selectedLocations.includes(stage) ? 'secondary' : 'grey'"
            @click="toggleLocation(stage)"
            block
          >
            {{ stage }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

  <v-row>
    <v-btn color="success" class="mt-4" @click="lockIn">Lock In</v-btn>
  </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import Board from '@/components/Board.vue'
import SelectorDeck from '@/components/SelectorDeck.vue'

const store = useGameStore()
const route = useRoute()
const router = useRouter()

const isPlayer1 = route.path.includes('player1')

const locations = [
  "Final Destination", "Battlefield", "Smashville", "Pokemon Stadium 2",
  "Town and City", "Lylat Cruise", "Yoshi's Island", "Kalos League",
  "WarioWare Inc", "Dream Land", "Castle Siege", "Frigate Orpheon"
]

const selectedLocations = ref<string[]>([])

function toggleLocation(stage: string) {
  const index = selectedLocations.value.indexOf(stage)
  if (index === -1) {
    if (selectedLocations.value.length < 5) {
      selectedLocations.value.push(stage)
    }
  } else {
    selectedLocations.value.splice(index, 1)
  }
}

const characters = [
  "Mario", "Donkey Kong", "Link", "Samus", "Dark Samus", "Yoshi", "Kirby", "Fox", "Pikachu", "Luigi",
  "Ness", "Captain Falcon", "Jigglypuff", "Peach", "Daisy", "Bowser", "Ice Climbers", "Sheik", "Zelda", "Dr. Mario",
  "Pichu", "Falco", "Marth", "Lucina", "Young Link", "Ganondorf", "Mewtwo", "Roy", "Chrom", "Mr. Game & Watch",
  "Meta Knight", "Pit", "Dark Pit", "Zero Suit Samus", "Wario", "Snake", "Ike", "Pokemon Trainer", "Diddy Kong", "Lucas",
  "Sonic", "King Dedede", "Olimar", "Lucario", "R.O.B.", "Toon Link", "Wolf", "Villager", "Mega Man", "Wii Fit Trainer",
  "Rosalina & Luma", "Little Mac", "Greninja", "Palutena", "Pac-Man", "Robin", "Shulk", "Bowser Jr.", "Duck Hunt Duo", "Ryu",
  "Ken", "Cloud", "Corrin", "Bayonetta", "Inkling", "Ridley", "Simon", "Richter", "King K. Rool", "Isabelle", "Incineroar",
  "Piranha Plant", "Joker", "Hero", "Banjo & Kazooie", "Terry", "Byleth", "Min Min", "Steve", "Sephiroth", "Pyra/Mythra",
  "Kazuya", "Sora", "Mii Brawler", "Mii Swordfighter", "Mii Gunner, Random"
]

const selectedCharacters = ref<string[]>([])

function handleDragStart(event: DragEvent, character: string) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('character', character)
    if (event.target instanceof HTMLElement) {
      event.target.classList.add('dragging')
    }
  }
}

function handleDragEnd(event: DragEvent) {
  if (event.target instanceof HTMLElement) {
    event.target.classList.remove('dragging')
  }
}

function lockIn() {
  const playerNum = isPlayer1 ? 1 : 2
  store.setPlayerData(playerNum, [...selectedCharacters.value], [...selectedLocations.value])

  if (isPlayer1) {
    router.push('/setup/player2')
  } else {
    router.push('/game')
  }
}
</script>

<style scoped>
.v-btn.dragging {
  opacity: 0.5;
}

.v-row {
  margin: 10px;
  justify-content: start;
}

.setup-wrapper {
  justify-content: start;
}


</style>
