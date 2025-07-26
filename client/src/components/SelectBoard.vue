<template>
    <div class="board-wrapper">
        <v-row justify="end" v-if="props.role === 'player1'">
            <v-col class="ml-5">
                <div class="locations">
                    <Locations
                        :selectedLocations="selectedLocations"
                        @update:selectedLocations="onUpdateSelectedLocations"
                    />
                </div>
            </v-col>
            <v-col cols="7">
                <div class="triangle">
                    <TriangleRight
                        :selectedCharacters="selectedCharacters"
                        @update:selectedCharacters="onUpdateSelectedCharacters"
                    />
                </div>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="7">
                <div class="triangle">
                    <TriangleLeft
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
import Locations from './SelectLocations.vue';
import type { Character, Location } from '@/Types';
import { useDeckData } from '@/composables/decks'

const { characters, locations } = useDeckData()

const props = defineProps<{
  role: 'player1' | 'player2'
  selectedCharacters: (Character | null)[],
  selectedLocations: Location[]
}>()

const emit = defineEmits<{
  (e: 'update:selectedCharacters', value: (Character | null)[]): void,
  (e: 'update:selectedLocations', value: Location[]): void
}>()

function onUpdateSelectedCharacters(value: (Character | null)[]) {
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