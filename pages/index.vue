<script setup lang="ts">
const {
  pinnedAnnouncement,
  author,
  hero,
} = useAppConfig()
</script>

<template>
  <LandingHero class="mb-10" />
  <!-- last article top -->
  <section id="latest-article" class="mb-10">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold capitalize">Latest Article</h2>
      <UButton :to="'/blog'" label="View All" />
    </div>
    <div class="flex flex-col gap-5 my-3" id="blog">
      <div class="flex flex-col gap-1" id="article-item">
        <h3 class="font-bold">Building Modern Microservices with gRPC</h3>
        <p>
          gRPC is a high-performance, open-source universal RPC framework that puts mobile and HTTP/2 first.
        </p>
        <UButton :to="'/blog/1'" label="Read More" class="font-mono underline" />
      </div>
      <div class="flex flex-col gap-1" id="article-item">
        <h3 class="font-bold">HTTP Testing with JMeter</h3>
        <p>
          JMeter is an open-source tool for load testing and performance monitoring.
        </p>
        <UButton :to="'/blog/2'" label="Read More" class="font-mono underline"  />
      </div>
      <div class="flex flex-col gap-1" id="article-item">
        <h3 class="font-bold">How to Build Real-time chat application with Go and React</h3>
        <p>
          Websocket is a technology that allows for real-time communication between a client and a server. Socket.io is
          a library that makes it easy to use Websocket in your application.
        </p>
        <UButton :to="'/blog/3'" label="Read More" class="font-mono underline" />
      </div>
      <div class="flex flex-col gap-1" id="article-item">
        <h3 class="font-bold">Building Modern Microservices with gRPC</h3>
        <p>
          gRPC is a high-performance, open-source universal RPC framework that puts mobile and HTTP/2 first.
        </p>
        <UButton :to="'/blog/1'" label="Read More" class="font-mono underline" />
      </div>
      <div class="flex flex-col gap-1" id="article-item">
        <h3 class="font-bold">HTTP Testing with JMeter</h3>
        <p>
          JMeter is an open-source tool for load testing and performance monitoring.
        </p>
        <UButton :to="'/blog/2'" label="Read More" class="font-mono underline" />
      </div>
    </div>
  </section>
</template>

