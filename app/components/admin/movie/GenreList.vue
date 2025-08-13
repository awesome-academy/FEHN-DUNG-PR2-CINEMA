<script setup lang="ts">
import { useAdminManageMovies } from "~/composables/useAdminManageMovies";
import {
  Tags,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
} from "lucide-vue-next";
import GenreFormModal from "./GenreFormModal.vue";

const {
  genreSearchQuery,
  genreCurrentPage,
  genresPerPage,
  paginatedGenres,
  totalGenrePages,
  filteredGenres,
} = useAdminManageMovies();

const showCreateModal = ref(false);
const showEditModal = ref(false);
const editingGenre = ref(null);

const openEditModal = (genre: any) => {
  editingGenre.value = genre;
  showEditModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingGenre.value = null;
};
</script>

<template>
  <div class="space-y-6 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl md:text-3xl font-bold text-white">Genre Management</h1>

      <button
        @click="showCreateModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <Plus class="w-4 h-4 mr-2" />
        Add Genre
      </button>
    </div>

    <!-- Controls Section -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <Filter class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">Search Genres</h3>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 flex-1 lg:max-w-2xl">
          <!-- Search Input -->
          <div class="relative flex-1">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <Search class="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              v-model="genreSearchQuery"
              placeholder="Search genres by name..."
              class="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <!-- Reset Button -->
          <button
            @click="genreSearchQuery = ''"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="mt-4 text-sm text-gray-400">
        Showing {{ paginatedGenres.length }} of
        {{ filteredGenres.length }} genres
        <span v-if="genreSearchQuery" class="text-blue-400"> (filtered) </span>
      </div>
    </div>

    <!-- Genres Table -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg">
      <div class="p-4 md:p-6 border-b border-gray-700">
        <h2 class="text-lg md:text-xl font-semibold text-white">All Genres</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#0d1117]">
            <tr>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Genre Name (English)
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Genre Name (Vietnamese)
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Movie Count
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
              v-for="genre in paginatedGenres"
              :key="genre.id"
              class="border-b border-gray-700 hover:bg-[#0d1117] transition-colors"
            >
              <!-- Genre Name (English) -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex items-center">
                  <div>
                    <div class="text-white font-medium text-sm md:text-base">
                      {{ genre.translatedName.en.name }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- Genre Name (Vietnamese) -->
              <td class="py-4 px-4 md:px-6">
                <div class="text-gray-300 text-sm md:text-base">
                  {{ genre.translatedName.vi.name }}
                </div>
              </td>

              <!-- Movie Count -->
              <td class="py-4 px-4 md:px-6">
                <div class="text-gray-300 text-sm md:text-base">
                  {{ genre.movieCount }} movies
                </div>
              </td>

              <!-- Actions -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex flex-col sm:flex-row gap-2">
                  <button
                    @click="openEditModal(genre)"
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
            <tr v-if="paginatedGenres.length === 0">
              <td colspan="4" class="py-8 px-4 md:px-6 text-center">
                <div class="text-gray-400">
                  <Tags class="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p class="text-lg font-medium mb-2">No genres found</p>
                  <p class="text-sm">
                    {{
                      genreSearchQuery
                        ? "Try adjusting your search criteria"
                        : "No genres available"
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
      v-if="totalGenrePages > 1"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-400">
          <span>Page {{ genreCurrentPage }} of {{ totalGenrePages }}</span>
          <span class="ml-4">({{ filteredGenres.length }} total genres)</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="genreCurrentPage = genreCurrentPage - 1"
            :disabled="genreCurrentPage <= 1"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              genreCurrentPage <= 1
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-white bg-[#0d1117] border border-gray-600 hover:bg-gray-600',
            ]"
          >
            <ChevronLeft class="w-4 h-4 mr-1" />
            Previous
          </button>

          <!-- Page Numbers -->
          <div class="hidden sm:flex items-center gap-1">
            <template v-for="page in Math.min(totalGenrePages, 5)" :key="page">
              <button
                @click="genreCurrentPage = page"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === genreCurrentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-[#0d1117] border border-gray-600',
                ]"
              >
                {{ page }}
              </button>
            </template>
            <span v-if="totalGenrePages > 5" class="px-2 text-gray-500"
              >...</span
            >
          </div>

          <button
            @click="genreCurrentPage = genreCurrentPage + 1"
            :disabled="genreCurrentPage >= totalGenrePages"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              genreCurrentPage >= totalGenrePages
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

  <GenreFormModal
    :is-open="showCreateModal"
    :genre="null"
    @close="closeCreateModal"
  />

  <GenreFormModal
    :is-open="showEditModal"
    :genre="editingGenre"
    @close="closeEditModal"
  />
</template>
