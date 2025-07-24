<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function startLocal() {
  router.push('/setup/player1')
}

</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1>Chaotic Smash</h1>
        <v-btn @click="startLocal" class="ma-2" color="primary">Play Local</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>