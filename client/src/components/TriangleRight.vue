<script setup lang="ts">
import { ref } from 'vue'
import type { Character } from '@/Types'
import { useDeckData } from '@/composables/decks'

const { characters } = useDeckData()

const props = defineProps<{
  selectedCharacters: Character[]
}>()

const emit = defineEmits<{
  (e: 'update:selectedCharacters', value: Character[]): void
}>()

const slotAssignments = ref<(Character | null)[]>([null, null, null, null, null, null])

function handleSlotDrop(event: DragEvent, slotIndex: number) {
  event.preventDefault()
  event.stopPropagation()

  const characterName = event.dataTransfer?.getData('character')
  if (characterName) {
    let character = props.selectedCharacters.find(c => c.name === characterName)
    if (!character) {
      character = characters.find(c => c.name === characterName)
      if (!character) return
      emit('update:selectedCharacters', [...props.selectedCharacters, character])
    }

    const prevIndex = slotAssignments.value.findIndex(c => c?.name === characterName)
    if (prevIndex !== -1) {
      slotAssignments.value[prevIndex] = null
    }

    slotAssignments.value[slotIndex] = character
  }
}

function handleContainerDrop(event: DragEvent) {
  event.preventDefault()
  const characterName = event.dataTransfer?.getData('character')
  if (characterName) {
    const index = slotAssignments.value.findIndex(c => c?.name === characterName)
    if (index !== -1) {
      slotAssignments.value[index] = null
      emit('update:selectedCharacters', slotAssignments.value.filter(c => c !== null) as Character[])
    }
  }
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

function handleDragStart(event: DragEvent, slotIndex: number) {
  const character = slotAssignments.value[slotIndex]
  if (character) {
    event.dataTransfer?.setData('character', character.name)
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

<template>
  <div class="triangle-container" @dragover="handleDragOver" @drop="handleContainerDrop">
    <v-row justify="center">
      <v-col cols="2">
        <div
          class="slot-box"
          :class="{ 'has-character': slotAssignments[5] }"
          @dragover="handleDragOver"
          @drop="(e) => handleSlotDrop(e, 5)"
        >
          <div
            v-if="slotAssignments[5]"
            class="character-chip"
            draggable="true"
            @dragstart="(e) => handleDragStart(e, 5)"
            @dragend="handleDragEnd"
          >
             <img :src="`/characters/${slotAssignments[5]?.image}`" 
              alt="Character image" class="card-image" />
          </div>
        </div>
      </v-col>

      <v-col cols="2">
        <div
          v-for="n in 2"
          :key="'col2-' + n"
          class="slot-box"
          :class="{ 'has-character': slotAssignments[n + 2] }"
          @dragover="handleDragOver"
          @drop="(e) => handleSlotDrop(e, n + 2)"
        >
          <div
            v-if="slotAssignments[n + 2]"
            class="character-chip"
            draggable="true"
            @dragstart="(e) => handleDragStart(e, n + 2)"
            @dragend="handleDragEnd"
          >
            <img :src="`/characters/${slotAssignments[n+2]?.image}`" 
              alt="Character image" class="card-image" />
          </div>
        </div>
      </v-col>

      <v-col cols="2">
        <div
          v-for="n in 3"
          :key="'col1-' + n"
          class="slot-box"
          :class="{ 'has-character': slotAssignments[n - 1] }"
          @dragover="handleDragOver"
          @drop="(e) => handleSlotDrop(e, n - 1)"
        >
          <div
            v-if="slotAssignments[n - 1]"
            class="character-chip"
            draggable="true"
            @dragstart="(e) => handleDragStart(e, n - 1)"
            @dragend="handleDragEnd"
          >
            <img :src="`/characters/${slotAssignments[n-1]?.image}`" 
              alt="Character image" class="card-image" />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

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

.slot-box.has-character {
  border-style: solid;
  background-color: #fd1613;
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
