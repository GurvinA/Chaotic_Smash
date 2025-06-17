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
              <div class="card-wrapper">
                <v-window-item
                    v-for="(char, index) in unselectedCharacters"
                    :key="char.name"
                    :value="index"
                >
                
                    <div 
                        class="card"
                        draggable="true"
                        @dragstart="handleCardDragStart('character', char, $event)"
                        @dragend="handleCardDragEnd"
                    >
                        <div class="card-frame">
                            <img :src="`/characters/${char.image}`" alt="Character image" class="card-image" />
                        </div>
                        <h3 class="card-name">{{ char.name }}</h3>
                        <div class="card-stats">
                            <div
                            v-for="(value, key) in char.stats"
                            :key="key"
                            class="stat"
                            >
                            <span class="stat-key">{{ key }}</span>: <span class="stat-value">{{ value }}</span>
                            </div>
                        </div>
                    </div>
                </v-window-item>
              </div>
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
                <div class="card-wrapper">
                    <v-window-item
                        v-for="(loc, index) in unselectedLocations"
                        :key="loc.name"
                        :value="index"
                    >
                    <div 
                        class="card"
                        draggable="true"
                        @dragstart="handleCardDragStart('location', loc, $event)"
                        @dragend="handleCardDragEnd"
                    >
                        <img :src="`/locations/${loc.image}`" alt="Location image" class="card-image" />
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
              </div>
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
import { useDeckData } from '@/composables/decks'

const { characters, locations } = useDeckData()

const props = defineProps<{
  selectedCharacters: (Character | null)[]
  selectedLocations: Location[]
}>()

const tab = ref<'characters' | 'locations'>('characters')

const characterIndex = ref(0)
const locationIndex = ref(0)

const unselectedCharacters = computed(() =>
  characters.filter(c =>
    !props.selectedCharacters.some(sc => sc && sc.name === c.name)
  )
)


const unselectedLocations = computed(() =>
  locations.filter(l =>
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

function handleCardDragStart(
  type: 'character' | 'location',
  item: Character | Location,
  event: DragEvent
) {
  if (event.dataTransfer) {
    event.dataTransfer.setData(type, item.name)
    if (type === 'character') {
      const character = item as Character
      event.dataTransfer.setData('player', String(character.player))
    }
    if (event.target instanceof HTMLElement) {
      event.target.classList.add('dragging')
    }
  }
}

function handleCardDragEnd(event: DragEvent) {
  if (event.target instanceof HTMLElement) {
    event.target.classList.remove('dragging')
  }
}

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
  width: 260px;
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(to bottom right, #f5f5dc, #e6d8ad);
  border: 3px solid #444;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Segoe UI', sans-serif;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: scale(1.03);
}

.card-frame {
  width: 100%;
  height: 200px;
  background-color: white;
  border: 2px inset #999;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-drag: none;
  -webkit-user-drag: none;
  pointer-events: none;
}

.card-name {
  font-size: 1.4rem;
  font-weight: bold;
  margin: 4px 0 10px;
  color: #222;
  text-shadow: 0 1px 0 #fff;
}

.card-stats {
  width: 100%;
  background-color: #fffef5;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #aaa;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  margin-bottom: 4px;
}

.stat-key {
  font-weight: 600;
  color: #444;
}

.stat-value {
  color: #222;
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

.card-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
