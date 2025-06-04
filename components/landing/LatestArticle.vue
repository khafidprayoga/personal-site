<script setup lang="ts">
const { latestArticle: { limit: limitArticleCount } } = useAppConfig()

const { data: articles } = await useAsyncData('articles', () => {
  return queryCollection('content').where('path', 'LIKE', '/blog/%').order('date', 'DESC').limit(limitArticleCount).all()
})

</script>

<template>
  <section id="latest-article" class="mb-10">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold capitalize">Latest Article</h2>
    </div>
    <div id="blog" class="flex flex-col gap-5 my-3" >
      <template v-if="articles">
        <div v-for="article in articles" :key="article.id" class="flex flex-col gap-1">
          <h3 class="text-md font-bold">{{ article.title }}</h3>
          <p class="text-sm text-gray-600 font-medium">{{ article.description }}</p>
          <NuxtLink :to="article.path" class="text-xs font-mono underline">Read More...</NuxtLink>
        </div>
      </template>
    </div>
  </section>
</template>