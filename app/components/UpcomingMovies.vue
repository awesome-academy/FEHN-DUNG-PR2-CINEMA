<script setup lang="ts">
import { movies } from "~/data/sampleData";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import MovieTrailerInfo from "./MovieTrailerInfo.vue";
import { Play, TicketPlus, ChevronLeft, ChevronRight } from "lucide-vue-next";

const { t, locale } = useI18n();
const isModalOpen = ref(false);
const currentMovieIndex = ref(0);
const upcomingMovies = movies.filter((movie) => movie.status === "coming_soon");

const formatDuration = (minutes: number) => {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const selectMovie = (index: number) => {
  currentMovieIndex.value = index;
};

const currentMovieId = computed(() => {
  return upcomingMovies.length > 0
    ? upcomingMovies[currentMovieIndex.value]?.id
    : undefined;
});

const { detail: currentMovieDetail } = useMovieDetails(currentMovieId, locale);

const openTrailerModal = () => {
  isModalOpen.value = true;
};

const closeTrailerModal = () => {
  isModalOpen.value = false;
};

const handleBuyTicketsFromModal = (movieId: number) => {
  console.log("Buy tickets for movie ID:", movieId);
  closeTrailerModal();
};

const modules = [Navigation, FreeMode];
</script>

<template>
  <div class="bg-black text-white pb-20">
    <div class="container overflow-hidden">
      <h2 class="text-2xl font-bold mb-6">{{ t("upcomingMovies.title") }}</h2>
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
        <SwiperSlide v-for="(movie, index) in upcomingMovies" :key="movie.id">
          <div
            @click="selectMovie(index)"
            class="group cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <div class="relative rounded-md overflow-hidden">
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

  <MovieTrailerInfo
    :is-open="isModalOpen"
    :movie="currentMovieDetail"
    @close="closeTrailerModal"
    @buy-tickets="handleBuyTicketsFromModal"
  />
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
