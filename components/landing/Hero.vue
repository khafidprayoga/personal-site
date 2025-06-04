<script setup lang="ts">
const {
  author,
  hero,
  social,
} = useAppConfig()

const imgUrl = computed(() => {
  return `https://github.com/${social.github}.png`
})

</script>

<template>
  <main id="hero" class="container" >
    <section id="hero-content">
      <div class="text-center mb-6">
        <NuxtImg 
        v-if="hero.showPicture" :src="imgUrl" :alt="author.name + ' Avatar'"
          class="mx-auto rounded-full" width="200" height="200" preload 
          />
        <h1 class="py-5 text-3xl font-medium text-gray-800">{{ hero.title }} as
          <span class="underline underline-offset-8 font-semibold" aria-label="role">
            {{ author.role }}
          </span>
        </h1>
        <div class="flex justify-center gap-4">
          <UButton :label="hero.openToWork ? 'Actively Open to Work' : 'Actively Contributing in Open Source'" color="primary"/>
          <UButton class="bg-green-500 p-2 font-sans" label="Download CV"/>
        </div>
        <p class="text-gray-600 mt-4 text-left">{{ hero.description }}</p>
      </div>
      <section>
      </section>
    </section>
  </main>
</template>

<style scoped>
h1 {
  font-family: 'Caveat', cursive;
}
</style>