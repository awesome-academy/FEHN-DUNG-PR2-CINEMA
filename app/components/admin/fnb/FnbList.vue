<script setup lang="ts">
import { useAdminManageFnbs } from "~/composables/useAdminManageFnbs";
import {
  UtensilsCrossed,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
} from "lucide-vue-next";
import FnbFormModal from "./FnbFormModal.vue";

const {
  searchQuery,
  selectedType,
  currentPage,
  itemsPerPage,
  paginatedFnbs,
  totalPages,
  filteredFnbs,
  availableFnbTypes,
} = useAdminManageFnbs();

const showCreateModal = ref(false);
const showEditModal = ref(false);
const editingFnb = ref(null);

const openEditModal = (fnb: any) => {
  editingFnb.value = fnb;
  showEditModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingFnb.value = null;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
</script>

<template>
  <div class="space-y-6 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl md:text-3xl font-bold text-white">F&B Management</h1>

      <button
        @click="showCreateModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <Plus class="w-4 h-4 mr-2" />
        Add New Item
      </button>
    </div>

    <!-- Controls Section -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <Filter class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">Search F&B Items</h3>
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
              v-model="searchQuery"
              placeholder="Search by name or code..."
              class="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <!-- Type Filter -->
          <select
            v-model="selectedType"
            class="px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">All Types</option>
            <option v-for="type in availableFnbTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>

          <!-- Reset Button -->
          <button
            @click="
              searchQuery = '';
              selectedType = '';
            "
            class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="mt-4 text-sm text-gray-400">
        Showing {{ paginatedFnbs.length }} of {{ filteredFnbs.length }} items
        <span v-if="searchQuery || selectedType" class="text-blue-400">
          (filtered)
        </span>
      </div>
    </div>

    <!-- F&B Table -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg">
      <div class="p-4 md:p-6 border-b border-gray-700">
        <h2 class="text-lg md:text-xl font-semibold text-white">
          All F&B Items
        </h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#0d1117]">
            <tr>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Image
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Name
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Code
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Type
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Size
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
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
              v-for="fnb in paginatedFnbs"
              :key="fnb.id"
              class="border-b border-gray-700 hover:bg-[#0d1117] transition-colors"
            >
              <!-- Image -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div
                  class="w-12 h-12 rounded-md overflow-hidden bg-gray-700 flex items-center justify-center"
                >
                  <img
                    v-if="fnb.image"
                    :src="fnb.image"
                    :alt="fnb.translatedName.en"
                    class="w-full h-full object-cover"
                  />
                  <UtensilsCrossed v-else class="w-6 h-6 text-gray-400" />
                </div>
              </td>

              <!-- Name -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="space-y-1">
                  <div class="text-white font-medium text-sm md:text-base">
                    {{ fnb.translatedName.en }}
                  </div>
                  <div class="text-gray-400 text-xs md:text-sm">
                    {{ fnb.translatedName.vi }}
                  </div>
                </div>
              </td>

              <!-- Code -->
              <td class="py-4 px-4 md:px-6">
                <div class="text-gray-300 text-sm md:text-base font-mono">
                  {{ fnb.code }}
                </div>
              </td>

              <!-- Type -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <span class="text-gray-300">
                  {{ fnb.type }}
                </span>
              </td>

              <!-- Size -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <span class="text-gray-300">
                  {{ fnb.size }}
                </span>
              </td>

              <!-- Price -->
              <td class="py-4 px-4 md:px-6">
                <div class="text-white font-semibold text-sm md:text-base">
                  {{ formatPrice(fnb.price) }}
                </div>
              </td>

              <!-- Actions -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex flex-col sm:flex-row gap-2">
                  <button
                    @click="openEditModal(fnb)"
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
            <tr v-if="paginatedFnbs.length === 0">
              <td colspan="8" class="py-8 px-4 md:px-6 text-center">
                <div class="text-gray-400">
                  <UtensilsCrossed
                    class="w-12 h-12 mx-auto mb-4 text-gray-600"
                  />
                  <p class="text-lg font-medium mb-2">No F&B items found</p>
                  <p class="text-sm">
                    {{
                      searchQuery || selectedType
                        ? "Try adjusting your search criteria"
                        : "No F&B items available"
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
      v-if="totalPages > 1"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-400">
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <span class="ml-4">({{ filteredFnbs.length }} total items)</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="currentPage = currentPage - 1"
            :disabled="currentPage <= 1"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              currentPage <= 1
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-white bg-[#0d1117] border border-gray-600 hover:bg-gray-600',
            ]"
          >
            <ChevronLeft class="w-4 h-4 mr-1" />
            Previous
          </button>

          <!-- Page Numbers -->
          <div class="hidden sm:flex items-center gap-1">
            <template v-for="page in Math.min(totalPages, 5)" :key="page">
              <button
                @click="currentPage = page"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-[#0d1117] border border-gray-600',
                ]"
              >
                {{ page }}
              </button>
            </template>
            <span v-if="totalPages > 5" class="px-2 text-gray-500">...</span>
          </div>

          <button
            @click="currentPage = currentPage + 1"
            :disabled="currentPage >= totalPages"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              currentPage >= totalPages
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

  <FnbFormModal
    :is-open="showCreateModal"
    :fnb="null"
    @close="closeCreateModal"
  />

  <FnbFormModal
    :is-open="showEditModal"
    :fnb="editingFnb"
    @close="closeEditModal"
  />
</template>
