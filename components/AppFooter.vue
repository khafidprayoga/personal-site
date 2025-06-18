<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <div class="mx-auto md:mx-0 mt-5 md:mt-0 md:flex md:flex-row md:justify-between text-sm gap-2">
    <div>
      Copyright &copy; {{ new Date().getFullYear() }}. Made with <span class="heartbeat">❤️</span> in East Java
    </div>

    <div class="md:flex md:flex-row md:gap-1.5 hidden">
      <template v-if="footer?.links">
        <UTooltip v-for="(link, index) in footer?.links" :key="index" :text="link['aria-label']">
          <UButton 
          v-bind="{
            size: 'xl',
            ...link,
          }" :no-rel="true"/>
        </UTooltip>
      </template>
    </div>
  </div>
</template>

<style scoped>
.heartbeat {
  color: #e11d48;
  animation: heartbeat 1.5s ease-in-out infinite;
  display: inline-block;
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.2);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.2);
  }
  70% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>