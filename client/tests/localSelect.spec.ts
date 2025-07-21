import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { routes } from '../src/router/routes.ts'
import App from '../src/App.vue'

// ✅ Add Vuetify imports
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// ✅ Vuetify styles are still needed in vite.config.ts or main.ts — not needed here unless you're SSR testing

describe('landing page -> local setup navigation', () => {
  it('navigates to /setup/player1 when clicking Play Local', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    await router.push('/')
    await router.isReady()

    const vuetify = createVuetify({ components, directives })

    render(App, {
      global: {
        plugins: [router, vuetify],
      },
    })

    // Find the Vuetify button and click it
    const button = await screen.findByText(/play local/i)
    await fireEvent.click(button)
    await router.isReady() // optional but useful
    await new Promise(resolve => setTimeout(resolve)) // ensures reactive updates flush

    // Check that we're now on the correct route
    expect(router.currentRoute.value.fullPath).toBe('/setup/player1')
  })
})
