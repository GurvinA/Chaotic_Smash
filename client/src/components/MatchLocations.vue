<template>
  <v-col cols="11">
    <h3>Your Location Deck</h3>
    <div 
      class="location-pile"
      @dragover="handleDragOver"
      @drop="handleContainerDrop"
    >
      <div
        v-for="(stage, i) in selectedLocations"
        :key="stage.name"
        class="location-card"
      >
        <img 
          :src="`/locations/${stage.image}`" 
          alt="Location image" 
          class="location-image" 
        />
        <div class="location-name">{{ stage.name }}</div>
      </div>
    </div>
    <v-btn>Show/Hide</v-btn>
  </v-col>
</template>


<script setup lang="ts">


import type { Location } from '@/Types';
import { defineEmits } from 'vue'
import { useDeckData } from '@/composables/decks'
import { ref } from 'vue'

const isVeiled = ref(true)

const { locations } = useDeckData()

const props = defineProps<{
  selectedLocations: Location[]
}>()

const emit = defineEmits<{
  (e: 'update:selectedLocations', value: Location[]): void
}>()

function handleContainerDrop(event: DragEvent) {
  event.preventDefault()

  const locationName = event.dataTransfer?.getData('location')
  if (!locationName) return

  if (props.selectedLocations.length >= 6) return

  const location = locations.find(l => l.name === locationName)
  if (!location) return

  const alreadySelected = props.selectedLocations.some(l => l.name === location.name)
  if (alreadySelected) return

  emit('update:selectedLocations', [...props.selectedLocations, location])
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
}
</script>

<style scoped>
.location-pile {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 450px;
  width: 230px;
  overflow-y: auto;
  border: 2px solid yellow;
  border-radius: 20px;
  padding: 10px;
}

.location-card {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background-color: #424242;
  color: white;
  border: 2px solid white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.location-image {
  height: 54px;
  width: 96px;
  object-fit: cover;
  border-radius: 4px;
}

.location-name {
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
