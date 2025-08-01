<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { genres } from "~/data/sampleData";
import type { Movie, Genre } from "~~/types/type";
import type { MovieResult } from "~/composables/useMovies";
import { useMovies } from "~/composables/useMovies";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Grid,
  List,
} from "lucide-vue-next";
import MovieCard from "../components/MovieCard.vue";
import MovieListItem from "../components/MovieListItem.vue";
import MovieTrailerInfo from "../components/MovieTrailerInfo.vue";
import { onClickOutside } from "@vueuse/core";

const { t, locale } = useI18n();
const { movies: translatedMovies } = useMovies(locale);

const selectedStatus = ref<"now_showing" | "coming_soon" | "ended">(
  "now_showing"
);
const searchQuery = ref("");
const selectedGenres = ref<string[]>([]);
const selectedYear = ref("");
const viewMode = ref<"grid" | "list">("grid");
const currentPage = ref(1);
const itemsPerPage = 5;
const isLoading = ref(false);
const isMovieModalOpen = ref(false);
const selectedMovie = ref<MovieResult | null>(null);
const showGenreDropdown = ref(false);
const genreDropdownRef = ref(null);

const movieStatuses: {
  key: "now_showing" | "coming_soon" | "ended";
  label: string;
}[] = [
  { key: "now_showing", label: "movies.sections.now_showing" },
  { key: "coming_soon", label: "movies.sections.coming_soon" },
  { key: "ended", label: "movies.sections.ended" },
];

const filteredMovies = computed(() => {
  let filtered = translatedMovies.value.filter(
    (movie) => movie.status === selectedStatus.value
  );

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((movie) => {
      return (
        movie.name.toLowerCase().includes(query) ||
        movie.directors.some((director) =>
          director.toLowerCase().includes(query)
        ) ||
        movie.casts.some((cast) => cast.toLowerCase().includes(query))
      );
    });
  }

  if (selectedGenres.value.length > 0) {
    filtered = filtered.filter((movie) =>
      movie.genres.some((genreName) => selectedGenres.value.includes(genreName))
    );
  }

  if (selectedYear.value) {
    filtered = filtered.filter(
      (movie) =>
        new Date(movie.releaseDate).getFullYear().toString() ===
        selectedYear.value
    );
  }

  return filtered;
});

const totalMovies = computed(() => filteredMovies.value.length);
const totalPages = computed(() => Math.ceil(totalMovies.value / itemsPerPage));

const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredMovies.value.slice(start, end);
});

const availableYears = computed(() => {
  const years = translatedMovies.value.map((movie) =>
    new Date(movie.releaseDate).getFullYear()
  );
  return [...new Set(years)].sort((a, b) => b - a);
});

const hasActiveFilters = computed(() => {
  return (
    searchQuery.value !== "" ||
    selectedGenres.value.length > 0 ||
    selectedYear.value !== ""
  );
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push("...");
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push("...");
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push("...");
      pages.push(total);
    }
  }

  return pages;
});

const getGenreName = (genre: Genre) => {
  const translation =
    genre.translations?.find((t) => t.locale === locale.value) ||
    genre.translations?.[0];
  return translation?.name || "Unknown Genre";
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedGenres.value = [];
  selectedYear.value = "";
  currentPage.value = 1;
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const openMovieModal = (movie: MovieResult) => {
  selectedMovie.value = movie;
  isMovieModalOpen.value = true;
};

const closeMovieModal = () => {
  isMovieModalOpen.value = false;
  selectedMovie.value = null;
};

onClickOutside(genreDropdownRef, () => {
  showGenreDropdown.value = false;
});

watch([selectedStatus, searchQuery, selectedGenres, selectedYear], () => {
  currentPage.value = 1;
});
</script>
<template>
  <div class="h-screen overflow-y-scroll bg-black text-white">
    <Navbar />
    <div class="container">
      <div class="mx-auto px-4 py-8">
        <div class="flex flex-col gap-8">
          <div class="flex flex-col md:flex-row md:justify-between gap-4">
            <!-- Search and Filters on Mobile -->
            <div class="flex md:hidden flex-col gap-4">
              <!-- Search Field -->
              <div class="relative w-full md:min-w-[410px]">
                <Search
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                />
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="t('movies.search.placeholder')"
                  class="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>

              <!-- Filters -->
              <div class="grid grid-cols-2 gap-4">
                <!-- Genre Filter -->
                <div class="relative col-span-1">
                  <button
                    @click="showGenreDropdown = !showGenreDropdown"
                    class="w-full flex justify-between items-center gap-2 px-2 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <div class="flex justify-center items-center gap-2">
                      <Filter class="w-4 h-4" />
                      {{ t("movies.filters.genre") }}
                    </div>
                    <ChevronDown class="w-4 h-4" />
                  </button>

                  <div
                    v-if="showGenreDropdown"
                    ref="genreDropdownRef"
                    class="absolute top-full left-0 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto"
                  >
                    <div class="p-2">
                      <label
                        v-for="genre in genres"
                        :key="genre.id"
                        class="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
                      >
                        <input
                          v-model="selectedGenres"
                          :value="getGenreName(genre)"
                          type="checkbox"
                          class="w-4 h-4 text-red-600 border-gray-600 rounded focus:ring-red-500 bg-gray-700"
                        />
                        <span class="text-sm">{{ getGenreName(genre) }}</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Year Filter -->
                <select
                  v-model="selectedYear"
                  class="col-span-1 px-4 min-w-[120px] bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-600 text-white"
                >
                  <option value="">{{ t("movies.filters.allYears") }}</option>
                  <option
                    v-for="year in availableYears"
                    :key="year"
                    :value="year.toString()"
                  >
                    {{ year }}
                  </option>
                </select>

                <!-- Clear Filters -->
                <button
                  v-if="hasActiveFilters"
                  @click="clearFilters"
                  class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <X class="w-4 h-4" />
                  {{ t("movies.filters.clear") }}
                </button>
              </div>
            </div>

            <!-- Section Bar -->
            <div class="">
              <div
                class="flex flex-col md:flex-row gap-4 justify-center md:justify-start"
              >
                <button
                  v-for="status in movieStatuses"
                  @click="selectedStatus = status.key"
                  :key="status.key"
                  :class="[
                    'px-6 py-3 rounded-full font-medium transition-all duration-300 uppercase text-[18px]',
                    selectedStatus === status.key
                      ? 'bg-red-600 text-white font-semibold shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white',
                  ]"
                >
                  {{ t(status.label) }}
                </button>
              </div>
            </div>

            <!-- Search and Filters on Desktop -->
            <div class="hidden md:flex flex-col gap-4">
              <!-- Search Field -->
              <div class="relative min-w-[410px]">
                <Search
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                />
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="t('movies.search.placeholder')"
                  class="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>

              <!-- Filters -->
              <div class="flex gap-4">
                <!-- Genre Filter -->
                <div class="relative">
                  <button
                    @click="showGenreDropdown = !showGenreDropdown"
                    class="min-w-[120px] flex justify-between items-center gap-2 px-2 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <div class="flex justify-center items-center gap-2">
                      <Filter class="w-4 h-4" />
                      {{ t("movies.filters.genre") }}
                    </div>
                    <ChevronDown class="w-4 h-4" />
                  </button>

                  <div
                    v-if="showGenreDropdown"
                    ref="genreDropdownRef"
                    class="absolute top-full left-0 mt-2 min-w-[120px] bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto"
                  >
                    <div class="p-2">
                      <label
                        v-for="genre in genres"
                        :key="genre.id"
                        class="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
                      >
                        <input
                          v-model="selectedGenres"
                          :value="getGenreName(genre)"
                          type="checkbox"
                          class="w-4 h-4 text-red-600 border-gray-600 rounded focus:ring-red-500 bg-gray-700"
                        />
                        <span class="text-sm">{{ getGenreName(genre) }}</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Year Filter -->
                <select
                  v-model="selectedYear"
                  class="px-4 min-w-[120px] bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-600 text-white"
                >
                  <option value="">{{ t("movies.filters.allYears") }}</option>
                  <option
                    v-for="year in availableYears"
                    :key="year"
                    :value="year.toString()"
                  >
                    {{ year }}
                  </option>
                </select>

                <!-- Clear Filters -->
                <button
                  v-if="hasActiveFilters"
                  @click="clearFilters"
                  class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <X class="w-4 h-4" />
                  {{ t("movies.filters.clear") }}
                </button>
              </div>
            </div>
          </div>
          <!-- Movies Grid -->
          <div class="">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold">
                {{ t(`movies.sections.${selectedStatus}`) }}
                <span class="text-gray-400 text-lg ml-2"
                  >({{ totalMovies }})</span
                >
              </h2>

              <!-- View Toggle -->
              <div class="flex gap-2">
                <button
                  @click="viewMode = 'grid'"
                  :class="[
                    'p-2 rounded-lg transition-colors',
                    viewMode === 'grid'
                      ? 'bg-red-600'
                      : 'bg-gray-800 hover:bg-gray-700',
                  ]"
                >
                  <Grid class="w-5 h-5" />
                </button>
                <button
                  @click="viewMode = 'list'"
                  :class="[
                    'p-2 rounded-lg transition-colors',
                    viewMode === 'list'
                      ? 'bg-red-600'
                      : 'bg-gray-800 hover:bg-gray-700',
                  ]"
                >
                  <List class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Loading State -->
            <div
              v-if="isLoading"
              class="flex justify-center items-center py-20"
            >
              <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"
              ></div>
            </div>

            <!-- No Results -->
            <div
              v-else-if="filteredMovies.length === 0"
              class="text-center py-20"
            >
              <div class="text-gray-400 text-lg mb-4">
                {{ t("movies.noResults") }}
              </div>
              <button
                @click="clearFilters"
                class="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                {{ t("movies.filters.clear") }}
              </button>
            </div>

            <!-- Grid View -->
            <div
              v-else-if="viewMode === 'grid'"
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              <MovieCard
                v-for="movie in paginatedMovies"
                :key="movie.id"
                :movie="movie"
                @click="openMovieModal(movie)"
              />
            </div>

            <!-- List View -->
            <div v-else class="space-y-4">
              <MovieListItem
                v-for="movie in paginatedMovies"
                :key="movie.id"
                :movie="movie"
                @click="openMovieModal(movie)"
              />
            </div>
          </div>

          <!-- Pagination -->
          <div
            v-if="totalPages > 1"
            class="flex justify-center items-center gap-2"
          >
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage <= 1"
              class="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft class="w-5 h-5" />
            </button>

            <template v-for="page in visiblePages" :key="page">
              <button
                v-if="page !== '...'"
                @click="goToPage(page as number)"
                :class="[
                  'px-3 py-2 rounded-lg transition-colors',
                  currentPage === page
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700',
                ]"
              >
                {{ page }}
              </button>
              <span v-else class="px-3 py-2 text-gray-500">...</span>
            </template>

            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage >= totalPages"
              class="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <MovieTrailerInfo
      :is-open="isMovieModalOpen"
      :movie="selectedMovie"
      @close="closeMovieModal"
    />
  </div>
</template>

<style scoped></style>
