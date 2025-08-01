<script setup lang="ts">
import { computed } from "vue";
import type { MovieResult } from "~/composables/useMovies";
import { Play, Calendar, Clock, Star, Users } from "lucide-vue-next";

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
    month: "long",
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
    class="group cursor-pointer bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-gray-800"
  >
    <div class="flex gap-4 p-4">
      <!-- Movie Poster -->
      <div class="relative flex-shrink-0 w-24 sm:w-32 md:w-[400px]">
        <img
          :src="movie.posterImg"
          :alt="movie.name || 'Movie Poster'"
          class="w-full h-full object-cover rounded-lg transition-transform duration-300"
        />

        <!-- Play Overlay -->
        <div
          class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg"
        >
          <div
            class="bg-red-600 rounded-full p-2 transform scale-75 group-hover:scale-100 transition-transform duration-300"
          >
            <Play class="w-4 h-4 text-white fill-current" />
          </div>
        </div>

        <!-- Status Badge -->
        <div class="absolute top-2 right-2">
          <span
            :class="[
              'px-1.5 py-0.5 text-xs font-medium rounded-full',
              movie.status === 'now_showing'
                ? 'bg-green-600 text-white'
                : movie.status === 'coming_soon'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-white',
            ]"
          >
            {{
              movie.status === "now_showing"
                ? "Now"
                : movie.status === "coming_soon"
                ? "Soon"
                : "End"
            }}
          </span>
        </div>
      </div>

      <!-- Movie Details -->
      <div class="flex flex-col gap-4">
        <!-- Title -->
        <h3
          class="font-bold text-white text-lg md:text-xl group-hover:text-red-400 transition-colors"
        >
          {{ movie.name || "Unknown Title" }}
        </h3>

        <!-- Movie Info Row -->
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <!-- Release Date -->
          <div class="flex items-center gap-1">
            <Calendar class="w-4 h-4" />
            <span>{{ formatReleaseDate(movie.releaseDate) }}</span>
          </div>

          <!-- Duration -->
          <div class="flex items-center gap-1">
            <Clock class="w-4 h-4" />
            <span>{{ formatDuration(movie.duration) }}</span>
          </div>

          <!-- Rating (if available) -->
          <div v-if="movie.ratings" class="flex items-center gap-1">
            <Star class="w-4 h-4 text-yellow-500" />
            <span>{{ movie.ratings }}/10</span>
          </div>
        </div>

        <!-- Directors -->
        <div>
          <span class="text-gray-500 font-medium">Directors:</span>
          <span class="text-gray-300 ml-2">{{
            movie.directors.join(", ")
          }}</span>
        </div>

        <!-- Cast -->
        <div>
          <div class="flex items-start gap-1">
            <Users class="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <span class="text-gray-500 font-medium">Cast:</span>
              <span class="text-gray-300 ml-2">{{
                movie.casts.slice(0, 3).join(", ")
              }}</span>
              <span v-if="movie.casts.length > 3" class="text-gray-500"
                >...</span
              >
            </div>
          </div>
        </div>

        <!-- Brief Description -->
        <p class="text-gray-400 text-sm leading-relaxed line-clamp-3">
          {{ movie?.brief || "No description available" }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
