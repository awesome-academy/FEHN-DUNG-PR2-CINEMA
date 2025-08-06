<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBookingFlow } from "~/composables/useBookingFlow";
import type { BookingStep } from "~/composables/useBookingFlow";

const bookingFlow = useBookingFlow();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  const movieIdFromQuery = Number(route.query.id);
  if (movieIdFromQuery) {
    bookingFlow.initializeWithMovie(movieIdFromQuery);
  } else {
    router.push("/");
  }
});

const visibleSteps: BookingStep[] = [
  "selectDate",
  "selectScreenType",
  "selectCinema",
  "selectSchedule",
  "selectSeat",
  "selectFnb",
  "review",
  "payment",
];
</script>

<template>
  <div class="min-h-screen bg-[#0d1117] text-white py-8">
    <div class="container mx-auto">
      <!-- Progress Bar -->
      <BookingProgressBar
        :current-step="bookingFlow.currentStep.value"
        :visible-steps="visibleSteps"
        class="mb-8"
      />

      <!-- Step Content -->
      <div class="mx-auto">
        <!-- Select Date -->
        <BookingSelectDate
          v-if="bookingFlow.currentStep.value === 'selectDate'"
          :dates="bookingFlow.dates.value.dates"
          :selected-date="bookingFlow.selectedDate.value"
          @select="bookingFlow.selectDate"
        />

        <!-- Select Screen Type -->
        <BookingSelectScreenType
          v-if="bookingFlow.currentStep.value === 'selectScreenType'"
          :screen-types="bookingFlow.screenTypes.value.screenTypes"
          :selected-type="bookingFlow.selectedScreenType.value"
          @select="bookingFlow.selectScreenType"
          @back="bookingFlow.prevStep"
        />

        <!-- Select Cinema -->
        <BookingSelectCinema
          v-if="bookingFlow.currentStep.value === 'selectCinema'"
          :cinemas="bookingFlow.cinemas.value.cinemas"
          :selected-cinema-id="bookingFlow.selectedCinemaId.value"
          @select="bookingFlow.selectCinema"
          @back="bookingFlow.prevStep"
        />

        <!-- Select Schedule -->
        <BookingSelectSchedule
          v-if="bookingFlow.currentStep.value === 'selectSchedule'"
          :schedules="bookingFlow.schedules.value.schedules"
          :selected-schedule-id="bookingFlow.selectedScheduleId.value"
          @select="bookingFlow.selectSchedule"
          @back="bookingFlow.prevStep"
        />

        <!-- Select Seat -->
        <BookingSelectSeat
          v-if="bookingFlow.currentStep.value === 'selectSeat'"
          :available-seats="bookingFlow.availableSeats.value"
          :booked-seat-ids="bookingFlow.bookedSeatIds.value"
          :selected-seat-ids="bookingFlow.selectedSeatIds.value"
          @select-seat="bookingFlow.selectSeat"
          @finish="bookingFlow.finishSeatSelection"
          @back="bookingFlow.prevStep"
        />

        <!-- Select FnB -->
        <BookingSelectFnb
          v-if="bookingFlow.currentStep.value === 'selectFnb'"
          :fnb-items="bookingFlow.fnbItems"
          :selected-items="bookingFlow.selectedFnbItems.value"
          @select="bookingFlow.selectFnb"
          @finish="bookingFlow.finishFnbSelection"
          @back="bookingFlow.prevStep"
        />

        <!-- Review Order -->
        <BookingReviewOrder
          v-if="bookingFlow.currentStep.value === 'review'"
          :selected-movie-id="bookingFlow.selectedMovieId.value"
          :selected-date="bookingFlow.selectedDate.value"
          :selected-screen-type="bookingFlow.selectedScreenType.value"
          :selected-cinema-id="bookingFlow.selectedCinemaId.value"
          :selected-schedule-id="bookingFlow.selectedScheduleId.value"
          :selected-seat-ids="bookingFlow.selectedSeatIds.value"
          :selected-fnb-items="bookingFlow.selectedFnbItems.value"
          :tickets-price="bookingFlow.ticketsPrice.value"
          :fnb-price="bookingFlow.fnbPrice.value"
          :total-price="bookingFlow.totalPrice.value"
          @proceed="bookingFlow.proceedToPayment"
          @back="bookingFlow.prevStep"
        />

        <!-- Payment -->
        <BookingPayment
          v-if="bookingFlow.currentStep.value === 'payment'"
          :total-price="bookingFlow.totalPrice.value"
          @back="bookingFlow.prevStep"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
