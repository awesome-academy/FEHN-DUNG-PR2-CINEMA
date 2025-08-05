<script setup lang="ts">
import { Calendar } from "lucide-vue-next";
interface Props {
  dates: string[];
  selectedDate: string | null;
}

interface Emits {
  (e: "select", date: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { t } = useI18n();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return t("buyTickets.date.today");
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return t("buyTickets.date.tomorrow");
  } else {
    return date.toLocaleDateString("vi-VN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }
};

const handleDateSelect = (date: string) => {
  emit("select", date);
};
</script>

<template>
  <div class="bg-[#161b22] rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-6">
      {{ t("buyTickets.selectDate.title") }}
    </h2>

    <div v-if="dates.length === 0" class="text-center py-8">
      <Calendar class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <p class="text-gray-400">{{ t("buyTickets.selectDate.noAvailable") }}</p>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      <button
        v-for="date in dates"
        :key="date"
        @click="handleDateSelect(date)"
        class="p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105"
        :class="{
          'border-blue-500 bg-blue-500/20 text-blue-400': selectedDate === date,
          'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500':
            selectedDate !== date,
        }"
      >
        <div class="text-center">
          <div class="text-lg font-bold">
            {{ formatDate(date) }}
          </div>
        </div>
      </button>
    </div>

    <div
      v-if="selectedDate"
      class="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg"
    >
      <div class="flex items-center">
        <Icon name="lucide:check-circle" class="w-5 h-5 text-blue-400 mr-2" />
        <span class="text-blue-400">
          {{ t("buyTickets.selectDate.selected") }}:
          {{ formatDate(selectedDate) }}
        </span>
      </div>
    </div>
  </div>
</template>
