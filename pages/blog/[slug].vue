<script setup>
const { appName } = useAppConfig()

const route = useRoute()
const slug = route.params.slug

const { data: post, error, pending } = await useAsyncData(`post-${slug}`, () => {
  return queryCollection('content')
    .where('path', '=', `/blog/${slug}`)
    .first()
})

let recommendations = reactive([])

if (post) {
  const { data: posts } = await useFetch('/api/blog/recommendations', {
    method: 'POST',
    body: {
      currentPostPath: post.value.path,
    },
    server: false,
  })
  recommendations = posts
}


useSeoMeta({
  title: post.value?.seo.title,
  description: post.value?.seo.description,
})

useHead({
  title: `${appName} / ${post.value?.seo.title || 'Post Not Found'}`,
})

</script>

<template>
  <div class="container mx-auto pb-8 overflow-x-hidden">
    <div v-if="pending" class="text-center w-full h-[300px] border-b-2 border-gray-200 rounded-sm mb-5">
      <p>Pulling content... hang tight and chill with a cup of coffee</p>
    </div>
    <div v-if="error">
      <p>Failed pulling content with reason {{ error.message }}</p>
    </div>
    <article v-if="post && !pending && !error" :key="post.id"
      class="prose prose-md  md:prose-lg md:mx-5 my-2 px-2 rounded-sm border-b-2 border-gray-200 mb-5">
      <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
      <section class="my-1 text-xs">
        <p>Published at: {{ new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day:
            'numeric'
        }) }}</p>
      </section>
      <ContentRenderer :value="post" />
    </article>

    <div v-if="!post && !pending && !error"
      class="text-center w-full h-[300px] pt-10 border-b-2 border-gray-200 rounded-sm ">
      <h1 class="mx-5 my-2 py-2 text-2xl font-bold">Post Not Found</h1>
    </div>
    <template v-if="recommendations && recommendations.length > 0">
      <aside id="relate-posts" class="flex flex-col md:flex-row justify-around">
        <UTooltip v-if="recommendations[0]" :text="`Go to Previous Post`" :delay="0">
          <UButton class="previous-post py-10 border-b-2 border-gray-200 flex flex-row hover:cursor-pointer md:w-1/2"
            :to="recommendations[0].path" aria-label="Go to Previous Post">
            <UIcon name="i-material-symbols-arrow-back-ios-new" class="text-2xl self-center mx-1.5" />
            <UContainer class="text-left ">
              <span class="font-semibold text-lg ">
                Previous Post</span>
              <p class="underline underline-offset-4">
                {{ recommendations[0].title }}
              </p>
            </UContainer>
          </UButton>
        </UTooltip>
        <div v-else class="w-full md:w-1/2 h-full">
        </div>

        <UTooltip v-if="recommendations[1]" :text="`Go to Next Post`" :delay="0">
          <UButton class="previous-post py-10 border-b-2 border-gray-200 flex flex-row hover:cursor-pointer md:w-1/2"
            :to="recommendations[1].path" aria-label="Go to Next Post">
            <UContainer class="text-right ">
              <span class="font-semibold text-lg ">
                Next Post</span>
              <p class="underline underline-offset-4">
                {{ recommendations[1].title }}
              </p>
            </UContainer>
            <UIcon name="i-material-symbols-arrow-forward-ios" class="text-2xl self-center mx-1.5" />
          </UButton>
        </UTooltip>
        <div v-else class="w-full md:w-1/2 h-full ">
        </div>
      </aside>
    </template>

    <aside id="about-me" class="flex flex-row gap-4  mx-5 my-5">
      <LandingHero c lass="max-w-xl mx-auto" :show-role="false" :show-status="false" :avatar-size="72"
        :show-stacks="false" />
    </aside>
  </div>
</template>
