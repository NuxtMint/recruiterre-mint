<script setup lang="ts">
interface Filters {
  location: string;
  minSalary: number;
  tags: string[];
}

const props = defineProps<{
  modelValue: Filters;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Filters): void;
  (e: 'removeTag', tag: string): void;
}>();

const filters = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const removeTagFilter = (tag: string) => {
  emit('removeTag', tag);
};

const tags = ['Frontend', 'Backend', 'DevOps', 'Design', 'Marketing'];
const handleTagSelect = (tag: string) => {
  filters.value.tags.push(tag);
};

// Add new refs for salary display
const formattedSalary = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(filters.value.minSalary || 0);
});

// Add popular locations for quick selection
const popularLocations = ['Paris', 'Lyon', 'Remote', 'London', 'Berlin'];

const showLocationSuggestions = ref(false);

const locationInput = ref<HTMLElement | null>(null);
const suggestionsDropdown = ref<HTMLElement | null>(null);

const selectLocation = (location: string) => {
  filters.value.location = location;
  showLocationSuggestions.value = false;
};

// Add click outside handler
const onClickOutside = (event: MouseEvent) => {
  if (
    !locationInput.value?.contains(event.target as Node) &&
    !suggestionsDropdown.value?.contains(event.target as Node)
  ) {
    showLocationSuggestions.value = false;
  }
};

// Add and remove event listener
onMounted(() => {
  document.addEventListener('click', onClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside);
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Location Input -->
      <div class="relative">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <div ref="locationInput" class="relative">
          <Icon
            name="uil:location-point"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
          />
          <input
            v-model="filters.location"
            type="text"
            class="pl-10 w-full rounded-lg border-gray-300 focus:border-jobs-primary focus:ring-jobs-primary transition-all duration-200 hover:border-gray-400"
            placeholder="Search location..."
            @focus="showLocationSuggestions = true"
          />
        </div>
        <!-- Popular Locations Dropdown -->
        <div
          v-if="showLocationSuggestions"
          ref="suggestionsDropdown"
          class="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-1"
        >
          <button
            v-for="location in popularLocations"
            :key="location"
            @click="selectLocation(location)"
            class="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm transition-colors duration-150"
          >
            <Icon
              name="uil:location-point"
              class="inline-block mr-2 w-4 h-4 text-gray-400"
            />
            {{ location }}
          </button>
        </div>
      </div>

      <!-- Salary Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Minimum salary
        </label>
        <div class="relative group">
          <div class="flex items-center gap-2 mt-3">
            <Icon
              name="uil:euro"
              class="text-gray-400 w-5 h-5 group-hover:text-jobs-primary transition-colors duration-200"
            />
            <input
              v-model.number="filters.minSalary"
              type="range"
              min="20000"
              max="200000"
              step="1000"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-jobs-primary"
            />
          </div>
          <div class="absolute -top-1 left-0 w-full">
            <div class="relative">
              <div class="absolute left-0 right-0 -top-8 text-center">
                <span
                  class="bg-jobs-primary text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ formattedSalary }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-1 text-xs text-gray-500">
          <span>€20,000</span>
          <span>€200,000</span>
        </div>
      </div>
    </div>

    <JobTags :tags="tags" @select="handleTagSelect" />

    <!-- Active tags -->
    <div v-if="filters.tags.length" class="mt-6 flex flex-wrap gap-2">
      <div
        v-for="tag in filters.tags"
        :key="tag"
        class="bg-jobs-primary/10 text-jobs-primary px-3 py-1 rounded-full text-sm flex items-center gap-2 animate-fadeIn"
      >
        {{ tag }}
        <button
          @click="removeTagFilter(tag)"
          class="hover:text-jobs-accent transition-colors"
        >
          <Icon name="uil:times" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #fff;
  border: 2px solid var(--jobs-primary-color);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

input[type='range']::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

input[type='range']::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #fff;
  border: 2px solid var(--jobs-primary-color);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

input[type='range']::-moz-range-thumb:hover {
  transform: scale(1.2);
}
</style>
