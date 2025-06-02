<script setup lang="ts">
const { data: content } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
  title: content.value?.title,
  description: content.value?.description
})
</script>

<template>
  <div class="mx-auto min-h-screen prose prose-md">
    <ContentRenderer v-if="content" :value="content" />
    <div v-else>Content not found</div>
  </div>
</template>
