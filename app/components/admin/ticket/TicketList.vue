<script setup lang="ts">
import { useAdminManageTickets } from "~/composables/useAdminManageTickets";
import {
  Ticket,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-vue-next";
import TicketFormModal from "./TicketFormModal.vue";

const {
  ticketSearchQuery,
  selectedTicketStatus,
  ticketCurrentPage,
  ticketsPerPage,
  paginatedTickets,
  totalTicketPages,
  filteredTickets,
} = useAdminManageTickets();

const showViewModal = ref(false);
const viewingTicket = ref(null);

const openViewModal = (ticket: any) => {
  viewingTicket.value = ticket;
  showViewModal.value = true;
};

const closeViewModal = () => {
  showViewModal.value = false;
  viewingTicket.value = null;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "booked":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "cancelled":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "refunded":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
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
        Ticket Management
      </h1>
    </div>

    <!-- Controls Section -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <Filter class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">Search Tickets</h3>
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
              v-model="ticketSearchQuery"
              placeholder="Search by customer name or movie..."
              class="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <!-- Status Filter -->
          <select
            v-model="selectedTicketStatus"
            class="px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">All Status</option>
            <option value="booked">Booked</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>

          <!-- Reset Button -->
          <button
            @click="
              ticketSearchQuery = '';
              selectedTicketStatus = '';
            "
            class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="mt-4 text-sm text-gray-400">
        Showing {{ paginatedTickets.length }} of
        {{ filteredTickets.length }} tickets
        <span
          v-if="ticketSearchQuery || selectedTicketStatus"
          class="text-blue-400"
        >
          (filtered)
        </span>
      </div>
    </div>

    <!-- Tickets Table -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg">
      <div class="p-4 md:p-6 border-b border-gray-700">
        <h2 class="text-lg md:text-xl font-semibold text-white">All Tickets</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#0d1117]">
            <tr>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Ticket ID
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Movie
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Customer
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Seat
              </th>
              <th
                class="text-left py-3 px-4 md:px-6 text-sm font-medium text-gray-300"
              >
                Price
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
              v-for="ticket in paginatedTickets"
              :key="ticket.id"
              class="border-b border-gray-700 hover:bg-[#0d1117] transition-colors"
            >
              <!-- Ticket ID -->
              <td class="py-4 px-4 md:px-6">
                <div class="text-white font-medium text-sm md:text-base">
                  #{{ ticket.id }}
                </div>
              </td>

              <!-- Movie -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="max-w-xs">
                  <div
                    class="text-white font-medium text-sm md:text-base truncate"
                  >
                    {{ ticket.movieName.en }}
                  </div>
                  <div class="text-gray-400 text-xs md:text-sm truncate">
                    {{ ticket.movieName.vi }}
                  </div>
                </div>
              </td>

              <!-- Customer -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="text-gray-300 text-sm md:text-base">
                  {{ ticket.customerName }}
                </div>
              </td>

              <!-- Seat -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <div class="text-gray-300 text-sm md:text-base font-mono">
                  {{ ticket.seatInfo }}
                </div>
              </td>

              <!-- Price -->
              <td class="py-4 px-4 md:px-6">
                <div class="text-white font-medium text-sm md:text-base">
                  {{ formatCurrency(ticket.price) }}
                </div>
              </td>

              <!-- Status -->
              <td class="py-4 px-4 md:px-6 hidden md:table-cell">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
                    getStatusColor(ticket.status),
                  ]"
                >
                  {{
                    ticket.status.charAt(0).toUpperCase() +
                    ticket.status.slice(1)
                  }}
                </span>
              </td>

              <!-- Actions -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex flex-col sm:flex-row gap-2">
                  <button
                    @click="openViewModal(ticket)"
                    class="flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                  >
                    <Eye class="w-3 h-3 mr-1" />
                    View Details
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="paginatedTickets.length === 0">
              <td colspan="7" class="py-8 px-4 md:px-6 text-center">
                <div class="text-gray-400">
                  <Ticket class="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p class="text-lg font-medium mb-2">No tickets found</p>
                  <p class="text-sm">
                    {{
                      ticketSearchQuery || selectedTicketStatus
                        ? "Try adjusting your search criteria"
                        : "No tickets available"
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
      v-if="totalTicketPages > 1"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-400">
          <span>Page {{ ticketCurrentPage }} of {{ totalTicketPages }}</span>
          <span class="ml-4">({{ filteredTickets.length }} total tickets)</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="ticketCurrentPage = ticketCurrentPage - 1"
            :disabled="ticketCurrentPage <= 1"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              ticketCurrentPage <= 1
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-white bg-[#0d1117] border border-gray-600 hover:bg-gray-600',
            ]"
          >
            <ChevronLeft class="w-4 h-4 mr-1" />
            Previous
          </button>

          <!-- Page Numbers -->
          <div class="hidden sm:flex items-center gap-1">
            <template v-for="page in Math.min(totalTicketPages, 5)" :key="page">
              <button
                @click="ticketCurrentPage = page"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === ticketCurrentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-[#0d1117] border border-gray-600',
                ]"
              >
                {{ page }}
              </button>
            </template>
            <span v-if="totalTicketPages > 5" class="px-2 text-gray-500"
              >...</span
            >
          </div>

          <button
            @click="ticketCurrentPage = ticketCurrentPage + 1"
            :disabled="ticketCurrentPage >= totalTicketPages"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              ticketCurrentPage >= totalTicketPages
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

  <TicketFormModal
    :is-open="showViewModal"
    :ticket="viewingTicket"
    @close="closeViewModal"
  />
</template>
