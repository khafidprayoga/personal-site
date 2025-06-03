<script setup lang="ts">
const {
  author,
  hero,
  social,
} = useAppConfig()

</script>

<template>
  <main class="container" id="hero">
    <section id="hero-content">
      <div class="text-center mb-6">
        <NuxtImg :src="'https://github.com/' + social.github + '.png'" :alt="author.name + ' Avatar'"
          class="mx-auto rounded-full" width="200" height="200" preload />
        <h1 class="py-5 text-3xl font-medium text-gray-800">{{ hero.title }} as
          <span class="underline underline-offset-8 font-semibold" aria-label="role">
            {{ author.role }}
          </span>
        </h1>
        <div class="flex justify-center gap-4">
          <UButton :label="hero.openToWork ? 'Actively Open to Work' : 'Currently Not Open to Work'" color="primary">
          </UButton>
          <UButton class="bg-green-600 p-2 font-sans" label="Schedule a Meeting" color="primary" :to="'https://linkedin.com/in/'+ social.linkedin" target="_blank"></UButton>
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