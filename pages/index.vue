<script setup lang="ts">
</script>

<template>
  <main class="container mx-auto p-8">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div class="text-center mb-6">
        <img 
          src="https://randomuser.me/api/portraits/men/32.jpg" 
          alt="Profile Picture" 
          class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        >
        <h1 class="text-3xl font-bold text-gray-800">Ahmad Rizki</h1>
        <p class="text-gray-600">Software Developer</p>
      </div>

      <div class="space-y-4">
        <section>
          <h2 class="text-xl font-semibold text-gray-700 mb-2">Tentang Saya</h2>
          <p class="text-gray-600">
            Seorang pengembang software yang bersemangat dengan pengalaman 5 tahun dalam pengembangan web.
            Saya suka memecahkan masalah kompleks dan menciptakan solusi yang inovatif.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-700 mb-2">Keahlian</h2>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">JavaScript</span>
            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full">Vue.js</span>
            <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">TypeScript</span>
            <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">Node.js</span>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-700 mb-2">Kontak</h2>
          <div class="space-y-2">
            <p class="text-gray-600">
              <span class="font-medium">Email:</span> ahmad.rizki@email.com
            </p>
            <p class="text-gray-600">
              <span class="font-medium">Lokasi:</span> Jakarta, Indonesia
            </p>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
