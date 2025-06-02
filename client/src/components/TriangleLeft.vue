<script setup lang="ts">
import { ref } from 'vue'
import type { Character } from '@/Types'

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
    const character = props.selectedCharacters.find(c => c.name === characterName)
    if (!character) return

    const prevIndex = slotAssignments.value.findIndex(c => c?.name === characterName)
    if (prevIndex !== -1) {
      slotAssignments.value[prevIndex] = null
    }

    slotAssignments.value[slotIndex] = character
    emit('update:selectedCharacters', slotAssignments.value.filter(c => c !== null) as Character[])
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
          v-for="n in 3"
          :key="'col1-' + n"
          class="slot-box"
          :class="{ 'has-character': slotAssignments[n - 1] }"
          @dragover="handleDragOver"
          @drop="handleSlotDrop($event, n - 1)"
        >
          <div
            v-if="slotAssignments[n - 1]"
            class="character-chip"
            draggable="true"
            @dragstart="handleDragStart($event, n - 1)"
            @dragend="handleDragEnd"
          >
            {{ slotAssignments[n - 1]?.name }}
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
          @drop="handleSlotDrop($event, n + 2)"
        >
          <div
            v-if="slotAssignments[n + 2]"
            class="character-chip"
            draggable="true"
            @dragstart="handleDragStart($event, n + 2)"
            @dragend="handleDragEnd"
          >
            {{ slotAssignments[n + 2]?.name }}
          </div>
        </div>
      </v-col>

      <v-col cols="2">
        <div
          class="slot-box"
          :class="{ 'has-character': slotAssignments[5] }"
          @dragover="handleDragOver"
          @drop="handleSlotDrop($event, 5)"
        >
          <div
            v-if="slotAssignments[5]"
            class="character-chip"
            draggable="true"
            @dragstart="handleDragStart($event, 5)"
            @dragend="handleDragEnd"
          >
            {{ slotAssignments[5]?.name }}
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
  background-color: rgba(200, 0, 0, 0.536);
}

.character-chip {
  background-color: #1976d2;
  color: white;
  padding: 8px 12px;
  border-radius: 16px;
  cursor: move;
  user-select: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 3;
}

.character-chip.dragging {
  opacity: 0.5;
}

.v-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 24px;
}
</style>
