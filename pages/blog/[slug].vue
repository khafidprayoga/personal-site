<script setup>
const { appName } = useAppConfig()

const route = useRoute()
const slug = route.params.slug

const { data: post, error, pending } = await useAsyncData(`post-${slug}`, () => {
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
  <div class="container mx-auto px-4 py-8 ">
    <div v-if="pending">
      <p>Pulling content... hang tight and chill with a cup of coffee</p>
    </div>
    <div v-if="error">
      <p>Failed pulling content with reason {{ error.message }}</p>
    </div>
    <article v-if="post && !pending && !error" :key="post.id" class="prose prose-lg mx-5 my-2 px-2 bg-gray-50 rounded-sm border-b-2 border-gray-200 mb-5">
      <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
      <section class="my-1 text-xs">
        <p>Published at: {{ new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day:
            'numeric'
        }) }}</p>
      </section>
      <ContentRenderer :value="post" />
    </article>

    <div v-if="!post && !pending && !error" class="text-center bg-gray-50">
      <p class="mx-5 my-2 py-2">Post Not Found</p>
    </div>
    <section id="about-me" class="flex flex-row gap-4  mx-5 my-2">
      <LandingHero class="max-w-xl mx-auto" :show-role="false" :show-status="false" :avatar-size="72" />
    </section>
  </div>
</template>
