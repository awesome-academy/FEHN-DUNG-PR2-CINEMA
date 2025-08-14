<script setup lang="ts">
import { ref, computed } from "vue";
import { useAdminManageCinemas } from "~/composables/useAdminManageCinemas";
import {
  Armchair,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Building2,
  ScreenShare,
  Users,
} from "lucide-vue-next";

const {
  // Seat filter states
  selectedCinemaForSeats,
  selectedScreenForSeats,
  selectedSeatType,
  selectedAvailabilityStatus,
  seatCurrentPage,
  seatsPerPage,
  // Computed values
  filteredSeats,
  paginatedSeats,
  totalSeatPages,
  availableSeatCinemas,
  availableScreensForSeats,
  availableSeatTypes,
  // Functions
  setSelectedCinemaForSeats,
  setSelectedScreenForSeats,
  setSelectedSeatType,
  setSelectedAvailabilityStatus,
  setSeatCurrentPage,
  resetSeatFilters,
} = useAdminManageCinemas();

const getSeatTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    standard: "bg-blue-100 text-blue-800",
    vip: "bg-yellow-100 text-yellow-800",
    couple: "bg-pink-100 text-pink-800",
  };
  return colors[type] || "bg-gray-100 text-gray-800";
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const selectedCinemaName = computed(() => {
  if (!selectedCinemaForSeats.value) return "";
  const cinema = availableSeatCinemas.value.find(
    (c) => c.id === Number(selectedCinemaForSeats.value)
  );
  return cinema ? cinema.translatedName.en : "";
});

const selectedScreenName = computed(() => {
  if (!selectedScreenForSeats.value) return "";
  const screen = availableScreensForSeats.value.find(
    (s) => s.id === Number(selectedScreenForSeats.value)
  );
  return screen ? screen.name : "";
});

const canShowSeats = computed(() => {
  return selectedCinemaForSeats.value && selectedScreenForSeats.value;
});

const shouldHideCinemaColumn = computed(() => {
  return canShowSeats.value; // Hide cinema column when both cinema and screen are selected
});

const shouldHideScreenColumn = computed(() => {
  return canShowSeats.value; // Hide screen column when both cinema and screen are selected
});
</script>

<template>
  <div class="space-y-6 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl md:text-3xl font-bold text-white">
        Seat Configuration
      </h1>
    </div>

    <!-- Cinema Selector -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <Building2 class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">Step 1: Select Cinema</h3>
          <span class="text-sm text-red-400"> (Required) </span>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 flex-1 lg:max-w-xl">
          <!-- Cinema Selector -->
          <div class="relative flex-1">
            <select
              :value="selectedCinemaForSeats"
              @change="
                setSelectedCinemaForSeats(
                  ($event.target as HTMLInputElement)?.value || ''
                )
              "
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none"
            >
              <option value="">-- Select a Cinema --</option>
              <option
                v-for="cinema in availableSeatCinemas"
                :key="cinema.id"
                :value="cinema.id"
              >
                {{ cinema.translatedName.en }} ({{ cinema.city }})
              </option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
            >
              <ChevronRight class="h-4 w-4 text-gray-400 rotate-90" />
            </div>
          </div>

          <!-- Reset All Button -->
          <button
            @click="resetSeatFilters"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors whitespace-nowrap"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>

    <!-- Screen Selector -->
    <div
      v-if="selectedCinemaForSeats"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6"
    >
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <ScreenShare class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">Step 2: Select Screen</h3>
          <span class="text-sm text-blue-400">
            in {{ selectedCinemaName }}
          </span>
          <span class="text-sm text-red-400"> (Required) </span>
        </div>

        <div class="relative flex-1 lg:max-w-md">
          <select
            :value="selectedScreenForSeats"
            @change="
              setSelectedScreenForSeats(
                ($event.target as HTMLInputElement)?.value || ''
              )
            "
            :disabled="availableScreensForSeats.length === 0"
            :class="[
              'w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none',
              availableScreensForSeats.length === 0
                ? 'opacity-50 cursor-not-allowed'
                : '',
            ]"
          >
            <option value="">-- Select a Screen --</option>
            <option
              v-for="screen in availableScreensForSeats"
              :key="screen.id"
              :value="screen.id"
            >
              {{ screen.name }} ({{ screen.type }}, {{ screen.capacity }} seats)
            </option>
          </select>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
          >
            <ChevronRight class="h-4 w-4 text-gray-400 rotate-90" />
          </div>
        </div>
      </div>

      <div
        v-if="availableScreensForSeats.length === 0"
        class="mt-4 text-sm text-gray-400"
      >
        No screens available for the selected cinema.
      </div>
    </div>

    <!-- Seats Controls-->
    <div
      v-if="canShowSeats"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6"
    >
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <Filter class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">
            Step 3: Additional Filters
          </h3>
          <span class="text-sm text-green-400">
            for {{ selectedScreenName }} in {{ selectedCinemaName }}
          </span>
          <span class="text-sm text-gray-400"> (Optional) </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Seat Type Filter -->
          <div class="relative">
            <label class="block text-sm font-medium text-gray-300 mb-2">
              <Users class="w-4 h-4 inline mr-2" />
              Filter by Seat Type
            </label>
            <select
              :value="selectedSeatType"
              @change="
                setSelectedSeatType(
                  ($event.target as HTMLSelectElement)?.value || ''
                )
              "
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none"
            >
              <option value="">All Seat Types</option>
              <option
                v-for="type in availableSeatTypes"
                :key="type"
                :value="type"
                class="capitalize"
              >
                {{ type.charAt(0).toUpperCase() + type.slice(1) }} Seats
              </option>
            </select>
            <div
              class="absolute inset-y-0 right-0 top-6 flex items-center pr-3 pointer-events-none"
            >
              <ChevronRight class="h-4 w-4 text-gray-400 rotate-90" />
            </div>
          </div>

          <!-- Availability Filter -->
          <div class="relative">
            <label class="block text-sm font-medium text-gray-300 mb-2">
              <Armchair class="w-4 h-4 inline mr-2" />
              Filter by Availability
            </label>
            <select
              :value="selectedAvailabilityStatus"
              @change="
                setSelectedAvailabilityStatus(
                  ($event.target as HTMLInputElement)?.value || ''
                )
              "
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none"
            >
              <option value="">All Seats</option>
              <option value="available">Available Seats</option>
              <option value="occupied">Occupied Seats</option>
            </select>
            <div
              class="absolute inset-y-0 right-0 top-6 flex items-center pr-3 pointer-events-none"
            >
              <ChevronRight class="h-4 w-4 text-gray-400 rotate-90" />
            </div>
          </div>
        </div>

        <!-- Active Filters Summary -->
        <div
          v-if="selectedSeatType || selectedAvailabilityStatus"
          class="flex flex-wrap gap-2 mt-2"
        >
          <span class="text-sm text-gray-400">Active filters:</span>
          <span
            v-if="selectedSeatType"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300"
          >
            Type:
            {{
              selectedSeatType.charAt(0).toUpperCase() +
              selectedSeatType.slice(1)
            }}
          </span>
          <span
            v-if="selectedAvailabilityStatus"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300"
          >
            Status:
            {{
              selectedAvailabilityStatus === "available"
                ? "Available"
                : "Occupied"
            }}
          </span>
        </div>

        <!-- Results Summary -->
        <div class="text-sm text-gray-400">
          Showing {{ paginatedSeats.length }} of
          {{ filteredSeats.length }} seats
          <span
            v-if="selectedSeatType || selectedAvailabilityStatus"
            class="text-blue-400"
          >
            (filtered)
          </span>
        </div>
      </div>
    </div>

    <!-- Seats Table -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg">
      <div class="p-4 md:p-6 border-b border-gray-700">
        <h2 class="text-lg md:text-xl font-semibold text-white">
          <span v-if="canShowSeats"> Seats in {{ selectedScreenName }} </span>
          <span v-else>All Seats</span>
        </h2>
        <p class="text-sm text-gray-400 mt-1">
          <span v-if="canShowSeats">
            Manage seat configurations for the selected screen
          </span>
          <span v-else>
            Please select both cinema and screen above to view seats
          </span>
        </p>
      </div>

      <!-- Content Area -->
      <div v-if="!selectedCinemaForSeats" class="p-8 text-center">
        <Building2 class="w-16 h-16 mx-auto mb-4 text-gray-600" />
        <h3 class="text-lg font-medium text-gray-300 mb-2">
          Select Cinema First
        </h3>
        <p class="text-gray-400 text-sm max-w-md mx-auto">
          Please select a cinema from the dropdown above to continue. This will
          enable the screen selection and prevent loading unnecessary data.
        </p>
      </div>

      <div v-else-if="!selectedScreenForSeats" class="p-8 text-center">
        <ScreenShare class="w-16 h-16 mx-auto mb-4 text-gray-600" />
        <h3 class="text-lg font-medium text-gray-300 mb-2">
          Select Screen Next
        </h3>
        <p class="text-gray-400 text-sm max-w-md mx-auto">
          Now select a screen from
          <span class="text-blue-400">{{ selectedCinemaName }}</span>
          to view its seat configuration. Each screen has its own unique seating
          layout.
        </p>
      </div>

      <div v-else-if="paginatedSeats.length === 0" class="p-8 text-center">
        <Armchair class="w-16 h-16 mx-auto mb-4 text-gray-600" />
        <h3 class="text-lg font-medium text-gray-300 mb-2">
          <span v-if="selectedSeatType || selectedAvailabilityStatus"
            >No seats match your filters</span
          >
          <span v-else>No seats configured</span>
        </h3>
        <p class="text-gray-400 text-sm">
          <span v-if="selectedSeatType || selectedAvailabilityStatus">
            Try adjusting your filter criteria to see more seats.
          </span>
          <span v-else>
            This screen doesn't have any seats configured yet.
          </span>
        </p>
      </div>

      <div v-else>
        <!-- Desktop Table -->
        <div class="hidden sm:block overflow-x-auto">
          <table class="w-full">
            <thead class="bg-[#0d1117]">
              <tr>
                <th
                  class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
                >
                  Seat ID
                </th>
                <th
                  class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
                >
                  Location
                </th>
                <th
                  v-if="!shouldHideScreenColumn"
                  class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden lg:table-cell"
                >
                  Screen
                </th>
                <th
                  v-if="!shouldHideCinemaColumn"
                  class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden xl:table-cell"
                >
                  Cinema
                </th>
                <th
                  class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
                >
                  Type
                </th>
                <th
                  class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
                >
                  Price
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
                v-for="seat in paginatedSeats"
                :key="seat.id"
                class="border-b border-gray-700 hover:bg-[#0d1117] transition-colors"
              >
                <td class="py-4 px-4 md:px-6">
                  <div class="text-white font-medium text-sm">
                    #{{ seat.id }}
                  </div>
                </td>
                <td class="py-4 px-4 md:px-6">
                  <div class="text-white font-medium text-sm">
                    {{ seat.row }}{{ seat.column }}
                  </div>
                  <div class="flex items-center mt-1">
                    <div
                      :class="seat.isAvailable ? 'bg-green-500' : 'bg-red-500'"
                      class="w-2 h-2 rounded-full mr-2"
                    ></div>
                    <span class="text-xs text-gray-400">
                      {{ seat.isAvailable ? "Available" : "Occupied" }}
                    </span>
                  </div>
                </td>
                <td
                  v-if="!shouldHideScreenColumn"
                  class="py-4 px-4 md:px-6 text-gray-300 text-sm hidden lg:table-cell"
                >
                  {{ seat.screenName }}
                </td>
                <td
                  v-if="!shouldHideCinemaColumn"
                  class="py-4 px-4 md:px-6 hidden xl:table-cell"
                >
                  <div class="space-y-1">
                    <div class="text-white text-sm">
                      {{ seat.cinemaTranslatedName.en }}
                    </div>
                    <div class="text-gray-400 text-xs">
                      {{ seat.cinemaTranslatedName.vi }}
                    </div>
                  </div>
                </td>
                <td class="py-4 px-4 md:px-6">
                  <span
                    :class="getSeatTypeColor(seat.type)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                  >
                    {{ seat.type }}
                  </span>
                </td>
                <td
                  class="py-4 px-4 md:px-6 text-gray-300 text-sm hidden md:table-cell"
                >
                  <div class="font-medium">
                    {{ formatPrice(seat.price) }}
                  </div>
                </td>
                <td class="py-4 px-4 md:px-6">
                  <div class="flex flex-col sm:flex-row gap-2">
                    <button
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="sm:hidden p-4 space-y-4">
          <div
            v-for="seat in paginatedSeats"
            :key="seat.id"
            class="bg-[#0d1117] border border-gray-700 rounded-lg p-4"
          >
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="text-white font-medium">Seat #{{ seat.id }}</h3>
                <p class="text-sm text-gray-300">
                  {{ seat.row }}{{ seat.column }}
                </p>
              </div>
              <span
                :class="getSeatTypeColor(seat.type)"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize"
              >
                {{ seat.type }}
              </span>
            </div>
            <div class="space-y-2">
              <div class="flex items-center">
                <div
                  :class="seat.isAvailable ? 'bg-green-500' : 'bg-red-500'"
                  class="w-2 h-2 rounded-full mr-2"
                ></div>
                <span class="text-xs text-gray-400">
                  {{ seat.isAvailable ? "Available" : "Occupied" }}
                </span>
              </div>
              <div v-if="!shouldHideCinemaColumn">
                <p class="text-sm text-white">
                  {{ seat.cinemaTranslatedName.en }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ seat.cinemaTranslatedName.vi }}
                </p>
              </div>
              <div class="flex justify-between items-center">
                <span
                  v-if="!shouldHideScreenColumn"
                  class="text-sm text-gray-300"
                  >{{ seat.screenName }}</span
                >
                <span class="text-sm font-medium text-white">{{
                  formatPrice(seat.price)
                }}</span>
              </div>
              <div class="flex gap-2 mt-3">
                <button
                  class="flex-1 px-3 py-1.5 text-xs font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  class="flex-1 px-3 py-1.5 text-xs font-medium rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div
      v-if="canShowSeats && filteredSeats.length > 0 && totalSeatPages > 1"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-400">
          <span> Page {{ seatCurrentPage }} of {{ totalSeatPages }} </span>
          <span class="ml-4"> ({{ filteredSeats.length }} total seats) </span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="setSeatCurrentPage(seatCurrentPage - 1)"
            :disabled="seatCurrentPage <= 1"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              seatCurrentPage <= 1
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-white bg-[#0d1117] border border-gray-600 hover:bg-gray-600',
            ]"
          >
            <ChevronLeft class="w-4 h-4 mr-1" />
            Previous
          </button>

          <!-- Page Numbers -->
          <div class="hidden sm:flex items-center gap-1">
            <template v-for="page in Math.min(totalSeatPages, 5)" :key="page">
              <button
                @click="setSeatCurrentPage(page)"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === seatCurrentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-[#0d1117] border border-gray-600',
                ]"
              >
                {{ page }}
              </button>
            </template>
            <span v-if="totalSeatPages > 5" class="px-2 text-gray-500"
              >...</span
            >
          </div>

          <button
            @click="setSeatCurrentPage(seatCurrentPage + 1)"
            :disabled="seatCurrentPage >= totalSeatPages"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              seatCurrentPage >= totalSeatPages
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
</template>

<style scoped></style>
