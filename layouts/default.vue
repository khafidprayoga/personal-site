<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <UContainer class="md:w-3xl mx-auto flex flex-col py-5 px-5">
    <AppHeader />
    <AppBanner v-if="config.pinnedAnnouncement?.show" class="mb-5"/>
    <div class="min-h-fit my-3">
      <slot />
    </div>
    <AppFooter />
  </UContainer>
</template>