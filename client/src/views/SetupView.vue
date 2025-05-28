<template>
    <v-container class="fill-height">

      <v-row justify="center">
        <v-col cols="2" class="d-flex flex-column align-center justify-center">
          <div v-for="n in 3" :key="'col1-' + n" class="slot-box"></div>
        </v-col>
  
        <v-col cols="2" class="d-flex flex-column align-center justify-center">
          <div v-for="n in 2" :key="'col2-' + n" class="slot-box"></div>
        </v-col>
  
        <v-col cols="2" class="d-flex flex-column align-center justify-center">
          <div class="slot-box"></div>
        </v-col>
      </v-row>

      <v-row>
      <v-col cols="12">
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
              @click="toggleCharacter(char)"
              block
            >
              {{ char }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    </v-container>
  </template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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

function toggleCharacter(char: string) {
  const index = selectedCharacters.value.indexOf(char)
  if (index === -1) {
    if (selectedCharacters.value.length < 6) {
      selectedCharacters.value.push(char)
    }
  } else {
    selectedCharacters.value.splice(index, 1)
  }
}

function goToGame() {
  router.push('/game')
}
</script>
  
  <style scoped>
  .slot-box {
    width: 100px;
    height: 100px;
    border: 2px dotted white;
    margin: 10px;
  }
  .v-col{
    margin: 10px;
  }
  </style>
  