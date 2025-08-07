import { defineStore } from 'pinia'
import type { Character, Location } from '@/Types'

export const useBattleStore = defineStore('battle', {
  state: () => ({
    showModal: false,
    attacker: null as Character | null,
    defender: null as Character | null,
    battleLocation: null as Location | null,
    resolveCallback: null as ((result: 'attacker' | 'defender') => void) | null
  }),
  actions: {
    open(attacker: Character, defender: Character, battleLocation: Location): Promise<'attacker' | 'defender'> {
      this.attacker = attacker
      this.defender = defender
      this.battleLocation = battleLocation
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
