<script setup lang="ts">

const {
  appName,
  latestArticle,
  workExperience,
  hero,
} = useAppConfig()

useSeoMeta({
  title: "Khafid Prayoga / Home",
  description: hero.description || 'Backend Developer with 3+ years of experience',
  
  // Open Graph tags untuk media sosial
  ogTitle: "Khafid Prayoga / Home",
  ogDescription: hero.description || 'Backend Developer with 3+ years of experience',
  ogImage: "https://ik.imagekit.io/zq4s7yjq3/profile/profile.jpg?tr=w-72,h-72,q-60,fo-center,f-webp,c-maintain-ratio",
  ogUrl: 'https://khfd.xyz',
  ogType: 'website',
  ogSiteName: appName,
  
  // Twitter Card tags
  twitterCard: 'summary_large_image',
  twitterTitle: "Khafid Prayoga / Home",
  twitterDescription: hero.description || 'Backend Developer with 3+ years of experience',
  twitterImage: "https://ik.imagekit.io/zq4s7yjq3/profile/profile.jpg?tr=w-72,h-72,q-60,fo-center,f-webp,c-maintain-ratio",

})

useHead({
  title: `${appName} / Home`
})
</script>

<template>
  <div>
    <LandingHero class="mb-10 animate-on-load" :avatar-size="150" :show-role="true" :show-status="true"/>
    <LandingWorkExperience v-if="workExperience.show" class="animate-on-load animate-delay-200"/>
    <LandingLatestArticle v-if="latestArticle.show" class="animate-on-load animate-delay-300"/>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

p {
  font-family: var(--font-body);
}
</style>