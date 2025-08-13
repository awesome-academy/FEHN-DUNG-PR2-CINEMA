<script setup lang="ts">
import { useAdminManageTickets } from "~/composables/useAdminManageTickets";
import {
  FileText,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  CreditCard,
  Banknote,
} from "lucide-vue-next";
import SoldInvoiceFormModal from "./SoldInvoiceFormModal.vue";

const {
  invoiceSearchQuery,
  selectedPaymentMethod,
  invoiceCurrentPage,
  invoicesPerPage,
  paginatedInvoices,
  totalInvoicePages,
  filteredInvoices,
} = useAdminManageTickets();

const showViewModal = ref(false);
const viewingInvoice = ref(null);

const openViewModal = (invoice: any) => {
  viewingInvoice.value = invoice;
  showViewModal.value = true;
};

const closeViewModal = () => {
  showViewModal.value = false;
  viewingInvoice.value = null;
};

const getPaymentMethodIcon = (method: string) => {
  return method === "cash" ? Banknote : CreditCard;
};

const getPaymentMethodColor = (method: string) => {
  return method === "cash"
    ? "bg-green-500/20 text-green-400 border-green-500/30"
    : "bg-blue-500/20 text-blue-400 border-blue-500/30";
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN");
};
</script>

<template>
  <div class="space-y-6 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl md:text-3xl font-bold text-white">
        Sold Invoice Management
      </h1>
    </div>

    <!-- Controls Section -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <Filter class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">Search Invoices</h3>
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
              v-model="invoiceSearchQuery"
              placeholder="Search by invoice code or customer name..."
              class="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <!-- Payment Method Filter -->
          <select
            v-model="selectedPaymentMethod"
            class="px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">All Payment Methods</option>
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>

          <!-- Reset Button -->
          <button
            @click="
              invoiceSearchQuery = '';
              selectedPaymentMethod = '';
            "
            class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="mt-4 text-sm text-gray-400">
        Showing {{ paginatedInvoices.length }} of
        {{ filteredInvoices.length }} invoices
        <span
          v-if="invoiceSearchQuery || selectedPaymentMethod"
          class="text-blue-400"
        >
          (filtered)
        </span>
      </div>
    </div>

    <!-- Invoices Table -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg">
      <div class="p-4 md:p-6 border-b border-gray-700">
        <h2 class="text-lg md:text-xl font-semibold text-white">
          All Invoices
        </h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#0d1117]">
            <tr>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Invoice Code
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Customer
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Staff
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Date
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Items
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Total Amount
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Payment Method
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
              v-for="invoice in paginatedInvoices"
              :key="invoice.id"
              class="border-b border-gray-700 hover:bg-[#0d1117] transition-colors"
            >
              <!-- Invoice Code -->
              <td class="py-4 px-4 md:px-6">
                <div
                  class="text-white font-medium font-mono text-sm md:text-base"
                >
                  {{ invoice.code }}
                </div>
              </td>

              <!-- Customer -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="text-gray-300 text-sm md:text-base">
                  {{ invoice.customerName }}
                </div>
              </td>

              <!-- Staff -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="text-gray-300 text-sm md:text-base">
                  {{ invoice.staffName }}
                </div>
              </td>

              <!-- Date -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="text-gray-300 text-sm md:text-base">
                  {{ formatDate(invoice.date) }}
                </div>
              </td>

              <!-- Items -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="text-gray-300 text-sm md:text-base">
                  {{ invoice.itemCount }} items
                </div>
              </td>

              <!-- Total Amount -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="text-white font-bold text-sm md:text-base">
                  {{ formatCurrency(invoice.totalAmount) }}
                </div>
              </td>

              <!-- Payment Method -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
                    getPaymentMethodColor(invoice.paymentMethod),
                  ]"
                >
                  <component
                    :is="getPaymentMethodIcon(invoice.paymentMethod)"
                    class="w-3 h-3 mr-1"
                  />
                  {{
                    invoice.paymentMethod.charAt(0).toUpperCase() +
                    invoice.paymentMethod.slice(1)
                  }}
                </span>
              </td>

              <!-- Actions -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex flex-col sm:flex-row gap-2">
                  <button
                    @click="openViewModal(invoice)"
                    class="flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                  >
                    <Eye class="w-4 h-4 mr-1" />
                    View Details
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="paginatedInvoices.length === 0">
              <td colspan="8" class="py-8 px-4 md:px-6 text-center">
                <div class="text-gray-400">
                  <FileText class="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p class="text-lg font-medium mb-2">No invoices found</p>
                  <p class="text-sm">
                    {{
                      invoiceSearchQuery || selectedPaymentMethod
                        ? "Try adjusting your search criteria"
                        : "No invoices available"
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
      v-if="totalInvoicePages > 1"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-400">
          <span>Page {{ invoiceCurrentPage }} of {{ totalInvoicePages }}</span>
          <span class="ml-4"
            >({{ filteredInvoices.length }} total invoices)</span
          >
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="invoiceCurrentPage = invoiceCurrentPage - 1"
            :disabled="invoiceCurrentPage <= 1"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              invoiceCurrentPage <= 1
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
              v-for="page in Math.min(totalInvoicePages, 5)"
              :key="page"
            >
              <button
                @click="invoiceCurrentPage = page"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === invoiceCurrentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-[#0d1117] border border-gray-600',
                ]"
              >
                {{ page }}
              </button>
            </template>
            <span v-if="totalInvoicePages > 5" class="px-2 text-gray-500"
              >...</span
            >
          </div>

          <button
            @click="invoiceCurrentPage = invoiceCurrentPage + 1"
            :disabled="invoiceCurrentPage >= totalInvoicePages"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              invoiceCurrentPage >= totalInvoicePages
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

  <SoldInvoiceFormModal
    :is-open="showViewModal"
    :invoice="viewingInvoice"
    @close="closeViewModal"
  />
</template>
