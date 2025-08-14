<script setup lang="ts">
import { useAdminManageCinemas } from "~/composables/useAdminManageCinemas";
import {
  Building2,
  ScreenShare,
  Users,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
} from "lucide-vue-next";
import CreateCinemaModal from "./CreateCinemaModal.vue";
import EditCinemaModal from "./EditCinemaModal.vue";

const {
  allCinemas,
  cinemaStats,
  // Search and filter states
  cinemaSearchQuery,
  selectedCity,
  // Pagination states
  cinemaCurrentPage,
  cinemasPerPage,
  // Computed values
  filteredCinemas,
  paginatedCinemas,
  totalCinemaPages,
  availableCities,
  // Functions
  setCinemaSearchQuery,
  setSelectedCity,
  setCinemaCurrentPage,
  resetCinemaFilters,
} = useAdminManageCinemas();

const showToast = (action: string, cinemaName: string) => {
  alert(`${action} action for ${cinemaName}`);
};

const showCreateModal = ref(false);
const showEditModal = ref(false);
const editingCinema = ref(null);

const openEditModal = (cinema: any) => {
  editingCinema.value = cinema;
  showEditModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingCinema.value = null;
};
</script>

<template>
  <div class="space-y-6 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl md:text-3xl font-bold text-white">Cinema Overview</h1>

      <button
        @click="showCreateModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <Plus class="w-4 h-4 mr-2" />
        Add Cinema
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <!-- Total Cinemas -->
      <div class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm font-medium">Total Cinemas</p>
            <p class="text-2xl md:text-3xl font-bold text-white mt-1">
              {{ cinemaStats.totalCinemas }}
            </p>
          </div>
          <div class="bg-blue-500/20 p-3 rounded-lg">
            <Building2 class="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      <!-- Total Screens -->
      <div class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm font-medium">Total Screens</p>
            <p class="text-2xl md:text-3xl font-bold text-white mt-1">
              {{ cinemaStats.totalScreens }}
            </p>
          </div>
          <div class="bg-green-500/20 p-3 rounded-lg">
            <ScreenShare class="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      <!-- Total Capacity -->
      <div
        class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6 sm:col-span-2 lg:col-span-1"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm font-medium">Total Seat Capacity</p>
            <p class="text-2xl md:text-3xl font-bold text-white mt-1">
              {{ cinemaStats.totalCapacity.toLocaleString() }}
            </p>
          </div>
          <div class="bg-purple-500/20 p-3 rounded-lg">
            <Users class="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>
    </div>

    <!-- Controls Section -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <Filter class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">
            Search & Filter Cinemas
          </h3>
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
              :value="cinemaSearchQuery"
              @input="
                setCinemaSearchQuery(
                  ($event.target as HTMLInputElement)?.value || ''
                )
              "
              placeholder="Search cinemas by name..."
              class="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <!-- City Filter -->
          <div class="relative min-w-[160px]">
            <select
              :value="selectedCity"
              @change="
                setSelectedCity(
                  ($event.target as HTMLSelectElement)?.value || ''
                )
              "
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none"
            >
              <option value="">All Cities</option>
              <option v-for="city in availableCities" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
            >
              <ChevronRight class="h-4 w-4 text-gray-400 rotate-90" />
            </div>
          </div>

          <!-- Reset Button -->
          <button
            @click="resetCinemaFilters"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="mt-4 text-sm text-gray-400">
        Showing {{ paginatedCinemas.length }} of
        {{ filteredCinemas.length }} cinemas
        <span v-if="cinemaSearchQuery || selectedCity" class="text-blue-400">
          (filtered)
        </span>
      </div>
    </div>

    <!-- Cinemas Table -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg">
      <div class="p-4 md:p-6 border-b border-gray-700">
        <h2 class="text-lg md:text-xl font-semibold text-white">All Cinemas</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#0d1117]">
            <tr>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Cinema Name
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden sm:table-cell"
              >
                Address
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                City
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Screens
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
              v-for="cinema in paginatedCinemas"
              :key="cinema.id"
              class="border-b border-gray-700 hover:bg-[#0d1117] transition-colors"
            >
              <td class="py-4 px-4 md:px-6">
                <div class="space-y-1">
                  <div class="text-white font-medium text-sm md:text-base">
                    {{ cinema.translatedName.en }}
                  </div>
                  <div class="text-gray-400 text-xs md:text-sm">
                    {{ cinema.translatedName.vi }}
                  </div>
                </div>
              </td>
              <td
                class="py-4 px-4 md:px-6 text-gray-300 text-sm hidden sm:table-cell"
              >
                <div class="max-w-xs truncate">
                  {{ cinema.address }}
                </div>
              </td>
              <td
                class="py-4 px-4 md:px-6 text-gray-300 text-sm hidden md:table-cell"
              >
                {{ cinema.city }}
              </td>
              <td class="py-4 px-4 md:px-6">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {{ cinema.screenCount }} screens
                </span>
              </td>
              <td class="py-4 px-4 md:px-6">
                <div class="flex flex-col sm:flex-row gap-2">
                  <button
                    @click="openEditModal(cinema)"
                    class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    @click="showToast('Delete', cinema.translatedName.en)"
                    class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <!-- Empty State -->
            <tr v-if="paginatedCinemas.length === 0">
              <td colspan="5" class="py-8 px-4 md:px-6 text-center">
                <div class="text-gray-400">
                  <Building2 class="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p class="text-lg font-medium mb-2">No cinemas found</p>
                  <p class="text-sm">
                    {{
                      cinemaSearchQuery || selectedCity
                        ? "Try adjusting your search or filter criteria"
                        : "No cinemas available"
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
      v-if="totalCinemaPages > 1"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-400">
          <span> Page {{ cinemaCurrentPage }} of {{ totalCinemaPages }} </span>
          <span class="ml-4">
            ({{ filteredCinemas.length }} total cinemas)
          </span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="setCinemaCurrentPage(cinemaCurrentPage - 1)"
            :disabled="cinemaCurrentPage <= 1"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              cinemaCurrentPage <= 1
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-white bg-[#0d1117] border border-gray-600 hover:bg-gray-600',
            ]"
          >
            <ChevronLeft class="w-4 h-4 mr-1" />
            Previous
          </button>

          <!-- Page Numbers -->
          <div class="hidden sm:flex items-center gap-1">
            <template v-for="page in Math.min(totalCinemaPages, 5)" :key="page">
              <button
                @click="setCinemaCurrentPage(page)"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === cinemaCurrentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-[#0d1117] border border-gray-600',
                ]"
              >
                {{ page }}
              </button>
            </template>
            <span v-if="totalCinemaPages > 5" class="px-2 text-gray-500"
              >...</span
            >
          </div>

          <button
            @click="setCinemaCurrentPage(cinemaCurrentPage + 1)"
            :disabled="cinemaCurrentPage >= totalCinemaPages"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              cinemaCurrentPage >= totalCinemaPages
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

  <CreateCinemaModal :is-open="showCreateModal" @close="closeCreateModal" />

  <EditCinemaModal
    :is-open="showEditModal"
    :cinema="editingCinema"
    @close="closeEditModal"
  />
</template>

<style scoped></style>
