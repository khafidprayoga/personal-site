<script lang="ts">
</script>

<template>
    <UContainer class="w-3xl mx-auto flex flex-col py-5 px-5">
      <AppHeader />
      <div class="md:min-h-screen py-10">
        <slot />
      </div>
      <AppFooter/>
    </UContainer>
</template>