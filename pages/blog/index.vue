<script setup lang="ts">
const { appName } = useAppConfig()

const { data } = await useAsyncData('blog-posts', () => {
  return queryCollection('content')
    .where('path', 'LIKE', '/blog/%')
    .order('date', 'DESC')
    .all()
})

type BlogPost = {
  title: string
  date: string
  summary: string
  year: number
  path: string
}

const articles = computed(() => {
  if (!data.value) return []

  return data.value.map((item) => ({
    title: item.title,
    date: item.date,
    year: new Date(item.date).getFullYear(),
    summary: item.description,
    path: item.path,
  })) as BlogPost[]
})

useHead({
  title: `${appName} / Blog Posts`
})

</script>
<template>
  <UContainer>
    <h1 class="text-xl font-bold">
      Blog Posts
    </h1>

    <div class="flex flex-col">
      <template v-for="(item, index) in articles" :key="index">
        <h2 v-if="index === 0 || item.year !== articles[index - 1].year" class="mt-3 text-lg font-bold">
          {{ item.year }}:
        </h2>
        <ol class="flex flex-col">
          <li class="mt-3">
            <h2 class="text-md font-bold">
              {{ item.title }}
            </h2>
            <p class="text-sm">
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