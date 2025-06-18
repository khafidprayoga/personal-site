<script setup lang="ts">
const { public: { commitHash } } = useRuntimeConfig()

useHead({
  htmlAttrs: {
    lang: "en",
  }
})


onMounted(() => {
  console.log(`Build hash: ${commitHash}`)
})

</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>