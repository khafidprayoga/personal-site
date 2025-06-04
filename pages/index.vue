<script setup lang="ts">

const {
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

<style scoped>
@reference 'tailwindcss';

p {
  font-family: var(--font-body);
}
</style>