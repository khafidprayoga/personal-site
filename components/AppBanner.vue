<script setup lang="ts">
const {
  pinnedAnnouncement,
} = useAppConfig()
</script>

<template>
  <div id="pinned-announcement" class="bg-gray-300 py-3 px-2 rounded-md">
    <div class="flex justify-between items-center">
      <span class="text-sm text-gray-600">{{ pinnedAnnouncement.message }}</span>
      <UButton 
      v-if="pinnedAnnouncement.link?.label !== ''" :to="pinnedAnnouncement.link?.to"
        :label="pinnedAnnouncement.link?.label" :target="'_blank'" />
    </div>
  </div>
</template>