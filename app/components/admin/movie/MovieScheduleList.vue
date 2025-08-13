<script setup lang="ts">
import { useAdminManageMovies } from "~/composables/useAdminManageMovies";
import {
  Calendar,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-vue-next";
import { cinemas } from "~/data/sampleData";
import MovieScheduleFormModal from "./MovieScheduleFormModal.vue";

const {
  scheduleSearchQuery,
  selectedScheduleCinema,
  scheduleCurrentPage,
  schedulesPerPage,
  paginatedSchedules,
  totalSchedulePages,
  filteredSchedules,
  allMovieSchedules,
} = useAdminManageMovies();

const showCreateModal = ref(false);
const showEditModal = ref(false);
const editingSchedule = ref(null);

const availableCinemas = computed(() => {
  return cinemas.map((cinema) => ({
    id: cinema.id,
    name:
      cinema.translations.find((t) => t.locale === "en")?.name ||
      "Unknown Cinema",
  }));
});

const openEditModal = (schedule: any) => {
  editingSchedule.value = schedule;
  showEditModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingSchedule.value = null;
};

const resetFilters = () => {
  scheduleSearchQuery.value = "";
  selectedScheduleCinema.value = "";
};

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};
</script>

<template>
  <div class="space-y-6 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl md:text-3xl font-bold text-white">
        Schedule Management
      </h1>

      <button
        @click="showCreateModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <Plus class="w-4 h-4 mr-2" />
        Add Schedule
      </button>
    </div>

    <!-- Controls Section -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <Filter class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">Search & Filter</h3>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 flex-1 lg:max-w-4xl">
          <!-- Search Input -->
          <div class="relative flex-1">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <Search class="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              v-model="scheduleSearchQuery"
              placeholder="Search by movie name..."
              class="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <!-- Cinema Filter -->
          <select
            v-model="selectedScheduleCinema"
            class="px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors min-w-[200px]"
          >
            <option value="">All Cinemas</option>
            <option
              v-for="cinema in availableCinemas"
              :key="cinema.id"
              :value="cinema.id"
            >
              {{ cinema.name }}
            </option>
          </select>

          <!-- Reset Button -->
          <button
            @click="resetFilters"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="mt-4 text-sm text-gray-400">
        Showing {{ paginatedSchedules.length }} of
        {{ filteredSchedules.length }} schedules
        <span
          v-if="scheduleSearchQuery || selectedScheduleCinema"
          class="text-blue-400"
        >
          (filtered)
        </span>
      </div>
    </div>

    <!-- Schedules Table -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg">
      <div class="p-4 md:p-6 border-b border-gray-700">
        <h2 class="text-lg md:text-xl font-semibold text-white">
          All Schedules
        </h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#0d1117]">
            <tr>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Movie
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Cinema & Screen
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Date
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Time
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
              v-for="schedule in paginatedSchedules"
              :key="schedule.id"
              class="border-b border-gray-700 hover:bg-[#0d1117] transition-colors"
            >
              <!-- Movie -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex items-center">
                  <div class="min-w-0">
                    <div
                      class="text-white font-medium text-sm md:text-base truncate"
                    >
                      {{ schedule.movieName.en.name }}
                    </div>
                    <div class="text-gray-400 text-xs md:text-sm truncate">
                      {{ schedule.movieName.vi.name }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- Cinema & Screen -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="flex items-start">
                  <div class="min-w-0">
                    <div class="text-white font-medium text-sm">
                      {{ schedule.cinemaName.en.name }}
                    </div>
                    <div class="text-gray-400 text-xs">
                      {{ schedule.cinemaName.vi.name }}
                    </div>
                    <div class="text-blue-400 text-xs mt-1">
                      Screen: {{ schedule.screenName }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- Date -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex items-center">
                  <div class="text-white text-sm">
                    {{ formatDate(schedule.date) }}
                  </div>
                </div>
              </td>

              <!-- Time -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="flex items-center">
                  <div class="text-white text-sm">
                    {{ schedule.timeSlot }}
                  </div>
                </div>
              </td>

              <!-- Actions -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex flex-col sm:flex-row gap-2">
                  <button
                    @click="openEditModal(schedule)"
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
            <tr v-if="paginatedSchedules.length === 0">
              <td colspan="6" class="py-8 px-4 md:px-6 text-center">
                <div class="text-gray-400">
                  <Calendar class="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p class="text-lg font-medium mb-2">No schedules found</p>
                  <p class="text-sm">
                    {{
                      scheduleSearchQuery || selectedScheduleCinema
                        ? "Try adjusting your search criteria"
                        : "No schedules available"
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
      v-if="totalSchedulePages > 1"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-400">
          <span
            >Page {{ scheduleCurrentPage }} of {{ totalSchedulePages }}</span
          >
          <span class="ml-4"
            >({{ filteredSchedules.length }} total schedules)</span
          >
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="scheduleCurrentPage = scheduleCurrentPage - 1"
            :disabled="scheduleCurrentPage <= 1"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              scheduleCurrentPage <= 1
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-white bg-[#0d1117] border border-gray-600 hover:bg-gray-600',
            ]"
          >
            <ChevronLeft class="w-4 h-4 mr-1" />
            Previous
          </button>

          <!-- Page Numbers -->
          <div class="hidden sm:flex items-center gap-1">
            <template
              v-for="page in Math.min(totalSchedulePages, 5)"
              :key="page"
            >
              <button
                @click="scheduleCurrentPage = page"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === scheduleCurrentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-[#0d1117] border border-gray-600',
                ]"
              >
                {{ page }}
              </button>
            </template>
            <span v-if="totalSchedulePages > 5" class="px-2 text-gray-500"
              >...</span
            >
          </div>

          <button
            @click="scheduleCurrentPage = scheduleCurrentPage + 1"
            :disabled="scheduleCurrentPage >= totalSchedulePages"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              scheduleCurrentPage >= totalSchedulePages
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

  <!-- Modals -->
  <MovieScheduleFormModal
    :is-open="showCreateModal"
    :schedule="null"
    @close="closeCreateModal"
  />

  <MovieScheduleFormModal
    :is-open="showEditModal"
    :schedule="editingSchedule"
    @close="closeEditModal"
  />
</template>
