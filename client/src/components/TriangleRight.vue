<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  selectedCharacters: string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:selectedCharacters', value: string[]): void
}>()

// Track which character is in which slot (index corresponds to slot position)
const slotAssignments = ref<(string | null)[]>([null, null, null, null, null, null])

// Handle drop event on slots
function handleSlotDrop(event: DragEvent, slotIndex: number) {
  event.preventDefault()
  event.stopPropagation() // Prevent event from bubbling to container
  const character = event.dataTransfer?.getData('character')
  if (character) {
    // Remove character from its previous slot if it exists
    const prevIndex = slotAssignments.value.indexOf(character)
    if (prevIndex !== -1) {
      slotAssignments.value[prevIndex] = null
    }
    // Assign character to new slot
    slotAssignments.value[slotIndex] = character
    // Update parent component
    emit('update:selectedCharacters', slotAssignments.value.filter(char => char !== null) as string[])
  }
}

// Handle drop event on container (for removing characters)
function handleContainerDrop(event: DragEvent) {
  event.preventDefault()
  const character = event.dataTransfer?.getData('character')
  if (character) {
    // Find and remove the character from its slot
    const index = slotAssignments.value.indexOf(character)
    if (index !== -1) {
      slotAssignments.value[index] = null
      // Update parent component
      emit('update:selectedCharacters', slotAssignments.value.filter(char => char !== null) as string[])
    }
  }
}

// Handle drag over event
function handleDragOver(event: DragEvent) {
  event.preventDefault()
}

// Handle drag start for removing character
function handleDragStart(event: DragEvent, slotIndex: number) {
  const character = slotAssignments.value[slotIndex]
  if (character) {
    event.dataTransfer?.setData('character', character)
    // Add visual feedback
    if (event.target instanceof HTMLElement) {
      event.target.classList.add('dragging')
    }
  }
}

// Handle drag end
function handleDragEnd(event: DragEvent) {
  if (event.target instanceof HTMLElement) {
    event.target.classList.remove('dragging')
  }
}
</script>

<template>
  <div 
    class="triangle-container"
    @dragover="handleDragOver"
    @drop="handleContainerDrop"
  >
    <v-row justify="center">
      <!-- First column (1 slots) -->
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
            {{ slotAssignments[5] }}
          </div>
        </div>
      </v-col>

      <!-- Second column (2 slots) -->
      <v-col cols="2">
        <div
          v-for="n in 2"
          :key="'col2-' + n"
          class="slot-box"
          :class="{ 'has-character': slotAssignments[n+2] }"
          @dragover="handleDragOver"
          @drop="handleSlotDrop($event, n+2)"
        >
          <div
            v-if="slotAssignments[n+2]"
            class="character-chip"
            draggable="true"
            @dragstart="handleDragStart($event, n+2)"
            @dragend="handleDragEnd"
          >
            {{ slotAssignments[n+2] }}
          </div>
        </div>
      </v-col>

      <!-- Third column (3 slot) -->
      <v-col cols="2">
        <div
          v-for="n in 3"
          :key="'col1-' + n"
          class="slot-box"
          :class="{ 'has-character': slotAssignments[n-1] }"
          @dragover="handleDragOver"
          @drop="handleSlotDrop($event, n-1)"
        >
          <div
            v-if="slotAssignments[n-1]"
            class="character-chip"
            draggable="true"
            @dragstart="handleDragStart($event, n-1)"
            @dragend="handleDragEnd"
          >
            {{ slotAssignments[n-1] }}
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
  z-index: 2; /* Higher than container */
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  position: relative;
  z-index: 3; /* Highest z-index */
}

.character-chip.dragging {
  opacity: 0.5;
}

.v-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 26px;
}

</style>