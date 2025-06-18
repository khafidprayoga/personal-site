import tailwindcss from "@tailwindcss/vite";
import { definePerson } from "nuxt-schema-org/schema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-06-04",
  devtools: { enabled: true },
  builder: "vite",
  runtimeConfig: {
    public: {
      commitHash: process.env.COMMIT_HASH || "dev",
    }
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxt/test-utils",
    "@nuxtjs/sitemap",
    "@nuxt/content",
    "nuxt-schema-org",
  ],
  site: {
    url: "https://khfd.xyz",
    name: "Khafid Prayoga",
    description:
      "A passionate Back-end Developer with 3+ years of experience building reliable, high-performance systems using Go, PostgreSQL, and cloud-native tools. From database design to API development, I help turn ideas into robust digital solutions. Let's build something powerful—together.",
  },
  sitemap: {
    xsl: false,
    sources: ["/api/blog/sitemap"],
    includeAppSources: true,
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in",
    },
  },
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
  schemaOrg: {
    identity: definePerson({
      name: "Khafid Prayoga",
      image:
        "https://ik.imagekit.io/zq4s7yjq3/profile/profile.jpg?tr=w-72,h-72,fo-center,f-webp,c-maintain-ratio",
      description:
        "A passionate Back-end Developer with 3+ years of experience building reliable, high-performance systems using Go, PostgreSQL, and cloud-native tools. From database design to API development, I help turn ideas into robust digital solutions.",
      url: "khfd.xyz",
      sameAs: [
        "https://github.com/khafidprayoga",
        "https://www.linkedin.com/in/khafidprayoga",
      ],
    }),
  },
});
