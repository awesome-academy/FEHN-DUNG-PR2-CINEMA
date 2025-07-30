<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { movies } from "~/data/sampleData";
import type { Movie } from "~~/types/type";
import { Play, TicketPlus, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import { useMovieDetails } from "~/composables/useMovieDetails";
import MovieTrailerInfo from "./MovieTrailerInfo.vue";

const { t, locale } = useI18n();

const currentMovieIndex = ref(0);
const isModalOpen = ref(false);

const onShowingMovies = movies.filter(
  (movie) => movie.status === "now_showing"
);

const selectMovie = (index: number) => {
  currentMovieIndex.value = index;
};

const currentMovieId = computed(() => {
  return onShowingMovies.length > 0
    ? onShowingMovies[currentMovieIndex.value]?.id
    : undefined;
});
const { detail: currentMovieDetail } = useMovieDetails(currentMovieId, locale);

const formatDuration = (minutes: number) => {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const buyTickets = () => {
  if (currentMovieDetail.value) {
    console.log("Buy tickets for:", currentMovieDetail.value.name);
  }
};

const openTrailerModal = () => {
  isModalOpen.value = true;
};

const closeTrailerModal = () => {
  isModalOpen.value = false;
};

const handleBuyTicketsFromModal = (movieId: number) => {
  console.log("Buy tickets for movie ID:", movieId);
  // Implement buy tickets logic here
  closeTrailerModal();
};

const modules = [Navigation, FreeMode];
</script>

<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Featured Movie Hero Section -->
    <div v-if="currentMovieDetail" class="relative h-screen overflow-hidden">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0">
        <img
          :src="currentMovieDetail.posterImg"
          :alt="currentMovieDetail.name"
          class="w-full h-full object-cover"
          style="background-color: #222"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"
        ></div>
      </div>

      <!-- Featured Content -->
      <div class="relative flex z-10 items-end h-full">
        <div class="max-w-[1500px] mx-auto px-8 pb-32 w-full">
          <div class="flex flex-col gap-4">
            <h1 class="text-4xl md:text-6xl font-bold drop-shadow-2xl">
              {{ currentMovieDetail.name }}
            </h1>
            <div class="flex items-center gap-4 text-sm">
              <span
                v-if="currentMovieDetail.ratings?.[0]"
                class="text-green-400 font-semibold"
              >
                {{ Math.round(currentMovieDetail.ratings[0] * 10) }}% Match
              </span>
              <span class="border border-gray-400 px-1 text-xs">
                {{
                  currentMovieDetail.status === "now_showing"
                    ? "HD"
                    : "COMING SOON"
                }}
              </span>
              <span>{{
                new Date(currentMovieDetail.releaseDate).getFullYear()
              }}</span>
              <span>{{ formatDuration(currentMovieDetail.duration) }}</span>
            </div>
            <p class="text-lg leading-relaxed max-w-md drop-shadow-lg">
              {{ currentMovieDetail.brief || "No summary available." }}
            </p>
            <div class="flex gap-4">
              <button
                @click="buyTickets"
                class="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 hover:cursor-pointer transition-colors"
              >
                <TicketPlus />
                Buy Tickets
              </button>
              <button
                @click="openTrailerModal"
                class="flex items-center gap-2 bg-gray-600/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-600/90 hover:cursor-pointer transition-colors backdrop-blur-sm"
              >
                <Play />
                More Info
              </button>
            </div>
            <div class="text-sm text-gray-300 space-y-1">
              <div>
                <span class="text-gray-500">Starring:</span>
                {{ currentMovieDetail.casts?.slice(0, 3).join(", ") || "N/A" }}
              </div>
              <div>
                <span class="text-gray-500">Genres:</span>
                {{ currentMovieDetail.genres?.join(", ") || "N/A" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Movies Carousel Section -->
    <div class="relative -mt-20 z-20 pb-20">
      <div class="max-w-[1500px] px-4 mx-auto overflow-x-hidden">
        <h2 class="text-2xl font-bold mb-6">
          {{ t("nowShowingMovies.title") }}
        </h2>
        <Swiper
          :modules="modules"
          :slides-per-view="2"
          :space-between="16"
          :navigation="{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }"
          :free-mode="true"
          :breakpoints="{
            640: { slidesPerView: 3, spaceBetween: 16 },
            768: { slidesPerView: 4, spaceBetween: 16 },
            1280: { slidesPerView: 5, spaceBetween: 20 },
          }"
          class="netflix-swiper"
        >
          <SwiperSlide
            v-for="(movie, index) in onShowingMovies"
            :key="movie.id"
          >
            <div
              @click="selectMovie(index)"
              class="group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <div class="relative rounded-md">
                <img
                  :src="movie.posterImg"
                  alt="image"
                  class="w-full h-36 sm:h-40 md:h-44 object-cover"
                />
                <div
                  @click="openTrailerModal"
                  class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <Play class="text-white" />
                </div>
                <div
                  v-if="index === currentMovieIndex"
                  class="absolute bottom-0 left-0 right-0 h-1 bg-red-600"
                ></div>
              </div>
              <div class="mt-2">
                <h3
                  class="font-medium text-sm truncate group-hover:text-white transition-colors"
                >
                  {{ movie.translations?.[0]?.name || "Unknown Title" }}
                </h3>
                <div class="text-xs text-gray-400 mt-1">
                  {{ new Date(movie.releaseDate).getFullYear() }} •
                  {{ formatDuration(movie.duration) }}
                </div>
              </div>
            </div>
          </SwiperSlide>
          <div
            class="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-black/70 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
          >
            <ChevronLeft />
          </div>
          <div
            class="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-black/70 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
          >
            <ChevronRight />
          </div>
        </Swiper>
      </div>
    </div>

    <!-- Movie Trailer Modal -->
    <MovieTrailerInfo
      :is-open="isModalOpen"
      :movie="currentMovieDetail"
      @close="closeTrailerModal"
      @buy-tickets="handleBuyTicketsFromModal"
    />
  </div>
</template>

<style scoped>
.netflix-swiper {
  overflow: visible;
  padding: 0 60px;
}

.netflix-swiper .swiper-slide {
  transition: transform 0.3s ease;
}

.netflix-swiper:hover .swiper-button-prev-custom,
.netflix-swiper:hover .swiper-button-next-custom {
  opacity: 1;
}

.netflix-swiper .swiper-button-prev-custom:hover,
.netflix-swiper .swiper-button-next-custom:hover {
  transform: scale(1.1);
}

.netflix-swiper :deep(.swiper-button-next),
.netflix-swiper :deep(.swiper-button-prev) {
  display: none;
}
</style>
