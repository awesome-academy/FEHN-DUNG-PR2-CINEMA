<script setup lang="ts">
import type { Seat } from "~~/types/type";
import { ArrowLeft } from "lucide-vue-next";

interface Props {
  availableSeats: Seat[];
  bookedSeatIds: number[];
  selectedSeatIds: number[];
}

interface Emits {
  (e: "selectSeat", seatId: number): void;
  (e: "finish"): void;
  (e: "back"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { t } = useI18n();

const parseSeatColumnNumber = (column: string | number): number => {
  if (typeof column === "string" && column.includes("-")) {
    const first = Number(column.split("-")[0]);
    return isNaN(first) ? 0 : first;
  }
  const num = Number(column);
  return isNaN(num) ? 0 : num;
};

// Group seats by row
const seatsByRow = computed(() => {
  const groups: Record<string, Seat[]> = {};
  props.availableSeats.forEach((seat) => {
    if (!groups[seat.row]) {
      groups[seat.row] = [];
    }
    groups[seat.row]!.push(seat);
  });

  const columnNumberCache: Record<number, number> = {};
  Object.values(groups).forEach((seats) => {
    seats.forEach((seat) => {
      // If the column is a pair like "1-2", then take the first number.
      const num = parseSeatColumnNumber(seat.column);
      columnNumberCache[seat.id] = isNaN(num) ? 0 : num;
    });
  });

  Object.keys(groups).forEach((row) => {
    if (groups[row]) {
      groups[row].sort((a, b) => {
        const numA = columnNumberCache[a.id] ?? 0;
        const numB = columnNumberCache[b.id] ?? 0;
        // If both are numbers, sort by number.
        if (!isNaN(numA) && !isNaN(numB)) {
          return numA - numB;
        }
        // If not numbers, sort as strings.
        return a.column.localeCompare(b.column);
      });
    }
  });

  return groups;
});

const sortedRows = computed(() => {
  return Object.keys(seatsByRow.value).sort();
});

const isSeatBooked = (seatId: number) => {
  return props.bookedSeatIds.includes(seatId);
};

const isSeatSelected = (seatId: number) => {
  return props.selectedSeatIds.includes(seatId);
};

const getSeatClass = (seat: Seat) => {
  const baseClass =
    "w-8 h-8 rounded-t-lg border-2 transition-all duration-200 flex items-center justify-center text-xs font-medium cursor-pointer";

  if (isSeatBooked(seat.id)) {
    return `${baseClass} bg-red-500 border-red-500 text-white cursor-not-allowed`;
  }

  if (isSeatSelected(seat.id)) {
    return `${baseClass} bg-blue-500 border-blue-500 text-white transform scale-110`;
  }

  switch (seat.type) {
    case "vip":
      return `${baseClass} bg-yellow-600/20 border-yellow-600 text-yellow-400 hover:bg-yellow-600/40`;
    case "couple":
      return `${baseClass} bg-pink-600/20 border-pink-600 text-pink-400 hover:bg-pink-600/40`;
    default:
      return `${baseClass} bg-gray-600/20 border-gray-600 text-gray-400 hover:bg-gray-600/40`;
  }
};

const getSeatTypeLabel = (type: Seat["type"]) => {
  const labels = {
    standard: t("buyTickets.seatTypes.standard"),
    vip: t("buyTickets.seatTypes.vip"),
    couple: t("buyTickets.seatTypes.couple"),
  };
  return labels[type];
};

const totalSelectedPrice = computed(() => {
  return props.availableSeats
    .filter((seat) => props.selectedSeatIds.includes(seat.id))
    .reduce((total, seat) => total + seat.price, 0);
});

const handleSeatClick = (seat: Seat) => {
  if (!isSeatBooked(seat.id)) {
    emit("selectSeat", seat.id);
  }
};

const handleFinish = () => {
  if (props.selectedSeatIds.length > 0) {
    emit("finish");
  }
};

const handleBack = () => {
  emit("back");
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
</script>

<template>
  <div class="bg-[#161b22] rounded-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">{{ t("buyTickets.selectSeat.title") }}</h2>
      <button
        @click="handleBack"
        class="flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        {{ t("buyTickets.common.back") }}
      </button>
    </div>

    <!-- Screen Indicator -->
    <div class="mb-8">
      <div class="bg-blue-700 h-3 rounded-lg mb-2"></div>
      <p class="text-center text-sm text-gray-400">
        {{ t("buyTickets.selectSeat.screen") }}
      </p>
    </div>

    <!-- Seat Map -->
    <div class="mb-8 overflow-x-auto">
      <div class="min-w-fit mx-auto">
        <div
          v-for="row in sortedRows"
          :key="row"
          class="flex items-center justify-center mb-3"
        >
          <!-- Row Label -->
          <div class="w-8 text-center text-sm font-medium text-gray-400 mr-4">
            {{ row }}
          </div>

          <!-- Seats in Row -->
          <div class="flex space-x-2">
            <button
              v-for="seat in seatsByRow[row]"
              :key="seat.id"
              :class="getSeatClass(seat)"
              :disabled="isSeatBooked(seat.id)"
              :title="`${seat.row}${seat.column} - ${getSeatTypeLabel(
                seat.type
              )} - ${formatPrice(seat.price)}`"
              @click="handleSeatClick(seat)"
            >
              {{ seat.column }}
            </button>
          </div>

          <!-- Row Label (right) -->
          <div class="w-8 text-center text-sm font-medium text-gray-400 ml-4">
            {{ row }}
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="mb-6 p-4 bg-gray-800/50 rounded-lg">
      <h3 class="text-sm font-medium mb-3">
        {{ t("buyTickets.selectSeat.legend") }}
      </h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div class="flex items-center">
          <div
            class="w-4 h-4 bg-gray-600/20 border-2 border-gray-600 rounded-t mr-2"
          ></div>
          <span class="text-gray-400">{{
            t("buyTickets.seatTypes.standard")
          }}</span>
        </div>
        <div class="flex items-center">
          <div
            class="w-4 h-4 bg-yellow-600/20 border-2 border-yellow-600 rounded-t mr-2"
          ></div>
          <span class="text-yellow-400">{{
            t("buyTickets.seatTypes.vip")
          }}</span>
        </div>
        <div class="flex items-center">
          <div
            class="w-4 h-4 bg-pink-600/20 border-2 border-pink-600 rounded-t mr-2"
          ></div>
          <span class="text-pink-400">{{
            t("buyTickets.seatTypes.couple")
          }}</span>
        </div>
        <div class="flex items-center">
          <div
            class="w-4 h-4 bg-red-500 border-2 border-red-500 rounded-t mr-2"
          ></div>
          <span class="text-red-400">{{
            t("buyTickets.selectSeat.booked")
          }}</span>
        </div>
        <div class="flex items-center">
          <div
            class="w-4 h-4 bg-blue-500 border-2 border-blue-500 rounded-t mr-2"
          ></div>
          <span class="text-blue-400">{{
            t("buyTickets.selectSeat.selected")
          }}</span>
        </div>
      </div>
    </div>

    <!-- Selected Seats Summary -->
    <div
      v-if="selectedSeatIds.length > 0"
      class="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-medium text-blue-400 mb-2">
            {{ t("buyTickets.selectSeat.selectedSeats") }} ({{
              selectedSeatIds.length
            }})
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="seat in availableSeats.filter((s) =>
                selectedSeatIds.includes(s.id)
              )"
              :key="seat.id"
              class="px-2 py-1 bg-blue-500/20 text-blue-400 text-sm rounded"
            >
              {{ seat.row }}{{ seat.column }}
            </span>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-400">
            {{ t("buyTickets.selectSeat.totalPrice") }}
          </p>
          <p class="text-xl font-bold text-blue-400">
            {{ formatPrice(totalSelectedPrice) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Continue Button -->
    <div class="flex justify-end">
      <button
        @click="handleFinish"
        :disabled="selectedSeatIds.length === 0"
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
      >
        {{ t("buyTickets.selectSeat.continue") }}
        <Icon name="lucide:arrow-right" class="w-4 h-4 ml-2 inline" />
      </button>
    </div>
  </div>
</template>
