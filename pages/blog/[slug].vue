<script setup>
const { appName, author } = useAppConfig()

const route = useRoute()
const slug = route.params.slug

const { data: post, error, pending } = await useAsyncData(`post-${slug}`, () => {
  return queryCollection('content')
    .where('path', '=', `/blog/${slug}`)
    .where('published', '=', true)
    .first()
})

let recommendations = reactive([])

if (post) {
  const { data: posts } = await useLazyFetch('/api/blog/recommendations', {
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
  description: post.value?.subtitle || '',
  
  // Open Graph tags untuk media sosial
  ogTitle: post.value?.seo.title,
  ogDescription: post.value?.subtitle || '',
  ogImage: post.value?.bannerURL || '',
  ogUrl: post.value?.canonicalURL || '',
  ogType: 'article',
  ogSiteName: appName,
  
  // Twitter Card tags
  twitterCard: 'summary_large_image',
  twitterTitle: post.value?.seo.title,
  twitterDescription: post.value?.subtitle || '',
  twitterImage: post.value?.bannerURL || '',
  
  // Article specific tags
  articleAuthor: post.value?.author || author.name,
  articlePublishedTime: post.value?.date || '',
  articleModifiedTime: post.value?.updatedAt || post.value?.date || '',
  articleTag: post.value?.tags || [],
})

useHead({
  title: `${appName} / ${post.value?.seo.title}`,
  link: [
    {
      rel: 'canonical',
      href: post.value?.canonicalURL || ''
    }
  ]
})

</script>

<template>
  <div class="container mx-auto pb-8 overflow-x-hidden">
    <!-- Loading State -->
    <div v-if="pending" class="text-center w-full h-[300px] border-b-2 border-gray-200 rounded-sm mb-5">
      <p>Pulling content... hang tight and chill with a cup of coffee</p>
    </div>
    
    <!-- Error State -->
    <div v-if="error" class="text-center py-10">
      <p>Failed pulling content with reason {{ error.message }}</p>
    </div>
    
    <!-- Article Content -->
    <article v-if="post && !pending && !error" :key="post.id"
      class="prose prose-md md:prose-lg md:mx-5 my-2 px-2 rounded-sm border-b-2 border-gray-200 mb-5">
      
      <header>
        <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
        <time class="text-xs text-gray-600" :datetime="post.date">
          Published at: {{ new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          }) }}
        </time>
      </header>
      
      <NuxtImg 
        v-if="post.bannerURL" 
        :src="post.bannerURL" 
        class="w-full h-auto my-4 rounded-lg" 
        fetchpriority="high"  
        :alt="post.title + ' Cover Image'" 
        format="webp" 
        sizes="100vw sm:100vw md:100vw lg:1024px xl:1280px"
        :width="1280" 
        :height="720"
        placeholder-class="bg-gray-200 animate-pulse"
      />
      
      <ContentRenderer :value="post" />
    </article>

    <!-- Post Not Found -->
    <div v-if="!post && !pending && !error" class="text-center py-10 border-b-2 border-gray-200 rounded-sm">
      <h1 class="text-2xl font-bold">Post Not Found</h1>
    </div>
    
    <!-- Post Navigation -->
    <nav 
    v-if="recommendations && recommendations.length > 0" 
         id="post-navigation" 
         class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      
      <!-- Previous Post -->
      <LazyNuxtLink 
        v-if="recommendations[0]" 
        :to="recommendations[0].path"
        class="group p-6 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
        aria-label="Go to Previous Post">
        
        <div class="flex items-center gap-3">
          <UIcon name="i-material-symbols-arrow-back-ios-new" class="text-xl flex-shrink-0" />
          <div class="text-left">
            <span class="block font-semibold text-sm text-gray-600 mb-1">Previous Post</span>
            <p class="font-medium group-hover:underline underline-offset-2">
              {{ recommendations[0].title }}
            </p>
          </div>
        </div>
      </LazyNuxtLink>
      
      <!-- Spacer for alignment when no previous post -->
      <div v-else></div>

      <!-- Next Post -->
      <LazyNuxtLink 
        v-if="recommendations[1]" 
        :to="recommendations[1].path"
        class="group p-6 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors md:col-start-2"
        aria-label="Go to Next Post">
        
        <div class="flex items-center gap-3 justify-end">
          <div class="text-right">
            <span class="block font-semibold text-sm text-gray-600 mb-1">Next Post</span>
            <p class="font-medium group-hover:underline underline-offset-2">
              {{ recommendations[1].title }}
            </p>
          </div>
          <UIcon name="i-material-symbols-arrow-forward-ios" class="text-xl flex-shrink-0" />
        </div>
      </LazyNuxtLink>
    </nav>

    <!-- About Author -->
    <aside id="about-me" class="mt-8 mx-5">
      <LazyLandingHero 
        class="max-w-xl mx-auto" 
        :show-role="false" 
        :show-status="false" 
        :avatar-size="72"
      />
    </aside>
  </div>
</template>
