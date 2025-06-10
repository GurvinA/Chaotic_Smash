<template>
  <v-col cols="12">
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
        :style="{ left: `${i * 30}px` }"
      >
        {{ stage.name }}
      </div>
    </div>
  </v-col>
</template>

<script setup lang="ts">


import type { Location } from '@/Types';
import { defineEmits } from 'vue'
import { locations } from 'vuetify/lib/components/VNavigationDrawer/VNavigationDrawer.mjs';

const props = defineProps<{
  locations: Location[]
  selectedLocations: Location[]
}>()

const emit = defineEmits<{
  (e: 'update:selectedLocations', value: Location[]): void
}>()

function handleContainerDrop(event: DragEvent) {
  event.preventDefault()

  const locationName = event.dataTransfer?.getData('location')

  console.log(props.selectedLocations)

  if (!locationName) return

  const location = props.locations.find(l => l.name === locationName)
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
  position: relative;
  height: 120px;
}

.location-card {
  position: absolute;
  top: 0;
  width: 120px;
  height: 100px;
  background-color: #424242;
  color: white;
  border: 2px solid white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
