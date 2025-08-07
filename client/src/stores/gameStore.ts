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
    turn: 1 as 1 | 2,
    gameOver: false,
    winner: null as 1 | 2 | null,
  }),
  actions: {
    setPlayerData(player: 1 | 2, characters: (Character | null)[], locations: Location[]) {
      this[`player${player}`].characters = characters
      this[`player${player}`].locations = locations
    },
    toggleTurn() {
      this.turn = this.turn === 1 ? 2 : 1
    },
    checkGameOver() {
      let countP1 = 0
      let countP2 = 0

      const allCharacters = [
        ...this.player1.characters,
        ...this.player2.characters
      ]

      for (const c of allCharacters) {
        if (c?.player === 1) countP1++
        else if (c?.player === 2) countP2++
      }

      if (countP1 === 0 || countP2 === 0) {
        this.gameOver = true
        this.winner = countP1 === 0 ? 2 : 1
      }
    },
    reset() {
      this.player1.characters = Array(6).fill(null)
      this.player2.characters = Array(6).fill(null)
      this.player1.locations = []
      this.player2.locations = []
      this.turn = 1
      this.gameOver = false
      this.winner = null
    }
  }
})
