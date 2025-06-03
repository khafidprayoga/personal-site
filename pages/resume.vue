<script setup lang="ts">
const { appName } = useAppConfig()

useHead({
  title: `${appName} / Resume`
})
</script>
<template>
  <h1 class="text-xl font-bold">
    Resume
  </h1>
  <UContainer>
    <section>
      <h2>About Me</h2>
      <p>
        I am a software engineer with a passion for building scalable and efficient systems. I have a strong foundation in computer science and software engineering principles.
      </p>
    </section>
    <section>
      <h2>Work Experience</h2>
      <p>
        I have worked as a software engineer for 10 years. I have a strong foundation in computer science and software engineering principles.
      </p>
    </section>
    <section>
      <h2>Education</h2>
      <p>
        I have a strong foundation in computer science and software engineering principles.
      </p>
    </section>
    <section>
      <h2>Skills</h2>
      <ul>
        <li>
          <h3>Nuxt.js</h3>
        </li>
        <li>
          <h3>Vue.js</h3>
        </li>
        <li>
          <h3>React</h3>
        </li>
        <li>
          <h3>Node.js</h3>
        </li>
      </ul>
    </section>
    <section>
      <h2>Certifications</h2>
      <ol>
        <li>
          <h3>AWS Certified Developer</h3>
        </li>
        <li>
          <h3>AWS Certified Solutions Architect</h3>
        </li>
        <li>
          <h3>AWS Certified DevOps Engineer</h3>
        </li>
        <li>
          <h3>AWS Certified Security</h3>
        </li>
      </ol>
    </section>

  </UContainer>
</template>

<style scoped>
@reference "tailwindcss";

h2{
  @apply text-lg font-bold my-2;
}
</style>