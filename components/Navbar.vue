<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const navbarLinks = ['Offers', 'Enterprises', 'Blog']
const branding = 'JobBoard'
const publishJobButtonText = 'Publish a job'
const drawer = () => {
  isOpen.value = !isOpen.value
}
</script>
<template>
  <header class="w-full fixed top-2 p-2 left-0 right-0 z-50">
    <nav class="w-full mx-auto">
      <div
         class="z-50 bg-white/70 mx-auto w-full max-w-7xl px-4 flex items-center justify-between rounded-xl shadow-sm h-16 transition-all duration-300 backdrop-blur-lg">
        <!-- Left: Branding -->
        <NuxtLink to="/" class="text-2xl font-bold text-blue-600">
          {{ branding }}
        </NuxtLink>

        <!-- Center: Navigation Links (Desktop) -->
        <!-- Hamburger Menu -->
        <button @click="drawer" class="md:hidden ml-auto">
          <svg
              class="h-8 w-8 fill-current text-black"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center gap-6 ml-auto">
          <!-- if you wanna use dynamic link, you can use this in NuxtLink :to="'/' + link.toLowerCase()" -->
          <NuxtLink
              v-for="link in navbarLinks"
              :key="link"
              to='/'
              class="text-gray-600 hover:text-jobs-primary transition-colors">
            {{ link }}
          </NuxtLink>
          <div
              class="bg-jobs-primary text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-jobs-primary/90 transition-all hover:scale-105"
          >
            {{ publishJobButtonText }}
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isOpen" class="absolute left-0 right-0 bg-white shadow-sm z-40">
        <ul class="flex flex-col items-center gap-2 p-4">
          <li v-for="link in navbarLinks" :key="link" class="w-full text-center">
            <!-- if you wanna use dynamic link, you can use this in NuxtLink :to="'/' + link.toLowerCase()" -->
            <NuxtLink to='/' class="block px-4 py-2 text-gray-600 hover:text-jobs-primary">{{ link }}</NuxtLink>
          </li>
          <li class="w-full text-center mt-4">
            <div
                class="bg-jobs-primary text-white px-4 py-2 rounded-md hover:bg-jobs-primary/90 transition-all hover:scale-105"
            >
              {{ publishJobButtonText }}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>