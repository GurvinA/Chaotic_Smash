<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function startLocal() {
  router.push('/setup/player1')
}

function goToLobby() {
  router.push('/lobby')
}
</script>

<template>
  <v-container class="fill-height" justify="center" align="center">
    <v-row>
      <v-col cols="12" class="text-center">
        <h1>Chaotic Smash</h1>
        <v-btn @click="startLocal" class="ma-2" color="primary">Play Local</v-btn>
        <v-btn @click="goToLobby" class="ma-2" color="secondary">Play Online</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>