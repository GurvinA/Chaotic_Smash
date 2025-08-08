<template>
  <div class="triangle-container" @dragover="handleDragOver">
    <v-row justify="center">
      <v-col cols="2">
        <div
          class="slot-box"
          :class="{ 
            'has-character': slotAssignments[5],
            'player-1': Number(slotAssignments[5]?.player) === 1,
            'player-2': Number(slotAssignments[5]?.player) === 2
          }"
          @dragover="handleDragOver"
          @drop="(e: DragEvent) => handleSlotDrop(e, 5)"
        >
          <div
            v-if="slotAssignments[5]"
            class="character-chip"
            draggable="true"
            @dragstart="(e: DragEvent) => handleDragStart(e, 5)"
            @dragend="handleDragEnd"
          >
             <img :src="`${base}characters/${slotAssignments[5]?.image}`" 
              alt="Character image" class="card-image" />
          </div>
        </div>
      </v-col>

      <v-col cols="2">
        <div
          v-for="n in 2"
          :key="'col2-' + n"
          class="slot-box"
          :class="{ 
            'has-character': slotAssignments[n+2],
            'player-1': Number(slotAssignments[n+2]?.player) === 1,
            'player-2': Number(slotAssignments[n+2]?.player) === 2
          }"
          @dragover="handleDragOver"
          @drop="(e: DragEvent) => handleSlotDrop(e, n + 2)"
        >
          <div
            v-if="slotAssignments[n + 2]"
            class="character-chip"
            draggable="true"
            @dragstart="(e: DragEvent) => handleDragStart(e, n + 2)"
            @dragend="handleDragEnd"
          >
            <img :src="`${base}characters/${slotAssignments[n+2]?.image}`" 
              alt="Character image" class="card-image" />
          </div>
        </div>
      </v-col>

      <v-col cols="2">
        <div
          v-for="n in 3"
          :key="'col1-' + n"
          class="slot-box"
          :class="{ 
            'has-character': slotAssignments[n - 1],
            'player-1': Number(slotAssignments[n-1]?.player) === 1,
            'player-2': Number(slotAssignments[n-1]?.player) === 2
          }"
          @dragover="handleDragOver"
          @drop="(e: DragEvent) => handleSlotDrop(e, n - 1)"
        >
          <div
            v-if="slotAssignments[n - 1]"
            class="character-chip"
            draggable="true"
            @dragstart="(e: DragEvent) => handleDragStart(e, n - 1)"
            @dragend="handleDragEnd"
          >
            <img :src="`${base}characters/${slotAssignments[n-1]?.image}`" 
              alt="Character image" class="card-image" />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Character } from '@/Types'
import { useDeckData } from '@/composables/decks'
import { useGameStore } from '@/stores/gameStore'

const { characters } = useDeckData()
const gameStore = useGameStore()
const base = import.meta.env.BASE_URL

const props = defineProps<{
  selectedCharacters: (Character | null)[]
}>()

const emit = defineEmits<{
  (e: 'update:selectedCharacters', value: (Character | null)[]): void
}>()

const slotAssignments = computed<(Character | null)[]>({
  get: () => props.selectedCharacters,
  set: (newVal) => emit('update:selectedCharacters', newVal)
})


function handleSlotDrop(event: DragEvent, slotIndex: number) {
  event.preventDefault()
  event.stopPropagation()

  const characterName = event.dataTransfer?.getData('character')
  const owner = Number(event.dataTransfer?.getData('player'))
  if (!characterName) return

  let character = props.selectedCharacters.find(c => c?.name === characterName)
  if (!character) {
    const original = characters.find(c => c.name === characterName)
    if (!original) return
    character = { ...original, player: owner === 0 ? 1 : owner }
  }

  const updatedCharacters = [...slotAssignments.value]
  const prevIndex = updatedCharacters.findIndex(c => c?.name === characterName)
  if (prevIndex !== -1) {
    updatedCharacters[prevIndex] = null
  }

  updatedCharacters[slotIndex] = { ...character, player: owner === 0 ? 1 : owner }

  emit('update:selectedCharacters', updatedCharacters)
  slotAssignments.value = updatedCharacters
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

function handleDragStart(event: DragEvent, slotIndex: number) {
  const character = slotAssignments.value[slotIndex]
  if (character) {
    event.dataTransfer?.setData('character', character.name)
    event.dataTransfer?.setData('player', String(character.player))
    event.dataTransfer?.setData('index', String(slotIndex))
    event.dataTransfer?.setData('source', String(1)) 
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
</script>

<style scoped>
.triangle-container {
  min-height: 400px;
  position: relative;
}

.slot-box {
  width: 100px;
  height: 100px;
  border: 2px dotted rgb(20, 20, 20);
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(156, 156, 171);
  transition: all 0.2s ease;
  position: relative;
  z-index: 2;
}

.slot-box.has-character.player-1 {
  border-style: solid;
  background-color: #fd1613;
}

.slot-box.has-character.player-2 {
  border-style: solid;
  background-color: #1057ff;
}

.v-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 24px;
}

.card-image {
  height: 80px;
  width: 80px;
}
</style>
