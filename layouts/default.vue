<template>
  <div class="min-h-screen bg-gray-50 flex flex-col w-full">
    <!-- Header -->
      <Navbar />

    <!-- Main content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-bold text-white mb-4">JobBoard</h3>
          <p class="text-gray-400">
            Find the best tech opportunities in France
          </p>
        </div>

        <div>
          <h4 class="font-semibold text-white mb-4">Navigation</h4>
          <ul class="space-y-2">
            <li>
              <div class="hover:text-white transition-colors">Job offers</div>
            </li>
            <li>
              <div class="hover:text-white transition-colors">Companies</div>
            </li>
            <li>
              <div class="hover:text-white transition-colors">Blog</div>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-white mb-4">Légal</h4>
          <ul class="space-y-2">
            <li>
              <div class="hover:text-white transition-colors">Privacy</div>
            </li>
            <li>
              <div class="hover:text-white transition-colors">
                Terms of Service
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-white mb-4">Newsletter</h4>
          <p class="text-gray-400 mb-4">Receive the best offers every week</p>
          <form @submit.prevent class="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              class="flex-1 px-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-jobs-primary"
            />
            <button
              type="submit"
              class="bg-jobs-primary text-white px-4 py-2 rounded-md hover:bg-jobs-primary/90 transition-colors"
            >
              OK
            </button>
          </form>
        </div>
      </div>
    </footer>
  </div>
</template>
