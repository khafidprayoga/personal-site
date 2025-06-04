<script setup lang="ts">
const {
  author,
  hero,
  social,
} = useAppConfig()

const imgUrl = computed(() => {
  return `https://github.com/${social.github}.png`
})

const props = withDefaults(defineProps<{
  showRole?: boolean
  showStatus?: boolean
  avatarSize?: number
}>(), {
  avatarSize: 200,
})

</script>

<template>
  <main id="hero" class="container">
    <section id="hero-content">
      <div class="text-center mb-6">
        <NuxtImg v-if="hero.showPicture" :src="imgUrl" :alt="author.name + ' Avatar'" class="mx-auto rounded-full"
          :width="props.avatarSize" :height="props.avatarSize" preload />
        <h1 class="py-5 text-3xl font-medium text-gray-800">{{ hero.title }}
          <span v-if="showRole">, a </span>
          <span v-if="showRole" class="underline underline-offset-8 font-semibold" aria-label="role">
            {{ author.role }}
          </span>
        </h1>
        <div v-if="showStatus" class="flex justify-center gap-4">
          <UButton :label="hero.openToWork ? 'Actively Open to Work' : 'Actively Contributing in Open Source'"
            color="primary" />
          <UButton class="bg-green-500 p-2 font-sans" :to="hero.resumeUrl" label="Download CV" :target="'_blank'" />
        </div>
        <p class="text-gray-600 mt-4 text-left">{{ hero.description }}</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
h1 {
  font-family: 'Caveat', cursive;
}
</style>