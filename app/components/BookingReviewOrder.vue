<script setup lang="ts">
import { computed } from "vue";
import type { FnbItem, Movie, Cinema, TimeSlot, Seat } from "~~/types/type";

interface Props {
  selectedMovieId: number | null;
  selectedDate: string | null;
  selectedScreenType: string | null;
  selectedCinemaId: number | null;
  selectedScheduleId: number | null;
  selectedSeatIds: number[];
  selectedFnbItems: { fnbItem: FnbItem; quantity: number }[];
  ticketsPrice: number;
  fnbPrice: number;
  totalPrice: number;
  movies: Movie[];
  cinemas: Cinema[];
  schedules: { id: number; timeSlot: TimeSlot }[];
  availableSeats: Seat[];
}

const props = defineProps<Props>();

defineEmits<{
  proceed: [];
  back: [];
}>();

const { locale } = useI18n();

function getTranslation<T extends { locale: string }>(
  translations: T[],
  locale: string
): T | undefined {
  return translations.find((t) => t.locale === locale) || translations[0];
}

const selectedMovie = computed(
  () => props.movies.find((m) => m.id === props.selectedMovieId) || null
);
const selectedCinema = computed(
  () => props.cinemas.find((c) => c.id === props.selectedCinemaId) || null
);
const selectedSchedule = computed(
  () => props.schedules.find((s) => s.id === props.selectedScheduleId) || null
);
const selectedSeats = computed(() =>
  props.availableSeats.filter((seat) => props.selectedSeatIds.includes(seat.id))
);

const movieName = computed(() =>
  selectedMovie.value
    ? getTranslation(selectedMovie.value.translations, locale.value)?.name
    : "N/A"
);
const cinemaName = computed(() =>
  selectedCinema.value
    ? getTranslation(selectedCinema.value.translations, locale.value)?.name
    : "N/A"
);
const getFnbName = (item: FnbItem) =>
  getTranslation(item.translations, locale.value)?.name || "N/A";

const scheduleTime = computed(() => {
  if (!selectedSchedule.value) return "N/A";
  const ts = selectedSchedule.value.timeSlot;
  return `${ts.startTime} - ${ts.endTime}`;
});

// Format date
const formattedDate = computed(() => {
  if (!props.selectedDate) return "N/A";
  return new Date(props.selectedDate).toLocaleDateString(
    locale.value === "vi" ? "vi-VN" : "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
});

// Format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
</script>

<template>
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-8">
      {{ $t("buyTickets.review.title") }}
    </h2>

    <div class="bg-[#161b22] rounded-lg p-6 mb-6">
      <!-- Movie Information -->
      <div class="border-b border-gray-700 pb-4 mb-4">
        <h3 class="text-xl font-semibold mb-3 text-blue-400">
          {{ $t("buyTickets.review.movieInfo") }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span class="text-gray-400"
              >{{ $t("buyTickets.review.movie") }}:</span
            >
            <span class="ml-2 font-medium">{{ movieName }}</span>
          </div>
          <div>
            <span class="text-gray-400"
              >{{ $t("buyTickets.review.date") }}:</span
            >
            <span class="ml-2 font-medium">{{ formattedDate }}</span>
          </div>
          <div>
            <span class="text-gray-400"
              >{{ $t("buyTickets.review.screenType") }}:</span
            >
            <span class="ml-2 font-medium">{{ selectedScreenType }}</span>
          </div>
          <div>
            <span class="text-gray-400"
              >{{ $t("buyTickets.review.cinema") }}:</span
            >
            <span class="ml-2 font-medium">{{ cinemaName }}</span>
          </div>
          <div>
            <span class="text-gray-400"
              >{{ $t("buyTickets.review.showtime") }}:</span
            >
            <span class="ml-2 font-medium">{{ scheduleTime }}</span>
          </div>
          <div>
            <span class="text-gray-400"
              >{{ $t("buyTickets.review.duration") }}:</span
            >
            <span class="ml-2 font-medium"
              >{{ selectedMovie?.duration || "N/A" }}
              {{ $t("buyTickets.review.minutes") }}</span
            >
          </div>
        </div>
      </div>

      <!-- Seat Information -->
      <div class="border-b border-gray-700 pb-4 mb-4">
        <h3 class="text-xl font-semibold mb-3 text-green-400">
          {{ $t("buyTickets.review.seatInfo") }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span class="text-gray-400"
              >{{ $t("buyTickets.review.selectedSeats") }}:</span
            >
            <div class="mt-2">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="seat in selectedSeats"
                  :key="seat.id"
                  class="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ seat.row }}{{ seat.column }}
                </span>
              </div>
            </div>
          </div>
          <div>
            <span class="text-gray-400"
              >{{ $t("buyTickets.review.ticketCount") }}:</span
            >
            <span class="ml-2 font-medium"
              >{{ selectedSeatIds?.length || 0 }}
              {{ $t("buyTickets.review.tickets") }}</span
            >
          </div>
        </div>
      </div>

      <!-- F&B Information -->
      <div
        class="border-b border-gray-700 pb-4 mb-4"
        v-if="selectedFnbItems?.length"
      >
        <h3 class="text-xl font-semibold mb-3 text-orange-400">
          {{ $t("buyTickets.review.fnbInfo") }}
        </h3>
        <div class="space-y-2">
          <div
            v-for="item in selectedFnbItems"
            :key="item.fnbItem.id"
            class="flex justify-between items-center bg-[#0d1117] p-3 rounded-lg"
          >
            <div class="flex items-center gap-3">
              <img
                v-if="item.fnbItem.image"
                :src="item.fnbItem.image"
                :alt="getFnbName(item.fnbItem)"
                class="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p class="font-medium">{{ getFnbName(item.fnbItem) }}</p>
                <p class="text-sm text-gray-400">
                  {{ formatPrice(item.fnbItem.price) }} × {{ item.quantity }}
                </p>
              </div>
            </div>
            <span class="font-semibold text-orange-400">{{
              formatPrice(item.fnbItem.price * item.quantity)
            }}</span>
          </div>
        </div>
      </div>

      <!-- Price Breakdown -->
      <div class="bg-[#0d1117] p-4 rounded-lg">
        <h3 class="text-xl font-semibold mb-3 text-yellow-400">
          {{ $t("buyTickets.review.priceBreakdown") }}
        </h3>
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-gray-400"
              >{{ $t("buyTickets.review.ticketsPrice") }}:</span
            >
            <span class="font-medium">{{ formatPrice(ticketsPrice) }}</span>
          </div>
          <div class="flex justify-between items-center" v-if="fnbPrice > 0">
            <span class="text-gray-400"
              >{{ $t("buyTickets.review.fnbPrice") }}:</span
            >
            <span class="font-medium">{{ formatPrice(fnbPrice) }}</span>
          </div>
          <hr class="border-gray-700 my-2" />
          <div
            class="flex justify-between items-center text-xl font-bold text-yellow-400"
          >
            <span>{{ $t("buyTickets.review.totalPrice") }}:</span>
            <span>{{ formatPrice(totalPrice) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between gap-4">
      <button
        @click="$emit('back')"
        class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        {{ $t("buyTickets.common.back") }}
      </button>
      <button
        @click="$emit('proceed')"
        class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        {{ $t("buyTickets.review.proceedToPayment") }}
      </button>
    </div>
  </div>
</template>
