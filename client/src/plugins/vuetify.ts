import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'chaoticSmash',
    themes: {
      chaoticSmash: {
        dark: false,
        colors: {
          chaotic: '#bb0000',
          buttons: '#612196',
          player1: '#fd1613',
          player2: '#1057ff',
        }
      }
    }
  }
})