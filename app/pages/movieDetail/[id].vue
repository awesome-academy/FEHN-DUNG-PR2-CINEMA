<script setup lang="ts">
import { computed, ref } from "vue";
import {
  Star,
  Calendar,
  Clock,
  Users,
  Film,
  Archive,
  Ticket,
  ArrowLeft,
} from "lucide-vue-next";
import type { MovieResult } from "~/composables/useMovies";

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { movies: translatedMovies } = useMovies(locale);

const movieId = computed(() => parseInt(route.params.id as string));
const movie = computed<MovieResult | null>(() => {
  return translatedMovies.value.find((e) => e.id === movieId.value) || null;
});

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

function getYouTubeId(url: string) {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}

const handleBuyTickets = (movieId: number) => {
  const targetPath = localePath({
    name: "buyTickets",
    query: {
      id: movieId,
    },
  });
  router.push(targetPath);
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="min-h-screen bg-[#0d1117] text-white pb-8">
    <Navbar />

    <div v-if="movie" class="container">
      <button
        @click="goBack"
        class="flex items-center gap-2 pt-6 mb-6 text-gray-300 hover:cursor-pointer hover:text-white transition-colors"
      >
        <ArrowLeft class="w-5 h-5" />
        {{ t("movieDetail.backBtn") }}
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div class="lg:col-span-1">
          <div class="sticky top-8">
            <img
              :src="movie.posterImg"
              :alt="movie.name"
              class="w-full rounded-lg shadow-2xl object-cover aspect-[2/3]"
            />
          </div>
        </div>

        <div class="lg:col-span-2 space-y-6">
          <!-- Movie Title and Basic Info -->
          <div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              {{ movie.name }}
            </h1>

            <div class="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <div class="flex items-center gap-1">
                <Star class="w-4 h-4 text-yellow-400" />
                <span class="text-yellow-400 font-semibold">{{
                  movie.ratings
                }}</span>
                <span class="text-gray-400">/5</span>
              </div>
              <div class="flex items-center gap-1">
                <Calendar class="w-4 h-4 text-gray-400" />
                <span>{{ new Date(movie.releaseDate).getFullYear() }}</span>
              </div>
              <div class="flex items-center gap-1">
                <Clock class="w-4 h-4 text-gray-400" />
                <span>{{ formatDuration(movie.duration) }}</span>
              </div>
              <span
                class="px-3 py-1 rounded-full text-xs font-medium border"
                :class="{
                  'border-green-400 text-green-400 bg-green-400/10':
                    movie.status === 'now_showing',
                  'border-yellow-400 text-yellow-400 bg-yellow-400/10':
                    movie.status === 'coming_soon',
                  'border-gray-400 text-gray-400 bg-gray-400/10':
                    movie.status === 'ended',
                }"
              >
                {{
                  movie.status === "now_showing"
                    ? t("movieDetail.nowShowing")
                    : movie.status === "coming_soon"
                    ? t("movieDetail.comingSoon")
                    : t("movieDetail.ended")
                }}
              </span>
            </div>
          </div>

          <!-- Description -->
          <div>
            <h2 class="text-2xl font-semibold mb-3">
              {{ t("movieDetail.brief") }}
            </h2>
            <p class="text-gray-300 leading-relaxed">
              {{
                movie.description || movie.brief || "No description available."
              }}
            </p>
          </div>

          <!-- Movie Details Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Genres -->
            <div v-if="movie.genres?.length">
              <h3 class="font-semibold mb-3 flex items-center gap-2">
                <Archive class="w-5 h-5" />
                {{ t("movieDetail.genres") }}
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="genre in movie.genres"
                  :key="genre"
                  class="px-3 py-1 bg-gray-800 rounded-full text-sm hover:bg-gray-700 transition-colors"
                >
                  {{ genre }}
                </span>
              </div>
            </div>

            <!-- Release Date -->
            <div>
              <h3 class="font-semibold mb-3 flex items-center gap-2 text-lg">
                <Calendar class="w-5 h-5" />
                {{ t("movieDetail.releaseDate") }}
              </h3>
              <div class="text-gray-300">
                {{ formatReleaseDate(movie.releaseDate) }}
              </div>
            </div>

            <!-- Directors -->
            <div v-if="movie.directors?.length">
              <h3 class="font-semibold mb-3 flex items-center gap-2 text-lg">
                <Film class="w-5 h-5" />
                {{ t("movieDetail.directors") }}
              </h3>
              <div class="text-gray-300">
                {{ movie.directors.join(", ") }}
              </div>
            </div>

            <!-- Cast -->
            <div v-if="movie.casts?.length">
              <h3 class="font-semibold mb-3 flex items-center gap-2 text-lg">
                <Users class="w-5 h-5" />
                {{ t("movieDetail.cast") }}
              </h3>
              <div class="text-gray-300 space-y-1">
                <div
                  v-for="cast in movie.casts.slice(0, 8)"
                  :key="cast"
                  class="text-sm"
                >
                  {{ cast }}
                </div>
                <div
                  v-if="movie.casts.length > 8"
                  class="text-gray-400 text-sm"
                >
                  +{{ movie.casts.length - 8 }} {{ t("movie.more") || "more" }}
                </div>
              </div>
            </div>
          </div>

          <!-- Buy Tickets Button -->
          <div class="pt-4">
            <button
              @click="handleBuyTickets(movie.id)"
              :disabled="movie.status === 'ended'"
              class="flex items-center gap-3 bg-red-600 text-white hover:cursor-pointer px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
            >
              <Ticket class="w-5 h-5" />
              {{
                movie.status === "ended"
                  ? t("movieDetail.notAvailable")
                  : t("movieDetail.buyTickets")
              }}
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom - Trailer Video -->
      <div class="mt-12">
        <h2 class="text-3xl font-bold mb-6">
          {{ t("movieDetail.trailer") }}
        </h2>

        <div
          class="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
        >
          <div v-if="movie.trailer && movie.trailer.includes('youtube.com')">
            <iframe
              :src="`https://www.youtube.com/embed/${getYouTubeId(
                movie.trailer
              )}`"
              class="absolute top-0 left-0 w-full h-full"
              style="border: 0"
              allowfullscreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div v-else class="relative w-full h-full">
            <img
              :src="movie.posterImg"
              :alt="movie.name"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-black/60 flex items-center justify-center"
            >
              <div class="text-center text-white">
                <Film class="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p class="text-xl font-semibold">
                  {{
                    t("movie.trailerNotAvailable") || "Trailer not available"
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Movie Not Found -->
    <div v-else class="container mx-auto px-4 pt-8">
      <div class="text-center py-20">
        <Film class="w-20 h-20 mx-auto mb-4 opacity-50" />
        <h1 class="text-3xl font-bold mb-4">
          {{ t("movieDetail.notFound") }}
        </h1>
        <p class="text-gray-400 mb-8">
          {{ t("movieDetail.notFoundMessage") }}
        </p>
        <NuxtLink
          :to="localePath('/')"
          class="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          <ArrowLeft class="w-4 h-4" />
          {{ t("movieDetail.backToHome") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
