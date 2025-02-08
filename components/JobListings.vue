<script setup lang="ts">
interface Job {
  title: string;
  company: string;
  location: string;
  salary: number;
  tags: string[];
  path: string;
  officeHours?: string;
  verified?: boolean;
  featured?: boolean;
}

const props = defineProps<{
  jobs: Job[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'filterTag', tag: string): void;
}>();

// Sort jobs to show featured ones first
const sortedJobs = computed(() => {
  return [...props.jobs].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
});
</script>

<template>
  <div
    id="list"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    :class="{ 'opacity-50': loading || !jobs.length }"
  >
    <JobCard
      v-for="(job, index) in sortedJobs"
      :key="job.path"
      :job="job"
      @filter-tag="emit('filterTag', $event)"
      class="animate-fadeIn"
    >
    </JobCard>

    <div
      v-if="!jobs.length"
      class="col-span-full text-center py-12 text-gray-500"
    >
      No job offers match your criteria
    </div>
  </div>
</template>
