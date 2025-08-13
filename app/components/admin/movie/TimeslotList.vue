<script setup lang="ts">
import { useAdminManageMovies } from "~/composables/useAdminManageMovies";
import {
  Clock,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
} from "lucide-vue-next";
import TimeslotFormModal from "./TimeslotFormModal.vue";

const {
  timeslotSearchQuery,
  selectedDateFilter,
  timeslotCurrentPage,
  timeslotsPerPage,
  availableDates,
  filteredTimeSlots,
  paginatedTimeSlots,
  totalTimeslotPages,
} = useAdminManageMovies();

const showCreateModal = ref(false);
const showEditModal = ref(false);
const editingTimeslot = ref(null);

const openEditModal = (timeslot: any) => {
  editingTimeslot.value = timeslot;
  showEditModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingTimeslot.value = null;
};

const resetFilters = () => {
  timeslotSearchQuery.value = "";
  selectedDateFilter.value = "";
};

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  } catch {
    return dateString;
  }
};

const formatTime = (timeString: string) => {
  try {
    const [hours, minutes] = timeString.split(":");
    const time = new Date();
    time.setHours(parseInt(hours as string), parseInt(minutes as string));
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return timeString;
  }
};
</script>

<template>
  <div class="space-y-6 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl md:text-3xl font-bold text-white">
        Timeslot Management
      </h1>

      <button
        @click="showCreateModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <Plus class="w-4 h-4 mr-2" />
        Add Timeslot
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
              v-model="timeslotSearchQuery"
              placeholder="Search by time or date..."
              class="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <!-- Date Filter -->
          <select
            v-model="selectedDateFilter"
            class="px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors min-w-[200px]"
          >
            <option value="">All Dates</option>
            <option v-for="date in availableDates" :key="date" :value="date">
              {{ formatDate(date) }}
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
        Showing {{ paginatedTimeSlots.length }} of
        {{ filteredTimeSlots.length }} timeslots
        <span
          v-if="timeslotSearchQuery || selectedDateFilter"
          class="text-blue-400"
        >
          (filtered)
        </span>
      </div>
    </div>

    <!-- Timeslots Table -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg">
      <div class="p-4 md:p-6 border-b border-gray-700">
        <h2 class="text-lg md:text-xl font-semibold text-white">
          All Timeslots
        </h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#0d1117]">
            <tr>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Date
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Start Time
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                End Time
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
              v-for="timeslot in paginatedTimeSlots"
              :key="timeslot.id"
              class="border-b border-gray-700 hover:bg-[#0d1117] transition-colors"
            >
              <!-- Date -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex items-center">
                  <div class="min-w-0">
                    <div class="text-white font-medium text-sm md:text-base">
                      {{ formatDate(timeslot.date) }}
                    </div>
                    <div class="text-gray-400 text-xs">
                      {{ timeslot.date }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- Start Time -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex items-center">
                  <div
                    class="text-white text-[14px] md:text-[16px] font-medium"
                  >
                    {{ formatTime(timeslot.startTime) }}
                  </div>
                </div>
              </td>

              <!-- End Time -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex items-center">
                  <div
                    class="text-white text-[14px] md:text-[16px] font-medium"
                  >
                    {{ formatTime(timeslot.endTime) }}
                  </div>
                </div>
              </td>

              <!-- Actions -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex flex-col sm:flex-row gap-2">
                  <button
                    @click="openEditModal(timeslot)"
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
            <tr v-if="paginatedTimeSlots.length === 0">
              <td colspan="6" class="py-8 px-4 md:px-6 text-center">
                <div class="text-gray-400">
                  <Clock class="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p class="text-lg font-medium mb-2">No timeslots found</p>
                  <p class="text-sm">
                    {{
                      timeslotSearchQuery || selectedDateFilter
                        ? "Try adjusting your search criteria"
                        : "No timeslots available"
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
      v-if="totalTimeslotPages > 1"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-400">
          <span
            >Page {{ timeslotCurrentPage }} of {{ totalTimeslotPages }}</span
          >
          <span class="ml-4"
            >({{ filteredTimeSlots.length }} total timeslots)</span
          >
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="timeslotCurrentPage = timeslotCurrentPage - 1"
            :disabled="timeslotCurrentPage <= 1"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              timeslotCurrentPage <= 1
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
              v-for="page in Math.min(totalTimeslotPages, 5)"
              :key="page"
            >
              <button
                @click="timeslotCurrentPage = page"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === timeslotCurrentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-[#0d1117] border border-gray-600',
                ]"
              >
                {{ page }}
              </button>
            </template>
            <span v-if="totalTimeslotPages > 5" class="px-2 text-gray-500"
              >...</span
            >
          </div>

          <button
            @click="timeslotCurrentPage = timeslotCurrentPage + 1"
            :disabled="timeslotCurrentPage >= totalTimeslotPages"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              timeslotCurrentPage >= totalTimeslotPages
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
  <TimeslotFormModal
    :is-open="showCreateModal"
    :timeslot="null"
    @close="closeCreateModal"
  />

  <TimeslotFormModal
    :is-open="showEditModal"
    :timeslot="editingTimeslot"
    @close="closeEditModal"
  />
</template>
