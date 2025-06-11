<script setup lang="ts">

const {
  appName,
  latestArticle,
  workExperience,
} = useAppConfig()

useHead({
  title: `${appName} / Home`
})
</script>

<template>
  <div>
  <LandingHero class="mb-10" :avatar-size="150" :show-role="true" :show-status="true"/>
  <LandingWorkExperience v-if="workExperience.show"/>
  <LandingLatestArticle v-if="latestArticle.show"/>
</div>
</template>

<style scoped>
@reference 'tailwindcss';

p {
  font-family: var(--font-body);
}
</style>