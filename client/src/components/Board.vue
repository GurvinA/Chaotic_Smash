<template>
    <div class="board-wrapper">
        <v-row>
            <v-col cols="7">
                <div class="triangle">
                    <TriangleRight
                        :characters="characters"
                        :selectedCharacters="selectedCharacters"
                        @update:selectedCharacters="onUpdateSelectedCharacters"
                    />
                </div>
            </v-col>
            <v-col cols="5">
                <div class="locations">
                    <Locations
                        :selectedLocations="selectedLocations"
                        @update:selectedLocations="onUpdateSelectedLocations"
                    />
                </div>
            </v-col>
        </v-row>
    </div>
  
</template>

<script setup lang="ts">

import TriangleLeft from './TriangleLeft.vue';
import TriangleRight from './TriangleRight.vue';
import Locations from './Locations.vue';
import type { Character, Location } from '@/Types';

const props = defineProps<{
  selectedCharacters: Character[],
  selectedLocations: Location[]
  characters: Character[]
  locations: Location[]
}>()

const emit = defineEmits<{
  (e: 'update:selectedCharacters', value: Character[]): void,
  (e: 'update:selectedLocations', value: Location[]): void
}>()

function onUpdateSelectedCharacters(value: Character[]) {
  emit('update:selectedCharacters', value)
}

function onUpdateSelectedLocations(value: Location[]) {
  emit('update:selectedLocations', value)
}

</script>

<style scoped>

    .board-wrapper {
        background-color: #3ca49c;
        border: 3.5px solid yellow;
        border-radius: 40px;
        height: 600px;
        width: 700px;
        color: black;
        display: flexbox;
    }

    .triangle {
        margin-top: 30px;
    }

</style>