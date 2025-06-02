<template>
  <div class="selector-wrapper">
    <v-container class="content" fluid>
      <v-window v-model="tab">
        <!-- Character Selector -->
        <v-window-item value="characters">
          <div class="carousel-container character-carousel">
            <v-btn
              icon
              @click="prevCard('character')"
              :disabled="characterIndex === 0"
              class="nav-btn"
            >
              ↑
            </v-btn>

            <v-window v-model="characterIndex" direction="vertical" class="card-window no-arrows" show-arrows="false">
              <v-window-item
                v-for="(char, index) in unselectedCharacters"
                :key="char.name"
                :value="index"
              >
                <div class="card">
                  <img :src="`/characters/${char.image}`" alt="Character image" class="card-image" />
                  <h3>{{ char.name }}</h3>
                  <div class="stats">
                    <div
                      v-for="(value, key) in char.stats"
                      :key="key"
                      class="stat"
                    >
                      {{ key }}: {{ value }}
                    </div>
                  </div>
                </div>
              </v-window-item>
            </v-window>

            <v-btn
              icon
              @click="nextCard('character')"
              :disabled="characterIndex >= unselectedCharacters.length - 1"
              class="nav-btn"
            >
              ↓
            </v-btn>
          </div>
        </v-window-item>

        <!-- Location Selector -->
        <v-window-item value="locations">
          <div class="carousel-container location-carousel">
            <v-btn
              icon
              @click="prevCard('location')"
              :disabled="locationIndex === 0"
              class="nav-btn"
            >
              ↑
            </v-btn>

            <v-window v-model="locationIndex" direction="vertical" class="card-window no-arrows" show-arrows="false">
              <v-window-item
                v-for="(loc, index) in unselectedLocations"
                :key="loc.name"
                :value="index"
              >
                <div class="card">
                  <img :src="loc.image" alt="Location image" class="card-image" />
                  <h3>{{ loc.name }}</h3>
                  <div class="stats">
                    <div
                      v-for="(value, key) in loc.stats"
                      :key="key"
                      class="stat"
                    >
                      {{ key }}: {{ value }}
                    </div>
                  </div>
                </div>
              </v-window-item>
            </v-window>

            <v-btn
              icon
              @click="nextCard('location')"
              :disabled="locationIndex >= unselectedLocations.length - 1"
              class="nav-btn"
            >
              ↓
            </v-btn>
          </div>
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
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import type { Character, Location } from '@/Types'

const props = defineProps<{
  characters: Character[]
  locations: Location[]
  selectedCharacters: Character[]
  selectedLocations: Location[]
}>()

const tab = ref<'characters' | 'locations'>('characters')

const characterIndex = ref(0)
const locationIndex = ref(0)

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

function nextCard(type: 'character' | 'location') {
  if (type === 'character' && characterIndex.value < unselectedCharacters.value.length - 1) {
    characterIndex.value++
  } else if (type === 'location' && locationIndex.value < unselectedLocations.value.length - 1) {
    locationIndex.value++
  }
}

function prevCard(type: 'character' | 'location') {
  if (type === 'character' && characterIndex.value > 0) {
    characterIndex.value--
  } else if (type === 'location' && locationIndex.value > 0) {
    locationIndex.value--
  }
}

let wheelLocked = false 

function addWheelListenerForTab(tabName: 'characters' | 'locations') {
  const selector = tabName === 'characters' ? '.character-carousel' : '.location-carousel'
  const container = document.querySelector(selector)
  if (!container) return

    const handler = (e: Event) => {
        const event = e as WheelEvent
        event.preventDefault()

        if (wheelLocked) return
        wheelLocked = true

        if (tabName === 'characters') {
            event.deltaY > 0 ? nextCard('character') : prevCard('character')
        } else {
            event.deltaY > 0 ? nextCard('location') : prevCard('location')
        }

        setTimeout(() => {
            wheelLocked = false
        }, 10)
    }

  container.addEventListener('wheel', handler, { passive: false })
}

onMounted(() => {
  watch(
    tab,
    async (newTab) => {
      await nextTick() // wait for DOM render
      addWheelListenerForTab(newTab)
    },
    { immediate: true }
  )
})
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
  overflow-y: hidden;
  padding-bottom: 16px;
}

.deck-tabs {
  border-top: 2px solid #000;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 16px;
  text-align: center;
}

.card-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 12px;
}

.stats {
  width: 100%;
  text-align: left;
  margin-top: 8px;
}

.stat {
  margin-bottom: 4px;
}

.carousel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;
  overflow: hidden;
  position: relative;
}

.card-window {
  height: 100%;
  width: 100%;
  overflow: hidden;
  flex-grow: 1;
}

.nav-btn {
  background-color: white;
  margin: 4px 0;
  z-index: 2;
}

.no-arrows ::v-deep(.v-window__controls) {
  display: none !important;
}

</style>
