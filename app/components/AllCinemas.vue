<script setup lang="ts">
import type { CinemaResult } from "~/composables/useCinemas";

interface Props {
  cinemas: CinemaResult[];
  selectedCity: string;
}

interface Emits {
  (e: "select-cinema", cinema: CinemaResult): void;
}

const { t, locale } = useI18n();
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectCinema = (cinema: CinemaResult) => {
  emit("select-cinema", cinema);
};
</script>

<template>
  <div class="mb-8 animate-fade-in">
    <h2 class="text-2xl font-semibold mb-6 text-center">
      {{ t("allCinemas.title") }} {{ selectedCity }}
    </h2>

    <div v-if="cinemas.length === 0" class="text-center text-gray-400 py-8">
      {{ t("allCinemas.not_found") }} {{ selectedCity }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="cinema in cinemas"
        :key="cinema.id"
        @click="selectCinema(cinema)"
        class="bg-gray-800 rounded-lg p-6 border border-gray-700 cursor-pointer transition-all duration-300 hover:bg-gray-700 hover:border-gray-600 hover:scale-105 hover:shadow-lg"
      >
        <h3 class="text-xl font-bold mb-3 text-blue-400">{{ cinema.name }}</h3>
        <p class="text-gray-300 mb-3 line-clamp-3">{{ cinema.description }}</p>
        <div class="text-sm text-gray-400">
          <p class="mb-1">
            <span class="font-medium">{{ t("allCinemas.address") }}:</span>
            {{ cinema.address }}
          </p>
          <p>
            <span class="font-medium">{{ t("allCinemas.city") }}:</span>
            {{ cinema.city }}
          </p>
        </div>
        <div class="mt-4 text-blue-400 text-sm font-medium">
          {{ t("allCinemas.viewDetailsBtn") }} →
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
