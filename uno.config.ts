import {
  defineConfig,
  presetAttributify,
  presetTypography,
} from "unocss";

import presetWebFonts from '@unocss/preset-web-fonts'
import presetWind3 from '@unocss/preset-wind3'

export default defineConfig({
  presets: [
    presetAttributify(), 
    presetWind3(), 
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter',
        serif: 'Merriweather',
      },
    }),
  ],
  shortcuts:[
  ]
});
