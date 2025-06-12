import { defineStore } from 'pinia'
import type { Character, Location } from '@/Types'

export const useGameStore = defineStore('game', {
  state: () => ({
    player1: {
      characters: [] as Character[],
      locations: [] as Location[]
    },
    player2: {
      characters: [] as Character[],
      locations: [] as Location[]
    }
  }),
  actions: {
    setPlayerData(player: 1 | 2, characters: Character[], locations: Location[]) {
      this[`player${player}`].characters = characters
      this[`player${player}`].locations = locations
    }
  }
})
