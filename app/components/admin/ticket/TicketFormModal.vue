<script setup lang="ts">
import { X, Ticket, MapPin, Clock, User, CreditCard } from "lucide-vue-next";

interface Props {
  isOpen: boolean;
  ticket?: any | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const handleClose = () => {
  emit("close");
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

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("vi-VN");
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    @click="handleClose"
  >
    <!-- Modal panel -->
    <div
      class="bg-[#161b22] rounded-lg border border-gray-700 shadow-xl w-full max-w-[700px] max-h-[90vh] overflow-hidden"
      @click.stop
    >
      <!-- Header -->
      <div class="bg-[#161b22] px-4 py-3 sm:px-6 border-b border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Ticket class="w-6 h-6 text-blue-400 mr-3" />
            <h3 class="text-lg leading-6 font-medium text-white">
              Ticket Details #{{ ticket?.id }}
            </h3>
          </div>
          <button
            @click="handleClose"
            class="rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Body -->
      <div
        class="bg-[#161b22] px-4 py-5 sm:p-6 overflow-y-auto max-h-[70vh]"
        v-if="ticket"
      >
        <div class="space-y-6">
          <!-- Status Badge -->
          <div class="flex justify-center">
            <span
              :class="[
                'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border',
                getStatusColor(ticket.status),
              ]"
            >
              {{
                ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)
              }}
            </span>
          </div>

          <!-- Main Information Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Movie Information -->
            <div class="bg-[#0d1117] border border-gray-600 rounded-lg p-4">
              <h4
                class="text-sm font-medium text-gray-300 mb-3 flex items-center"
              >
                <Ticket class="w-4 h-4 mr-2" />
                Movie Information
              </h4>
              <div class="space-y-3">
                <div>
                  <label class="block text-xs text-gray-400 mb-1"
                    >English Title</label
                  >
                  <p class="text-white font-medium">
                    {{ ticket.movieName.en }}
                  </p>
                </div>
                <div>
                  <label class="block text-xs text-gray-400 mb-1"
                    >Vietnamese Title</label
                  >
                  <p class="text-gray-300">{{ ticket.movieName.vi }}</p>
                </div>
              </div>
            </div>

            <!-- Customer Information -->
            <div class="bg-[#0d1117] border border-gray-600 rounded-lg p-4">
              <h4
                class="text-sm font-medium text-gray-300 mb-3 flex items-center"
              >
                <User class="w-4 h-4 mr-2" />
                Customer Information
              </h4>
              <div class="space-y-3">
                <div>
                  <label class="block text-xs text-gray-400 mb-1"
                    >Customer Name</label
                  >
                  <p class="text-white font-medium">
                    {{ ticket.customerName }}
                  </p>
                </div>
                <div>
                  <label class="block text-xs text-gray-400 mb-1"
                    >Invoice Code</label
                  >
                  <p class="text-gray-300 font-mono">
                    {{ ticket.invoiceCode }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Seat Information -->
            <div class="bg-[#0d1117] border border-gray-600 rounded-lg p-4">
              <h4
                class="text-sm font-medium text-gray-300 mb-3 flex items-center"
              >
                <MapPin class="w-4 h-4 mr-2" />
                Seat Information
              </h4>
              <div class="space-y-3">
                <div>
                  <label class="block text-xs text-gray-400 mb-1"
                    >Seat Position</label
                  >
                  <p class="text-white font-medium font-mono text-lg">
                    {{ ticket.seatInfo }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Pricing Information -->
            <div class="bg-[#0d1117] border border-gray-600 rounded-lg p-4">
              <h4
                class="text-sm font-medium text-gray-300 mb-3 flex items-center"
              >
                <CreditCard class="w-4 h-4 mr-2" />
                Pricing Information
              </h4>
              <div class="space-y-3">
                <div>
                  <label class="block text-xs text-gray-400 mb-1"
                    >Ticket Price</label
                  >
                  <p class="text-white font-bold text-lg">
                    {{ formatCurrency(ticket.price) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Booking Details -->
          <div class="bg-[#0d1117] border border-gray-600 rounded-lg p-4">
            <h4
              class="text-sm font-medium text-gray-300 mb-3 flex items-center"
            >
              <Clock class="w-4 h-4 mr-2" />
              Booking Details
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs text-gray-400 mb-1"
                  >Booking Date</label
                >
                <p class="text-gray-300">
                  {{ formatDateTime(ticket.createdAt) }}
                </p>
              </div>
              <div>
                <label class="block text-xs text-gray-400 mb-1"
                  >Ticket ID</label
                >
                <p class="text-gray-300 font-mono">#{{ ticket.id }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="bg-[#161b22] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-700"
      >
        <button
          @click="handleClose"
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-[#0d1117] text-base font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
