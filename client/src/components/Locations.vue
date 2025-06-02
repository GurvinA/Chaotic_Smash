<template>
  <v-col cols="12">
    <h3>Your Location Deck</h3>
    <div class="location-pile">
      <div
        v-for="(stage, i) in selectedLocations"
        :key="stage.name"
        class="location-card"
        :style="{ left: `${i * 30}px` }"
      >
        {{ stage }}
      </div>
    </div>
  </v-col>
</template>

<script setup lang="ts">


import type { Location } from '@/Types';


defineProps<{
  selectedLocations: Location[]
}>()
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
