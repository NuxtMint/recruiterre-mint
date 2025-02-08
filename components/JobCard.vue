<script setup lang="ts">
interface Job {
  title: string;
  salary: number;
  location: string;
  tags: string[];
  company: string;
  path: string;
  officeHours?: string;
  verified?: boolean;
  featured?: boolean;
}

const props = defineProps<{
  job: Job;
}>();

const emit = defineEmits<{
  (e: 'filterTag', tag: string): void;
}>();
</script>

<template>
  <div class="relative h-full overflow-hidden">
    <!-- Featured badge -->
    <div v-if="job.featured" class="absolute -top-3 -left-3 z-10">
      <div class="relative">
        <!-- Glow effect -->
        <div
          class="absolute inset-0 blur-md bg-jobs-primary/30 rounded-full"
        ></div>
        <!-- Badge -->
        <div
          class="relative bg-gradient-to-r from-jobs-primary to-jobs-accent pl-3 pt-3 pr-1 pb-1 rounded-full shadow-lg border border-white/20"
        >
          <div class="flex items-end h-full w-full justify-end">
            <Icon
              name="material-symbols:star-rounded"
              class="w-5 h-5 text-white"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="group bg-white hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-jobs-primary/20 relative overflow-hidden"
      :class="
        job.featured
          ? 'border-jobs-primary/30 rounded-tr-2xl rounded-bl-2xl'
          : 'rounded-2xl'
      "
    >
      <!-- Enhanced gradient background for featured jobs -->
      <div
        class="absolute inset-0 bg-gradient-to-br pointer-events-none"
        :class="
          job.featured
            ? 'from-jobs-primary/5 to-jobs-accent/5'
            : 'from-transparent to-gray-50/50'
        "
      ></div>

      <div class="flex justify-between items-start relative gap-4">
        <div class="space-y-1">
          <h2
            class="text-xl font-semibold text-gray-900 group-hover:text-jobs-primary transition-colors duration-300"
          >
            {{ job.title }}
          </h2>
          <div class="flex items-center space-x-2">
            <span class="text-gray-600 font-medium">{{ job.company }}</span>
            <!-- Added verified badge if needed -->
            <span v-if="job.verified" class="text-jobs-primary/80">
              <Icon name="material-symbols:verified" class="w-4 h-4" />
            </span>
          </div>
        </div>

        <span
          class="bg-jobs-primary/10 text-xs text-jobs-primary px-4 py-2 rounded-full font-semibold backdrop-blur-sm shadow-sm"
        >
          {{
            new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            }).format(job.salary)
          }}
        </span>
      </div>

      <div class="mt-6 flex items-center text-gray-600 space-x-4">
        <div class="flex items-center space-x-2">
          <Icon
            name="uil:location-point"
            class="w-5 h-5 text-jobs-primary/70"
          />
          <span class="text-sm font-medium">{{ job.location }}</span>
        </div>
        <div v-if="job.officeHours" class="h-4 w-px bg-gray-200"></div>
        <div v-if="job.officeHours" class="flex items-center space-x-2">
          <Icon name="uil:clock" class="w-4 h-4 text-jobs-primary/70" />
          <span class="text-sm text-gray-500">{{ job.officeHours }}</span>
        </div>
      </div>

      <div class="mt-6 flex flex-wrap gap-2">
        <button
          v-for="tag in job.tags"
          :key="tag"
          @click="emit('filterTag', tag)"
          class="bg-gray-50 text-xs text-gray-600 px-4 py-1.5 rounded-full font-medium hover:bg-jobs-accent/10 hover:text-jobs-accent transition-all duration-300 border border-transparent hover:border-jobs-accent/20"
        >
          {{ tag }}
        </button>
      </div>

      <NuxtLink
        :to="job.path"
        class="mt-6 flex items-center justify-center w-full bg-white text-jobs-primary border border-jobs-primary/20 px-6 py-3 rounded-xl font-medium hover:bg-jobs-primary hover:text-white transition-all duration-300 group-hover:shadow-md space-x-2"
      >
        <span>View Details</span>
        <Icon
          name="heroicons:arrow-right"
          class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
        />
      </NuxtLink>
    </div>
  </div>
</template>
