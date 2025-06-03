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
      <!-- <NuxtLink to="/blog" class="text-xs font-mono underline">View All</NuxtLink> -->
    </div>
    <div class="flex flex-col gap-5 my-3" id="blog">
      <template v-if="articles">
        <div v-for="article in articles" :key="article._id" class="flex flex-col gap-1">
          <h3 class="font-bold">{{ article.title }}</h3>
          <p class="font-extralight">{{ article.description }}</p>
          <NuxtLink :to="article.path" class="text-xs font-mono underline">Read More</NuxtLink>
        </div>
      </template>
    </div>
  </section>
</template>