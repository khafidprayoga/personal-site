<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <div id="pinned-announcement" class="bg-gray-300 py-3 px-2 rounded-md">
    <div class="flex justify-between items-center">
      <span class="text-sm text-gray-600">{{ config.pinnedAnnouncement.message }}</span>
      <UButton :to="config.pinnedAnnouncement.link?.to" :text="config.pinnedAnnouncement.link?.label" />
    </div>
  </div>
</template>