import { defineConfig, presetUno, presetAttributify, presetWind, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWind(),
    presetIcons({
      scale: 1,
      collections: {
        ri: () => import('@iconify-json/ri').then((i) => i.icons as any),
      },
    }),
  ],
});
