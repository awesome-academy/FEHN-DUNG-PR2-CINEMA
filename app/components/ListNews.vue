<script setup lang="ts">
import { computed } from "vue";
import type { EventResult } from "~/composables/useEvents";
import { Calendar, MapPin } from "lucide-vue-next";

interface Props {
  events: EventResult[];
}

const props = defineProps<Props>();
const { t, locale } = useI18n();
const localePath = useLocalePath();
const router = useRouter();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale.value, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const navigateToEvent = (eventId: number) => {
  router.push(localePath(`/newsDetail/${eventId}`));
};
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    <div
      v-for="event in events"
      :key="event.id"
      @click="navigateToEvent(event.id)"
      class="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
    >
      <!-- Event Image -->
      <div class="relative overflow-hidden">
        <img
          :src="event.image"
          :alt="event.name"
          class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
        />

        <!-- Event Type Badge -->
        <div class="absolute top-3 left-3">
          <span
            class="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full uppercase"
          >
            {{ event.type }}
          </span>
        </div>

        <!-- Status Badge -->
        <div class="absolute top-3 right-3">
          <span
            :class="[
              'px-3 py-1 text-xs font-semibold rounded-full uppercase',
              event.status === 'active'
                ? 'bg-green-600 text-white'
                : 'bg-gray-600 text-white',
            ]"
          >
            {{ event.status }}
          </span>
        </div>
      </div>

      <!-- Event Info -->
      <div class="p-4">
        <!-- Event Title -->
        <h3
          class="text-xl font-bold text-white mb-3 h-[60px] group-hover:text-red-400 transition-colors"
        >
          {{ event.name }}
        </h3>

        <!-- Event Description -->
        <p class="text-gray-400 text-sm mb-4 h-[50px]">
          {{ event.description }}
        </p>

        <!-- Date Range -->
        <div class="flex items-center gap-2 h-[20px] text-gray-300 mb-2">
          <Calendar class="w-4 h-4 text-red-500" />
          <div class="text-sm">
            <span class="font-medium">{{ t("listEvents.startDate") }}:</span>
            <span class="ml-1">{{ formatDate(event.startDate) }}</span>
          </div>
        </div>

        <div class="flex items-center gap-2 h-[20px] text-gray-300">
          <Calendar class="w-4 h-4 text-red-500" />
          <div class="text-sm">
            <span class="font-medium">{{ t("listEvents.endDate") }}:</span>
            <span class="ml-1">{{ formatDate(event.endDate) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
