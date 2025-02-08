<script setup lang="ts">
interface Props {
  tags: string[];
  selectedTags?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  selectedTags: () => [],
});

const emit = defineEmits<{
  (e: 'select', tag: string): void;
}>();

const { data: tags } = useAsyncData('tags', () => {
  return queryCollection('jobs').select('tags').all();
});

const showAllTags = ref(false);

const filteredTags = computed(() => {
  const allTags = tags.value?.map((job) => job.tags).flat() || [];
  // Remove duplicates
  const uniqueTags = [...new Set(allTags)];
  return showAllTags.value ? uniqueTags : uniqueTags.slice(0, 10);
});

const hasMoreTags = computed(() => {
  const allTags = tags.value?.map((job) => job.tags).flat() || [];
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags.length > 10;
});

// Handle keyboard navigation for accessibility
const handleKeyPress = (event: KeyboardEvent, tag: string) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    emit('select', tag);
  }
};

const isTagSelected = (tag: string) => props.selectedTags.includes(tag);
</script>

<template>
  <div class="flex mt-4 flex-wrap gap-2 mb-8" role="list" aria-label="Job tags">
    <button
      v-for="tag in filteredTags"
      :key="tag"
      @click="emit('select', tag)"
      @keypress="handleKeyPress($event, tag)"
      :disabled="isTagSelected(tag)"
      :class="[
        'group relative px-4 py-2 text-sm rounded-xl border transition-all duration-200 ease-in-out shadow-sm hover:shadow flex items-center gap-2',
        isTagSelected(tag)
          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50 active:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      ]"
      role="listitem"
    >
      <span class="relative">
        {{ tag }}
      </span>
      <span
        class="inline-flex items-center justify-center w-5 h-5 text-xs rounded-full transition-colors"
        :class="
          isTagSelected(tag)
            ? 'bg-gray-200'
            : 'bg-gray-100 group-hover:bg-blue-100'
        "
        aria-hidden="true"
      >
        +
      </span>
      <span class="sr-only">Filter by {{ tag }}</span>
    </button>

    <!-- More tags button -->
    <button
      v-if="hasMoreTags"
      @click="showAllTags = !showAllTags"
      class="group relative px-4 py-2 bg-white text-gray-700 rounded-xl text-sm border border-gray-200 hover:border-blue-300 hover:bg-blue-50 active:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out shadow-sm hover:shadow flex items-center gap-2"
    >
      {{ showAllTags ? 'Show less' : 'More tags' }}
    </button>
  </div>
</template>
