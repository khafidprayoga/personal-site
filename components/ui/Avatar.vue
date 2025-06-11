<script setup lang="ts">
const props = defineProps<{
  authorName: string
  avatarSize?: number
  forHero?: boolean
}>()

const avatarUrl = computed(() => {
  // for hero at home page
  if (props.forHero) {
    return "https://ik.imagekit.io/zq4s7yjq3/profile/profile.jpg?tr=w-300,h-300,fo-center,f-webp,c-maintain-ratio"
  }

  // for navigation menu like at detail post
  return "https://ik.imagekit.io/zq4s7yjq3/profile/profile.jpg?tr=w-72,h-72,q-60,fo-center,f-webp,c-maintain-ratio"
})

const loadingBehavior = computed(() => {
  return props.forHero ? 'eager' : 'lazy'
})
</script>




<template>
    <div class="mx-auto w-fit rounded-full p-1 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 shadow-lg hover:shadow-xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105 animate-spin-slow">
    <NuxtImg
      :src="avatarUrl" :alt="authorName + ' Avatar'" class="rounded-full border-3 border-white"
      :width="props.avatarSize" :height="props.avatarSize" preload :loading="loadingBehavior"/>
  </div>
</template>