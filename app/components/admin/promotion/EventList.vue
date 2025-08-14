<script setup lang="ts">
import { useAdminManageEvents } from "~/composables/useAdminManageEvents";
import {
  Calendar,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
} from "lucide-vue-next";
import EventFormModal from "./EventFormModal.vue";

const {
  eventSearchQuery,
  selectedEventStatus,
  selectedEventType,
  eventCurrentPage,
  eventsPerPage,
  paginatedEvents,
  totalEventPages,
  filteredEvents,
} = useAdminManageEvents();

const showCreateModal = ref(false);
const showEditModal = ref(false);
const editingEvent = ref(null);

const openEditModal = (event: any) => {
  editingEvent.value = event;
  showEditModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingEvent.value = null;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB");
};
</script>

<template>
  <div class="space-y-6 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl md:text-3xl font-bold text-white">Event Management</h1>

      <button
        @click="showCreateModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <Plus class="w-4 h-4 mr-2" />
        Add New Event
      </button>
    </div>

    <!-- Controls Section -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <Filter class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">Search & Filter Events</h3>
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
              v-model="eventSearchQuery"
              placeholder="Search events by name or code..."
              class="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <!-- Status Filter -->
          <div class="flex-shrink-0">
            <select
              v-model="selectedEventStatus"
              class="px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <!-- Type Filter -->
          <div class="flex-shrink-0">
            <select
              v-model="selectedEventType"
              class="px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">All Types</option>
              <option value="discount">Discount</option>
              <option value="combo">Combo</option>
              <option value="special_screening">Special Screening</option>
              <option value="giveaway">Giveaway</option>
            </select>
          </div>

          <!-- Reset Button -->
          <button
            @click="
              eventSearchQuery = '';
              selectedEventStatus = '';
              selectedEventType = '';
            "
            class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="mt-4 text-sm text-gray-400">
        Showing {{ paginatedEvents.length }} of
        {{ filteredEvents.length }} events
        <span
          v-if="eventSearchQuery || selectedEventStatus || selectedEventType"
          class="text-blue-400"
        >
          (filtered)
        </span>
      </div>
    </div>

    <!-- Events Table -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg">
      <div class="p-4 md:p-6 border-b border-gray-700">
        <h2 class="text-lg md:text-xl font-semibold text-white">All Events</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#0d1117]">
            <tr>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Event
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Type
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Duration
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
              v-for="event in paginatedEvents"
              :key="event.id"
              class="border-b border-gray-700 hover:bg-[#0d1117] transition-colors"
            >
              <!-- Event Info -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0 hidden md:block">
                    <img
                      :src="event.image"
                      :alt="event.translated.en.name"
                      class="w-16 h-12 object-cover rounded-md"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div
                      class="text-white font-medium text-sm md:text-base truncate"
                    >
                      {{ event.translated.en.name }}
                    </div>
                    <div class="text-gray-300 text-xs md:text-sm truncate">
                      {{ event.translated.vi.name }}
                    </div>
                    <div class="text-gray-400 text-xs mt-1">
                      Code: {{ event.code }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- Type -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium capitalize text-gray-300"
                >
                  {{ event.type.replace("_", " ") }}
                </span>
              </td>

              <!-- Duration -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="text-gray-300 text-sm">
                  <div>{{ formatDate(event.startDate) }}</div>
                  <div class="text-gray-400 text-xs">to</div>
                  <div>{{ formatDate(event.endDate) }}</div>
                </div>
              </td>

              <!-- Status -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium capitalize text-gray-300"
                >
                  {{ event.status }}
                </span>
              </td>

              <!-- Actions -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex flex-col sm:flex-row gap-2">
                  <button
                    @click="openEditModal(event)"
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
            <tr v-if="paginatedEvents.length === 0">
              <td colspan="5" class="py-8 px-4 md:px-6 text-center">
                <div class="text-gray-400">
                  <Calendar class="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p class="text-lg font-medium mb-2">No events found</p>
                  <p class="text-sm">
                    {{
                      eventSearchQuery ||
                      selectedEventStatus ||
                      selectedEventType
                        ? "Try adjusting your search criteria"
                        : "No events available"
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
      v-if="totalEventPages > 1"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-400">
          <span>Page {{ eventCurrentPage }} of {{ totalEventPages }}</span>
          <span class="ml-4">({{ filteredEvents.length }} total events)</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="eventCurrentPage = eventCurrentPage - 1"
            :disabled="eventCurrentPage <= 1"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              eventCurrentPage <= 1
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-white bg-[#0d1117] border border-gray-600 hover:bg-gray-600',
            ]"
          >
            <ChevronLeft class="w-4 h-4 mr-1" />
            Previous
          </button>

          <!-- Page Numbers -->
          <div class="hidden sm:flex items-center gap-1">
            <template v-for="page in Math.min(totalEventPages, 5)" :key="page">
              <button
                @click="eventCurrentPage = page"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === eventCurrentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-[#0d1117] border border-gray-600',
                ]"
              >
                {{ page }}
              </button>
            </template>
            <span v-if="totalEventPages > 5" class="px-2 text-gray-500"
              >...</span
            >
          </div>

          <button
            @click="eventCurrentPage = eventCurrentPage + 1"
            :disabled="eventCurrentPage >= totalEventPages"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              eventCurrentPage >= totalEventPages
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

  <EventFormModal
    :is-open="showCreateModal"
    :event="null"
    @close="closeCreateModal"
  />

  <EventFormModal
    :is-open="showEditModal"
    :event="editingEvent"
    @close="closeEditModal"
  />
</template>
