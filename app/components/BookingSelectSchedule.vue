<script setup lang="ts">
import type { MovieSchedule, TimeSlot } from "~~/types/type";
import { ArrowLeft, ClockFading, Timer, CheckCircle } from "lucide-vue-next";

interface Props {
  schedules: any[];
  selectedScheduleId: number | null;
}

interface Emits {
  (e: "select", scheduleId: number): void;
  (e: "back"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { t } = useI18n();

const MAX_MOVIE_DURATION_MS = 6 * 60 * 60 * 1000;

const formatTime = (timeString: string) => {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const formatDuration = (startTime: string, endTime: string) => {
  const start = new Date(`2000-01-01T${startTime}`);
  let end = new Date(`2000-01-01T${endTime}`);

  let durationMs = end.getTime() - start.getTime();

  // If end is before start, check for overnight screening possibility (< 6h)
  if (durationMs < 0) {
    end.setDate(end.getDate() + 1);
    durationMs = end.getTime() - start.getTime();

    // If after adding a day, the duration is still negative or greater than 6 hours, report error
    if (durationMs <= 0 || durationMs > MAX_MOVIE_DURATION_MS) {
      return "Invalid time";
    }
  } else {
    // If duration is too long (screenings usually < 6 hours), report error
    if (durationMs > MAX_MOVIE_DURATION_MS) {
      return "Invalid time";
    }
  }

  const minutes = Math.floor(durationMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  return `${remainingMinutes}m`;
};

const isTimeSlotPast = (timeString: string, dateString: string) => {
  const now = new Date();
  const timeSlotDate = new Date(`${dateString}T${timeString}`);
  return timeSlotDate < now;
};

const handleScheduleSelect = (scheduleId: number) => {
  emit("select", scheduleId);
};

const handleBack = () => {
  emit("back");
};
</script>

<template>
  <div class="bg-[#161b22] rounded-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">
        {{ t("buyTickets.selectSchedule.title") }}
      </h2>
      <button
        @click="handleBack"
        class="flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        {{ t("buyTickets.common.back") }}
      </button>
    </div>

    <div v-if="schedules.length === 0" class="text-center py-8">
      <ClockFading class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <p class="text-gray-400">
        {{ t("buyTickets.selectSchedule.noAvailable") }}
      </p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
        v-for="schedule in schedules"
        :key="schedule.id"
        @click="handleScheduleSelect(schedule.id)"
        :disabled="
          isTimeSlotPast(schedule.timeSlot.startTime, schedule.timeSlot.date)
        "
        class="p-6 rounded-lg border-2 transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed"
        :class="{
          'border-blue-500 bg-blue-500/20': selectedScheduleId === schedule.id,
          'border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:scale-105':
            selectedScheduleId !== schedule.id &&
            !isTimeSlotPast(
              schedule.timeSlot.startTime,
              schedule.timeSlot.date
            ),
          'border-red-500/50 bg-red-500/10': isTimeSlotPast(
            schedule.timeSlot.startTime,
            schedule.timeSlot.date
          ),
        }"
      >
        <div class="flex items-center gap-2 mb-4">
          <Timer
            class="w-7 h-7"
            :class="{
              'text-blue-400': selectedScheduleId === schedule.id,
              'text-red-400': isTimeSlotPast(
                schedule.timeSlot.startTime,
                schedule.timeSlot.date
              ),
              'text-gray-400':
                selectedScheduleId !== schedule.id &&
                !isTimeSlotPast(
                  schedule.timeSlot.startTime,
                  schedule.timeSlot.date
                ),
            }"
          />
          <span
            v-if="
              isTimeSlotPast(
                schedule.timeSlot.startTime,
                schedule.timeSlot.date
              )
            "
            class="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded"
          >
            {{ t("buyTickets.selectSchedule.past") }}
          </span>
          <div
            class="text-2xl font-bold"
            :class="{
              'text-blue-400': selectedScheduleId === schedule.id,
              'text-white':
                selectedScheduleId !== schedule.id &&
                !isTimeSlotPast(
                  schedule.timeSlot.startTime,
                  schedule.timeSlot.date
                ),
              'text-red-400': isTimeSlotPast(
                schedule.timeSlot.startTime,
                schedule.timeSlot.date
              ),
            }"
          >
            {{ formatTime(schedule.timeSlot.startTime) }}
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <div class="text-gray-500">
              {{ t("buyTickets.selectSchedule.startTime") }}:
              {{ formatTime(schedule.timeSlot.startTime) }}
            </div>

            <div class="text-gray-500">
              {{ t("buyTickets.selectSchedule.endTime") }}:
              {{ formatTime(schedule.timeSlot.endTime) }}
            </div>
          </div>

          <div class="text-gray-400">
            {{ t("buyTickets.selectSchedule.duration") }}:
            {{
              formatDuration(
                schedule.timeSlot.startTime,
                schedule.timeSlot.endTime
              )
            }}
          </div>

          <div
            v-if="selectedScheduleId === schedule.id"
            class="flex items-center mt-3 text-blue-400"
          >
            <CheckCircle class="w-4 h-4 mr-2" />
            <span class="">{{ t("buyTickets.common.selected") }}</span>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>
