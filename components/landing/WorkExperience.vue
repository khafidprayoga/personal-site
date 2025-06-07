<script setup lang="ts">
const { workExperience } = useAppConfig()

</script>

<template>
  <section id="work-experience" class="mb-10 pb-5">
    <div>
      <h2 class="text-2xl font-bold capitalize  border-b-4 border-gray-200 ">Work Experience</h2>
    </div>
    <ol  v-for="experience in workExperience.history" :key="experience.role"  class="flex flex-col gap-5 my-3 " >
      <li class="flex flex-col gap-1">
          <h3 class="text-md font-bold">{{ experience.role }}</h3>
          <UButton
           class="text-sm text-gray-600 font-medium underline" 
          :to="parseCampaignURL(experience.companyUrl, 'work-experience')" :target="'_blank'" 
          :rel="'noopener noreferrer sponsored'" nofollow>{{ experience.company }} 
          <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4" />
        </UButton>
          <p class="text-sm text-gray-600 font-medium">{{ experience.date?.start}} &ndash; {{ experience.date?.end ? experience.date?.end : 'Present'}}</p>
          <div class="flex flex-col gap-2">
            <p class="text-sm text-gray-600 font-medium">
              {{ experience.description }}
            </p>
          </div>
        </li>  
    </ol>
  </section>
</template>