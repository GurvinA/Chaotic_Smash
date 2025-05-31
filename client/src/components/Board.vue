<template>
  <TriangleRight
    :selectedCharacters="selectedCharacters"
    @update:selectedCharacters="onUpdateSelectedCharacters"
  />
  <Locations
    :selectedLocations="selectedLocations"
    @update:selectedCharacters="onUpdateSelectedLocations"
  />
</template>

<script setup lang="ts">

import TriangleLeft from './TriangleLeft.vue';
import TriangleRight from './TriangleRight.vue';
import Locations from './Locations.vue';

const props = defineProps<{
  selectedCharacters: string[],
  selectedLocations: string[]
}>()

const emit = defineEmits<{
  (e: 'update:selectedCharacters', value: string[]): void,
  (e: 'update:selectedLocations', value: string[]): void
}>()

function onUpdateSelectedCharacters(value: string[]) {
  emit('update:selectedCharacters', value)
}

function onUpdateSelectedLocations(value: string[]) {
  emit('update:selectedLocations', value)
}

</script>
