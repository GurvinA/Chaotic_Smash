<template>
  <div class="triangle-container" @dragover="handleDragOver">
    <v-row justify="center">
      <v-col cols="2">
        <div
          v-for="n in 3"
          :key="'col1-' + n"
          class="slot-box"
          :class="{ 
            'has-character': slotAssignments[n-1],
            'player-1': Number(slotAssignments[n-1]?.player) === 1,
            'player-2': Number(slotAssignments[n-1]?.player) === 2,
            'active-slot': Number(slotAssignments[n-1]?.player) === gameStore.turn,
            'inactive-slot': slotAssignments[n-1] && Number(slotAssignments[n-1]?.player) !== gameStore.turn
          }"
          @dragover="handleDragOver"
          @drop="(e: DragEvent) => handleSlotDrop(e, n-1)"
        >
          <div
            v-if="slotAssignments[n-1]"
            class="character-chip"
            draggable="true"
            @dragstart="(e: DragEvent) => handleDragStart(e, n-1)"
            @dragend="handleDragEnd"
          >
             <img :src="`/characters/${slotAssignments[n-1]?.image}`" 
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
            'player-2': Number(slotAssignments[n+2]?.player) === 2,
            'active-slot': Number(slotAssignments[n+2]?.player) === gameStore.turn,
            'inactive-slot': slotAssignments[n+2] && Number(slotAssignments[n+2]?.player) !== gameStore.turn
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
            <img :src="`/characters/${slotAssignments[n+2]?.image}`" 
              alt="Character image" class="card-image" />
          </div>
        </div>
      </v-col>

      <v-col cols="2">
        <div
          class="slot-box"
          :class="{ 
            'has-character': slotAssignments[5],
            'player-1': Number(slotAssignments[5]?.player) === 1,
            'player-2': Number(slotAssignments[5]?.player) === 2,
            'active-slot': Number(slotAssignments[5]?.player) === gameStore.turn,
            'inactive-slot': slotAssignments[5] && Number(slotAssignments[5]?.player) !== gameStore.turn
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
            <img :src="`/characters/${slotAssignments[5]?.image}`" 
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
import { useBattleStore } from '@/stores/battleStore'

const { characters } = useDeckData()
const gameStore = useGameStore()
const battleStore = useBattleStore()

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

const adjacencyMap: Record<number, number[]> = {
  0: [1, 3, 6, 7],
  1: [0, 2, 3, 4, 6, 7, 8],
  2: [1, 4, 7, 8],
  3: [0, 1, 4, 5],
  4: [1, 2, 3, 5],
  5: [3, 4],
  6: [0, 1, 7, 9],
  7: [0, 1, 2, 6, 8, 9, 10],
  8: [1, 2, 7, 10],
  9: [6, 7, 10, 11],
  10: [7, 8, 9, 11],
  11: [9, 10]
}

async function handleSlotDrop(event: DragEvent, slotIndex: number) {
  event.preventDefault()
  event.stopPropagation()

  const playerMove = Number(event.dataTransfer?.getData('player'))
  if (!(playerMove === gameStore.turn)) return

  const source = Number(event.dataTransfer?.getData('source'))
  const prevIndex = Number(event.dataTransfer?.getData('index'))

  const prevMapNumber = prevIndex + (6 * (source - 1))
  const mapNumber = slotIndex + 6

  if (!adjacencyMap[prevMapNumber]?.includes(mapNumber)) return

  const currOwner = slotAssignments.value[slotIndex]?.player
  const prevOwner = Number(event.dataTransfer?.getData('player'))
  if (currOwner === prevOwner) return

  const characterName = event.dataTransfer?.getData('character')
  if (!characterName) return

  let character = props.selectedCharacters.find(c => c?.name === characterName)
  if (!character) {
    const original = characters.find(c => c.name === characterName)
    if (!original) return
    character = { ...original, player: prevOwner === 0 ? 2 : prevOwner }
  }

  let allowMove = true

  if (slotAssignments.value[slotIndex]) {
    const battleLocation = 
      source === 1 ? gameStore.player1.locations[Math.floor(Math.random() * 6)] :
      source === 2 ? gameStore.player2.locations[Math.floor(Math.random() * 6)] :
      null
    const attacker =
      source === 1 ? gameStore.player1.characters[prevIndex] :
      source === 2 ? gameStore.player2.characters[prevIndex] :
      null
    const defender = slotAssignments.value[slotIndex]
    if (!attacker || !defender || !battleLocation) return
    const result = await battleStore.open(attacker, defender, battleLocation)
    if (result === 'defender') {
      allowMove = false
    }
    gameStore.toggleTurn()
  }

  const updatedCharacters = [...slotAssignments.value]

  if (!isNaN(prevIndex) && prevIndex !== -1) {
    if (source === 1 && props.selectedCharacters === gameStore.player1.characters) {
      updatedCharacters[prevIndex] = null
    } else if (source === 2 && props.selectedCharacters === gameStore.player2.characters) {
      updatedCharacters[prevIndex] = null
    } else if (source === 1) {
      const copy = [...gameStore.player1.characters]
      copy[prevIndex] = null
      gameStore.player1.characters = copy
    } else if (source === 2) {
      const copy = [...gameStore.player2.characters]
      copy[prevIndex] = null
      gameStore.player2.characters = copy
    }
  }

  if (allowMove) {
    updatedCharacters[slotIndex] = { ...character, player: prevOwner === 0 ? 2 : prevOwner }
  }

  emit('update:selectedCharacters', updatedCharacters)
  slotAssignments.value = updatedCharacters

  gameStore.checkGameOver()
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
    event.dataTransfer?.setData('source', String(2)) 
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

.active-slot {
  box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.5);
  filter: brightness(1.05);
  z-index: 2;
}

.inactive-slot {
  filter: brightness(0.95) grayscale(0.05);
  z-index: 1;
}
</style>
