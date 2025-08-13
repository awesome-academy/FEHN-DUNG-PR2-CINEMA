<script setup lang="ts">
import { useAdminManageTickets } from "~/composables/useAdminManageTickets";
import {
  Coffee,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-vue-next";
import SoldFnbFormModal from "./SoldFnbFormModal.vue";

const {
  soldFnbSearchQuery,
  soldFnbCurrentPage,
  soldFnbsPerPage,
  paginatedSoldFnbs,
  totalSoldFnbPages,
  filteredSoldFnbs,
} = useAdminManageTickets();

const showViewModal = ref(false);
const viewingSoldFnb = ref(null);

const openViewModal = (soldFnb: any) => {
  viewingSoldFnb.value = soldFnb;
  showViewModal.value = true;
};

const closeViewModal = () => {
  showViewModal.value = false;
  viewingSoldFnb.value = null;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
</script>

<template>
  <div class="space-y-6 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl md:text-3xl font-bold text-white">
        Sold F&B Management
      </h1>
    </div>

    <!-- Controls Section -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <Filter class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">Search Sold F&B</h3>
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
              v-model="soldFnbSearchQuery"
              placeholder="Search by F&B item name or invoice code..."
              class="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <!-- Reset Button -->
          <button
            @click="soldFnbSearchQuery = ''"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="mt-4 text-sm text-gray-400">
        Showing {{ paginatedSoldFnbs.length }} of
        {{ filteredSoldFnbs.length }} sold F&B items
        <span v-if="soldFnbSearchQuery" class="text-blue-400">
          (filtered)
        </span>
      </div>
    </div>

    <!-- Sold F&B Table -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg">
      <div class="p-4 md:p-6 border-b border-gray-700">
        <h2 class="text-lg md:text-xl font-semibold text-white">
          All Sold F&B Items
        </h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#0d1117]">
            <tr>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                ID
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                F&B Item
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Invoice
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Quantity
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Unit Price
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Total Price
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
              v-for="soldFnb in paginatedSoldFnbs"
              :key="soldFnb.id"
              class="border-b border-gray-700 hover:bg-[#0d1117] transition-colors"
            >
              <!--  ID -->
              <td class="py-4 px-4 md:px-6">
                <div class="text-white font-medium text-sm md:text-base">
                  #{{ soldFnb.id }}
                </div>
              </td>

              <!-- F&B Item -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="flex items-center gap-3">
                  <div class="flex-shrink-0">
                    <img
                      v-if="soldFnb.itemImage"
                      :src="soldFnb.itemImage"
                      :alt="soldFnb.itemName.en"
                      class="w-10 h-10 object-cover rounded-md border border-gray-600"
                    />
                    <div
                      v-else
                      class="w-10 h-10 bg-gray-700 rounded-md border border-gray-600 flex items-center justify-center"
                    >
                      <Coffee class="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div class="max-w-xs">
                    <div
                      class="text-white font-medium text-sm md:text-base truncate"
                    >
                      {{ soldFnb.itemName.en }}
                    </div>
                    <div class="text-gray-400 text-xs md:text-sm truncate">
                      {{ soldFnb.itemName.vi }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- Invoice -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="text-blue-400 font-mono text-sm md:text-base">
                  {{ soldFnb.invoiceCode }}
                </div>
              </td>

              <!-- Quantity -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="text-white font-medium text-sm md:text-base">
                  {{ soldFnb.quantity }}
                </div>
              </td>

              <!-- Unit Price -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="text-gray-300 text-sm md:text-base">
                  {{ formatCurrency(soldFnb.pricePerItem) }}
                </div>
              </td>

              <!-- Total Price -->
              <td class="py-4 px-4 md:px-6">
                <div class="text-white font-medium text-sm md:text-base">
                  {{ formatCurrency(soldFnb.totalPrice) }}
                </div>
              </td>

              <!-- Actions -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex flex-col sm:flex-row gap-2">
                  <button
                    @click="openViewModal(soldFnb)"
                    class="flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                  >
                    <Eye class="w-3 h-3 mr-1" />
                    View Details
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="paginatedSoldFnbs.length === 0">
              <td colspan="7" class="py-8 px-4 md:px-6 text-center">
                <div class="text-gray-400">
                  <Coffee class="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p class="text-lg font-medium mb-2">
                    No sold F&B items found
                  </p>
                  <p class="text-sm">
                    {{
                      soldFnbSearchQuery
                        ? "Try adjusting your search criteria"
                        : "No sold F&B items available"
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
      v-if="totalSoldFnbPages > 1"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-400">
          <span>Page {{ soldFnbCurrentPage }} of {{ totalSoldFnbPages }}</span>
          <span class="ml-4"
            >({{ filteredSoldFnbs.length }} total sold F&B items)</span
          >
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="soldFnbCurrentPage = soldFnbCurrentPage - 1"
            :disabled="soldFnbCurrentPage <= 1"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              soldFnbCurrentPage <= 1
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
              v-for="page in Math.min(totalSoldFnbPages, 5)"
              :key="page"
            >
              <button
                @click="soldFnbCurrentPage = page"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === soldFnbCurrentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-[#0d1117] border border-gray-600',
                ]"
              >
                {{ page }}
              </button>
            </template>
            <span v-if="totalSoldFnbPages > 5" class="px-2 text-gray-500"
              >...</span
            >
          </div>

          <button
            @click="soldFnbCurrentPage = soldFnbCurrentPage + 1"
            :disabled="soldFnbCurrentPage >= totalSoldFnbPages"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              soldFnbCurrentPage >= totalSoldFnbPages
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

  <SoldFnbFormModal
    :is-open="showViewModal"
    :sold-fnb="viewingSoldFnb"
    @close="closeViewModal"
  />
</template>
