<script setup lang="ts">
import { useAdminManageMovies } from "~/composables/useAdminManageMovies";
import {
  Film,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
} from "lucide-vue-next";
import MovieFormModal from "./MovieFormModal.vue";

const {
  movieSearchQuery,
  selectedGenre,
  selectedStatus,
  movieCurrentPage,
  moviesPerPage,
  paginatedMovies,
  totalMoviePages,
  allGenres,
  filteredMovies,
} = useAdminManageMovies();

const showCreateModal = ref(false);
const showEditModal = ref(false);
const editingMovie = ref(null);

const openEditModal = (movie: any) => {
  editingMovie.value = movie;
  showEditModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingMovie.value = null;
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "now_showing":
      return "bg-green-100 text-green-800";
    case "coming_soon":
      return "bg-blue-100 text-blue-800";
    case "ended":
      return "bg-red-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "now_showing":
      return "Now Showing";
    case "coming_soon":
      return "Coming Soon";
    case "ended":
      return "Ended";
    default:
      return status;
  }
};

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};
</script>

<template>
  <div class="space-y-6 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl md:text-3xl font-bold text-white">Movie Management</h1>

      <button
        @click="showCreateModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <Plus class="w-4 h-4 mr-2" />
        Add Movie
      </button>
    </div>

    <!-- Controls Section -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <Filter class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">Search & Filter Movies</h3>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 flex-1 lg:max-w-3xl">
          <!-- Search Input -->
          <div class="relative flex-1">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <Search class="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              v-model="movieSearchQuery"
              placeholder="Search movies by name..."
              class="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <!-- Genre Filter -->
          <div class="relative min-w-[160px]">
            <select
              v-model="selectedGenre"
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none"
            >
              <option value="">All Genres</option>
              <option
                v-for="genre in allGenres"
                :key="genre.id"
                :value="genre.id"
              >
                {{ genre.translatedName.en.name }}
              </option>
            </select>
          </div>

          <!-- Status Filter -->
          <div class="relative min-w-[140px]">
            <select
              v-model="selectedStatus"
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none"
            >
              <option value="">All Status</option>
              <option value="now_showing">Now Showing</option>
              <option value="coming_soon">Coming Soon</option>
              <option value="ended">Ended</option>
            </select>
          </div>

          <!-- Reset Button -->
          <button
            @click="
              movieSearchQuery = '';
              selectedGenre = '';
              selectedStatus = '';
            "
            class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="mt-4 text-sm text-gray-400">
        Showing {{ paginatedMovies.length }} of
        {{ filteredMovies.length }} movies
        <span
          v-if="movieSearchQuery || selectedGenre || selectedStatus"
          class="text-blue-400"
        >
          (filtered)
        </span>
      </div>
    </div>

    <!-- Movies Table -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg">
      <div class="p-4 md:p-6 border-b border-gray-700">
        <h2 class="text-lg md:text-xl font-semibold text-white">All Movies</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#0d1117]">
            <tr>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Poster
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Movie Info
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Release Date
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Status
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="movie in paginatedMovies"
              :key="movie.id"
              class="border-b border-gray-700 hover:bg-[#0d1117] transition-colors"
            >
              <!-- Poster -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div
                  class="w-12 h-16 md:w-16 md:h-20 bg-gray-700 rounded-md overflow-hidden"
                >
                  <img
                    v-if="movie.posterImg"
                    :src="movie.posterImg"
                    :alt="movie.translated.en.name"
                    class="w-full h-full object-cover"
                  />
                  <div
                    v-else
                    class="w-full h-full flex items-center justify-center"
                  >
                    <Film class="w-6 h-6 text-gray-500" />
                  </div>
                </div>
              </td>

              <!-- Movie Info -->
              <td class="py-4 px-4 md:px-6">
                <div class="space-y-1">
                  <div class="text-white font-medium text-sm md:text-base">
                    {{ movie.translated.en.name }}
                  </div>
                  <div class="text-gray-400 text-xs md:text-sm">
                    {{ movie.translated.vi.name }}
                  </div>
                  <div class="flex flex-wrap gap-1 mt-1">
                    <span
                      v-for="genre in movie.genreDetails.slice(0, 2)"
                      :key="genre.id"
                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300"
                    >
                      {{ genre.en.name }}
                    </span>
                    <span
                      v-if="movie.genreDetails.length > 2"
                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300"
                    >
                      +{{ movie.genreDetails.length - 2 }}
                    </span>
                  </div>
                  <div class="text-xs text-gray-400">
                    {{ formatDuration(movie.duration) }}
                  </div>
                </div>
              </td>

              <!-- Release Date -->
              <td
                class="py-4 px-4 md:px-6 text-gray-300 text-sm hidden md:table-cell"
              >
                {{ new Date(movie.releaseDate).toLocaleDateString() }}
              </td>

              <!-- Status -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getStatusBadgeClass(movie.status),
                  ]"
                >
                  {{ getStatusLabel(movie.status) }}
                </span>
              </td>

              <!-- Actions -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex flex-col sm:flex-row gap-2">
                  <button
                    @click="openEditModal(movie)"
                    class="flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    class="flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="paginatedMovies.length === 0">
              <td colspan="5" class="py-8 px-4 md:px-6 text-center">
                <div class="text-gray-400">
                  <Film class="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p class="text-lg font-medium mb-2">No movies found</p>
                  <p class="text-sm">
                    {{
                      movieSearchQuery || selectedGenre || selectedStatus
                        ? "Try adjusting your search or filter criteria"
                        : "No movies available"
                    }}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div
      v-if="totalMoviePages > 1"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-400">
          <span>Page {{ movieCurrentPage }} of {{ totalMoviePages }}</span>
          <span class="ml-4">({{ filteredMovies.length }} total movies)</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="movieCurrentPage = movieCurrentPage - 1"
            :disabled="movieCurrentPage <= 1"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              movieCurrentPage <= 1
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-white bg-[#0d1117] border border-gray-600 hover:bg-gray-600',
            ]"
          >
            <ChevronLeft class="w-4 h-4 mr-1" />
            Previous
          </button>

          <!-- Page Numbers -->
          <div class="hidden sm:flex items-center gap-1">
            <template v-for="page in Math.min(totalMoviePages, 5)" :key="page">
              <button
                @click="movieCurrentPage = page"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === movieCurrentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-[#0d1117] border border-gray-600',
                ]"
              >
                {{ page }}
              </button>
            </template>
            <span v-if="totalMoviePages > 5" class="px-2 text-gray-500"
              >...</span
            >
          </div>

          <button
            @click="movieCurrentPage = movieCurrentPage + 1"
            :disabled="movieCurrentPage >= totalMoviePages"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              movieCurrentPage >= totalMoviePages
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-white bg-[#0d1117] border border-gray-600 hover:bg-gray-600',
            ]"
          >
            Next
            <ChevronRight class="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <MovieFormModal
    :is-open="showCreateModal"
    :movie="null"
    @close="closeCreateModal"
  />

  <MovieFormModal
    :is-open="showEditModal"
    :movie="editingMovie"
    @close="closeEditModal"
  />
</template>
