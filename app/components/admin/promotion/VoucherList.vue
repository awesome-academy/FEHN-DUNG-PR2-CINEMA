<script setup lang="ts">
import { useAdminManageEvents } from "~/composables/useAdminManageEvents";
import {
  Ticket,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
} from "lucide-vue-next";
import VoucherFormModal from "./VoucherFormModal.vue";
import type { Voucher } from "~~/types/type";

const {
  voucherSearchQuery,
  selectedVoucherStatus,
  selectedVoucherType,
  voucherCurrentPage,
  vouchersPerPage,
  filteredVouchers,
  paginatedVouchers,
  totalVoucherPages,
} = useAdminManageEvents();

const showCreateModal = ref(false);
const showEditModal = ref(false);
const editingVoucher = ref<Voucher | null>(null);

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "expired", label: "Expired" },
];

const typeOptions = [
  { value: "", label: "All Types" },
  { value: "percent", label: "Percentage" },
  { value: "fixed", label: "Fixed Amount" },
];

const openEditModal = (voucher: Voucher) => {
  editingVoucher.value = voucher;
  showEditModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingVoucher.value = null;
};

const getTypeLabel = (type: string) => {
  return type === "percent" ? "Percentage" : "Fixed Amount";
};

const formatValue = (voucher: Voucher) => {
  if (voucher.type === "percent") {
    return `${voucher.value}%`;
  } else {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(voucher.value);
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN");
};
</script>

<template>
  <div class="space-y-6 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl md:text-3xl font-bold text-white">
        Voucher Management
      </h1>

      <button
        @click="showCreateModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <Plus class="w-4 h-4 mr-2" />
        Add New Voucher
      </button>
    </div>

    <!-- Controls Section -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <Filter class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">
            Filter & Search Vouchers
          </h3>
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
              v-model="voucherSearchQuery"
              placeholder="Search by code or description..."
              class="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <!-- Status Filter -->
          <div class="w-full sm:w-48">
            <select
              v-model="selectedVoucherStatus"
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option
                v-for="status in statusOptions"
                :key="status.value"
                :value="status.value"
              >
                {{ status.label }}
              </option>
            </select>
          </div>

          <!-- Type Filter -->
          <div class="w-full sm:w-48">
            <select
              v-model="selectedVoucherType"
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option
                v-for="type in typeOptions"
                :key="type.value"
                :value="type.value"
              >
                {{ type.label }}
              </option>
            </select>
          </div>

          <!-- Reset Button -->
          <button
            @click="
              voucherSearchQuery = '';
              selectedVoucherStatus = '';
              selectedVoucherType = '';
            "
            class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="mt-4 text-sm text-gray-400">
        Showing {{ paginatedVouchers.length }} of
        {{ filteredVouchers.length }} vouchers
        <span
          v-if="
            voucherSearchQuery || selectedVoucherStatus || selectedVoucherType
          "
          class="text-blue-400"
        >
          (filtered)
        </span>
      </div>
    </div>

    <!-- Vouchers Table -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg">
      <div class="p-4 md:p-6 border-b border-gray-700">
        <h2 class="text-lg md:text-xl font-semibold text-white">
          All Vouchers
        </h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#0d1117]">
            <tr>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Code
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Type & Value
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Description
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Validity Period
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Usage Limit
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
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
              v-for="voucher in paginatedVouchers"
              :key="voucher.id"
              class="border-b border-gray-700 hover:bg-[#0d1117] transition-colors"
            >
              <!-- Code -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex items-center">
                  <div class="text-white font-medium text-sm md:text-base">
                    {{ voucher.code }}
                  </div>
                </div>
              </td>

              <!-- Type & Value -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="text-white text-sm md:text-base font-medium">
                  {{ formatValue(voucher) }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ getTypeLabel(voucher.type) }}
                </div>
                <div
                  v-if="voucher.maxDiscount && voucher.type === 'percent'"
                  class="text-xs text-gray-400"
                >
                  Max:
                  {{
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(voucher.maxDiscount)
                  }}
                </div>
              </td>

              <!-- Description -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="text-gray-300 text-sm md:text-base max-w-xs">
                  <div class="truncate">
                    {{ voucher.translated.en.description }}
                  </div>
                  <div class="text-xs text-gray-400 truncate">
                    {{ voucher.translated.vi.description }}
                  </div>
                </div>
              </td>

              <!-- Validity Period -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="text-gray-300 text-sm">
                  <div>{{ formatDate(voucher.validFrom) }}</div>
                  <div class="text-gray-400 text-xs">to</div>
                  <div>{{ formatDate(voucher.validTo) }}</div>
                </div>
              </td>

              <!-- Usage Limit -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="text-gray-300 text-sm">
                  {{ voucher.usageLimit || "Unlimited" }}
                </div>
              </td>

              <!-- Status -->
              <td class="py-4 px-4 md:px-6">
                <span class="text-gray-300">
                  {{
                    voucher.status.charAt(0).toUpperCase() +
                    voucher.status.slice(1)
                  }}
                </span>
              </td>

              <!-- Actions -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex flex-col sm:flex-row gap-2">
                  <button
                    @click="openEditModal(voucher)"
                    class="flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                  >
                    <Edit2 class="w-3 h-3 mr-1" />
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
            <tr v-if="paginatedVouchers.length === 0">
              <td colspan="7" class="py-8 px-4 md:px-6 text-center">
                <div class="text-gray-400">
                  <Ticket class="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p class="text-lg font-medium mb-2">No vouchers found</p>
                  <p class="text-sm">
                    {{
                      voucherSearchQuery ||
                      selectedVoucherStatus ||
                      selectedVoucherType
                        ? "Try adjusting your search criteria"
                        : "No vouchers available"
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
      v-if="totalVoucherPages > 1"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-400">
          <span>Page {{ voucherCurrentPage }} of {{ totalVoucherPages }}</span>
          <span class="ml-4"
            >({{ filteredVouchers.length }} total vouchers)</span
          >
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="voucherCurrentPage = voucherCurrentPage - 1"
            :disabled="voucherCurrentPage <= 1"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              voucherCurrentPage <= 1
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
              v-for="page in Math.min(totalVoucherPages, 5)"
              :key="page"
            >
              <button
                @click="voucherCurrentPage = page"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === voucherCurrentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-[#0d1117] border border-gray-600',
                ]"
              >
                {{ page }}
              </button>
            </template>
            <span v-if="totalVoucherPages > 5" class="px-2 text-gray-500"
              >...</span
            >
          </div>

          <button
            @click="voucherCurrentPage = voucherCurrentPage + 1"
            :disabled="voucherCurrentPage >= totalVoucherPages"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              voucherCurrentPage >= totalVoucherPages
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
  <VoucherFormModal
    :is-open="showCreateModal"
    :voucher="null"
    @close="closeCreateModal"
  />

  <VoucherFormModal
    :is-open="showEditModal"
    :voucher="editingVoucher"
    @close="closeEditModal"
  />
</template>
