<script setup lang="ts">
import { computed } from "vue";
import { useAdminManageCinemas } from "~/composables/useAdminManageCinemas";
import {
  ScreenShare,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-vue-next";

const {
  // Screen filter states
  selectedCinemaForScreens,
  screenSearchQuery,
  screenCurrentPage,
  screensPerPage,
  // Computed values
  filteredScreens,
  paginatedScreens,
  totalScreenPages,
  availableScreenCinemas,
  // Functions
  setSelectedCinemaForScreens,
  setScreenSearchQuery,
  setScreenCurrentPage,
  resetScreenFilters,
} = useAdminManageCinemas();

const getScreenTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    standard: "bg-gray-100 text-gray-800",
    VIP: "bg-yellow-100 text-yellow-800",
    IMAX: "bg-blue-100 text-blue-800",
    "3D": "bg-green-100 text-green-800",
    "4D": "bg-purple-100 text-purple-800",
  };
  return colors[type] || "bg-gray-100 text-gray-800";
};

const selectedCinemaName = computed(() => {
  if (!selectedCinemaForScreens.value) return "";
  const cinema = availableScreenCinemas.value.find(
    (c) => c.id === Number(selectedCinemaForScreens.value)
  );
  return cinema ? cinema.translatedName.en : "";
});
</script>

<template>
  <div class="space-y-6 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl md:text-3xl font-bold text-white">
        Screen Management
      </h1>
    </div>

    <!-- Cinema Selector -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <Building2 class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">Select Cinema</h3>
          <span class="text-sm text-red-400"> (Required) </span>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 flex-1 lg:max-w-xl">
          <!-- Cinema Selector -->
          <div class="relative flex-1">
            <select
              :value="selectedCinemaForScreens"
              @change="
                setSelectedCinemaForScreens(
                  ($event.target as HTMLSelectElement)?.value || ''
                )
              "
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none"
            >
              <option value="">-- Select a Cinema --</option>
              <option
                v-for="cinema in availableScreenCinemas"
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

          <!-- Reset Button -->
          <button
            @click="resetScreenFilters"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Screen Controls -->
    <div
      v-if="selectedCinemaForScreens"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6"
    >
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <Filter class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">Search Screens</h3>
          <span class="text-sm text-blue-400">
            in {{ selectedCinemaName }}
          </span>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 flex-1 lg:max-w-md">
          <!-- Screen Search Input -->
          <div class="relative flex-1">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <Search class="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              :value="screenSearchQuery"
              @input="
                setScreenSearchQuery(
                  ($event.target as HTMLInputElement)?.value || ''
                )
              "
              placeholder="Search screens by name..."
              class="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="mt-4 text-sm text-gray-400">
        Showing {{ paginatedScreens.length }} of
        {{ filteredScreens.length }} screens
        <span v-if="screenSearchQuery" class="text-blue-400"> (filtered) </span>
      </div>
    </div>

    <!-- Screens Table -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg">
      <div class="p-4 md:p-6 border-b border-gray-700">
        <h2 class="text-lg md:text-xl font-semibold text-white">
          <span v-if="selectedCinemaForScreens">
            Screens in {{ selectedCinemaName }}
          </span>
          <span v-else>All Screens</span>
        </h2>
        <p class="text-sm text-gray-400 mt-1">
          <span v-if="selectedCinemaForScreens">
            Manage screens for the selected cinema
          </span>
          <span v-else> Please select a cinema above to view its screens </span>
        </p>
      </div>

      <!-- Content Area -->
      <div v-if="!selectedCinemaForScreens" class="p-8 text-center">
        <ScreenShare class="w-16 h-16 mx-auto mb-4 text-gray-600" />
        <h3 class="text-lg font-medium text-gray-300 mb-2">
          No Cinema Selected
        </h3>
        <p class="text-gray-400 text-sm max-w-md mx-auto">
          Please select a cinema from the dropdown above to view and manage its
          screens. This helps keep the interface efficient by loading only
          relevant data.
        </p>
      </div>

      <div v-else-if="paginatedScreens.length === 0" class="p-8 text-center">
        <ScreenShare class="w-16 h-16 mx-auto mb-4 text-gray-600" />
        <h3 class="text-lg font-medium text-gray-300 mb-2">
          <span v-if="screenSearchQuery">No screens found</span>
          <span v-else>No screens available</span>
        </h3>
        <p class="text-gray-400 text-sm">
          <span v-if="screenSearchQuery">
            Try adjusting your search criteria or check a different cinema.
          </span>
          <span v-else>
            This cinema doesn't have any screens configured yet.
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
                  Screen Name
                </th>
                <th
                  class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden lg:table-cell"
                >
                  Cinema Name
                </th>
                <th
                  class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
                >
                  Type
                </th>
                <th
                  class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
                >
                  Capacity
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
                v-for="screen in paginatedScreens"
                :key="screen.id"
                class="border-b border-gray-700 hover:bg-[#0d1117] transition-colors"
              >
                <td class="py-4 px-4 md:px-6">
                  <div class="text-white font-medium text-sm md:text-base">
                    {{ screen.name }}
                  </div>
                  <div class="text-xs text-gray-400 mt-1">
                    ID: {{ screen.id }}
                  </div>
                </td>
                <td class="py-4 px-4 md:px-6 hidden lg:table-cell">
                  <div class="space-y-1">
                    <div class="text-white text-sm md:text-base">
                      {{ screen.cinemaTranslatedName.en }}
                    </div>
                    <div class="text-gray-400 text-xs md:text-sm">
                      {{ screen.cinemaTranslatedName.vi }}
                    </div>
                  </div>
                </td>
                <td class="py-4 px-4 md:px-6">
                  <span
                    :class="getScreenTypeColor(screen.type)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ screen.type }}
                  </span>
                </td>
                <td
                  class="py-4 px-4 md:px-6 text-gray-300 text-sm hidden md:table-cell"
                >
                  <div class="flex items-center">
                    <span class="font-medium">{{ screen.capacity }}</span>
                    <span class="text-gray-500 ml-1">seats</span>
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
            v-for="screen in paginatedScreens"
            :key="screen.id"
            class="bg-[#0d1117] border border-gray-700 rounded-lg p-4"
          >
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="text-white font-medium">{{ screen.name }}</h3>
                <p class="text-xs text-gray-400">ID: {{ screen.id }}</p>
              </div>
              <span
                :class="getScreenTypeColor(screen.type)"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
              >
                {{ screen.type }}
              </span>
            </div>
            <div class="space-y-2">
              <div>
                <p class="text-sm text-white">
                  {{ screen.cinemaTranslatedName.en }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ screen.cinemaTranslatedName.vi }}
                </p>
              </div>
              <div class="flex items-center text-sm text-gray-300">
                <span class="font-medium">{{ screen.capacity }}</span>
                <span class="text-gray-500 ml-1">seats</span>
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
      v-if="
        selectedCinemaForScreens &&
        filteredScreens.length > 0 &&
        totalScreenPages > 1
      "
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-400">
          <span> Page {{ screenCurrentPage }} of {{ totalScreenPages }} </span>
          <span class="ml-4">
            ({{ filteredScreens.length }} total screens)
          </span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="setScreenCurrentPage(screenCurrentPage - 1)"
            :disabled="screenCurrentPage <= 1"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              screenCurrentPage <= 1
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-white bg-[#0d1117] border border-gray-600 hover:bg-gray-600',
            ]"
          >
            <ChevronLeft class="w-4 h-4 mr-1" />
            Previous
          </button>

          <!-- Page Numbers -->
          <div class="hidden sm:flex items-center gap-1">
            <template v-for="page in Math.min(totalScreenPages, 5)" :key="page">
              <button
                @click="setScreenCurrentPage(page)"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === screenCurrentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-[#0d1117] border border-gray-600',
                ]"
              >
                {{ page }}
              </button>
            </template>
            <span v-if="totalScreenPages > 5" class="px-2 text-gray-500"
              >...</span
            >
          </div>

          <button
            @click="setScreenCurrentPage(screenCurrentPage + 1)"
            :disabled="screenCurrentPage >= totalScreenPages"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              screenCurrentPage >= totalScreenPages
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
