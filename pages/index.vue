<script setup lang="ts">

const {
  pinnedAnnouncement,
  author,
  hero,
  appName,
} = useAppConfig()

useHead({
  title: `${appName} / Home`
})
</script>

<template>
  <LandingHero class="mb-10" />
  <LandingLatestArticle/>
</template>
