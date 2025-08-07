import { defineStore } from 'pinia'
import type { Character } from '@/Types'

export const useBattleStore = defineStore('battle', {
  state: () => ({
    showModal: false,
    attacker: null as Character | null,
    defender: null as Character | null,
    resolveCallback: null as ((result: 'attacker' | 'defender') => void) | null
  }),
  actions: {
    open(attacker: Character, defender: Character): Promise<'attacker' | 'defender'> {
      this.attacker = attacker
      this.defender = defender
      this.showModal = true

      return new Promise(resolve => {
        this.resolveCallback = (result: 'attacker' | 'defender') => {
          this.showModal = false
          this.resolveCallback = null
          resolve(result)
        }
      })
    },
    resolve(result: 'attacker' | 'defender') {
      if (this.resolveCallback) {
        this.resolveCallback(result)
      }
    }
  }
})
