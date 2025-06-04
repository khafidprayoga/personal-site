<script setup>
const { appName } = useAppConfig()

const route = useRoute()
const slug = route.params.slug

const { data: post } = await useAsyncData(`post-${slug}`, () => {
  return queryCollection('content').where('path', '=', `/blog/${slug}`).first()
})

useSeoMeta({
  title: post.value?.seo.title,
  description: post.value?.seo.description,
})

useHead({
  title: `${appName} / ${post.value?.seo.title || 'Post Not Found'}`,
})

</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <section v-if="post" class="my-1 text-xs">
      <p>Published at: {{  new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
    </section>
    <article v-if="post" class="prose prose-lg">
      <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
      <ContentRenderer :value="post" />
    </article>
    <div v-else class="text-center">
      <p>Post Not Found</p>
    </div>
  </div>
</template>
