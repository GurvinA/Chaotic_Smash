import { defineStore } from 'pinia'
import type { Character, Location } from '@/Types'

export const useGameStore = defineStore('game', {
  state: () => ({
    player1: {
      characters: Array(6).fill(null) as (Character | null)[],
      locations: [] as Location[]
    },
    player2: {
      characters: Array(6).fill(null) as (Character | null)[],
      locations: [] as Location[]
    },
    turn: 1 as 1 | 2
  }),
  actions: {
    setPlayerData(player: 1 | 2, characters: (Character | null)[], locations: Location[]) {
      this[`player${player}`].characters = characters
      this[`player${player}`].locations = locations
    },
    toggleTurn() {
      this.turn = this.turn === 1 ? 2 : 1
    }
  }
})
