import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-06-04",
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
  fonts: {
    provider: "google",
  },
  ui: {
    colorMode: false,
  },
  css: ["~/assets/css/main.css"],
  vite: {
    css: {
      devSourcemap: true,
    },
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
    imagekit: {
      baseURL: "https://ik.imagekit.io/zq4s7yjq3",
    },
  },
  icon: {
    provider: "server",
  },
  nitro: {
    preset: "cloudflare-pages",
    compressPublicAssets: true,
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: "github-dark-high-contrast",
          langs: [
            "python",
            "proto",
            "go",
            "json",
            "java",
            "javascript",
            "yaml",
            "toml",
            "bash",
            "sh",
            "js",
            "ts",
            "html",
            "css",
            "sql",
            "ps1",
          ],
        },
      },
    },
  },
});
