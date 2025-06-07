import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  builder: "vite",
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxt/test-utils",
  ],
  ui: {
    colorMode: false,
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [
      tailwindcss(),
      {
        apply: "build",
        name: "vite-plugin-ignore-sourcemap-warnings",
        configResolved(config) {
          const originalOnWarn = config.build.rollupOptions.onwarn;
          config.build.rollupOptions.onwarn = (warning, warn) => {
            if (
              warning.code === "SOURCEMAP_BROKEN" &&
              warning.plugin === "@tailwindcss/vite:generate:build"
            ) {
              return;
            }

            if (originalOnWarn) {
              originalOnWarn(warning, warn);
            } else {
              warn(warning);
            }
          };
        },
      },
    ],
    build: {
      sourcemap: true,
    },
  },
  postcss: {
    plugins: {
      "postcss-nested": {},
      "postcss-custom-media": {},
    },
  },
  image: {
    presets: {
      avatar: {
        modifiers: {
          format: "jpg",
          width: 72,
          height: 72,
        },
      },
    },
  },
  nitro: {
    preset: "cloudflare-pages",
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: "github-dark-high-contrast",
          langs: ["proto", "go", "json", "yaml", "toml", "bash", "sh", "js", "ts", "html", "css", "sql", "md", "markdown"],
        },
      },
    },
  },
});
