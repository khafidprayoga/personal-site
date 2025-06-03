<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <UContainer class="md:w-3xl mx-auto flex flex-col py-5 px-5">
    <AppHeader />
    <div class="min-h-screen my-5">
      <AppBanner v-if="config.pinnedAnnouncement?.show" class="mb-5"/>
      <slot />
    </div>
    <AppFooter />
  </UContainer>
</template>