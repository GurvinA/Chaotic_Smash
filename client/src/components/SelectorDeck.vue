<template>
  <div class="selector-wrapper">
    <v-container class="content" fluid>
      <v-window v-model="tab">
        <v-window-item value="characters">
          <v-row>
            <v-col
              v-for="char in unselectedCharacters"
              :key="char.name"
              cols="12"
              class="card-wrapper"
            >
              <div class="card">{{ char.name }}</div>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="locations">
          <v-row>
            <v-col
              v-for="loc in unselectedLocations"
              :key="loc.name"
              cols="12"
              class="card-wrapper"
            >
              <div class="card">{{ loc.name }}</div>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-container>

    <v-tabs
      v-model="tab"
      class="deck-tabs"
      background-color="primary"
      dark
    >
      <v-tab value="characters">Characters</v-tab>
      <v-tab value="locations">Locations</v-tab>
      <v-tab value="items">Items</v-tab>
      <v-tab value="rules">Rules</v-tab>
    </v-tabs>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Character, Location } from '@/Types'

const props = defineProps<{
  characters: Character[]
  locations: Location[]
  selectedCharacters: Character[]
  selectedLocations: Location[]
}>()

const tab = ref<'characters' | 'locations'>('characters')

const unselectedCharacters = computed(() =>
  props.characters.filter(c =>
    !props.selectedCharacters.some(sc => sc.name === c.name)
  )
)

const unselectedLocations = computed(() =>
  props.locations.filter(l =>
    !props.selectedLocations.some(sl => sl.name === l.name)
  )
)
</script>

<style scoped>
.selector-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #3ca49c;
  border: 3.5px solid yellow;
  border-radius: 40px;
  height: 600px;
  width: 400px;
  color: black;
  overflow: hidden;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 16px;
}

.deck-tabs {
  border-top: 2px solid #000;
}

</style>