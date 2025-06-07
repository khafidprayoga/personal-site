<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <div class="flex flex-col md:flex-row justify-between text-sm gap-2">
    <div>
      Copyright &copy; {{ new Date().getFullYear() }}. {{ footer.credits }}
    </div>

    <div class="flex flex-row gap-1.5">
      <template v-if="footer?.links">
        <UTooltip v-for="(link, index) in footer?.links" :key="index" :text="link['aria-label']">
          <UButton 
          v-bind="{
            size: 'xl',
            color: 'neutral',
            variant: 'ghost',
            ...link,
          }" />
        </UTooltip>

      </template>
    </div>
  </div>
</template>

<style scoped></style>