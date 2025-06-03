<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"


const links: NavigationMenuItem[] = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Blog",
    to: "/blog",
  },
  {
    label: "Resume",
    to: "/resume",
  },
  {
    label: "Showcase",
    to: "/showcase",
  },
  {
    label: "Story",
    to: "/story",
  },
]

</script>

<template>
  <div>
    <UNavigationMenu 
    color="primary"
    orientation="horizontal"
    :items="links" 
    variant="link"
    class="w-full nav-menu"
    :ui="{
      link: 'py-1',
      linkLabel: 'text-sm',
      item: 'pr-3',
    }"
    >
    <!-- todo add: color schema mode button moon-sun -->
    <!-- <template #list-trailing> -->
    <!-- </template> -->
    </UNavigationMenu>
    
  </div>
</template>

<style>
a[aria-current="page"] {
  @apply underline decoration-1 underline-offset-6;
}
</style>
