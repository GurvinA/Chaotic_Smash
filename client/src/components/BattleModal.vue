<template>
  <v-dialog v-model="battleStore.showModal" max-width="500px" persistent>
    <v-card>
      <v-card-title class="headline">Battle!</v-card-title>
      <v-card-text>
        <div class="character-battle">
          <div class="combatant">
            <img :src="`/characters/${battleStore.attacker?.image}`" class="card-image" />
            <p>{{ battleStore.attacker?.name }}</p>
          </div>
          <p style="margin: 0 12px">vs</p>
          <div class="combatant">
            <img :src="`/characters/${battleStore.defender?.image}`" class="card-image" />
            <p>{{ battleStore.defender?.name }}</p>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="battleStore.resolve('attacker')">Attacker Wins</v-btn>
        <v-btn color="error" @click="battleStore.resolve('defender')">Defender Wins</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useBattleStore } from '@/stores/battleStore'
const battleStore = useBattleStore()
</script>

<style scoped>
.character-battle {
  display: flex;
  justify-content: center;
  align-items: center;
}
.combatant {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-image {
  width: 80px;
  height: 80px;
}
</style>
