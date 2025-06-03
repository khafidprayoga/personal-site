<script setup lang="ts">
const { appName } = useAppConfig()

useHead({
  title: `${appName} / Blog Posts`
})
</script>
<template>
  <h1 class="text-xl font-bold">
    Blog Posts
  </h1>

  <div class="flex flex-col gap-1">
    <h2 class="mt-3">2025:</h2>
    <UContainer class=" mx-auto flex flex-col my-5">
      <ol class="flex flex-col gap-1">
        <li>
          <h2 class="text-lg ">
            Building Modern Microservices with gRPC
          </h2>
        </li>
        <li>
          <h2 class="text-lg">
            Kafka Streams: A Comprehensive Guide
          </h2>
        </li>
        <li>
          <h2 class="text-lg ">
            OLAP vs OLTP: Understanding the Differences
          </h2>
        </li>
        <li>
          <h2 class="text-lg ">
            How to Build Real-time chat application with Go and React
          </h2>
        </li>
      </ol>
      <ol class="flex flex-col gap-1">
        <li>
          <h2 class="text-lg ">
            Building Modern Microservices with gRPC
          </h2>
        </li>
        <li>
          <h2 class="text-lg">
            Kafka Streams: A Comprehensive Guide
          </h2>
        </li>
        <li>
          <h2 class="text-lg ">
            OLAP vs OLTP: Understanding the Differences
          </h2>
        </li>
        <li>
          <h2 class="text-lg ">
            How to Build Real-time chat application with Go and React
          </h2>
        </li>
      </ol>
      <ol class="flex flex-col gap-1">
        <li>
          <h2 class="text-lg ">
            Building Modern Microservices with gRPC
          </h2>
        </li>
        <li>
          <h2 class="text-lg">
            Kafka Streams: A Comprehensive Guide
          </h2>
        </li>
        <li>
          <h2 class="text-lg ">
            OLAP vs OLTP: Understanding the Differences
          </h2>
        </li>
        <li>
          <h2 class="text-lg ">
            How to Build Real-time chat application with Go and React
          </h2>
        </li>
      </ol>
   
    </UContainer>

    <h2 class="mt-3">2024:</h2>
    <UContainer class=" mx-auto flex flex-col my-5">
      <ol class="flex flex-col gap-1">
        <li>
          <h2 class="text-lg ">
            Rust Programming Language: A Comprehensive Guide, From Zero to Hero
          </h2>
        </li>
        <li>
          <h2 class="text-lg">
            Rustbuild vs Vitebuild: Which is Better?
          </h2>
        </li>
        <li>
          <h2 class="text-lg ">
            Java8: Object Oriented Programming
          </h2>
        </li>
        <li>
          <h2 class="text-lg ">
            PostgreSQL: The Definitive Guide
          </h2>
        </li>
      </ol>
    </UContainer>

  </div>


</template>

<style scoped>
ol {
  list-style-type: disc;
}
</style>