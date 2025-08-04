<script setup lang="ts">
import type { TicketDetail } from "~/composables/useSoldInvoiceDetail";

interface Props {
  tickets: TicketDetail[];
}

const props = defineProps<Props>();

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const formatTime = (time: string) => {
  return time.substring(0, 5); // Format HH:MM from HH:MM:SS
};

const getScreenTypeLabel = (type: string) => {
  const screenTypes: Record<string, string> = {
    standard: "Standard",
    "3d": "3D",
    imax: "IMAX",
    "4dx": "4DX",
    vip: "VIP",
  };
  return screenTypes[type] || type.toUpperCase();
};
</script>

<template>
  <div class="p-6">
    <h3 class="text-lg font-semibold text-white mb-4">
      {{ $t("account.history.ticketDetails") }}
    </h3>

    <div class="space-y-4">
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="bg-[#0d1117] rounded-lg p-4 border border-gray-800"
      >
        <div class="flex flex-col lg:flex-row gap-4">
          <!-- Movie poster -->
          <div class="flex-shrink-0">
            <img
              :src="ticket.moviePoster || '/placeholder-movie.jpg'"
              :alt="ticket.movieName"
              class="w-20 h-28 object-cover rounded-lg"
            />
          </div>

          <!-- Ticket details -->
          <div class="flex-1">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Left column -->
              <div class="space-y-3">
                <div>
                  <h4 class="text-white font-semibold text-lg mb-1">
                    {{ ticket.movieName }}
                  </h4>
                  <div class="flex items-center gap-2">
                    <span
                      class="px-2 py-1 bg-yellow-600 text-white text-xs rounded"
                    >
                      {{ getScreenTypeLabel(ticket.screenType) }}
                    </span>
                  </div>
                </div>

                <div class="space-y-1">
                  <div class="text-gray-400 text-sm">
                    {{ $t("account.history.cinema") }}:
                    <span class="text-white">{{ ticket.cinemaName }}</span>
                  </div>
                  <div class="text-gray-400 text-sm">
                    {{ $t("account.history.screen") }}:
                    <span class="text-white">{{ ticket.screenName }}</span>
                  </div>
                </div>
              </div>

              <!-- Right column -->
              <div class="space-y-3">
                <div class="space-y-1">
                  <div class="text-gray-400 text-sm">
                    {{ $t("account.history.showDate") }}:
                    <span class="text-white">{{ ticket.date }}</span>
                  </div>
                  <div class="text-gray-400 text-sm">
                    {{ $t("account.history.showTime") }}:
                    <span class="text-white"
                      >{{ formatTime(ticket.startTime) }} -
                      {{ formatTime(ticket.endTime) }}</span
                    >
                  </div>
                </div>

                <div class="space-y-1">
                  <div class="text-gray-400 text-sm">
                    {{ $t("account.history.seat") }}:
                    <span class="text-white font-semibold"
                      >{{ ticket.seatRow }}{{ ticket.seatColumn }}</span
                    >
                  </div>
                  <div class="text-gray-400 text-sm">
                    {{ $t("account.history.price") }}:
                    <span class="text-white font-bold text-lg">{{
                      formatCurrency(ticket.price)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
