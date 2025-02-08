<script setup lang="ts">
const props = defineProps<{
  searchQuery: string;
}>();

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void;
  (e: 'addTag', tag: string): void;
}>();

// Default coordinates (Paris)
const mapCenter = [48.8566, 2.3522];

const tagSelected = (tag: string) => {
  emit('addTag', tag.toLowerCase());
  navigateTo(`#list`);
};
</script>

<template>
  <div
    class="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
  >
    <!-- Background map -->
    <client-only>
      <div class="absolute inset-0 z-0">
        <l-map
          style="height: 100%; width: 100%"
          :zoom="13"
          :center="mapCenter"
          :zoomControl="false"
          :dragging="false"
          :scrollWheelZoom="false"
        >
          <l-tile-layer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            :attribution="''"
            :maxZoom="19"
          />
          <l-marker :lat-lng="mapCenter" />
        </l-map>
      </div>
    </client-only>

    <!-- Gradient overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80 z-10"
    ></div>

    <!-- Content -->
    <div class="relative z-20 w-full">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Text and search -->
          <div class="space-y-8">
            <div class="space-y-4">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600"
              >
                <Icon name="heroicons:rocket-launch" class="w-4 h-4 mr-2" />
                +1000 tech job offers
              </span>
              <h1 class="text-5xl font-bold text-gray-900 leading-tight">
                Find your next
                <span class="text-blue-600">tech job</span> in Europe
              </h1>
              <p class="text-xl text-gray-600 max-w-xl">
                The best tech opportunities, curated and updated daily.
              </p>
            </div>

            <!-- Search bar -->
            <div class="relative max-w-xl">
              <div
                class="absolute inset-0 bg-blue-50 rounded-2xl blur-xl"
              ></div>
              <div class="relative bg-white rounded-2xl shadow-xl p-2">
                <div class="flex gap-2">
                  <div class="flex-1 relative">
                    <Icon
                      name="heroicons:magnifying-glass"
                      class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    />
                    <input
                      :value="searchQuery"
                      @input="
                        emit(
                          'update:searchQuery',
                          ($event.target as HTMLInputElement).value
                        )
                      "
                      type="text"
                      placeholder="Search for a position, company..."
                      class="w-full pl-12 pr-4 py-4 rounded-xl border-0 ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <button
                    @click="navigateTo(`#list`)"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            <!-- Popular tags -->
            <div class="flex flex-wrap items-center gap-3">
              <span class="text-sm font-medium text-gray-500">Popular:</span>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tag in ['React', 'Vue.js', 'Remote', 'Full-time']"
                  :key="tag"
                  @click="tagSelected(tag)"
                  class="px-4 py-2 rounded-lg text-sm bg-white shadow-sm ring-1 ring-gray-100 hover:ring-blue-500 text-gray-700 hover:text-blue-600 transition-all"
                >
                  {{ tag }}
                </button>
              </div>
            </div>
          </div>

          <!-- Stats and trust indicators -->
          <div class="hidden lg:block">
            <div
              class="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl ring-1 ring-gray-100"
            >
              <div class="grid grid-cols-2 gap-8">
                <div class="space-y-2">
                  <div class="text-4xl font-bold text-gray-900">1000+</div>
                  <div class="text-sm text-gray-600">Job offers</div>
                </div>
                <div class="space-y-2">
                  <div class="text-4xl font-bold text-gray-900">500+</div>
                  <div class="text-sm text-gray-600">Companies</div>
                </div>
                <div class="space-y-2">
                  <div class="text-4xl font-bold text-gray-900">50k€</div>
                  <div class="text-sm text-gray-600">Average salary</div>
                </div>
                <div class="space-y-2">
                  <div class="text-4xl font-bold text-gray-900">48h</div>
                  <div class="text-sm text-gray-600">Response time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
