<script setup lang="ts">

const {
  appName,
} = useAppConfig()

useHead({
  title: `${appName} / Home`
})
</script>

<template>
  <LandingHero class="mb-10" :avatar-size="128" :show-role="true" :show-status="true"/>
  <LandingLatestArticle/>
</template>

<style scoped>
@reference 'tailwindcss';

p {
  font-family: var(--font-body);
}
</style>