<script setup lang="ts">
const {
  pinnedAnnouncement,
  author,
  hero,
} = useAppConfig()
</script>

<template>
  <!-- pinned announcmenet -->
  <template v-if="pinnedAnnouncement.show">
    <div id="pinned-announcement" class="bg-gray-300 py-3 px-2 rounded-md">
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600">{{ pinnedAnnouncement.message }}</span>
        <UButton :to="pinnedAnnouncement.link.to" :text="pinnedAnnouncement.link.label" />
      </div>
    </div>
  </template>

  <!-- hero -->
  <LandingHero />

  <!-- last article top -->
  <!-- recommendation by friends -->
</template>
