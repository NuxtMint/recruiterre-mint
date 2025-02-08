<script setup lang="ts">
const route = useRoute();

// Fetch job using URL slug
const { data: job } = await useAsyncData(`job-${route.params.slug}`, () =>
  queryCollection('jobs').path(route.path).first()
);

// 404 redirect if job doesn't exist
if (!job.value) {
  throw createError({ statusCode: 404, message: 'Job not found' });
}

// Replace the formatSalary function with a computed property
const formattedSalary = computed(() => {
  if (!job.value?.salary) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(job.value.salary);
});

// Formatted publication date
const formattedDate = computed(() => {
  if (!job.value?.date) return '';
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(job.value.date));
});

// Cache for coordinates
const coordinatesCache = new Map();

// Loading state for map and geocoding
const isMapLoading = ref(true);
const isGeocodingLoading = ref(false);
const isLoading = computed(
  () => isMapLoading.value || isGeocodingLoading.value
);

// Function to convert address to coordinates with cache
const getCoordinates = async (address: string) => {
  // Check cache first
  if (coordinatesCache.has(address)) {
    return coordinatesCache.get(address);
  }

  isGeocodingLoading.value = true;
  try {
    // Add delay to respect rate limit
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`,
      {
        headers: {
          'User-Agent': 'JobBoard/1.0', // Identifying for the API
        },
      }
    );
    const data = await response.json();

    if (data && data[0]) {
      const coordinates = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      // Cache the result
      coordinatesCache.set(address, coordinates);
      return coordinates;
    }
    return [48.8566, 2.3522]; // Paris default
  } catch (error) {
    console.error('Geocoding error:', error);
    return [48.8566, 2.3522]; // Paris default
  } finally {
    isGeocodingLoading.value = false;
  }
};

// Reactive coordinates based on job location
const mapCenter = ref([48.8566, 2.3522]); // Note: Leaflet uses [lat, lng]

// Update coordinates when job is loaded
watch(
  () => job.value?.location,
  async (newLocation) => {
    if (newLocation) {
      isMapLoading.value = true; // Reactivate loading when location changes
      const coords = await getCoordinates(newLocation);
      mapCenter.value = coords;
    }
  },
  { immediate: true }
);

// Map configuration
const zoom = ref(13);
const tileLayer = {
  url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  attribution: '',
};

// Handle map loading
const handleMapReady = () => {
  setTimeout(() => {
    isMapLoading.value = false;
  }, 500);
};
</script>

<template>
  <div v-if="job" class="min-h-screen bg-gray-50/50 container mx-auto mt-24">
    <!-- Job header with subtle gradient -->
    <div class="relative h-[400px] rounded-t-lg overflow-hidden">
      <!-- Skeleton loader for map -->
      <div
        v-if="isLoading"
        class="absolute inset-0 z-0 bg-gray-100 animate-pulse"
      >
        <div class="h-full w-full flex items-center justify-center">
          <div class="space-y-4 w-full max-w-sm px-4">
            <!-- Simulate map elements -->
            <div class="h-4 bg-gray-200 rounded-full w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded-full"></div>
            <div class="h-4 bg-gray-200 rounded-full w-5/6"></div>
            <!-- Styled map icon -->
            <div class="flex justify-center mt-8">
              <Icon name="heroicons:map" class="w-12 h-12 text-gray-300" />
            </div>
          </div>
        </div>
      </div>

      <!-- Map background -->
      <client-only>
        <div class="absolute inset-0 z-0" :class="{ 'opacity-0': isLoading }">
          <l-map
            style="height: 100%; width: 100%"
            :zoom="zoom"
            :center="mapCenter"
            :zoomControl="false"
            :dragging="false"
            :doubleClickZoom="false"
            :scrollWheelZoom="false"
            :touchZoom="false"
            @ready="handleMapReady"
          >
            <l-tile-layer
              :url="tileLayer.url"
              :attribution="tileLayer.attribution"
            />
            <l-marker :lat-lng="mapCenter" />
          </l-map>
        </div>
      </client-only>

      <!-- Overlay gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-gray-50/40 z-10"
      ></div>

      <!-- Content -->
      <div class="relative max-w-6xl mx-auto px-4 py-12 z-20">
        <!-- Breadcrumb -->
        <div
          class="flex items-center gap-2 text-sm text-gray-500 mb-8 backdrop-blur-sm p-2 rounded-lg"
        >
          <NuxtLink to="/" class="hover:text-blue-600 transition-colors"
            >Home</NuxtLink
          >
          <Icon name="heroicons:chevron-right" class="w-4 h-4" />
          <span class="text-gray-900">{{ job.title }}</span>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-start">
          <!-- Left column -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <span
                class="px-3 backdrop-blur-sm py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
              >
                {{ job.location }}
              </span>
              <span
                class="text-sm text-gray-500 backdrop-blur-sm p-2 rounded-lg"
                >Posted on {{ formattedDate }}</span
              >
            </div>

            <h1 class="text-4xl font-bold text-gray-900 leading-tight">
              {{ job.title }}
            </h1>

            <div class="flex flex-wrap items-center gap-6 text-gray-600">
              <div
                class="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm"
              >
                <Icon
                  name="heroicons:building-office-2"
                  class="w-5 h-5 text-blue-600"
                />
                <span class="font-medium">{{ job.company }}</span>
              </div>
              <div
                class="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm"
              >
                <Icon
                  name="heroicons:currency-euro"
                  class="w-5 h-5 text-green-600"
                />
                <span class="font-medium text-gray-900"
                  >{{ formattedSalary }}/year</span
                >
              </div>
            </div>
          </div>

          <!-- Right column -->
          <div class="lg:text-right space-y-6">
            <div class="flex lg:justify-end gap-3">
              <button
                class="group relative px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <span class="relative z-10 flex items-center gap-2">
                  <span>Apply Now</span>
                  <Icon
                    name="heroicons:arrow-right"
                    class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </button>
              <button
                class="p-4 text-gray-500 hover:text-blue-600 rounded-xl border hover:border-blue-200 transition-all hover:shadow-lg hover:shadow-blue-500/5 bg-white"
              >
                <Icon name="heroicons:bookmark" class="w-5 h-5" />
              </button>
            </div>

            <p class="text-sm text-gray-500">
              Average response time:
              <span class="text-gray-900 font-medium">48 hours</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Job description -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Content -->
          <div
            class="prose prose-lg prose-blue max-w-none bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
          >
            <ContentRenderer :value="job" />
          </div>
        </div>

        <!-- Sidebar -->
        <div class="h-full">
          <div class="space-y-6 sticky top-24">
            <!-- Company card -->
            <div
              class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden"
            >
              <div
                class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-16 translate-x-16"
              ></div>

              <div class="relative">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">
                  {{ job.company }}
                </h2>
                <p class="text-gray-600 mb-6">
                  Leading company in its sector, {{ job.company }} constantly
                  innovates to create the best technological solutions.
                </p>
                <div class="space-y-4">
                  <div class="flex items-center gap-3 text-sm">
                    <Icon
                      name="heroicons:users"
                      class="w-5 h-5 text-blue-600"
                    />
                    <span>50-200 employees</span>
                  </div>
                  <div class="flex items-center gap-3 text-sm">
                    <Icon
                      name="heroicons:globe-europe-africa"
                      class="w-5 h-5 text-blue-600"
                    />
                    <span>{{ job.location }}</span>
                  </div>
                  <div class="flex items-center gap-3 text-sm">
                    <Icon
                      name="heroicons:building-office"
                      class="w-5 h-5 text-blue-600"
                    />
                    <span>Tech / Digital</span>
                  </div>
                </div>
                <a
                  href="#"
                  class="inline-flex items-center gap-2 mt-6 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <span>View full profile</span>
                  <Icon name="heroicons:arrow-right" class="w-4 h-4" />
                </a>
              </div>
            </div>

            <!-- Share -->
            <div
              class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <h2 class="text-lg font-semibold text-gray-900 mb-4">
                Share this job
              </h2>
              <div class="grid grid-cols-3 gap-4">
                <button
                  v-for="(network, i) in ['linkedin', 'twitter', 'facebook']"
                  :key="network"
                  class="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <Icon
                    :name="`simple-icons:${network}`"
                    class="w-6 h-6"
                    :class="[
                      i === 0
                        ? 'text-[#0077B5] group-hover:text-[#0077B5]/80'
                        : '',
                      i === 1
                        ? 'text-[#1DA1F2] group-hover:text-[#1DA1F2]/80'
                        : '',
                      i === 2
                        ? 'text-[#4267B2] group-hover:text-[#4267B2]/80'
                        : '',
                    ]"
                  />
                  <span class="text-xs text-gray-500 capitalize">{{
                    network
                  }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Style for Markdown content */
.prose {
  font-size: 1.1rem;
  line-height: 1.8;
}

.prose h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-top: 2.5rem;
  margin-bottom: 1.2rem;
}

.prose h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: #374151;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose p {
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  color: #4b5563;
}

.prose ul {
  list-style-type: none;
  padding-left: 0;
}

.prose ul li {
  position: relative;
  padding-left: 1.8rem;
  margin: 0.8rem 0;
}

.prose ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #3b82f6;
  border-radius: 50%;
}

/* Animation on button hover */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.animate-pulse-blue {
  animation: pulse 2s infinite;
}

/* Styles for map */
#job-location-map {
  height: 100%;
  width: 100%;
}

/* Hide Mapbox controls */
.mapboxgl-control-container {
  display: none;
}

/* Add styles for Leaflet if needed */
.leaflet-container {
  background: #f8fafc;
}

.leaflet-marker-icon {
  filter: hue-rotate(200deg);
}

/* Animation for skeleton loader */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Transition for map */
.opacity-0 {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
</style>
