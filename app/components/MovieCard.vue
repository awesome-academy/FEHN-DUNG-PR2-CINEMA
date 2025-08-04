<script setup lang="ts">
import { computed } from "vue";
import type { MovieResult } from "~/composables/useMovies";
import { Play, Calendar, Clock } from "lucide-vue-next";

interface Props {
  movie: MovieResult;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  click: [movie: MovieResult];
}>();

const { locale } = useI18n();

const formatDuration = (minutes: number) => {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const formatReleaseDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(locale.value, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const handleClick = () => {
  emit("click", props.movie);
};
</script>

<template>
  <div
    @click="handleClick"
    class="group cursor-pointer transition-all duration-300 hover:scale-105 bg-[#161b22] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl"
  >
    <!-- Movie Poster -->
    <div class="relative overflow-hidden">
      <img
        :src="movie.posterImg"
        :alt="movie.name || 'Movie Poster'"
        class="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
      />

      <!-- Overlay with Play Button -->
      <div
        class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
      >
        <div
          class="bg-red-600 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300"
        >
          <Play class="w-6 h-6 text-white fill-current" />
        </div>
      </div>

      <!-- Status Badge -->
      <div class="absolute top-2 right-2">
        <span
          :class="[
            'px-2 py-1 text-xs font-medium rounded-full',
            movie.status === 'now_showing'
              ? 'bg-green-600 text-white'
              : movie.status === 'coming_soon'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-600 text-white',
          ]"
        >
          {{
            movie.status === "now_showing"
              ? "Now Showing"
              : movie.status === "coming_soon"
              ? "Coming Soon"
              : "Ended"
          }}
        </span>
      </div>
    </div>

    <!-- Movie Info -->
    <div class="p-4">
      <h3
        class="font-bold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors"
      >
        {{ movie.name || "Unknown Title" }}
      </h3>

      <div class="space-y-2 text-gray-400">
        <!-- Release Date -->
        <div class="flex items-center gap-2">
          <Calendar class="w-3 h-3" />
          <span>{{ formatReleaseDate(movie.releaseDate) }}</span>
        </div>

        <!-- Duration -->
        <div class="flex items-center gap-2">
          <Clock class="w-3 h-3" />
          <span>{{ formatDuration(movie.duration) }}</span>
        </div>

        <!-- Directors -->
        <div class="text-gray-500 truncate">
          <span class="font-medium">Dir:</span> {{ movie.directors.join(", ") }}
        </div>
      </div>

      <!-- Brief Description -->
      <p class="text-gray-400 mt-3 line-clamp-3 leading-relaxed">
        {{ movie?.brief || "No description available" }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
