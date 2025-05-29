import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    player1: {
      characters: [] as string[],
      locations: [] as string[]
    },
    player2: {
      characters: [] as string[],
      locations: [] as string[]
    }
  }),
  actions: {
    setPlayerData(player: 1 | 2, characters: string[], locations: string[]) {
      this[`player${player}`].characters = characters
      this[`player${player}`].locations = locations
    }
  }
})
