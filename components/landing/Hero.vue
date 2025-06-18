<script setup lang="ts">
const {
  author,
  hero,
} = useAppConfig()


const props = withDefaults(defineProps<{
  showRole?: boolean
  showStatus?: boolean
  avatarSize?: number
  showStacks?: boolean
}>(), {
  avatarSize: 200,
  showStacks: false,
})

</script>

<template>
  <main id="hero" class="container">
    <section id="hero-content">
      <div class="text-center mb-6">
        <template v-if="hero.showPicture">
          <UiAvatar :for-hero="true" :avatar-size="props.avatarSize" :author-name="author.name" class="animate-on-load" />
        </template>
        <h1 class="py-5 text-3xl font-medium text-gray-800 animate-on-load animate-delay-100">{{ hero.title }}
          <span v-if="showRole">, a </span>
          <span v-if="showRole" class="underline underline-offset-8 font-semibold" aria-label="role">
            {{ author.role }}
          </span>
        </h1>
        <div v-if="showStatus" class="flex justify-center gap-4 animate-on-load animate-delay-200">
          <UButton :label="hero.openToWork ? 'Actively Open to Work' : 'Actively Contributing in Open Source'"
            color="primary" />
          <UButton
           trailing-icon="i-heroicons-arrow-top-right-on-square" size="md" class="bg-zinc-800 hover:bg-zinc-600 p-2 font-sans text-white"
            :to="hero.resumeUrl" label="Download CV " :target="'_blank'" />
        </div>
        <p class="text-gray-600 mt-4 text-left animate-on-load animate-delay-300">{{ hero.description }}</p>
      </div>
    </section>
    <template v-if="hero?.stacks && showStacks">
      <div id="hero-stacks" class="grid grid-cols-3 gap-1.5 mx-auto justify-center md:w-[500px] animate-on-load animate-delay-400">
        <span v-for="(tech, index) in hero?.stacks" :key="index" :name="tech.icon" class="hover:opacity-50 flex flex-row gap-1.5 items-center justify-center">
          <UIcon :name="tech.icon" class="text-xl md:text-3xl " />
          <span class="text-xs md:text-sm font-medium">{{ tech.name }}</span>
        </span>
      </div>
    </template>
  </main>
</template>

<style scoped>
h1 {
  font-family: 'Caveat', cursive;
}
</style>