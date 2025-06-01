<template>
    <div class="board-wrapper">
        <v-row>
            <v-col cols="7">
                <div class="triangle">
                    <TriangleRight
                        :selectedCharacters="selectedCharacters"
                        @update:selectedCharacters="onUpdateSelectedCharacters"
                    />
                </div>"
            </v-col>
            <v-col cols="5">
                <div class="locations">
                    <Locations
                        :selectedLocations="selectedLocations"
                        @update:selectedCharacters="onUpdateSelectedLocations"
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
        /* margin-left: -250px; */
    }

</style>