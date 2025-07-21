import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import router from '../src/router'
import App from '../src/App.vue'

describe('full setup flow into game page', () => {
  it('lets both players select characters and locations and reach the game page', async () => {
    router.push('/setup/player1')
    await router.isReady()

    render(App, {
      global: {
        plugins: [router],
      },
    })

    // 1. Select 6 characters
    // [simulate drag from selector deck to triangle slot boxes]

    // 2. Switch to locations tab
    // [simulate tab switch and drag in locations]

    // 3. Lock in → should go to /setup/player2
    const lockInButton = await screen.findByRole('button', { name: /lock in/i })
    await fireEvent.click(lockInButton)
    expect(router.currentRoute.value.fullPath).toBe('/setup/player2')

    // 4. Repeat for Player 2
    // [simulate same character/location dragging again]
    const lockInButton2 = await screen.findByRole('button', { name: /lock in/i })
    await fireEvent.click(lockInButton2)

    // 5. Should land on /game
    expect(router.currentRoute.value.fullPath).toBe('/game')

    // 6. Confirm both players have 6 characters and 6 locations each
    // [assert store state or UI elements reflect full selections]
  })
})
