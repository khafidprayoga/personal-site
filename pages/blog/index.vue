<script setup lang="ts">
const { appName } = useAppConfig()

const { data } = await useAsyncData('blog-posts', () => {
  return queryCollection('content')
    .where('published', '=', true)
    .order('date', 'DESC')
    .all()
})

type BlogPost = {
  id: string
  title: string
  date: string
  summary: string
  year: number
  path: string
}

const articles = computed(() => {
  if (!data.value) return []

  return data.value.map((item) => ({
    id: item.id,
    title: item.title,
    date: item.date,
    year: new Date(item.date).getFullYear(),
    summary: item.description,
    path: item.path,
  })) as BlogPost[]
})

useHead({
  title: `${appName} / Blog Posts`,
  meta: [
    {
      name: 'description',
      content: 'Latest and most popular blog articles collection'
    },
    {
      name: 'keywords',
      content: 'blog, articles, news, tutorials'
    },
    {
      property: 'og:title',
      content: `${appName} / Blog Posts`
    },
    {
      property: 'og:description',
      content: 'Latest and most popular blog articles collection'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:title',
      content: `${appName} / Blog Posts`
    },
    {
      name: 'twitter:description',
      content: 'Latest and most popular blog articles collection'
    }
  ]
})

</script>
<template>
  <UContainer>
    <h1 class="text-xl font-bold animate-on-load">
      Blog Posts
    </h1>

    <div class="flex flex-col">
      <template v-for="(item, index) in articles" :key="index">
        <h2 v-if="index === 0 || item.year !== articles[index - 1].year" class="mt-3 text-lg font-bold animate-on-load animate-delay-100">
          {{ item.year }}:
        </h2>
        <ol class="flex flex-col">
          <li class="mt-3 animate-on-load" :class="`animate-delay-${Math.min((index + 2) * 100, 800)}`" :key="item.id">
            <h2 class="text-md font-bold">
              {{ item.title }}
            </h2>
            <p class="text-sm font-medium">
              {{ item.summary }}
            </p>
            <NuxtLink :to="`${item.path}`" aria-label="Read more" class="text-sm underline font-mono">
              Read more...
            </NuxtLink>
          </li>
        </ol>
      </template>
    </div>
  </UContainer>
</template>

<style scoped>
@reference 'tailwindcss';

ol {
  list-style-type: none;
  position: relative;
  padding-left: 0;
}

ol li {
  position: relative;
  padding-left: 2rem;
}

ol li::before {
  @apply content-['👉'] absolute left-0;
}
</style>