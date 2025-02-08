<script setup lang="ts">
const { data: jobs, status } = await useAsyncData('jobs-all', () =>
  queryCollection('jobs').all()
);

const filters = ref({
  location: '',
  minSalary: 0,
  tags: [] as string[],
});

const searchQuery = ref('');

const filteredJobs = computed(() => {
  if (!jobs.value) return [];

  return jobs.value.filter((job) => {
    const matchesSearch =
      !searchQuery.value ||
      job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesLocation =
      !filters.value.location ||
      job.location.toLowerCase().includes(filters.value.location.toLowerCase());
    const matchesSalary = job.salary >= filters.value.minSalary;
    const matchesTags =
      filters.value.tags.length === 0 ||
      filters.value.tags.every((tag) => job.tags.includes(tag));

    return matchesSearch && matchesLocation && matchesSalary && matchesTags;
  });
});

const addTagFilter = (tag: string) => {
  if (!filters.value.tags.includes(tag)) {
    filters.value.tags.push(tag);
  }
};

const removeTagFilter = (tag: string) => {
  filters.value.tags = filters.value.tags.filter((t) => t !== tag);
};
</script>

<template>
  <div>
    <!-- Hero Section -->
    <HomeHero v-model:searchQuery="searchQuery" @add-tag="addTagFilter" />

    <!-- Main content -->
    <div class="max-w-7xl mx-auto px-4 py-12">
      <!-- Filters -->
      <div class="mb-8">
        <JobFilters v-model="filters" @remove-tag="removeTagFilter" />
      </div>

      <!-- Job listings -->
      <JobListings
        :jobs="filteredJobs"
        :loading="status === 'pending'"
        @filter-tag="addTagFilter"
      />
    </div>
  </div>
</template>

<style>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-grid-white {
  mask-image: linear-gradient(to bottom, transparent, black, transparent);
}

/* Map styles */
.leaflet-container {
  width: 100% !important;
  height: 100% !important;
  filter: grayscale(100%) brightness(105%) contrast(90%);
}

/* Hide map controls */
.leaflet-control-container {
  display: none;
}

/* Hide marker shadow */
.leaflet-shadow-pane {
  display: none;
}

/* Entry animation for elements */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
}

/* Controls customization */
.leaflet-control-zoom {
  border: none !important;
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
}

.leaflet-control-zoom a {
  color: white !important;
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.leaflet-control-zoom a:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

/* Marker customization */
.leaflet-marker-icon {
  filter: invert(1) brightness(1.5);
}

/* Enhanced glassmorphism effect */
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.25),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
}

/* Search field enhancement */
input::placeholder {
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.3s ease;
}

input:focus::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

/* Gradient animation for title */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
